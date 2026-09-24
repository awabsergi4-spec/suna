'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const t = useTranslations('loading');

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // Fast and snappy loading screen

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 200);
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="loading-screen"
        >
          {/* Orbital animation */}
          <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin" style={{ animationDuration: '6s' }}>
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(59, 130, 246, 0.15)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
            </svg>
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="rgba(6, 182, 212, 0.25)"
                strokeWidth="1"
                strokeDasharray="3 7"
              />
              <circle cx="50" cy="20" r="3" fill="#3B82F6" />
            </svg>
            {/* Center core */}
            <div className="w-3 h-3 rounded-full bg-space-blue shadow-[0_0_12px_#3B82F6] animate-pulse" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="font-heading text-lg tracking-[0.25em] font-semibold text-space-white uppercase">
              {t('title')}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-space-blue animate-ping" />
              <p className="technical-label text-[0.65rem] text-space-gray">
                {t('subtitle')} [{Math.round(progress)}%]
              </p>
            </div>
          </div>

          <div className="loading-progress">
            <div
              className="loading-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
