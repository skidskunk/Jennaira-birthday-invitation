import React, { useEffect, useRef, useState } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  size: number
  color: string
  shape: 'ribbon' | 'heart' | 'circle'
  duration: number
  delay: number
}

const COLORS = ['#FF9EBB', '#E31E24', '#FFD93D', '#FFFFFF', '#F06292', '#FF6B9D']

function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 10 + 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: ['ribbon', 'heart', 'circle'][Math.floor(Math.random() * 3)] as ConfettiPiece['shape'],
    duration: Math.random() * 2 + 2.5,
    delay: Math.random() * 2,
  }))
}

export default function ConfettiEffect({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (active) {
      setPieces(generateConfetti(60))
      const timer = setTimeout(() => setPieces([]), 5000)
      return () => clearTimeout(timer)
    }
  }, [active])

  if (!pieces.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece absolute"
          style={{
            left: `${p.x}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}px`,
            color: p.color,
          }}
        >
          {p.shape === 'ribbon' ? '🎀' : p.shape === 'heart' ? '💕' : '●'}
        </div>
      ))}
    </div>
  )
}

