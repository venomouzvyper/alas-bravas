'use client';

import { useState } from 'react';

interface MenuItem {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  emoji: string;
  activo: boolean;
}

const CATEGORIA_LABELS: Record<string, string> = {
  alitas: 'Alitas',
  carnes: 'Carnes',
  tajadas: 'Tajadas',
  pupusas: 'Pupusas',
  bebidas: 'Bebidas',
  promos: 'Promos',
};

export function MenuToggleList({ initial }: { initial: MenuItem[] }) {
  const [items, setItems] = useState(initial);
  const [loading, setLoading] = useState<string | null>(null);

  const byCategory = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    (acc[item.categoria] ??= []).push(item);
    return acc;
  }, {});

  async function toggleItem(id: string, activo: boolean) {
    setLoading(id);
    const res = await fetch(`/api/admin/menu/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activo }),
    });
    if (res.ok) {
      setItems(prev => prev.map(item => item.id === id ? { ...item, activo } : item));
    }
    setLoading(null);
  }

  return (
    <div className="space-y-6">
      {Object.entries(byCategory).map(([cat, catItems]) => (
        <div key={cat}>
          <h2 className="text-white/40 text-xs uppercase tracking-widest mb-3">
            {CATEGORIA_LABELS[cat] ?? cat}
          </h2>
          <div className="rounded-xl border border-white/10 overflow-hidden">
            {catItems.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center justify-between px-4 py-3 transition-colors ${
                  i < catItems.length - 1 ? 'border-b border-white/5' : ''
                } ${!item.activo ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">{item.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-brand-cream font-medium truncate">{item.nombre}</p>
                    <p className="text-brand-accent text-sm">L.{item.precio}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleItem(item.id, !item.activo)}
                  disabled={loading === item.id}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed cursor-pointer ml-4 ${
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
