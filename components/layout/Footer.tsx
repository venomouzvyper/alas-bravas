import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-gray-900 border-t border-brand-gray-800 mt-auto">
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

          {/* Contacto (placeholder — se conectará a restaurant_config en Hito 3) */}
          <div>
            <h3 className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-4">
              Encuéntranos
            </h3>
            <address className="not-italic space-y-2 text-sm text-brand-cream/60">
              <p>📍 Dirección del restaurante</p>
              <p>📞 +57 300 000 0000</p>
              <p>🕐 Lun – Dom: 12:00 pm – 11:00 pm</p>
            </address>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-cream/30 text-xs">
            © {new Date().getFullYear()} Alas Bravas. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {["Instagram", "TikTok", "WhatsApp"].map((red) => (
              <a
                key={red}
                href="#"
                className="text-brand-cream/30 hover:text-brand-accent text-xs transition-colors"
              >
                {red}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
