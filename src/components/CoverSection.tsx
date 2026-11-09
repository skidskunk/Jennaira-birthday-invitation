import React from 'react'

interface CoverSectionProps {
  onOpen: () => void
  isOpening?: boolean
}

export default function CoverSection({ onOpen, isOpening }: CoverSectionProps) {
  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-in-out ${
        isOpening ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
      style={{ background: 'linear-gradient(135deg, #FFB3CC 0%, #FF9EBB 40%, #FF7FAB 100%)' }}
    >
      {/* Polkadot overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating balloons */}
      <div className="absolute left-4 bottom-20 flex flex-col gap-2">
        <div className="balloon text-4xl" style={{ animationDelay: '0s' }}>🎈</div>
        <div className="balloon text-3xl" style={{ animationDelay: '0.7s' }}>🎀</div>
      </div>
      <div className="absolute right-4 bottom-24 flex flex-col gap-2">
        <div className="balloon text-3xl" style={{ animationDelay: '0.3s' }}>🎈</div>
        <div className="balloon text-4xl" style={{ animationDelay: '1s' }}>🎀</div>
      </div>

      {/* Top decoration */}
      <div className="absolute top-6 left-0 right-0 flex justify-around text-2xl opacity-60">
        <span>🌸</span><span>⭐</span><span>🌸</span><span>⭐</span><span>🌸</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Big ribbon icon */}
        <div className="animate-ribbon-sway mb-4">
          <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left bow */}
            <ellipse cx="35" cy="40" rx="32" ry="22" fill="#E31E24" transform="rotate(-15 35 40)" />
            <ellipse cx="35" cy="40" rx="24" ry="14" fill="#FF4444" transform="rotate(-15 35 40)" />
            {/* Right bow */}
            <ellipse cx="85" cy="40" rx="32" ry="22" fill="#E31E24" transform="rotate(15 85 40)" />
            <ellipse cx="85" cy="40" rx="24" ry="14" fill="#FF4444" transform="rotate(15 85 40)" />
            {/* Center knot */}
            <circle cx="60" cy="42" r="13" fill="#C0000A" />
            <circle cx="60" cy="42" r="8" fill="#E31E24" />
            {/* Ribbon tails */}
            <path d="M48 52 Q35 75 20 82" stroke="#E31E24" strokeWidth="8" strokeLinecap="round" />
            <path d="M72 52 Q85 75 100 82" stroke="#E31E24" strokeWidth="8" strokeLinecap="round" />
            <path d="M48 52 Q32 72 15 85" stroke="#FF4444" strokeWidth="4" strokeLinecap="round" />
            <path d="M72 52 Q88 72 105 85" stroke="#FF4444" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        <h1
          className="text-3xl font-extrabold mb-1 text-white drop-shadow-lg"
          style={{ fontFamily: 'Baloo 2, cursive', textShadow: '2px 3px 6px rgba(180,0,30,0.4)' }}
        >
          ✨ Undangan ✨
        </h1>
        <h2
          className="text-4xl font-black mb-5 text-white drop-shadow-lg"
          style={{ fontFamily: 'Baloo 2, cursive', textShadow: '2px 3px 6px rgba(180,0,30,0.4)' }}
        >
          Ulang Tahun!
        </h2>

        {/* Stars decoration */}
        <div className="flex gap-2 mb-6 text-yellow-300 text-xl">
          <span className="animate-wiggle" style={{ animationDelay: '0s' }}>⭐</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.2s' }}>💕</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.4s' }}>⭐</span>
        </div>

        {/* Open button shaped like a ribbon */}
        <button
          id="btn-buka-undangan"
          onClick={onOpen}
          className="animate-pulse-soft relative px-8 py-4 text-white font-bold text-lg rounded-full shadow-xl transition-all active:scale-95"
          style={{
            fontFamily: 'Baloo 2, cursive',
            background: 'linear-gradient(135deg, #E31E24, #C0000A)',
            boxShadow: '0 6px 20px rgba(227,30,36,0.5)',
          }}
        >
          <span className="mr-2">🎀</span>
          Buka Undangan
          <span className="ml-2">🎀</span>
        </button>

        <p
          className="mt-4 text-white/80 text-sm"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          Klik untuk membuka kejutan istimewa!
        </p>
      </div>

      {/* Bottom flowers */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-around text-xl opacity-50">
        <span>🌸</span><span>🌺</span><span>🌸</span><span>🌺</span><span>🌸</span>
      </div>
    </div>
  )
}
