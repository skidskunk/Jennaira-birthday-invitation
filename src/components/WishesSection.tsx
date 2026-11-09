import React, { useEffect, useState } from 'react'
import { supabase, type WishEntry } from '../lib/supabaseClient'

function WishCard({ wish }: { wish: WishEntry }) {
  return (
    <div
      className="card-hover rounded-3xl p-5 shadow-md border-2 relative overflow-hidden"
      style={{ background: 'white', borderColor: '#FF9EBB' }}
    >
      {/* Top ribbon icon */}
      <div className="text-2xl mb-3 text-center">🎀</div>
      {/* Message */}
      <p
        className="text-sm font-semibold mb-3 leading-relaxed text-center"
        style={{ color: '#555', fontFamily: 'Quicksand' }}
      >
        "{wish.message}"
      </p>
      {/* Name */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-pink-300">🌸</span>
        <span
          className="font-bold text-sm"
          style={{ color: '#E31E24', fontFamily: 'Baloo 2, cursive' }}
        >
          {wish.name}
        </span>
        <span className="text-pink-300">🌸</span>
      </div>
      {/* Date */}
      {wish.created_at && (
        <p
          className="text-xs text-pink-300 text-center mt-2"
          style={{ fontFamily: 'Quicksand' }}
        >
          {new Date(wish.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      )}
      {/* Corner decoration */}
      <div className="absolute top-2 right-2 text-xs text-pink-200">✿</div>
      <div className="absolute bottom-2 left-2 text-xs text-pink-200">✿</div>
    </div>
  )
}

export default function WishesSection() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [wishes, setWishes] = useState<WishEntry[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const fetchWishes = async () => {
    setLoading(true)
    try {
      const { data, error: err } = await supabase
        .from('wishes')
        .select('id, name, message, created_at')
        .order('created_at', { ascending: false })
        .limit(50)
      if (!err && data) setWishes(data as WishEntry[])
    } catch (e) {
      console.warn('Gagal memuat ucapan:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishes()

    const channel = supabase
      .channel('wishes-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          if (payload.new) {
            setWishes((prev) => [payload.new as WishEntry, ...prev.filter(w => w.id !== payload.new.id)])
          }
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
    if (!message.trim()) { setError('Pesan tidak boleh kosong ya!'); return }

    setSubmitting(true)
    setError('')

    try {
      const { error: supaErr } = await supabase.from('wishes').insert([
        { name: name.trim(), message: message.trim() },
      ])

      if (supaErr) {
        throw new Error(supaErr.message || 'Gagal menyimpan ke Supabase')
      }

      setName('')
      setMessage('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      fetchWishes()
    } catch (err: unknown) {
      const msg = err instanceof Error
        ? err.message
        : (typeof err === 'object' && err !== null && 'message' in err)
          ? String((err as { message: unknown }).message)
          : 'Gagal mengirim ucapan. Coba lagi ya!'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="ucapan"
      className="relative py-14 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF5F8 0%, #FFDCE9 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, #FFD93D 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-sm mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-block animate-float text-4xl mb-2">💌</div>
          <h2
            className="text-3xl font-black"
            style={{ fontFamily: 'Baloo 2, cursive', color: '#E31E24' }}
          >
            Kirim Doa Buat Jennaira
          </h2>
          <p className="text-pink-400 font-semibold mt-1" style={{ fontFamily: 'Quicksand' }}>
            Tuliskan doa & ucapan terbaikmu! 🌸
          </p>
        </div>

        {/* Form */}
        <form
          id="wishes-form"
          onSubmit={handleSubmit}
          className="rounded-3xl p-6 shadow-xl border-4 mb-8"
          style={{ background: 'white', borderColor: '#FF9EBB' }}
        >
          {success && (
            <div
              className="mb-4 px-4 py-3 rounded-2xl text-sm font-semibold text-center animate-bounce-in"
              style={{ background: '#FFF5F8', color: '#E31E24', border: '2px solid #FF9EBB', fontFamily: 'Quicksand' }}
            >
              🎀 Ucapan kamu sudah terkirim! Makasih banyak! 💕
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="nama-ucapan"
              className="block text-sm font-bold mb-2"
              style={{ color: '#E31E24', fontFamily: 'Baloo 2, cursive' }}
            >
              🎀 Nama Kamu
            </label>
            <input
              id="nama-ucapan"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Siapa namamu?"
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

          <div className="mb-5">
            <label
              htmlFor="pesan-ucapan"
              className="block text-sm font-bold mb-2"
              style={{ color: '#E31E24', fontFamily: 'Baloo 2, cursive' }}
            >
              💌 Ucapan & Doa
            </label>
            <textarea
              id="pesan-ucapan"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis doa dan ucapan indah buat Jennaira..."
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border-2 text-sm font-semibold transition-all resize-none"
              style={{
                borderColor: '#FF9EBB',
                fontFamily: 'Quicksand',
                color: '#555',
                background: '#FFF5F8',
              }}
            />
            <p className="text-right text-xs text-pink-300 mt-1" style={{ fontFamily: 'Quicksand' }}>
              {message.length}/500
            </p>
          </div>

          {error && (
            <div
              className="mb-4 px-4 py-3 rounded-2xl text-sm font-semibold"
              style={{ background: '#FFE4E6', color: '#E31E24', fontFamily: 'Quicksand' }}
            >
              ⚠️ {error}
            </div>
          )}

          <button
            id="btn-submit-ucapan"
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-full text-white font-black text-lg shadow-lg active:scale-95 transition-all"
            style={{
              fontFamily: 'Baloo 2, cursive',
              background: submitting
                ? '#ccc'
                : 'linear-gradient(135deg, #FF9EBB, #E31E24)',
              boxShadow: submitting ? 'none' : '0 4px 15px rgba(255,158,187,0.5)',
            }}
          >
            {submitting ? '⏳ Mengirim...' : '💌 Kirim Ucapan'}
          </button>
        </form>

        {/* Wishes list */}
        <div>
          <h3
            className="text-xl font-black text-center mb-5"
            style={{ fontFamily: 'Baloo 2, cursive', color: '#E31E24' }}
          >
            🎀 Dinding Ucapan 🎀
          </h3>

          {loading && (
            <div className="text-center py-6">
              <div className="animate-spin-slow text-4xl inline-block">🌸</div>
              <p className="text-pink-400 mt-2 font-semibold" style={{ fontFamily: 'Quicksand' }}>
                Memuat ucapan...
              </p>
            </div>
          )}

          {!loading && wishes.length === 0 && (
            <div
              className="rounded-3xl p-8 text-center border-2"
              style={{ background: 'white', borderColor: '#FF9EBB' }}
            >
              <div className="text-4xl mb-3">🎀</div>
              <p
                className="text-pink-400 font-semibold"
                style={{ fontFamily: 'Quicksand' }}
              >
                Jadilah yang pertama memberikan doa untuk Jennaira! 💕
              </p>
            </div>
          )}

          <div id="wishes-list" className="flex flex-col gap-4">
            {wishes.map((wish) => (
              <WishCard key={wish.id} wish={wish} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
