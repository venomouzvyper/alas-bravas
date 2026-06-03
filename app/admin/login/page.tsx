'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? 'Email o contraseña incorrectos');
        setLoading(false);
        return;
      }

      window.location.href = '/admin';
    } catch {
      setError('No se pudo conectar. Revisá tu conexión a internet.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0D0602' }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src="/logo.jpg" alt="Alas Bravas" width={80} height={80} className="rounded-full" />
        </div>

        <h1 className="font-bebas text-4xl text-center text-brand-cream tracking-wider mb-1">
          Alas Bravas
        </h1>
        <p className="text-center text-white/40 text-sm mb-8 tracking-widest uppercase">
          Panel de Control
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-brand-cream placeholder-white/20 focus:outline-none focus:border-brand-primary transition-colors"
              placeholder="admin@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-brand-cream placeholder-white/20 focus:outline-none focus:border-brand-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
