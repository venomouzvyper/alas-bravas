'use client';

import { useRef, useState } from 'react';

export interface MenuItem {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string | null;
  emoji: string;
  spice: string | null;
  dia: string | null;
  orden: number;
  activo: boolean;
  image_url: string | null;
}

const CATEGORIAS = ['alitas', 'carnes', 'tajadas', 'pupusas', 'bebidas', 'promos'] as const;
const SPICE_OPTS = ['', 'mild', 'medium', 'hot', 'inferno'] as const;

const CAT_LABELS: Record<string, string> = {
  alitas: 'Alitas', carnes: 'Carnes', tajadas: 'Tajadas',
  pupusas: 'Pupusas', bebidas: 'Bebidas', promos: 'Promos',
};
const SPICE_LABELS: Record<string, string> = {
  '': 'Sin nivel', mild: 'Suave', medium: 'Medio', hot: 'Picante', inferno: 'Inferno 🔥',
};

type FormData = Omit<MenuItem, 'id'>;

const EMPTY_FORM: FormData = {
  nombre: '', categoria: 'alitas', precio: 0, descripcion: '',
  emoji: '🍗', spice: null, dia: '', orden: 99, activo: true, image_url: null,
};

function formToPayload(f: FormData) {
  return {
    ...f,
    precio: Number(f.precio),
    orden: Number(f.orden),
    descripcion: f.descripcion || null,
    spice: f.spice || null,
    dia: f.dia || null,
  };
}

export function MenuCrud({ initial }: { initial: MenuItem[] }) {
  const [items, setItems] = useState(initial);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [modal, setModal] = useState<'crear' | MenuItem | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgProgress, setImgProgress] = useState(0);
  const [imgError, setImgError] = useState<string | null>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const byCategory = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.categoria] ??= []).push(item);
    return acc;
  }, {});

  function openCrear() {
    setForm(EMPTY_FORM);
    setError(null);
    setModal('crear');
  }

  function openEditar(item: MenuItem) {
    setForm({
      nombre: item.nombre, categoria: item.categoria, precio: item.precio,
      descripcion: item.descripcion ?? '', emoji: item.emoji,
      spice: item.spice, dia: item.dia ?? '', orden: item.orden, activo: item.activo,
      image_url: item.image_url ?? null,
    });
    setError(null);
    setModal(item);
  }

  function closeModal() {
    setModal(null);
    setError(null);
  }

  async function toggleItem(id: string, activo: boolean) {
    setLoadingId(id);
    const res = await fetch(`/api/admin/menu/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activo }),
    });
    if (res.ok) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, activo } : i));
    }
    setLoadingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = formToPayload(form);
    const isEditing = modal !== 'crear';
    const url = isEditing ? `/api/admin/menu/${(modal as MenuItem).id}` : '/api/admin/menu';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const saved: MenuItem = await res.json();
      if (isEditing) {
        setItems(prev => prev.map(i => i.id === saved.id ? saved : i));
      } else {
        setItems(prev => [...prev, saved]);
      }
      closeModal();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? 'Error al guardar');
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/menu/${deleteTarget.id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(prev => prev.filter(i => i.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
    setDeleting(false);
  }

  function field(key: keyof FormData, value: string | number | boolean | null) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(file: File) {
    if (!file.type.startsWith('image/')) {
      setImgError('Solo se permiten imágenes.');
      return;
    }
    setImgUploading(true);
    setImgError(null);
    setImgProgress(10);

    const sigRes = await fetch('/api/admin/menu/image-signature');
    if (!sigRes.ok) {
      setImgError('No se pudo obtener la firma.');
      setImgUploading(false);
      return;
    }
    const { signature, timestamp, folder, api_key, cloud_name } = await sigRes.json();
    setImgProgress(25);

    const fd = new FormData();
    fd.append('file', file);
    fd.append('signature', signature);
    fd.append('timestamp', String(timestamp));
    fd.append('folder', folder);
    fd.append('api_key', api_key);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      { method: 'POST', body: fd }
    );
    setImgProgress(80);

    if (!uploadRes.ok) {
      setImgError('Error al subir la imagen.');
      setImgUploading(false);
      return;
    }

    const uploaded = await uploadRes.json();
    field('image_url', uploaded.secure_url);
    setImgProgress(100);
    setImgUploading(false);
  }

  return (
    <>
      {/* Encabezado con botón nuevo */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-brand-cream tracking-wider">Menú</h1>
          <p className="text-white/40 text-sm mt-0.5">
            Gestiona los platos que aparecen en el menú público
          </p>
        </div>
        <button
          onClick={openCrear}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/80 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">+</span> Nuevo plato
        </button>
      </div>

      {/* Lista por categoría */}
      {CATEGORIAS.map(cat => {
        const catItems = byCategory[cat];
        if (!catItems?.length) return null;
        return (
          <div key={cat} className="mb-6">
            <h2 className="text-white/40 text-xs uppercase tracking-widest mb-3">
              {CAT_LABELS[cat]}
            </h2>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              {catItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    i < catItems.length - 1 ? 'border-b border-white/5' : ''
                  } ${!item.activo ? 'opacity-50' : ''}`}
                >
                  <div className="w-10 h-10 rounded-md overflow-hidden shrink-0 flex items-center justify-center bg-brand-gray-800 border border-white/5">
                    {item.image_url
                      ? <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                      : <span className="text-xl">{item.emoji}</span>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-brand-cream font-medium truncate">{item.nombre}</p>
                    <p className="text-brand-accent text-sm">L.{item.precio}</p>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEditar(item)}
                      className="text-white/40 hover:text-brand-cream text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="text-white/30 hover:text-red-400 text-xs px-2 py-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => toggleItem(item.id, !item.activo)}
                      disabled={loadingId === item.id}
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed cursor-pointer ml-1 ${
                        item.activo ? 'bg-brand-primary' : 'bg-white/20'
                      }`}
                      title={item.activo ? 'Desactivar' : 'Activar'}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          item.activo ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Modal crear / editar */}
      {modal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-[#1A0A00] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h2 className="font-display text-xl text-brand-cream tracking-wide">
                {modal === 'crear' ? 'Nuevo plato' : 'Editar plato'}
              </h2>
              <button
                onClick={closeModal}
                className="text-white/40 hover:text-white text-xl leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-white/60 text-xs mb-1">Nombre *</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={e => field('nombre', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:outline-none focus:border-brand-primary"
                  placeholder="Ej: 6 Alitas BB"
                />
              </div>

              {/* Categoría + Precio */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 text-xs mb-1">Categoría *</label>
                  <select
                    required
                    value={form.categoria}
                    onChange={e => field('categoria', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:outline-none focus:border-brand-primary"
                  >
                    {CATEGORIAS.map(c => (
                      <option key={c} value={c} className="bg-[#1A0A00]">{CAT_LABELS[c]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-xs mb-1">Precio (L.) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={form.precio}
                    onChange={e => field('precio', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:outline-none focus:border-brand-primary"
                    placeholder="180"
                  />
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-white/60 text-xs mb-1">Descripción</label>
                <textarea
                  rows={2}
                  value={form.descripcion ?? ''}
                  onChange={e => field('descripcion', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:outline-none focus:border-brand-primary resize-none"
                  placeholder="Descripción del plato…"
                />
              </div>

              {/* Foto del plato */}
              <div>
                <label className="block text-white/60 text-xs mb-2">Foto del plato</label>
                <div className="flex items-start gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-white/5 flex items-center justify-center">
                    {form.image_url
                      ? <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                      : <span className="text-3xl">{form.emoji || '🍗'}</span>
                    }
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => imgInputRef.current?.click()}
                      disabled={imgUploading}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {imgUploading ? `Subiendo… ${imgProgress}%` : form.image_url ? 'Cambiar foto' : '+ Subir foto'}
                    </button>
                    {form.image_url && (
                      <button
                        type="button"
                        onClick={() => { field('image_url', null); setImgError(null); }}
                        className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/30 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        Quitar foto
                      </button>
                    )}
                    {imgError && <p className="text-red-400 text-xs">{imgError}</p>}
                  </div>
                </div>
                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) handleImageUpload(f);
                    e.target.value = '';
                  }}
                />
              </div>

              {/* Emoji + Spice */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 text-xs mb-1">Emoji</label>
                  <input
                    type="text"
                    value={form.emoji}
                    onChange={e => field('emoji', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:outline-none focus:border-brand-primary"
                    placeholder="🍗"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs mb-1">Nivel de picante</label>
                  <select
                    value={form.spice ?? ''}
                    onChange={e => field('spice', e.target.value || null)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:outline-none focus:border-brand-primary"
                  >
                    {SPICE_OPTS.map(s => (
                      <option key={s} value={s} className="bg-[#1A0A00]">{SPICE_LABELS[s]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Día + Orden */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 text-xs mb-1">Día especial</label>
                  <input
                    type="text"
                    value={form.dia ?? ''}
                    onChange={e => field('dia', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:outline-none focus:border-brand-primary"
                    placeholder="Ej: Mié / Jue"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs mb-1">Orden</label>
                  <input
                    type="number"
                    min={0}
                    value={form.orden}
                    onChange={e => field('orden', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm focus:outline-none focus:border-brand-primary"
                    placeholder="99"
                  />
                </div>
              </div>

              {/* Activo */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => field('activo', !form.activo)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    form.activo ? 'bg-brand-primary' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      form.activo ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
                <span className="text-white/60 text-sm">Visible en el menú público</span>
              </label>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              {/* Acciones */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-sm transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary/80 text-white text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Guardando…' : modal === 'crear' ? 'Crear plato' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal confirmar eliminación */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-[#1A0A00] border border-white/10 rounded-2xl w-full max-w-sm p-6 space-y-4">
            <p className="text-brand-cream text-center">
              ¿Eliminar <span className="font-semibold">{deleteTarget.emoji} {deleteTarget.nombre}</span>?
            </p>
            <p className="text-white/40 text-sm text-center">Esta acción no se puede deshacer.</p>
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
