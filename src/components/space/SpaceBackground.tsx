'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight animated starfield.
 * - Static stars are painted ONCE to an offscreen canvas and blitted each frame.
 * - Only a small subset of stars twinkles, and frames are capped at ~30fps.
 * - Animation pauses when the tab is hidden or the user prefers reduced motion.
 * - Mobile browsers' address-bar show/hide no longer triggers a full re-render.
 */

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  speed: number;
  phase: number;
}

const seeded = (n: number) => {
  const x = Math.sin(n * 12.9898 + 42 * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const staticLayer = document.createElement('canvas');
    const sctx = staticLayer.getContext('2d');
    if (!sctx) return;

    let width = 0;
    let height = 0;
    let twinklers: Star[] = [];
    let raf = 0;
    let last = 0;
    let running = true;
    let shooting: { x: number; y: number; vx: number; vy: number; life: number; max: number } | null = null;
    let nextShootingAt = performance.now() + 4000;

    const build = () => {
      width = window.innerWidth;
      // Use the larger "large viewport" height so the mobile URL bar never exposes an edge
      height = Math.max(window.innerHeight, document.documentElement.clientHeight) + 120;

      for (const c of [canvas, staticLayer]) {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(320, Math.round((width * height) / 3800));
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: seeded(i * 2) * width,
          y: seeded(i * 2 + 1) * height,
          r: seeded(i * 3) * 1.3 + 0.3,
          a: seeded(i * 4) * 0.55 + 0.25,
          speed: seeded(i * 5) * 0.0018 + 0.0006,
          phase: seeded(i * 6) * Math.PI * 2,
        });
      }

      // Paint static layer once
      sctx.clearRect(0, 0, width, height);
      twinklers = [];
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!reduced && i % 7 === 0) {
          twinklers.push(s);
          continue;
        }
        sctx.fillStyle = `rgba(215, 222, 255, ${s.a})`;
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        sctx.fill();
      }
      draw(performance.now());
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(staticLayer, 0, 0, width, height);

      for (const s of twinklers) {
        const alpha = s.a * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase)));
        ctx.fillStyle = `rgba(225, 228, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (shooting) {
        const s = shooting;
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const p = s.life / s.max;
        const alpha = p < 0.3 ? p / 0.3 : 1 - (p - 0.3) / 0.7;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 10, s.y - s.vy * 10);
        grad.addColorStop(0, `rgba(244, 170, 160, ${alpha * 0.9})`);
        grad.addColorStop(1, 'rgba(244, 170, 160, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 10, s.y - s.vy * 10);
        ctx.stroke();
        if (s.life >= s.max) shooting = null;
      } else if (time > nextShootingAt) {
        const dir = document.documentElement.dir === 'rtl' ? -1 : 1;
        shooting = {
          x: dir > 0 ? Math.random() * width * 0.6 : width * 0.4 + Math.random() * width * 0.6,
          y: Math.random() * height * 0.35,
          vx: dir * (5 + Math.random() * 3),
          vy: 2.5 + Math.random() * 2,
          life: 0,
          max: 45 + Math.random() * 25,
        };
        nextShootingAt = time + 7000 + Math.random() * 6000;
      }
    };

    const loop = (time: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (time - last < 33) return; // ~30fps is plenty for a background
      last = time;
      draw(time);
    };

    build();
    if (!reduced) raf = requestAnimationFrame(loop);

    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Ignore small height changes caused by the mobile address bar
      if (w === lastW && Math.abs(h - lastH) < 160) return;
      lastW = w;
      lastH = h;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    };

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Deep space gradient + soft brand-colored nebulae (pure gradients, no blur filters) */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(40rem 30rem at 85% 12%, rgba(107,111,212,0.10), transparent 70%)',
            'radial-gradient(45rem 35rem at 5% 75%, rgba(139,111,212,0.07), transparent 70%)',
            'radial-gradient(30rem 25rem at 95% 60%, rgba(244,151,142,0.05), transparent 70%)',
            'radial-gradient(ellipse at 30% 20%, #0A1128 0%, #060B18 40%, #030508 75%)',
          ].join(','),
        }}
      />
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
    </div>
  );
}
