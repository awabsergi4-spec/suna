'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:py-0">
      {/* Planet */}
      <div className="absolute pointer-events-none w-[360px] h-[360px] md:w-[800px] md:h-[800px]" style={{ bottom: '-15%', right: isRtl ? 'auto' : '-10%', left: isRtl ? '-10%' : 'auto' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 800 800" className="w-full h-full opacity-20 md:opacity-30" aria-hidden="true">
            <defs>
              <radialGradient id="planet-grad" cx="40%" cy="40%">
                <stop offset="0%" stopColor="#1a3a6a" />
                <stop offset="50%" stopColor="#0d1f3c" />
                <stop offset="100%" stopColor="#030508" />
              </radialGradient>
              <radialGradient id="planet-glow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="70%" stopColor="transparent" />
                <stop offset="90%" stopColor="rgba(59,130,246,0.08)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.02)" />
              </radialGradient>
            </defs>
            <circle cx="400" cy="400" r="395" fill="url(#planet-glow)" />
            <circle cx="400" cy="400" r="300" fill="url(#planet-grad)" />
            {/* Atmosphere glow */}
            <circle cx="400" cy="400" r="305" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="3" />
            <circle cx="400" cy="400" r="310" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="2" />
            <circle cx="400" cy="400" r="318" fill="none" stroke="rgba(59,130,246,0.03)" strokeWidth="4" />
            {/* Surface details */}
            <ellipse cx="350" cy="360" rx="80" ry="30" fill="rgba(30,60,120,0.3)" transform="rotate(-15 350 360)" />
            <ellipse cx="450" cy="420" rx="60" ry="20" fill="rgba(20,40,80,0.3)" transform="rotate(10 450 420)" />
            <ellipse cx="380" cy="480" rx="50" ry="15" fill="rgba(25,50,100,0.2)" />
          </svg>
        </motion.div>
      </div>

      {/* Orbital line */}
      <motion.div
        className="absolute pointer-events-none w-[320px] h-[320px] md:w-[600px] md:h-[600px]"
        style={{ top: '15%', left: isRtl ? '-5%' : 'auto', right: isRtl ? 'auto' : '-5%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <svg viewBox="0 0 600 600" className="w-full h-full opacity-30" aria-hidden="true">
          <motion.ellipse
            cx="300" cy="300" rx="280" ry="120"
            fill="none"
            stroke="rgba(59,130,246,0.12)"
            strokeWidth="1"
            strokeDasharray="6 8"
            transform="rotate(-30 300 300)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1.2 }}
          />
          {/* Satellite dot */}
          <motion.circle
            r="3"
            fill="#3B82F6"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.5, 1] }}
            transition={{ duration: 2, delay: 2.5 }}
          >
            <animateMotion
              dur="25s"
              repeatCount="indefinite"
              path="M 580 300 A 280 120 -30 1 1 579.99 300"
            />
          </motion.circle>
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 text-center md:text-start" dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Technical coordinates */}
        <motion.div
          className="technical-label mb-3 text-space-gray/60 text-[0.6rem] sm:text-[0.65rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          34°12&apos;08&quot;N &nbsp; 118°14&apos;37&quot;W
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="technical-label text-space-blue mb-4 md:mb-6 tracking-[0.2em] text-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {t('eyebrow')}
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[1] sm:leading-[0.95] mb-6 md:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            {t('headline1')}
          </motion.span>
          <motion.span
            className="block gradient-text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            {t('headline2')}
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-space-gray text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          style={isRtl ? {} : {}}
        >
          {t('description')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.1 }}
        >
          <button
            onClick={() => scrollTo('missions')}
            className="btn-primary group justify-center"
          >
            {t('cta1')}
            <ArrowIcon size={16} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </button>
          <button
            onClick={() => scrollTo('research')}
            className="btn-secondary group justify-center"
          >
            {t('cta2')}
            <ArrowIcon size={16} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
      >
        <span className="technical-label text-[0.6rem] text-space-gray/50">{t('scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-space-gray/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
