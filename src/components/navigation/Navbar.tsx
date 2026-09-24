'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

const navItems = ['home', 'missions', 'discover', 'research', 'technology', 'news', 'about'] as const;

const sectionMap: Record<string, string> = {
  home: 'hero',
  missions: 'missions',
  discover: 'solar-system',
  research: 'research',
  technology: 'technology',
  news: 'news',
  about: 'timeline',
};

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToSection = useCallback((key: string) => {
    const sectionId = sectionMap[key];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  }, []);

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const otherLocaleLabel = locale === 'en' ? 'العربية' : 'English';

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-space-black/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group"
            aria-label={t('home')}
          >
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 32 32" className="w-8 h-8" aria-hidden="true">
                <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5" />
                <circle cx="16" cy="16" r="3" fill="#3B82F6" />
                <ellipse cx="16" cy="16" rx="14" ry="6" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8" transform="rotate(-25 16 16)" />
              </svg>
            </div>
            <span className="font-heading text-sm font-semibold tracking-[0.2em] uppercase text-space-white">
              {locale === 'ar' ? 'وكالة الفضاء' : 'SPACE AGENCY'}
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((key) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className="animated-underline text-sm text-space-gray hover:text-space-white transition-colors duration-300"
              >
                {t(key)}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={`/${otherLocale}`}
              className="text-sm text-space-gray hover:text-space-white transition-colors px-3 py-1.5 border border-white/10 hover:border-white/20 rounded-sm"
            >
              {otherLocaleLabel}
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm text-space-gray hover:text-space-white transition-colors animated-underline"
            >
              {t('contact')}
            </button>
            <button
              onClick={() => scrollToSection('missions')}
              className="btn-primary text-xs py-2.5 px-5"
            >
              {t('explore')}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-space-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-space-black/98 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((key, i) => (
                <motion.button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className="text-2xl font-heading font-semibold text-space-white hover:text-space-blue transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  {t(key)}
                </motion.button>
              ))}
              <motion.div
                className="mt-6 flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href={`/${otherLocale}`}
                  className="text-lg text-space-gray hover:text-space-white transition-colors border border-white/10 px-6 py-2"
                >
                  {otherLocaleLabel}
                </Link>
                <button
                  onClick={() => scrollToSection('missions')}
                  className="btn-primary mt-2"
                >
                  {t('explore')}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
