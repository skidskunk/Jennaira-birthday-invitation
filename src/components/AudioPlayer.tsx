import React, { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
  isPlaying: boolean
  onToggle: () => void
}

export default function AudioPlayer({ isPlaying, onToggle }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  return (
    <>
      {/* Happy Birthday music box - using a simple beep sequence via Web Audio API */}
      <audio ref={audioRef} loop>
        {/* We'll generate music via Web Audio - audio element is placeholder */}
      </audio>
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full shadow-lg audio-btn flex items-center justify-center text-xl"
        style={{
          background: 'linear-gradient(135deg, #FF9EBB, #E31E24)',
          color: 'white',
        }}
        title={isPlaying ? 'Pause Musik' : 'Play Musik'}
        aria-label={isPlaying ? 'Pause Musik' : 'Play Musik'}
      >
        {isPlaying ? '⏸' : '🎵'}
      </button>
    </>
  )
}

