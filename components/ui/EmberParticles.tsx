'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#C1121F', '#E85D04', '#FFB703', '#FF6B1A'];
const MAX_PARTICLES = 55;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  decay: number;
  color: string;
}

function spawn(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: height + 8,
    vx: (Math.random() - 0.5) * 0.8,
    vy: -(Math.random() * 1.4 + 0.6),
    size: Math.random() * 2.2 + 0.8,
    opacity: Math.random() * 0.5 + 0.5,
    decay: Math.random() * 0.007 + 0.004,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function tick() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Reponer partículas
      while (particles.length < MAX_PARTICLES) {
        particles.push(spawn(canvas.width, canvas.height));
      }

      // Actualizar y dibujar
      particles = particles.filter(p => p.opacity > 0.01);
      for (const p of particles) {
        p.x += p.vx + Math.sin(p.y * 0.02) * 0.3;
        p.y += p.vy;
        p.opacity -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
