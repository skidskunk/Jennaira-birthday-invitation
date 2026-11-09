import React from 'react'

function handleShare() {
  const text = encodeURIComponent(
    'Yuk datang ke ultah Jennaira yang ke 3! 🎀🎂\n\n📅 02 April 2027 | 16.00–18.00 WITA\n📍 Mamuju, Sulawesi Barat\n\n💕 Aku tunggu ya! 💕'
  )
  window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener noreferrer')
}

export default function FooterSection() {
  return (
    <footer
      className="relative py-12 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFB3CC, #FF9EBB)' }}
    >
      {/* Polkadot */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Top decoration */}
        <div className="flex gap-3 text-2xl mb-5">
          <span className="animate-float">🌸</span>
          <span className="animate-float" style={{ animationDelay: '0.3s' }}>🎀</span>
          <span className="animate-float" style={{ animationDelay: '0.6s' }}>🌸</span>
        </div>

        {/* Big ribbon */}
        <div className="animate-ribbon-sway mb-4">
          <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="22" cy="27" rx="20" ry="13" fill="#E31E24" transform="rotate(-15 22 27)" />
            <ellipse cx="22" cy="27" rx="13" ry="8" fill="#FF4444" transform="rotate(-15 22 27)" />
            <ellipse cx="58" cy="27" rx="20" ry="13" fill="#E31E24" transform="rotate(15 58 27)" />
            <ellipse cx="58" cy="27" rx="13" ry="8" fill="#FF4444" transform="rotate(15 58 27)" />
            <circle cx="40" cy="28" r="9" fill="#C0000A" />
            <circle cx="40" cy="28" r="6" fill="#E31E24" />
            <path d="M32 36 Q22 50 14 55" stroke="#E31E24" strokeWidth="6" strokeLinecap="round" />
            <path d="M48 36 Q58 50 66 55" stroke="#E31E24" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        {/* Main text */}
        <p
          className="text-white font-semibold text-base mb-1"
          style={{ fontFamily: 'Quicksand' }}
        >
          Dibuat dengan cinta untuk
        </p>
        <h3
          className="text-2xl font-black text-white mb-2"
          style={{
            fontFamily: 'Baloo 2, cursive',
            textShadow: '1px 2px 4px rgba(180,0,30,0.3)',
          }}
        >
          Jennaira Nala Bestari 💕
        </h3>
        <p
          className="text-white/80 text-sm mb-6"
          style={{ fontFamily: 'Quicksand' }}
        >
          Semoga hari ulang tahunmu selalu bersinar ✨
        </p>

        {/* WhatsApp Share button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-4 rounded-full text-white font-bold text-base shadow-xl active:scale-95 transition-transform"
          style={{
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            fontFamily: 'Baloo 2, cursive',
            boxShadow: '0 4px 15px rgba(37,211,102,0.4)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Bagikan ke WhatsApp
        </button>

        {/* Nav links */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          {['#hero', '#detail', '#galeri', '#rsvp', '#ucapan'].map((href, i) => {
            const labels = ['Hero', 'Detail', 'Galeri', 'RSVP', 'Ucapan']
            return (
              <a
                key={href}
                href={href}
                className="text-white/70 text-xs font-semibold hover:text-white transition-colors"
                style={{ fontFamily: 'Quicksand' }}
              >
                {labels[i]}
              </a>
            )
          })}
        </div>

        {/* Bottom */}
        <div className="flex gap-2 mt-6 text-lg">
          <span className="animate-float">🎀</span>
          <span className="animate-float" style={{ animationDelay: '0.5s' }}>💕</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>🎀</span>
        </div>
        <p
          className="text-white/50 text-xs mt-3"
          style={{ fontFamily: 'Quicksand' }}
        >
          © 2027 · Jennaira Nala Bestari · 3rd Birthday
        </p>
      </div>
    </footer>
  )
}

