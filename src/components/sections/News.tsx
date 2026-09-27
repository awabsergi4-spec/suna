'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Newspaper, ArrowRight, ArrowLeft, Calendar, Tag } from 'lucide-react';

export default function News() {
  const t = useTranslations('news');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const articles = ['telescope', 'lunar', 'navigation', 'satellite'] as const;

  return (
    <section id="news" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Newspaper size={16} className="text-space-blue" />
              <span className="technical-label text-space-blue">DISPATCHES & ANNOUNCEMENTS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              {t('title')}
            </h2>
          </div>
          <p className="text-space-gray text-base md:text-lg max-w-md">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          {articles.map((item, idx) => {
            const date = t(`items.${item}.date`);
            const category = t(`items.${item}.category`);
            const title = t(`items.${item}.title`);
            const desc = t(`items.${item}.description`);

            return (
              <motion.article
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (idx % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl card-surface p-5 sm:p-8 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-space-gray mb-3 sm:mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-space-blue" />
                      {date}
                    </span>
                    <span className="text-white/20">&bull;</span>
                    <span className="flex items-center gap-1.5 text-space-cyan">
                      <Tag size={12} />
                      {category}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-3xl font-bold mb-2 sm:mb-4 text-space-white group-hover:text-space-electric transition-colors">
                    {title}
                  </h3>

                  <p className="text-space-gray text-sm sm:text-base leading-relaxed mb-5 sm:mb-8">
                    {desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-space-white group-hover:text-space-blue transition-colors flex items-center gap-2">
                    {t('readMore')}
                    <ArrowIcon
                      size={14}
                      className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                    />
                  </span>
                  <span className="technical-label text-[0.6rem] text-space-gray/40">
                    PRESS // REL_{idx + 104}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
