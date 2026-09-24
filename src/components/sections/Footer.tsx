'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: tNav('home'), id: 'hero' },
    { label: tNav('missions'), id: 'missions' },
    { label: tNav('discover'), id: 'solar-system' },
    { label: tNav('research'), id: 'research' },
    { label: tNav('technology'), id: 'technology' },
    { label: tNav('news'), id: 'news' },
    { label: tNav('about'), id: 'timeline' },
  ];

  const socials = ['X / Twitter', 'LinkedIn', 'Instagram', 'YouTube'];

  return (
    <footer className="relative pt-20 pb-12 border-t border-white/5 bg-space-black overflow-hidden">
      {/* Subtle Animated Orbital Line Behind Footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[300px] pointer-events-none opacity-20">
        <svg viewBox="0 0 1400 300" className="w-full h-full">
          <ellipse
            cx="700"
            cy="280"
            rx="650"
            ry="180"
            fill="none"
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 relative">
                <svg viewBox="0 0 32 32" className="w-8 h-8" aria-hidden="true">
                  <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5" />
                  <circle cx="16" cy="16" r="3" fill="#3B82F6" />
                  <ellipse cx="16" cy="16" rx="14" ry="6" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8" transform="rotate(-25 16 16)" />
                </svg>
              </div>
              <span className="font-heading text-base font-bold tracking-[0.2em] uppercase text-space-white">
                {locale === 'ar' ? 'وكالة الفضاء' : 'SPACE AGENCY'}
              </span>
            </div>
            <p className="text-space-gray text-sm leading-relaxed max-w-sm mb-6">
              {t('description')}
            </p>
            <div className="technical-label text-[0.65rem] text-space-gray/60">
              COORDINATES: 34°12&apos;08&quot;N 118°14&apos;37&quot;W // STATION L2
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="technical-label text-space-white font-semibold text-xs tracking-widest mb-6">
              {t('explore')}
            </h4>
            <ul className="space-y-3">
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

          {/* Social Links */}
          <div className="lg:col-span-2">
            <h4 className="technical-label text-space-white font-semibold text-xs tracking-widest mb-6">
              {t('social')}
            </h4>
            <ul className="space-y-3">
              {socials.map((social, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-space-gray hover:text-space-white transition-colors"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            <h4 className="technical-label text-space-white font-semibold text-xs tracking-widest mb-6">
              {t('contact')}
            </h4>
            <p className="text-sm text-space-gray mb-2">{t('email')}</p>
            <p className="text-sm text-space-gray">GLOBAL COMMUNICATIONS</p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 px-2.5 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                SYSTEM ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-space-gray/60">
          <div>{t('copyright')}</div>
          <div className="tracking-widest uppercase">{t('tagline')}</div>
        </div>
      </div>
    </footer>
  );
}
