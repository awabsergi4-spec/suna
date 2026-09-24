'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Globe2, ArrowRight, ArrowLeft, Radio, Compass } from 'lucide-react';

export default function EarthObservation() {
  const t = useTranslations('earth');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="earth-observation" className="section-padding relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative rounded-3xl border border-white/10 bg-space-navy/30 backdrop-blur-xl overflow-hidden p-8 sm:p-14 lg:p-20">
          {/* Subtle Grid & Coordinate Overlay */}
          <div className="grid-overlay absolute inset-0 opacity-40 pointer-events-none" />

          {/* Earth Visualization background circle */}
          <div className="absolute -bottom-48 -end-24 w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full pointer-events-none opacity-30 sm:opacity-50">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600/40 via-cyan-500/20 to-emerald-400/30 blur-2xl" />
            <div className="absolute inset-4 rounded-full border border-cyan-400/20" />
            <div className="absolute inset-12 rounded-full border border-blue-500/20 border-dashed animate-spin" style={{ animationDuration: '90s' }} />
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Top Telemetry */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Globe2 size={16} className="text-space-cyan" />
                <span className="technical-label text-space-cyan tracking-wider">
                  {t('orbit')}
                </span>
              </div>
              <span className="text-white/20">&bull;</span>
              <span className="technical-label text-space-gray">
                {t('altitude')}
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="technical-label text-space-gray">
                {t('coordinates')}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-space-white">{t('title1')}</span>
              <span className="block gradient-text">{t('title2')}</span>
            </h2>

            {/* Body */}
            <p className="text-space-gray text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              {t('description')}
            </p>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('missions');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary group"
              >
                {t('cta')}
                <ArrowIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* Floating Satellite Sensor Telemetry */}
          <div className="absolute bottom-6 end-8 hidden sm:flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-space-black/60 backdrop-blur-md">
            <Radio size={14} className="text-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-space-gray">
              SENTINEL-X SENSOR STREAM: LIVE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
