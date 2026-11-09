import React, { useState } from 'react'

// 6 gallery slots
const GALLERY_SLOTS = Array.from({ length: 6 }, (_, i) => i + 1)

function GalleryCard({ slot, onSelect }: { slot: number; onSelect: () => void }) {
  const [hasError, setHasError] = useState(false)
  const imageSrc = `/photos/jenna-${slot}.jpeg`

  return (
    <div
      className="gallery-item relative rounded-2xl overflow-hidden border-4 shadow-md bg-[#FFF5F8]"
      style={{ borderColor: '#FF9EBB', aspectRatio: '1 / 1' }}
      onClick={onSelect}
      role="button"
      aria-label={`Foto Jennaira ${slot}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      {!hasError ? (
        <img
          src={imageSrc}
          alt={`Foto Jennaira ${slot}`}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FFF5F8, #FFDCE9)' }}
        >
          <span className="text-4xl mb-2">📸</span>
          <span
            className="text-xs text-pink-400 font-semibold text-center px-2"
            style={{ fontFamily: 'Quicksand' }}
          >
            Foto {slot}
          </span>
        </div>
      )}
      {/* Ribbon corner decoration */}
      <div className="absolute top-1 right-1 text-sm pointer-events-none drop-shadow">🎀</div>
    </div>
  )
}

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [lightboxError, setLightboxError] = useState(false)

  const openLightbox = (slot: number) => {
    setLightboxError(false)
    setLightbox(slot)
  }

  return (
    <section
      id="galeri"
      className="relative py-14 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF5F8 0%, #FFDCE9 100%)' }}
    >
      {/* Polkadot bg */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #FF9EBB 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-sm mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-block animate-float text-4xl mb-2">🌸</div>
          <h2
            className="text-3xl font-black"
            style={{ fontFamily: 'Baloo 2, cursive', color: '#E31E24' }}
          >
            Galeri Jennaira
          </h2>
          <p className="text-pink-400 font-semibold mt-1" style={{ fontFamily: 'Quicksand' }}>
            Momen lucu Jenna 💕
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 gap-4">
          {GALLERY_SLOTS.map((slot) => (
            <GalleryCard key={slot} slot={slot} onSelect={() => openLightbox(slot)} />
          ))}
        </div>

        <p
          className="text-center text-xs text-pink-400 mt-4 font-medium"
          style={{ fontFamily: 'Quicksand' }}
        >
          ✨ Klik foto untuk melihat ukuran penuh
        </p>
      </div>

      {/* Lightbox Fullscreen */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full border-4 bg-white"
            style={{ borderColor: '#FF9EBB' }}
            onClick={(e) => e.stopPropagation()}
          >
            {!lightboxError ? (
              <img
                src={`/photos/jenna-${lightbox}.jpeg`}
                alt={`Foto Jennaira ${lightbox}`}
                className="w-full max-h-[75vh] object-contain bg-pink-50"
                onError={() => setLightboxError(true)}
              />
            ) : (
              <div
                className="w-full flex flex-col items-center justify-center py-20"
                style={{ background: 'linear-gradient(135deg, #FFF5F8, #FFDCE9)', minHeight: '280px' }}
              >
                <span className="text-6xl mb-4">📸</span>
                <span
                  className="text-pink-400 font-bold text-lg"
                  style={{ fontFamily: 'Baloo 2, cursive' }}
                >
                  Foto Jennaira {lightbox}
                </span>
              </div>
            )}

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-pink-600 font-black flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              onClick={() => setLightbox(null)}
              aria-label="Tutup"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
