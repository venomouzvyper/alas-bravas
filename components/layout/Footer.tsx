import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto" style={{ background: "#0D0602" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Marca */}
          <div>
            <p className="font-bebas text-3xl text-brand-cream tracking-wider mb-3">
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
              <p>📍 La Cabaña, San Lorenzo</p>
              <p>🕐 Lun – Dom: 1:00 PM – 11:00 PM</p>
              <p>🛵 Delivery vía <span className="text-brand-cream/80">Mandaditos</span></p>
            </address>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-cream/30 text-xs">
            © {new Date().getFullYear()} Alas Bravas. Todos los derechos reservados.
          </p>
          <a
            href="https://www.instagram.com/alasbravas1709"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cream/40 hover:text-brand-accent text-xs transition-colors"
          >
            Instagram @alasbravas1709
          </a>
        </div>
      </div>
    </footer>
  );
}
