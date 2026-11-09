import React, { useEffect, useState } from 'react'

// Hello Kitty style cat SVG illustration
function HelloKittyIllustration() {
  return (
    <svg
      width="180"
      height="200"
      viewBox="0 0 180 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Body */}
      <ellipse cx="90" cy="150" rx="55" ry="50" fill="white" />
      {/* Dress - pink */}
      <ellipse cx="90" cy="162" rx="52" ry="42" fill="#FF9EBB" />
      {/* Collar/dress detail */}
      <ellipse cx="90" cy="128" rx="30" ry="10" fill="white" />
      {/* Arms */}
      <ellipse cx="38" cy="148" rx="16" ry="8" fill="white" transform="rotate(-30 38 148)" />
      <ellipse cx="142" cy="148" rx="16" ry="8" fill="white" transform="rotate(30 142 148)" />
      {/* Head */}
      <ellipse cx="90" cy="88" rx="52" ry="48" fill="white" />
      {/* Ears */}
      <polygon points="42,55 55,30 68,55" fill="white" />
      <polygon points="112,55 125,30 138,55" fill="white" />
      <polygon points="47,53 55,35 65,53" fill="#FFB3CC" />
      <polygon points="115,53 125,35 133,53" fill="#FFB3CC" />
      {/* Big bow / ribbon on head (red) */}
      <g transform="translate(100, 32)">
        {/* Left side of bow */}
        <ellipse cx="-12" cy="0" rx="22" ry="14" fill="#E31E24" transform="rotate(-15 -12 0)" />
        <ellipse cx="-12" cy="0" rx="15" ry="9" fill="#FF3333" transform="rotate(-15 -12 0)" />
        {/* Right side of bow */}
        <ellipse cx="12" cy="0" rx="22" ry="14" fill="#E31E24" transform="rotate(15 12 0)" />
        <ellipse cx="12" cy="0" rx="15" ry="9" fill="#FF3333" transform="rotate(15 12 0)" />
        {/* Center knot */}
        <circle cx="0" cy="0" r="9" fill="#C0000A" />
        <circle cx="0" cy="0" r="6" fill="#E31E24" />
      </g>
      {/* Eyes (small circles, wide apart like Hello Kitty) */}
      <circle cx="74" cy="88" r="5" fill="#1a1a1a" />
      <circle cx="106" cy="88" r="5" fill="#1a1a1a" />
      {/* Shine in eyes */}
      <circle cx="76" cy="86" r="2" fill="white" />
      <circle cx="108" cy="86" r="2" fill="white" />
      {/* Nose - small oval yellow */}
      <ellipse cx="90" cy="96" rx="4" ry="3" fill="#FFD93D" />
      {/* Whiskers */}
      <line x1="40" y1="92" x2="80" y2="98" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="98" x2="80" y2="100" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="104" x2="80" y2="102" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="140" y1="92" x2="100" y2="98" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="140" y1="98" x2="100" y2="100" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="140" y1="104" x2="100" y2="102" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      {/* Blush cheeks */}
      <ellipse cx="68" cy="102" rx="10" ry="6" fill="#FFB3CC" opacity="0.6" />
      <ellipse cx="112" cy="102" rx="10" ry="6" fill="#FFB3CC" opacity="0.6" />
      {/* Dress bow decoration */}
      <g transform="translate(90, 143)">
        <ellipse cx="-10" cy="0" rx="12" ry="7" fill="#FFD93D" transform="rotate(-10 -10 0)" />
        <ellipse cx="10" cy="0" rx="12" ry="7" fill="#FFD93D" transform="rotate(10 10 0)" />
        <circle cx="0" cy="0" r="6" fill="#FFB800" />
      </g>
      {/* Stars decoration */}
      <text x="20" y="120" fontSize="14" fill="#FFD93D" opacity="0.8">⭐</text>
      <text x="148" y="115" fontSize="12" fill="#FF9EBB" opacity="0.8">✿</text>
      <text x="25" y="175" fontSize="10" fill="#FFD93D" opacity="0.6">✦</text>
      <text x="152" y="170" fontSize="10" fill="#FF9EBB" opacity="0.6">✦</text>
    </svg>
  )
}

interface CountdownValue {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function useCountdown(targetDate: Date): CountdownValue {
  const [countdown, setCountdown] = useState<CountdownValue>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const diff = target - now

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return countdown
}

// Tanggal: 02 April 2027 16:00 WITA (UTC+8)
const EVENT_DATE = new Date('2027-04-02T16:00:00+08:00')

export default function HeroSection() {
  const countdown = useCountdown(EVENT_DATE)

  const CountBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-md"
        style={{
          background: 'linear-gradient(135deg, #FF9EBB, #FF7FAB)',
          color: 'white',
          fontFamily: 'Baloo 2, cursive',
          boxShadow: '0 4px 15px rgba(255,158,187,0.4)',
        }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span
        className="text-xs mt-1 font-semibold"
        style={{ color: '#E31E24', fontFamily: 'Quicksand, sans-serif' }}
      >
        {label}
      </span>
    </div>
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF5F8 0%, #FFDCE9 100%)' }}
    >
      {/* Polkadot bg */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #FF9EBB 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Floating flowers */}
      <div className="absolute top-8 left-6 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>🌸</div>
      <div className="absolute top-12 right-8 text-xl animate-float" style={{ animationDelay: '1s' }}>🌺</div>
      <div className="absolute bottom-20 left-4 text-xl animate-float" style={{ animationDelay: '0.3s' }}>🌸</div>
      <div className="absolute bottom-16 right-6 text-2xl animate-float" style={{ animationDelay: '0.8s' }}>🌺</div>

      {/* Balloons on sides */}
      <div className="absolute left-0 top-24 flex flex-col gap-4 opacity-70">
        <div className="balloon text-4xl">🎈</div>
        <div className="balloon text-3xl" style={{ animationDelay: '0.5s' }}>🎀</div>
        <div className="balloon text-4xl" style={{ animationDelay: '1s' }}>🎈</div>
      </div>
      <div className="absolute right-0 top-24 flex flex-col gap-4 opacity-70">
        <div className="balloon text-4xl" style={{ animationDelay: '0.3s' }}>🎈</div>
        <div className="balloon text-3xl" style={{ animationDelay: '0.8s' }}>🎀</div>
        <div className="balloon text-4xl" style={{ animationDelay: '1.3s' }}>🎈</div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Hello Kitty illustration */}
        <div className="animate-float mb-2">
          <HelloKittyIllustration />
        </div>

        {/* Photo frame */}
        <div className="relative mb-5">
          <div
            className="w-36 h-36 rounded-full overflow-hidden shimmer-border p-1 shadow-xl"
            style={{ background: 'linear-gradient(135deg, #FF9EBB, #FFD93D, #E31E24, #FF9EBB)' }}
          >
            <div
              className="w-full h-full rounded-full overflow-hidden border-2 border-white relative bg-[#FFF5F8]"
            >
              <img
                src="/photos/jennaira.png"
                alt="Jennaira Nala Bestari"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  // Fallback jika file /photos/jennaira.png belum ada
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div
                className="w-full h-full flex-col items-center justify-center"
                style={{ display: 'none' }}
              >
                <span className="text-5xl">👶</span>
                <span className="text-xs text-pink-400 font-semibold mt-1">Foto Jennaira</span>
              </div>
            </div>
          </div>
          {/* Ribbon decoration on frame */}
          <div
            className="absolute -top-2 -right-2 text-2xl animate-wiggle"
            style={{ animationDelay: '0.5s' }}
          >🎀</div>
          <div
            className="absolute -bottom-1 -left-2 text-lg animate-wiggle"
            style={{ animationDelay: '0.8s' }}
          >🌸</div>
        </div>

        {/* Name */}
        <h1
          className="text-3xl font-black leading-tight mb-1"
          style={{
            fontFamily: 'Baloo 2, cursive',
            color: '#E31E24',
            textShadow: '2px 2px 0px rgba(255,158,187,0.5)',
          }}
        >
          Jennaira Nala Bestari
        </h1>

        {/* Birthday badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white font-bold text-lg mb-3 shadow-md animate-bounce-in"
          style={{
            background: 'linear-gradient(135deg, #FF9EBB, #E31E24)',
            fontFamily: 'Baloo 2, cursive',
          }}
        >
          🎂 Ulang Tahun Ke-3 🎂
        </div>

        {/* Date */}
        <div
          className="flex items-center gap-2 text-pink-500 font-bold text-base mb-6"
          style={{ fontFamily: 'Quicksand, sans-serif' }}
        >
          <span>🗓️</span>
          <span>02 April 2027 · 16.00 – 18.00 WITA</span>
        </div>

        {/* Countdown */}
        <div
          className="rounded-3xl px-6 py-4 shadow-lg"
          style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)',
            border: '2px solid #FF9EBB',
          }}
        >
          <p
            className="text-center text-pink-500 font-bold text-sm mb-3"
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            🎀 Hitung Mundur Menuju Hari Spesial 🎀
          </p>
          <div className="flex gap-3 justify-center">
            <CountBox value={countdown.days} label="Hari" />
            <div className="flex items-center text-pink-400 font-black text-2xl pb-5">:</div>
            <CountBox value={countdown.hours} label="Jam" />
            <div className="flex items-center text-pink-400 font-black text-2xl pb-5">:</div>
            <CountBox value={countdown.minutes} label="Menit" />
            <div className="flex items-center text-pink-400 font-black text-2xl pb-5">:</div>
            <CountBox value={countdown.seconds} label="Detik" />
          </div>
        </div>
      </div>
    </section>
  )
}

