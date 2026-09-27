'use client';

import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: tNav('home'), id: 'hero' },
    { label: tNav('about'), id: 'about' },
    { label: tNav('policies'), id: 'policies' },
    { label: tNav('program'), id: 'program' },
    { label: tNav('projects'), id: 'projects' },
    { label: tNav('partners'), id: 'partners' },
    { label: tNav('discover'), id: 'solar-system' },
  ];

  return (
    <footer className="relative z-10 pt-14 sm:pt-20 pb-10 sm:pb-12 border-t border-white/5 bg-space-black overflow-hidden">
      {/* Subtle Animated Orbital Line Behind Footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[300px] pointer-events-none opacity-20">
        <svg viewBox="0 0 1400 300" className="w-full h-full">
          <ellipse
            cx="700"
            cy="280"
            rx="650"
            ry="180"
            fill="none"
            stroke="rgba(107,111,212,0.3)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 lg:gap-12 pb-12 sm:pb-16 border-b border-white/5">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-5">
            <div className="h-16 sm:h-20 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-light.webp"
                alt={locale === 'ar' ? 'اللجنة الوطنية السودانية للفضاء' : 'Sudanese National Committee for Space'}
                width={720}
                height={363}
                loading="lazy"
                className="brand-logo"
              />
            </div>
            <p className="text-space-gray text-sm leading-relaxed max-w-sm mb-6">
              {t('description')}
            </p>
            <div className="technical-label text-[0.65rem] text-space-gray/60">
              {t('location')}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-2 lg:col-span-3">
            <h4 className="technical-label text-space-white font-semibold text-xs tracking-widest mb-4 sm:mb-6">
              {t('explore')}
            </h4>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-3">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-space-gray hover:text-space-white transition-colors animated-underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-2 lg:col-span-4">
            <h4 className="technical-label text-space-white font-semibold text-xs tracking-widest mb-4 sm:mb-6">
              {t('contact')}
            </h4>
            <ul className="space-y-3 text-sm text-space-gray">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-space-cyan shrink-0 mt-0.5" />
                <span>
                  {t('address')}
                  <br />
                  {t('pobox')}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-space-cyan shrink-0" />
                <a href={`mailto:${t('email')}`} className="hover:text-space-white transition-colors" dir="ltr">
                  {t('email')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-space-gray/60 text-center">
          <div>{t('copyright')}</div>
          <div className="tracking-widest uppercase">{t('tagline')}</div>
        </div>
      </div>
    </footer>
  );
}
