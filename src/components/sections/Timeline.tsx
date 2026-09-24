'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { History, Milestone } from 'lucide-react';

export default function Timeline() {
  const t = useTranslations('timeline');

  const years = ['2008', '2012', '2016', '2020', '2024', '2026'] as const;

  return (
    <section id="timeline" className="section-padding relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <History size={16} className="text-space-blue" />
            <span className="technical-label text-space-blue">CHRONOLOGY // 18 YEARS</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-space-gray text-base md:text-lg max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute top-0 bottom-0 start-4 md:start-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-space-blue/50 via-space-blue/20 to-transparent" />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {years.map((year, idx) => {
              const itemTitle = t(`items.${year}.title`);
              const itemDesc = t(`items.${year}.description`);
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-6 md:gap-12`}
                >
                  {/* Content Card */}
                  <div
                    className={`w-full md:w-1/2 ms-12 md:ms-0 ${
                      isEven ? 'md:text-start' : 'md:text-end'
                    }`}
                  >
                    <div className="inline-block p-6 sm:p-8 rounded-xl border border-white/5 bg-space-navy/30 backdrop-blur-sm hover:border-space-blue/30 transition-all duration-300">
                      <div className="font-mono text-xs text-space-blue font-bold tracking-widest mb-2">
                        EPOCH // {year}
                      </div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold mb-2 text-space-white">
                        {itemTitle}
                      </h3>
                      <p className="text-space-gray text-sm leading-relaxed max-w-md">
                        {itemDesc}
                      </p>
                    </div>
                  </div>

                  {/* Central Node / Orbital Dot */}
                  <div className="absolute start-4 md:start-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border border-space-blue/40 bg-space-black flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-space-blue animate-pulse" />
                    </div>
                  </div>

                  {/* Empty Spacer on Opposite side for balanced layout */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
