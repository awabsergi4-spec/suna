'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Sparkles, ArrowRight, ArrowLeft, Mail } from 'lucide-react';

export default function CTA() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      {/* Background Planet Arc */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/4 w-[800px] sm:w-[1200px] aspect-square rounded-full border border-space-blue/15 bg-gradient-to-t from-space-midnight/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/3 w-[600px] sm:w-[900px] aspect-square rounded-full border border-space-blue/10 pointer-events-none" />

      <div className="max-w-[1000px] mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles size={16} className="text-space-cyan" />
            <span className="technical-label text-space-cyan">HUMANITY&apos;S NEXT CHAPTER</span>
          </div>

          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
            <span className="block text-space-white">{t('headline1')}</span>
            <span className="block gradient-text">{t('headline2')}</span>
          </h2>

          <p className="text-space-gray text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => {
                const el = document.getElementById('missions');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary group w-full sm:w-auto"
            >
              {t('cta1')}
              <ArrowIcon
                size={16}
                className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </button>

            <a
              href="mailto:contact@spaceagency.org"
              className="btn-secondary group w-full sm:w-auto"
            >
              <Mail size={16} className="text-space-gray group-hover:text-white transition-colors" />
              {t('cta2')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
