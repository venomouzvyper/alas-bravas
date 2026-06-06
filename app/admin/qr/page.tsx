'use client';

import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QR_URL = 'https://www.alasbravashn.com/carta';

export default function QRPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  function descargar() {
    const canvas = wrapperRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'alas-bravas-qr-carta.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="font-display text-3xl text-brand-cream tracking-wider mb-1">Código QR</h1>
      <p className="text-white/45 text-sm mb-8">
        Escanea para abrir <span className="text-brand-accent">La Carta</span> en el smartphone del cliente.
      </p>

      <div className="flex flex-col items-center gap-6 p-7 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Vista previa del QR */}
        <div ref={wrapperRef} className="rounded-xl overflow-hidden p-4" style={{ background: '#FFF8F0' }}>
          <QRCodeCanvas
            value={QR_URL}
            size={280}
            level="H"
            bgColor="#FFF8F0"
            fgColor="#C1121F"
            imageSettings={{
              src: '/logo.jpg',
              width: 66,
              height: 66,
              excavate: true,
            }}
          />
        </div>

        {/* URL */}
        <div className="text-center">
          <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Apunta a</p>
          <p className="text-brand-accent text-sm font-mono break-all">{QR_URL}</p>
        </div>

        {/* Botón de descarga */}
        <button
          onClick={descargar}
          className="w-full py-3.5 rounded-xl font-display text-lg tracking-wider text-white transition-opacity hover:opacity-90 cursor-pointer"
          style={{ background: '#C1121F', boxShadow: '0 0 16px rgba(193,18,31,0.35)' }}
        >
          Descargar PNG
        </button>

        <p className="text-white/22 text-xs text-center leading-relaxed">
          280 × 280 px. Para imprimir en mesa, colocá el PNG en un editor y escalalo al tamaño deseado — el nivel de corrección de error &quot;H&quot; soporta hasta 30% de daño sin perder el código.
        </p>
      </div>
    </div>
  );
}
