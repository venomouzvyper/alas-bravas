"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Menú", href: "/menu" },
  { label: "Galería", href: "/galeria" },
  { label: "Nosotros", href: "/nosotros" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/90 backdrop-blur-md border-b border-brand-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Alas Bravas"
              width={48}
              height={48}
              className="object-contain rounded-sm"
              priority
            />
            <span className="font-display text-xl text-brand-cream tracking-wider leading-none">
              ALAS<span className="text-brand-primary"> BRAVAS</span>
            </span>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-cream/70 hover:text-brand-accent transition-colors uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => document.getElementById("reservaciones")?.scrollIntoView({ behavior: "smooth" })}
            >
              Reservar
            </Button>
            <button
              className="md:hidden text-brand-cream p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <span className="block w-5 h-0.5 bg-current mb-1" />
              <span className="block w-5 h-0.5 bg-current mb-1" />
              <span className="block w-5 h-0.5 bg-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-brand-dark border-t border-brand-gray-800 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-brand-cream/80 font-medium uppercase tracking-wider py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" size="md" className="w-full mt-2">
            Reservar Mesa
          </Button>
        </div>
      )}
    </header>
  );
}
