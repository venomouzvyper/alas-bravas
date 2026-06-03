-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query

CREATE TABLE IF NOT EXISTS gallery_photos (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  cloudinary_id TEXT        NOT NULL,
  url           TEXT        NOT NULL,
  titulo        TEXT,
  orden         INTEGER     DEFAULT 99,
  activo        BOOLEAN     DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- RLS: lectura pública solo de fotos activas
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "gallery_photos_public_read" ON gallery_photos
  FOR SELECT USING (activo = true);
