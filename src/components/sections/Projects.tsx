'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FolderKanban, SatelliteDish, Satellite, Check, Target } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Projects() {
  const t = useTranslations('projects');
  const groundPoints = t.raw('ground.points') as string[];
  const objectives = t.raw('susat.objectives') as string[];

  const cardMotion = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader icon={FolderKanban} label={t('label')} title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Ground segment */}
          <motion.article {...cardMotion(0)} className="group card-surface rounded-3xl overflow-hidden flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ground-station.webp"
                alt={t('ground.imageAlt')}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[50%_30%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c1c] via-[#080c1c]/20 to-transparent" />
              <span className="absolute top-4 start-4 technical-label text-white bg-space-black/60 border border-white/15 rounded-full px-3 py-1">
                {t('ground.tag')}
              </span>
            </div>
            <div className="p-5 sm:p-8 -mt-10 relative flex-1 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-space-blue text-white flex items-center justify-center mb-4 shadow-[0_10px_30px_-10px_rgba(107,111,212,0.9)]">
                <SatelliteDish size={22} />
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-2">{t('ground.title')}</h3>
              <p className="text-space-gray text-sm sm:text-base leading-relaxed mb-5">{t('ground.desc')}</p>
              <ul className="space-y-3 mt-auto">
                {groundPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm sm:text-[0.95rem] text-space-white/90 leading-relaxed">
                    <Check size={16} className="text-space-cyan shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          {/* SuSat-1 */}
          <motion.article {...cardMotion(0.1)} className="group card-surface rounded-3xl overflow-hidden flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0f1e]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/susat1-launch.webp"
                alt={t('susat.imageAlt')}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c1c] via-[#080c1c]/20 to-transparent" />
              <span className="absolute top-4 start-4 technical-label text-white bg-space-black/60 border border-white/15 rounded-full px-3 py-1">
                {t('susat.tag')}
              </span>
            </div>
            <div className="p-5 sm:p-8 -mt-10 relative flex-1 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-space-cyan text-space-black flex items-center justify-center mb-4 shadow-[0_10px_30px_-10px_rgba(244,151,142,0.9)]">
                <Satellite size={22} />
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold">{t('susat.title')}</h3>
              <p className="text-space-electric text-sm font-medium mb-2">{t('susat.name')}</p>
              <p className="text-space-gray text-sm sm:text-base leading-relaxed mb-5">{t('susat.desc')}</p>
              <div className="mt-auto rounded-xl border border-white/10 bg-space-black/40 p-4">
                <h4 className="technical-label text-space-cyan mb-3 flex items-center gap-2">
                  <Target size={13} />
                  {t('susat.objectivesTitle')}
                </h4>
                <ul className="space-y-2.5">
                  {objectives.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-sm sm:text-[0.95rem] text-space-white/90 leading-relaxed">
                      <Check size={16} className="text-space-cyan shrink-0 mt-0.5" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
