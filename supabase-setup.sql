-- ============================================================
-- SQL PERBAIKAN IZIN (GRANT PRIVILEGES) SUPABASE
-- Salin dan jalankan seluruh query ini di:
-- Supabase Dashboard -> SQL Editor -> Klik "Run"
-- ============================================================

-- 1. Berikan izin akses skema public ke role 'anon' dan 'authenticated'
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. Berikan izin SELECT dan INSERT tabel ke role 'anon' dan 'authenticated'
GRANT SELECT, INSERT ON TABLE public.rsvp TO anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.wishes TO anon, authenticated;

-- 3. Berikan izin penggunaan sequence (auto-increment ID)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 4. Aktifkan Row Level Security (RLS)
ALTER TABLE public.rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- 5. Hapus policy lama agar tidak duplikat
DROP POLICY IF EXISTS "Anyone can read rsvp" ON public.rsvp;
DROP POLICY IF EXISTS "Anyone can insert rsvp" ON public.rsvp;
DROP POLICY IF EXISTS "Anyone can read wishes" ON public.wishes;
DROP POLICY IF EXISTS "Anyone can insert wishes" ON public.wishes;
DROP POLICY IF EXISTS "Tamu bisa liat RSVP" ON public.rsvp;
DROP POLICY IF EXISTS "Tamu bisa isi RSVP" ON public.rsvp;
DROP POLICY IF EXISTS "Tamu bisa liat ucapan" ON public.wishes;
DROP POLICY IF EXISTS "Tamu bisa kirim ucapan" ON public.wishes;

-- 6. Buat policy baru yang mengizinkan role anon dan authenticated
CREATE POLICY "Anyone can read rsvp"
  ON public.rsvp FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert rsvp"
  ON public.rsvp FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read wishes"
  ON public.wishes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert wishes"
  ON public.wishes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
