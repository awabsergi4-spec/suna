'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

const navItems = ['home', 'about', 'policies', 'program', 'projects', 'partners', 'discover'] as const;

const sectionMap: Record<string, string> = {
  home: 'hero',
  about: 'about',
  policies: 'policies',
  program: 'program',
  projects: 'projects',
  partners: 'partners',
  discover: 'solar-system',
  contact: 'contact',
};

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
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
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 border-b ${
          isScrolled || mobileOpen
            ? 'bg-space-black/85 backdrop-blur-lg border-white/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)]'
            : 'bg-transparent border-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="h-12 lg:h-14 shrink-0 transition-opacity hover:opacity-90"
            aria-label={t('home')}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-light.webp"
              alt={locale === 'ar' ? 'اللجنة الوطنية السودانية للفضاء' : 'Sudanese National Committee for Space'}
              width={720}
              height={363}
              className="brand-logo"
              fetchPriority="high"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navItems.map((key) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className="animated-underline text-sm text-space-gray hover:text-space-white transition-colors duration-300 whitespace-nowrap"
              >
                {t(key)}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            <Link
              href={`/${otherLocale}`}
              className="text-sm text-space-gray hover:text-space-white transition-colors px-3 py-1.5 border border-white/10 hover:border-white/25 rounded-full"
            >
              {otherLocaleLabel}
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden xl:inline text-sm text-space-gray hover:text-space-white transition-colors animated-underline"
            >
              {t('contact')}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary text-xs py-2.5 px-5"
            >
              {t('explore')}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-space-white p-2 -me-2 rounded-full active:bg-white/10"
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
            className="fixed inset-0 z-40 bg-space-black/[0.97] flex flex-col items-center justify-center px-6 pt-16 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center gap-5 py-8">
              {navItems.map((key, i) => (
                <motion.button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className="text-xl sm:text-2xl font-heading font-semibold text-space-white hover:text-space-electric transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t(key)}
                </motion.button>
              ))}
              <motion.div
                className="mt-6 flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href={`/${otherLocale}`}
                  className="text-base text-space-gray hover:text-space-white transition-colors border border-white/10 rounded-full px-6 py-2"
                >
                  {otherLocaleLabel}
                </Link>
                <button
                  onClick={() => scrollToSection('projects')}
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
