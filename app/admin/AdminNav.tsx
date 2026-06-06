'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/reservaciones', label: 'Reservaciones' },
  { href: '/admin/menu', label: 'Menú' },
  { href: '/admin/galeria', label: 'Galería' },
  { href: '/admin/configuracion', label: 'Configuración' },
  { href: '/admin/qr', label: 'QR' },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <header className="border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-1">
            <span className="text-brand-accent font-display text-xl tracking-wider">Alas Bravas</span>
            <span className="text-xs text-white/40 ml-2 uppercase tracking-widest">Admin</span>
          </div>

          <nav className="hidden sm:flex items-center gap-1">
            {LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    active
                      ? 'bg-brand-primary text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            Salir →
          </button>
        </div>

        {/* Nav móvil */}
        <nav className="flex sm:hidden items-center gap-1 pb-3">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-primary text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
