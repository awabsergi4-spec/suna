'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Target, Map as MapIcon, Satellite, Rocket, Factory, HandHeart, FlaskConical, Landmark, TrendingUp, ShieldCheck, Building2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const objectiveIcons = [MapIcon, Satellite, Rocket, Factory, HandHeart, FlaskConical];
const pillarIcons = [TrendingUp, ShieldCheck, Building2];

export default function About() {
  const t = useTranslations('about');
  const items = t.raw('items') as string[];
  const pillars = t.raw('pillars') as string[];

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader icon={Target} label={t('label')} title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {items.map((text, i) => {
            const Icon = objectiveIcons[i % objectiveIcons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group card-surface rounded-2xl p-5 sm:p-7 flex items-start gap-4"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-space-blue/15 border border-space-blue/25 flex items-center justify-center text-space-electric transition-transform duration-300 group-hover:scale-110 group-hover:text-space-cyan">
                  <Icon size={20} />
                </div>
                <div>
                  <span className="technical-label text-space-gray/70">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-space-white text-[0.95rem] sm:text-base leading-relaxed mt-1">{text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Policy pillars */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-12 glass-subtle rounded-2xl p-5 sm:p-8 md:p-10 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-2">
            <Landmark size={16} className="text-space-cyan" />
            <span className="technical-label text-space-cyan">{t('pillarsLabel')}</span>
          </div>
          <h3 className="font-heading text-xl sm:text-3xl font-bold mb-5 sm:mb-8">{t('pillarsTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-space-black/40 p-4">
                  <Icon size={20} className="text-space-electric shrink-0" />
                  <span className="text-space-white font-medium text-sm sm:text-base">{p}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
