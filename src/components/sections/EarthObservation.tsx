'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Globe2, ArrowRight, ArrowLeft, Radio, Users, Wheat, Trees, Leaf, Siren, Building, Map as MapIcon } from 'lucide-react';

const appIcons = [Users, Wheat, Trees, Leaf, Siren, Building, MapIcon];

export default function EarthObservation() {
  const t = useTranslations('earth');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const applications = t.raw('applications') as string[];

  return (
    <section id="earth-observation" className="section-padding relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative rounded-3xl border border-white/10 bg-space-navy/60 overflow-hidden p-6 pb-32 sm:p-14 lg:p-20">
          {/* Subtle Grid & Coordinate Overlay */}
          <div className="grid-overlay absolute inset-0 opacity-40 pointer-events-none" />

          {/* Earth Visualization background circle */}
          <div className="absolute -bottom-56 -end-28 w-[380px] h-[380px] sm:-bottom-48 sm:-end-24 sm:w-[650px] sm:h-[650px] rounded-full pointer-events-none opacity-50">
            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 40% 40%, rgba(107,111,212,0.45), rgba(6,182,212,0.18) 45%, rgba(16,185,129,0.12) 60%, transparent 72%)' }} />
            <div className="absolute inset-4 rounded-full border border-cyan-400/20" />
            <div className="absolute inset-12 rounded-full border border-blue-500/20 border-dashed animate-spin" style={{ animationDuration: '90s' }} />
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Top Telemetry */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-4 mb-4 sm:mb-6">
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
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
              <span className="block text-space-white">{t('title1')}</span>
              <span className="block gradient-text">{t('title2')}</span>
            </h2>

            {/* Body */}
            <p className="text-space-gray text-base sm:text-lg leading-relaxed mb-5 sm:mb-6 max-w-xl">
              {t('description')}
            </p>

            <ul className="flex flex-wrap gap-2 mb-7 sm:mb-10">
              {applications.map((app, i) => {
                const Icon = appIcons[i % appIcons.length];
                return (
                  <motion.li
                    key={app}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="flex items-center gap-2 text-sm px-3.5 py-2 rounded-full border border-white/10 bg-space-black/50 text-space-white"
                  >
                    <Icon size={14} className="text-space-cyan" />
                    {app}
                  </motion.li>
                );
              })}
            </ul>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('projects');
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
          <div className="absolute bottom-6 end-8 hidden sm:flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-space-black/60">
            <Radio size={14} className="text-space-cyan" />
            <span className="font-mono text-xs text-space-gray">
              SUSAT-1 · GSD 5 M
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
