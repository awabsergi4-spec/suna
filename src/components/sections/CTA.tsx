'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Sparkles, ArrowRight, ArrowLeft, Mail, MapPin } from 'lucide-react';

export default function CTA() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Planet Arc */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/4 w-[800px] sm:w-[1200px] aspect-square rounded-full border border-space-blue/15 bg-gradient-to-t from-space-midnight/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/3 w-[600px] sm:w-[900px] aspect-square rounded-full border border-space-blue/10 pointer-events-none" />

      <div className="max-w-[1000px] mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <Sparkles size={16} className="text-space-cyan" />
            <span className="technical-label text-space-cyan">{t('label')}</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-5 sm:mb-8 leading-[1.1]">
            <span className="block text-space-white">{t('headline1')}</span>
            <span className="block gradient-text">{t('headline2')}</span>
          </h2>

          <p className="text-space-gray text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
            {t('description')}
          </p>

          {/* Contact details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8 sm:mb-10 text-start">
            <div className="card-surface rounded-2xl p-4 sm:p-5 flex items-start gap-3">
              <span className="w-10 h-10 shrink-0 rounded-xl bg-space-blue/15 text-space-electric flex items-center justify-center">
                <MapPin size={18} />
              </span>
              <div>
                <p className="technical-label text-space-gray mb-1">{t('addressLabel')}</p>
                <p className="text-space-white text-sm sm:text-base">{t('address')}</p>
              </div>
            </div>
            <a
              href={`mailto:${t('email')}`}
              className="card-surface rounded-2xl p-4 sm:p-5 flex items-start gap-3 hover:border-space-cyan/40"
            >
              <span className="w-10 h-10 shrink-0 rounded-xl bg-space-cyan/15 text-space-cyan flex items-center justify-center">
                <Mail size={18} />
              </span>
              <div>
                <p className="technical-label text-space-gray mb-1">{t('emailLabel')}</p>
                <p className="text-space-white text-sm sm:text-base" dir="ltr">{t('email')}</p>
              </div>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 max-w-sm sm:max-w-none mx-auto">
            <a href={`mailto:${t('email')}`} className="btn-primary group w-full sm:w-auto justify-center">
              <Mail size={16} />
              {t('cta1')}
            </a>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary group w-full sm:w-auto justify-center"
            >
              {t('cta2')}
              <ArrowIcon size={16} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
