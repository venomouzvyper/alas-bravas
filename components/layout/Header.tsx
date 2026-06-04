"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { EmberParticles } from "@/components/ui/EmberParticles";

const navLinks = [
  { label: "Menú", href: "/menu" },
  { label: "Galería", href: "/galeria" },
  { label: "Nosotros", href: "/nosotros" },
];

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea scroll del body mientras el menú móvil está visible
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Cierra el menú al navegar
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Barra fija ─────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden border-b border-brand-primary/20"
        style={{ background: "#0D0602" }}
      >
        {/* Capa de fuego — se desvanece al hacer scroll */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: "linear-gradient(to right, #C1121F 0%, #E85D04 100%)",
            opacity: scrolled ? 0 : 1,
          }}
        >
          <EmberParticles mini colors={["#FFD700", "#FFED4A", "#FFF176", "#FFB703"]} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo + nombre */}
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-2.5 shrink-0"
              aria-label="Alas Bravas — Inicio"
            >
              <Image
                src="/logo-hero.png"
                alt="Alas Bravas"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
              <span
                className="font-display text-lg tracking-[0.1em] text-white leading-none"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.55)" }}
              >
                ALAS BRAVAS
              </span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.55)" }}
                    className={[
                      "relative text-sm font-semibold uppercase tracking-wider pb-1 transition-colors duration-200",
                      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-accent after:transition-all after:duration-200",
                      active
                        ? "text-brand-accent after:w-full"
                        : "text-white/80 hover:text-white after:w-0 hover:after:w-full",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Acciones derecha */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/alasbravas1709"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @alasbravas1709"
                className="hidden sm:block text-white/70 hover:text-white transition-colors"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.55)" }}
              >
                <InstagramIcon />
              </a>

              <Link
                href="/reservaciones"
                className={[
                  "hidden md:inline-flex items-center px-5 py-2 rounded-full",
                  "text-sm font-bold tracking-wide uppercase transition-all duration-500",
                  pathname === "/reservaciones" ? "opacity-50 pointer-events-none" : "",
                  scrolled
                    ? "bg-brand-primary hover:bg-red-700 text-brand-cream"
                    : "bg-brand-cream text-brand-dark hover:bg-white",
                ].join(" ")}
              >
                Reservar
              </Link>

              {/* Hamburger → X animado */}
              <button
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
              >
                <span className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Menú móvil — pantalla completa ────────────────────── */}
      <div
        className={[
          "fixed inset-0 z-40 flex flex-col bg-brand-dark md:hidden pt-16",
          "transition-all duration-300 ease-in-out",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        {/* Links grandes */}
        <nav className="flex flex-col px-7 pt-4 flex-1 justify-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={[
                  "font-display text-5xl py-4 border-b border-brand-gray-800 transition-colors duration-200",
                  active ? "text-brand-accent" : "text-brand-cream hover:text-brand-accent",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer del menú */}
        <div className="px-7 pb-10 pt-6 space-y-4">
          <Link
            href="/reservaciones"
            onClick={close}
            className={[
              "flex items-center justify-center w-full py-4 rounded-full",
              "bg-brand-primary hover:bg-red-700 text-brand-cream font-bold text-base tracking-widest uppercase transition-colors duration-200",
              pathname === "/reservaciones" ? "opacity-50 pointer-events-none" : "",
            ].join(" ")}
          >
            Reservar Mesa
          </Link>
          <div className="flex items-center justify-between text-brand-cream/35 text-sm">
            <span>🕐 1 PM – 11 PM</span>
            <span>📍 La Cabaña, San Lorenzo</span>
          </div>
          <a
            href="https://www.instagram.com/alasbravas1709"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center gap-2 text-brand-cream/35 hover:text-brand-accent transition-colors text-sm"
          >
            <InstagramIcon />
            @alasbravas1709
          </a>
        </div>
      </div>
    </>
  );
}
