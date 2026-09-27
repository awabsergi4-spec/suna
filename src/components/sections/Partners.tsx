'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Handshake, MapPin } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

interface Partner {
  name: string;
  short: string;
  country: string;
  logo: string;
}

export default function Partners() {
  const t = useTranslations('partners');
  const items = t.raw('items') as Partner[];

  return (
    <section id="partners" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader icon={Handshake} label={t('label')} title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {items.map((p, i) => (
            <motion.div
              key={p.short}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group card-surface rounded-2xl p-3 sm:p-4 flex items-center gap-4"
            >
              <div className="w-24 h-16 sm:w-28 sm:h-[4.5rem] shrink-0 rounded-xl bg-white flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/partners/${p.logo}.webp`}
                  alt={p.short}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="font-heading font-bold text-space-white text-sm sm:text-base leading-snug">{p.name}</p>
                <p className="technical-label text-space-electric mt-1">{p.short}</p>
                <p className="flex items-center gap-1.5 text-xs text-space-gray mt-1">
                  <MapPin size={12} className="text-space-cyan shrink-0" />
                  {p.country}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
