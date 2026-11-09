import React, { useCallback, useEffect, useRef, useState } from 'react'
import CoverSection from './components/CoverSection'
import HeroSection from './components/HeroSection'
import DetailSection from './components/DetailSection'
import GallerySection from './components/GallerySection'
import RSVPSection from './components/RSVPSection'
import WishesSection from './components/WishesSection'
import FooterSection from './components/FooterSection'
import ConfettiEffect from './components/ConfettiEffect'

// Web Audio API - Happy Birthday music box
// Notes: C4=261, D4=293, E4=329, F4=349, G4=392, A4=440
class MusicBox {
  private ctx: AudioContext | null = null
  private gainNode: GainNode | null = null
  private isPlaying = false
  private stopFn: (() => void) | null = null

  // Happy Birthday notes + durations
  private readonly notes = [
    // "Happy Birthday to you"
    [261, 0.25], [261, 0.125], [293, 0.375], [261, 0.375], [349, 0.375], [329, 0.75],
    // "Happy Birthday to you"
    [261, 0.25], [261, 0.125], [293, 0.375], [261, 0.375], [392, 0.375], [349, 0.75],
    // "Happy Birthday dear Jennaira"
    [261, 0.25], [261, 0.125], [523, 0.375], [440, 0.375], [349, 0.375], [329, 0.375], [293, 0.75],
    // "Happy Birthday to you"
    [466, 0.25], [466, 0.125], [440, 0.375], [349, 0.375], [392, 0.375], [349, 0.75],
  ] as [number, number][]

  private playNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.gainNode) return

    const osc = this.ctx.createOscillator()
    const noteGain = this.ctx.createGain()

    osc.connect(noteGain)
    noteGain.connect(this.gainNode)

    osc.type = 'sine'
    osc.frequency.value = freq

    // Music box envelope: quick attack, long decay
    noteGain.gain.setValueAtTime(0, startTime)
    noteGain.gain.linearRampToValueAtTime(0.6, startTime + 0.02)
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 2.5)

    osc.start(startTime)
    osc.stop(startTime + duration * 2.5 + 0.1)
  }

  async start() {
    if (this.isPlaying) return
    this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    this.gainNode = this.ctx.createGain()
    this.gainNode.gain.value = 0.5
    this.gainNode.connect(this.ctx.destination)
    this.isPlaying = true
    this.scheduleLoop()
  }

  private scheduleLoop() {
    if (!this.ctx || !this.isPlaying) return

    const tempo = 0.42 // seconds per beat
    let time = this.ctx.currentTime + 0.1

    for (const [freq, beats] of this.notes) {
      this.playNote(freq, time, beats * tempo)
      time += beats * tempo
    }

    // Schedule next loop
    const totalDuration = this.notes.reduce((sum, [, b]) => sum + b, 0) * tempo
    const timeoutId = setTimeout(() => {
      if (this.isPlaying) this.scheduleLoop()
    }, (totalDuration - 0.5) * 1000)

    this.stopFn = () => clearTimeout(timeoutId)
  }

  stop() {
    this.isPlaying = false
    if (this.stopFn) this.stopFn()
    if (this.ctx) {
      this.ctx.close()
      this.ctx = null
    }
  }
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const musicBox = useRef<MusicBox>(new MusicBox())

  const handleOpen = useCallback(async () => {
    setIsOpening(true)
    setShowConfetti(true)
    setMusicPlaying(true)
    try {
      await musicBox.current.start()
    } catch (e) {
      console.warn('Audio failed:', e)
    }
    setTimeout(() => {
      setIsOpen(true)
    }, 600)
  }, [])

  const toggleMusic = useCallback(async () => {
    if (musicPlaying) {
      musicBox.current.stop()
      setMusicPlaying(false)
    } else {
      setMusicPlaying(true)
      try {
        musicBox.current = new MusicBox()
        await musicBox.current.start()
      } catch (e) {
        console.warn('Audio failed:', e)
      }
    }
  }, [musicPlaying])

  // Cleanup
  useEffect(() => {
    const mb = musicBox.current
    return () => mb.stop()
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#FFF5F8' }}>
      {/* Confetti */}
      <ConfettiEffect active={showConfetti} />

      {/* Cover overlay with smooth opening slide animation */}
      {!isOpen && <CoverSection onOpen={handleOpen} isOpening={isOpening} />}

      {/* Music toggle button (only after opening) */}
      {(isOpen || isOpening) && (
        <button
          id="btn-toggle-music"
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xl transition-transform active:scale-90"
          style={{
            background: 'linear-gradient(135deg, #FF9EBB, #E31E24)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(255,158,187,0.5)',
          }}
          title={musicPlaying ? 'Pause Musik' : 'Play Musik'}
          aria-label={musicPlaying ? 'Pause Musik' : 'Play Musik'}
        >
          {musicPlaying ? '⏸' : '🎵'}
        </button>
      )}

      {/* Main content - visible after open */}
      <main
        className="transition-all duration-700"
        style={{
          opacity: isOpening || isOpen ? 1 : 0,
          transform: isOpening || isOpen ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        aria-hidden={!isOpen}
      >
        <HeroSection />
        <DetailSection />
        <GallerySection />
        <RSVPSection />
        <WishesSection />
        <FooterSection />
      </main>
    </div>
  )
}
