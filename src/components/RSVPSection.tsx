import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type AttendingChoice = 'hadir' | 'tidak' | null

export default function RSVPSection() {
  const [name, setName] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [attending, setAttending] = useState<AttendingChoice>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [error, setError] = useState('')
  const [attendingCount, setAttendingCount] = useState<number | null>(null)

  const fetchAttendingCount = async () => {
    try {
      const { data, error: supaErr } = await supabase
        .from('rsvp')
        .select('guest_count, attending')
        .eq('attending', true)

      if (!supaErr && data) {
        const total = data.reduce((acc, curr) => acc + (Number(curr.guest_count) || 1), 0)
        setAttendingCount(total)
      }
    } catch (err) {
      console.warn('Gagal memuat jumlah kehadiran:', err)
    }
  }

  useEffect(() => {
    fetchAttendingCount()

    const channel = supabase
      .channel('rsvp-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rsvp' },
        () => {
          fetchAttendingCount()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Nama tidak boleh kosong ya!'); return }
    if (attending === null) { setError('Pilih dulu hadir atau tidak ya!'); return }

    setLoading(true)
    setError('')

    try {
      const { error: supaErr } = await supabase.from('rsvp').insert([
        {
          name: name.trim(),
          guest_count: guestCount,
          attending: attending === 'hadir',
        },
      ])

      if (supaErr) {
        throw new Error(supaErr.message || 'Gagal menyimpan ke Supabase')
      }

      setSubmittedName(name.trim())
      setSubmitted(true)
      fetchAttendingCount()
    } catch (err: unknown) {
      const msg = err instanceof Error
        ? err.message
        : (typeof err === 'object' && err !== null && 'message' in err)
          ? String((err as { message: unknown }).message)
          : 'Terjadi kesalahan. Coba lagi ya!'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section
        id="rsvp"
        className="relative py-14 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #FFDCE9 0%, #FFF5F8 100%)' }}
      >
        <div className="max-w-sm mx-auto text-center">
          <div className="animate-bounce-in text-6xl mb-4">🎉</div>
          <div
            className="rounded-3xl p-8 shadow-xl border-4"
            style={{ background: 'white', borderColor: '#FF9EBB' }}
          >
            <div className="text-4xl mb-3">🎀</div>
            <h3
              className="text-2xl font-black mb-3"
              style={{ fontFamily: 'Baloo 2, cursive', color: '#E31E24' }}
            >
              Yeay!
            </h3>
            <p
              className="text-pink-500 font-semibold text-base leading-relaxed"
              style={{ fontFamily: 'Quicksand' }}
            >
              Terima kasih <span className="font-black text-red-500">{submittedName}</span> sudah mau datang! 💕
              <br />
              Kita tunggu ya di sana! 🌸
            </p>

            {attendingCount !== null && (
              <div
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border-2"
                style={{ background: '#FFF5F8', borderColor: '#FF9EBB' }}
              >
                <span>🎀</span>
                <span className="text-xs font-bold text-red-500" style={{ fontFamily: 'Baloo 2, cursive' }}>
                  Total {attendingCount} Tamu Sudah Konfirmasi Hadir
                </span>
                <span>🎀</span>
              </div>
            )}

            <div className="mt-4 text-3xl">🎈🎀🎈</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="rsvp"
      className="relative py-14 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFDCE9 0%, #FFF5F8 100%)' }}
    >
      {/* Ribbon pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='35' font-size='24' fill='%23FF9EBB'%3E🎀%3C/text%3E%3C/svg%3E\")",
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-sm mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-block animate-ribbon-sway text-4xl mb-2">💌</div>
          <h2
            className="text-3xl font-black"
            style={{ fontFamily: 'Baloo 2, cursive', color: '#E31E24' }}
          >
            Kamu Datang Kan? 💕
          </h2>
          <p className="text-pink-400 font-semibold mt-1 mb-3" style={{ fontFamily: 'Quicksand' }}>
            Konfirmasi kehadiran kamu ya!
          </p>

          {/* Badge Jumlah yang Hadir */}
          {attendingCount !== null && (
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full shadow-sm border-2 animate-pulse-soft"
              style={{ background: 'white', borderColor: '#FF9EBB' }}
            >
              <span>🎉</span>
              <span className="text-xs font-bold" style={{ color: '#E31E24', fontFamily: 'Baloo 2, cursive' }}>
                {attendingCount} Tamu Telah Konfirmasi Hadir
              </span>
              <span>🎀</span>
            </div>
          )}
        </div>

        {/* Form */}
        <form
          id="rsvp-form"
          onSubmit={handleSubmit}
          className="rounded-3xl p-6 shadow-xl border-4"
          style={{ background: 'white', borderColor: '#FF9EBB' }}
        >
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="nama-rsvp"
              className="block text-sm font-bold mb-2"
              style={{ color: '#E31E24', fontFamily: 'Baloo 2, cursive' }}
            >
              🎀 Nama Kamu
            </label>
            <input
              id="nama-rsvp"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tulis nama kamu di sini..."
              maxLength={100}
              className="w-full px-4 py-3 rounded-2xl border-2 text-sm font-semibold transition-all"
              style={{
                borderColor: '#FF9EBB',
                fontFamily: 'Quicksand',
                color: '#555',
                background: '#FFF5F8',
              }}
            />
          </div>

          {/* Guest count */}
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              style={{ color: '#E31E24', fontFamily: 'Baloo 2, cursive' }}
            >
              👨‍👩‍👧 Jumlah Tamu
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="w-10 h-10 rounded-full font-black text-xl shadow-sm active:scale-95 transition-transform"
                style={{ background: '#FF9EBB', color: 'white' }}
                onClick={() => setGuestCount((v) => Math.max(1, v - 1))}
              >−</button>
              <span
                id="jumlah-tamu-display"
                className="text-2xl font-black"
                style={{ fontFamily: 'Baloo 2, cursive', color: '#E31E24' }}
              >
                {guestCount}
              </span>
              <button
                type="button"
                className="w-10 h-10 rounded-full font-black text-xl shadow-sm active:scale-95 transition-transform"
                style={{ background: '#FF9EBB', color: 'white' }}
                onClick={() => setGuestCount((v) => Math.min(20, v + 1))}
              >+</button>
              <span
                className="text-sm font-semibold text-pink-400"
                style={{ fontFamily: 'Quicksand' }}
              >
                orang
              </span>
            </div>
          </div>

          {/* Attending choice */}
          <div className="mb-6">
            <label
              className="block text-sm font-bold mb-3"
              style={{ color: '#E31E24', fontFamily: 'Baloo 2, cursive' }}
            >
              🎉 Konfirmasi Kehadiran
            </label>
            <div className="flex gap-3">
              <button
                id="btn-status-hadir"
                type="button"
                onClick={() => setAttending('hadir')}
                className="flex-1 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 border-2"
                style={{
                  fontFamily: 'Baloo 2, cursive',
                  background: attending === 'hadir'
                    ? 'linear-gradient(135deg, #FF9EBB, #E31E24)'
                    : 'white',
                  color: attending === 'hadir' ? 'white' : '#FF9EBB',
                  borderColor: '#FF9EBB',
                  boxShadow: attending === 'hadir' ? '0 4px 12px rgba(255,158,187,0.5)' : 'none',
                }}
              >
                💕 Hadir
              </button>
              <button
                id="btn-status-tidak-hadir"
                type="button"
                onClick={() => setAttending('tidak')}
                className="flex-1 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 border-2"
                style={{
                  fontFamily: 'Baloo 2, cursive',
                  background: attending === 'tidak'
                    ? '#9CA3AF'
                    : 'white',
                  color: attending === 'tidak' ? 'white' : '#9CA3AF',
                  borderColor: '#9CA3AF',
                }}
              >
                😔 Tidak Hadir
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-4 px-4 py-3 rounded-2xl text-sm font-semibold"
              style={{ background: '#FFE4E6', color: '#E31E24', fontFamily: 'Quicksand' }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button
            id="btn-submit-rsvp"
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full text-white font-black text-lg shadow-lg active:scale-95 transition-all animate-pulse-soft"
            style={{
              fontFamily: 'Baloo 2, cursive',
              background: loading
                ? '#ccc'
                : 'linear-gradient(135deg, #FF9EBB, #E31E24)',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(255,158,187,0.5)',
            }}
          >
            {loading ? '⏳ Mengirim...' : '🎀 Kirim Konfirmasi'}
          </button>
        </form>
      </div>
    </section>
  )
}
