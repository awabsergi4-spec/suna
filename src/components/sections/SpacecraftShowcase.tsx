'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Crosshair, Camera, ScanLine, Ruler, Globe2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function SpacecraftShowcase() {
  const t = useTranslations('spacecraft');

  const specs = [
    { title: t('type'), val: t('typeValue'), icon: Camera },
    { title: t('resolution'), val: t('resolutionValue'), icon: ScanLine },
    { title: t('swath'), val: t('swathValue'), icon: Ruler },
    { title: t('mission'), val: t('missionValue'), icon: Globe2 },
  ];

  const gallery = [
    { src: '/images/susat1-team.webp', caption: t('photoTeam'), pos: 'object-center' },
    { src: '/images/susat1-model.webp', caption: t('photoModel'), pos: 'object-center', light: true },
  ];

  return (
    <section id="susat" className="section-padding relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader icon={Crosshair} label={t('label')} title={t('title')} subtitle={t('subtitle')} align="center" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Hero photo of the satellite */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden card-surface min-h-[320px] sm:min-h-[420px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/susat1.webp"
              alt="SuSat-1"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 start-4 end-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-space-cyan" />
              <span className="font-heading text-lg font-bold">SuSat-1</span>
            </figcaption>
          </motion.figure>

          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {specs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="card-surface rounded-2xl p-4 sm:p-6"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={15} className="text-space-electric shrink-0" />
                      <span className="technical-label text-[0.6rem] sm:text-[0.65rem] text-space-gray">{spec.title}</span>
                    </div>
                    <div className="font-heading text-base sm:text-2xl font-bold text-space-white leading-tight">{spec.val}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1">
              {gallery.map((g, i) => (
                <motion.figure
                  key={g.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative rounded-2xl overflow-hidden border border-white/10 min-h-[150px] sm:min-h-[200px] ${g.light ? 'bg-white' : 'bg-space-navy'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full ${g.light ? 'object-contain p-3' : 'object-cover'} ${g.pos} transition-transform duration-700 group-hover:scale-105`}
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-space-black/85 to-transparent text-xs sm:text-sm font-medium">
                    {g.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
