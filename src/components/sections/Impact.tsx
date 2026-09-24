'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Award } from 'lucide-react';

export default function Impact() {
  const t = useTranslations('impact');

  const stats = [
    { label: t('missions'), val: t('missionsValue'), sub: 'COMPLETED & ACTIVE' },
    { label: t('years'), val: t('yearsValue'), sub: 'SINCE COMMISSION' },
    { label: t('spacecraft'), val: t('spacecraftValue'), sub: 'FLIGHT VEHICLES' },
    { label: t('research'), val: t('researchValue'), sub: 'PEER REVIEWED' },
  ];

  return (
    <section id="impact" className="section-padding relative border-y border-white/5 bg-space-navy/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 mb-12 justify-center">
          <Award size={16} className="text-space-blue" />
          <span className="technical-label text-space-blue">INSTITUTIONAL METRICS</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-space-white mb-3 tracking-tight group-hover:text-space-blue transition-colors">
                {stat.val}
              </div>
              <div className="technical-label text-space-white font-semibold text-xs tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="technical-label text-[0.6rem] text-space-gray/50">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
