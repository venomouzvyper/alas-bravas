'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export interface GalleryPhoto {
  id: string;
  cloudinary_id: string;
  url: string;
  titulo: string | null;
  orden: number;
  activo: boolean;
  created_at: string;
}

export function GaleriaAdmin({ initial }: { initial: GalleryPhoto[] }) {
  const [photos, setPhotos] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [titulo, setTitulo] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<GalleryPhoto | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes.');
      return;
    }

    setUploading(true);
    setError(null);
    setProgress(10);

    // 1. Obtener firma del servidor
    const sigRes = await fetch('/api/admin/galeria/signature');
    if (!sigRes.ok) {
      setError('No se pudo obtener la firma de Cloudinary.');
      setUploading(false);
      return;
    }
    const { signature, timestamp, folder, api_key, cloud_name } = await sigRes.json();
    setProgress(20);

    // 2. Subir directamente a Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('signature', signature);
    formData.append('timestamp', String(timestamp));
    formData.append('folder', folder);
    formData.append('api_key', api_key);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      { method: 'POST', body: formData }
    );
    setProgress(70);

    if (!uploadRes.ok) {
      setError('Error al subir la imagen a Cloudinary.');
      setUploading(false);
      return;
    }

    const uploaded = await uploadRes.json();
    setProgress(85);

    // 3. Guardar metadata en Supabase
    const saveRes = await fetch('/api/admin/galeria', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cloudinary_id: uploaded.public_id,
        url: uploaded.secure_url,
        titulo: titulo || null,
      }),
    });

    if (saveRes.ok) {
      const saved: GalleryPhoto = await saveRes.json();
      setPhotos(prev => [saved, ...prev]);
      setTitulo('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else {
      setError('Foto subida a Cloudinary pero error al guardar en la base de datos.');
    }

    setProgress(100);
    setTimeout(() => { setUploading(false); setProgress(0); }, 600);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/galeria/${deleteTarget.id}`, { method: 'DELETE' });
    if (res.ok) {
      setPhotos(prev => prev.filter(p => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } else {
      setError('No se pudo eliminar la foto.');
    }
    setDeleting(false);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bebas text-3xl text-brand-cream tracking-wider">Galería</h1>
          <p className="text-white/40 text-sm mt-0.5">
            Las fotos subidas aquí aparecen en la galería pública del sitio
          </p>
        </div>
      </div>

      {/* Uploader */}
      <div className="mb-8 space-y-3">
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            dragOver
              ? 'border-brand-primary bg-brand-primary/10'
              : uploading
                ? 'border-white/10 bg-white/5 cursor-not-allowed'
                : 'border-white/20 hover:border-brand-primary/60 hover:bg-white/5'
          }`}
        >
          {uploading ? (
            <div className="space-y-3">
              <p className="text-white/60 text-sm">Subiendo foto…</p>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="bg-brand-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="text-3xl mb-2">📷</div>
              <p className="text-white/60 text-sm">
                Arrastra una foto aquí o <span className="text-brand-accent">haz click para seleccionar</span>
              </p>
              <p className="text-white/30 text-xs mt-1">JPG, PNG, WebP — hasta ~10 MB</p>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />

        <input
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          disabled={uploading}
          placeholder="Título de la foto (opcional) — ej: Promo del viernes"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:outline-none focus:border-brand-primary placeholder:text-white/20 disabled:opacity-50"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>

      {/* Grid de fotos */}
      {photos.length === 0 ? (
        <p className="text-white/30 text-sm">
          Aún no hay fotos subidas. Sube la primera arriba.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map(photo => (
            <div key={photo.id} className="group relative rounded-lg overflow-hidden border border-white/10 aspect-square">
              <Image
                src={photo.url}
                alt={photo.titulo ?? 'Foto de la galería'}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
              {/* Overlay con título y botón eliminar */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                {photo.titulo && (
                  <p className="text-white text-xs font-medium truncate mb-1">{photo.titulo}</p>
                )}
                <button
                  onClick={() => setDeleteTarget(photo)}
                  className="self-end bg-red-600/80 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal confirmar eliminación */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-[#1A0A00] border border-white/10 rounded-2xl w-full max-w-sm p-6 space-y-4">
            <p className="text-brand-cream text-center">
              ¿Eliminar esta foto{deleteTarget.titulo ? ` "${deleteTarget.titulo}"` : ''}?
            </p>
            <p className="text-white/40 text-sm text-center">
              Se borrará de Cloudinary y del sitio. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 py-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-sm transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleting ? 'Eliminando…' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
