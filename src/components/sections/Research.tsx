'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Microscope, ArrowUpRight, ArrowUpLeft, Atom } from 'lucide-react';

export default function Research() {
  const t = useTranslations('research');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowUpLeft : ArrowUpRight;

  const researchItems = [
    {
      key: 'astrophysics',
      id: '01',
      span: 'md:col-span-8',
      field: 'COSMIC SCALES',
    },
    {
      key: 'planetary',
      id: '02',
      span: 'md:col-span-4',
      field: 'GEOLOGY & ATMOSPHERES',
    },
    {
      key: 'earth',
      id: '03',
      span: 'md:col-span-4',
      field: 'CLIMATE & BIOSPHERE',
    },
    {
      key: 'biology',
      id: '04',
      span: 'md:col-span-8',
      field: 'MICROGRAVITY LIFE',
    },
    {
      key: 'chemistry',
      id: '05',
      span: 'md:col-span-6',
      field: 'INTERSTELLAR MOLECULES',
    },
    {
      key: 'autonomous',
      id: '06',
      span: 'md:col-span-6',
      field: 'ADAPTIVE INTELLIGENCE',
    },
  ];

  return (
    <section id="research" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Microscope size={16} className="text-space-blue" />
              <span className="technical-label text-space-blue">SCIENTIFIC INQUIRY</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              {t('title')}
            </h2>
          </div>
          <p className="text-space-gray text-base md:text-lg max-w-md">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {researchItems.map((item, idx) => {
            const title = t(`items.${item.key}.title`);
            const desc = t(`items.${item.key}.description`);

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className={`${item.span} group relative rounded-xl border border-white/5 bg-space-navy/20 p-8 sm:p-10 backdrop-blur-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-space-blue/30 hover:bg-space-navy/40`}
              >
                {/* Large Background Index Number for Editorial Aesthetic */}
                <span className="absolute top-4 end-6 text-7xl sm:text-8xl font-heading font-black text-white/[0.03] select-none pointer-events-none group-hover:text-space-blue/[0.07] transition-colors">
                  {item.id}
                </span>

                <div>
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <span className="technical-label text-space-blue tracking-widest text-[0.65rem]">
                      DISCIPLINE // {item.field}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-space-gray group-hover:text-white group-hover:border-space-blue transition-colors">
                      <ArrowIcon size={14} />
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-space-white group-hover:text-white transition-colors">
                    {title}
                  </h3>

                  <p className="text-space-gray text-sm sm:text-base leading-relaxed max-w-xl">
                    {desc}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-white/5 flex items-center gap-3">
                  <Atom size={14} className="text-space-cyan" />
                  <span className="text-xs uppercase tracking-wider text-space-gray group-hover:text-space-white transition-colors">
                    {t('learnMore')}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
