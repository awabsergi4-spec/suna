'use client';

import { useEffect, useRef, useMemo } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const prefersReducedMotion = useRef(false);

  const stars = useMemo(() => {
    const result: Star[] = [];
    // Deterministic seed-based positioning
    const seed = 42;
    const pseudoRandom = (n: number) => {
      const x = Math.sin(n * 12.9898 + seed * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 400; i++) {
      result.push({
        x: pseudoRandom(i * 2),
        y: pseudoRandom(i * 2 + 1),
        size: pseudoRandom(i * 3) * 2 + 0.3,
        opacity: pseudoRandom(i * 4) * 0.6 + 0.2,
        twinkleSpeed: pseudoRandom(i * 5) * 0.003 + 0.001,
        twinkleOffset: pseudoRandom(i * 6) * Math.PI * 2,
      });
    }
    return result;
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mql.addEventListener('change', handler);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let shootingStars: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];
    let lastShootingStar = 0;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      for (const star of stars) {
        const x = star.x * canvas.width;
        const y = star.y * canvas.height;
        let opacity = star.opacity;
        
        if (!prefersReducedMotion.current) {
          opacity = star.opacity * (0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset));
        }

        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 240, ${opacity})`;
        ctx.fill();

        // Subtle glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 180, 255, ${opacity * 0.1})`;
          ctx.fill();
        }
      }

      // Shooting stars
      if (!prefersReducedMotion.current) {
        if (time - lastShootingStar > 6000 && Math.random() < 0.01) {
          lastShootingStar = time;
          shootingStars.push({
            x: Math.random() * canvas.width * 0.8,
            y: Math.random() * canvas.height * 0.3,
            vx: 4 + Math.random() * 3,
            vy: 3 + Math.random() * 2,
            life: 0,
            maxLife: 40 + Math.random() * 30,
          });
        }

        shootingStars = shootingStars.filter(s => s.life < s.maxLife);
        for (const s of shootingStars) {
          s.x += s.vx;
          s.y += s.vy;
          s.life++;
          const progress = s.life / s.maxLife;
          const alpha = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
          const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 8, s.y - s.vy * 8);
          grad.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.8})`);
          grad.addColorStop(1, `rgba(200, 220, 255, 0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      mql.removeEventListener('change', handler);
    };
  }, [stars]);

  return (
    <>
      {/* Deep space gradient */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, #0A1128 0%, #060B18 40%, #030508 70%)',
        }}
      />
      {/* Nebula clouds */}
      <div className="nebula fixed z-0" style={{ width: '600px', height: '600px', top: '10%', left: '60%', background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent)' }} />
      <div className="nebula fixed z-0" style={{ width: '800px', height: '800px', top: '60%', left: '10%', background: 'radial-gradient(circle, rgba(99,60,180,0.05), transparent)' }} />
      <div className="nebula fixed z-0" style={{ width: '500px', height: '500px', top: '40%', right: '5%', background: 'radial-gradient(circle, rgba(6,182,212,0.04), transparent)' }} />
      {/* Star canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}
