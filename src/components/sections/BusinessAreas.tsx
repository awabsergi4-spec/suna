'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Briefcase, Satellite, Orbit, Cog, GraduationCap, SatelliteDish } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const icons = [Satellite, Orbit, Cog, GraduationCap, SatelliteDish];

export default function BusinessAreas() {
  const t = useTranslations('business');
  const items = t.raw('items') as string[];

  return (
    <section id="business" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader icon={Briefcase} label={t('label')} title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-5">
          {items.map((text, i) => {
            const Icon = icons[i];
            // 3 cards on the first row, 2 wider cards on the second (desktop)
            const span = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className={`${span} ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''} group card-surface rounded-2xl p-5 sm:p-7 relative overflow-hidden`}
              >
                <Icon
                  aria-hidden="true"
                  className="absolute -bottom-4 -end-4 w-28 h-28 text-white/[0.03] group-hover:text-space-blue/[0.08] transition-colors duration-500"
                />
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-space-deep/80 border border-white/10 flex items-center justify-center text-space-electric group-hover:text-space-cyan group-hover:scale-110 transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <span className="font-heading text-3xl font-bold text-white/10">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="relative text-space-white font-medium text-base sm:text-lg leading-snug">{text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
