import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto" style={{ background: "#0D0602" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Marca */}
          <div>
            <p className="font-display text-3xl text-brand-cream tracking-wider mb-3">
              ALAS<span className="text-brand-primary"> BRAVAS</span>
            </p>
            <p className="text-brand-cream/50 text-sm leading-relaxed">
              Alitas crujientes, salsas explosivas.<br />
              Una experiencia que no olvidarás.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-4">
              Navegación
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Menú", href: "/menu" },
                { label: "Galería", href: "/galeria" },
                { label: "Nosotros", href: "/nosotros" },
                { label: "Reservaciones", href: "/reservaciones" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-brand-cream/60 hover:text-brand-cream text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-4">
              Encuéntranos
            </h3>
            <address className="not-italic space-y-2 text-sm text-brand-cream/60">
              <a
                href="https://maps.app.goo.gl/6mF7ZbRwVntGKyQA6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent transition-colors"
              >
                📍 Playa La Cabaña, San Lorenzo
              </a>
              <p>🕐 Lun – Dom: 1:00 PM – 11:00 PM</p>
              <p>🛵 Delivery vía <span className="text-brand-cream/80">Mandaditos</span></p>
            </address>
          </div>
        </div>

        {/* Instagram prominente */}
        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <p className="text-brand-cream/50 text-xs uppercase tracking-widest mb-3">Síguenos en</p>
          <a
            href="https://www.instagram.com/alasbravas1709"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-brand-primary/20 border border-white/10 hover:border-brand-primary/40 rounded-full px-5 py-2.5 transition-all group"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-accent" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="text-brand-cream font-medium group-hover:text-brand-accent transition-colors">@alasbravas1709</span>
          </a>
          <p className="text-brand-cream/20 text-xs mt-6">
            © {new Date().getFullYear()} Alas Bravas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
