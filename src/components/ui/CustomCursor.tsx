'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer-fine devices (desktop mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-target'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousemove', checkHover);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <>
      <div
        className={`custom-cursor ${isHovered ? 'expanded' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className="fixed pointer-events-none rounded-full transition-transform duration-75 ease-out z-[9998]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '48px' : '24px',
          height: isHovered ? '48px' : '24px',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          background: isHovered ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 15px rgba(59, 130, 246, 0.25)' : 'none',
        }}
      />
    </>
  );
}
