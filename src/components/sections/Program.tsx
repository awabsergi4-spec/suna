'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Compass, ListChecks, Recycle, Layers, Check } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

interface ProgramItem {
  title: string;
  intro: string;
  points: string[];
}

const icons = [ListChecks, Recycle, Layers];

export default function Program() {
  const t = useTranslations('program');
  const items = t.raw('items') as ProgramItem[];

  return (
    <section id="program" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader icon={Compass} label={t('label')} title={t('title')} />

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          {/* connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[2.9rem] inset-x-[16%] h-px bg-gradient-to-r from-space-blue/0 via-space-blue/50 to-space-blue/0"
          />
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative card-surface rounded-2xl p-5 sm:p-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-space-blue to-[#8B6FD4] text-white flex items-center justify-center shadow-[0_8px_24px_-10px_rgba(107,111,212,0.9)]">
                    <Icon size={22} />
                  </div>
                  <span className="technical-label text-space-gray/70">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold mb-2 text-space-white">{item.title}</h3>
                <p className="text-space-gray text-sm sm:text-base leading-relaxed">{item.intro}</p>
                {item.points.length > 0 && (
                  <ul className="mt-4 pt-4 border-t border-white/5 space-y-2.5">
                    {item.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-space-white/90 leading-relaxed">
                        <Check size={15} className="text-space-cyan shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
