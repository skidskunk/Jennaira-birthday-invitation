import React from 'react'

function InfoCard({
  icon,
  title,
  value,
  delay = '0s',
}: {
  icon: string
  title: string
  value: string
  delay?: string
}) {
  return (
    <div
      className="card-hover rounded-3xl p-5 shadow-md flex flex-col items-center text-center border-2"
      style={{
        background: 'white',
        borderColor: '#FF9EBB',
        animationDelay: delay,
      }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 shadow-sm"
        style={{ background: 'linear-gradient(135deg, #FFF5F8, #FFDCE9)', border: '2px solid #FF9EBB' }}
      >
        {icon}
      </div>
      <p
        className="font-bold text-sm mb-1"
        style={{ color: '#E31E24', fontFamily: 'Baloo 2, cursive' }}
      >
        {title}
      </p>
      <p
        className="font-semibold text-base"
        style={{ color: '#FF7FAB', fontFamily: 'Quicksand, sans-serif' }}
      >
        {value}
      </p>
    </div>
  )
}

function handleGoogleMaps() {
  window.open(
    'https://maps.google.com/?q=Mamuju,Sulawesi+Barat,Indonesia',
    '_blank',
    'noopener noreferrer'
  )
}

function handleSaveCalendar() {
  // ICS file download
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Undangan Jennaira//ID',
    'BEGIN:VEVENT',
    'DTSTART:20270402T080000Z',
    'DTEND:20270402T100000Z',
    'SUMMARY:🎂 Ulang Tahun Jennaira Nala Bestari ke-1',
    'DESCRIPTION:Yuk hadir di ulang tahun Jennaira! Tema Hello Kitty!',
    'LOCATION:Mamuju\\, Sulawesi Barat',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ultah-jennaira.ics'
  a.click()
  URL.revokeObjectURL(url)
}

export default function DetailSection() {
  return (
    <section
      id="detail"
      className="relative py-14 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFDCE9 0%, #FFF5F8 100%)' }}
    >
      {/* Ribbon pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='8' y='28' font-size='20' fill='%23E31E24'%3E🎀%3C/text%3E%3C/svg%3E\")",
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-sm mx-auto">
        {/* Section title */}
        <div className="text-center mb-8">
          <div className="inline-block animate-ribbon-sway text-4xl mb-2">🎀</div>
          <h2
            className="text-3xl font-black"
            style={{ fontFamily: 'Baloo 2, cursive', color: '#E31E24' }}
          >
            Detail Acara
          </h2>
          <p className="text-pink-400 font-semibold mt-1" style={{ fontFamily: 'Quicksand' }}>
            Catat ya, jangan sampai ketinggalan! 💕
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <InfoCard
            icon="📅"
            title="Tanggal"
            value="Jumat, 02 April 2027"
            delay="0s"
          />
          <InfoCard
            icon="⏰"
            title="Waktu"
            value="16.00 – 18.00 WITA"
            delay="0.1s"
          />
          <InfoCard
            icon="📍"
            title="Lokasi"
            value="Mamuju, Sulawesi Barat"
            delay="0.2s"
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoogleMaps}
            className="w-full py-4 rounded-full text-white font-bold text-base shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #E31E24, #C0000A)',
              fontFamily: 'Baloo 2, cursive',
              boxShadow: '0 4px 15px rgba(227,30,36,0.4)',
            }}
          >
            📍 Buka Google Maps
          </button>
          <button
            onClick={handleSaveCalendar}
            className="w-full py-4 rounded-full font-bold text-base shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 border-2"
            style={{
              background: 'white',
              color: '#FF9EBB',
              borderColor: '#FF9EBB',
              fontFamily: 'Baloo 2, cursive',
            }}
          >
            📅 Simpan ke Kalender
          </button>
        </div>
      </div>
    </section>
  )
}

