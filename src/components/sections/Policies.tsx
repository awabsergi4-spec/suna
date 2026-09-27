'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ScrollText, Sprout, HeartPulse, Shield, Factory, Handshake, Microscope, GraduationCap, Lightbulb, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

interface Policy {
  title: string;
  application: string[];
  reason: string;
  statement: string;
}

const icons = [Sprout, HeartPulse, Shield, Factory, Handshake, Microscope, GraduationCap];

export default function Policies() {
  const t = useTranslations('policies');
  const items = t.raw('items') as Policy[];
  const [active, setActive] = useState(0);
  const policy = items[active];
  const ActiveIcon = icons[active];

  return (
    <section id="policies" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader icon={ScrollText} label={t('label')} title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
          {/* Policy selector: horizontal chips on phones, vertical list on desktop */}
          <div
            role="tablist"
            aria-label={t('title')}
            className="lg:col-span-5 flex lg:flex-col gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 snap-x"
          >
            {items.map((p, i) => {
              const Icon = icons[i];
              const selected = i === active;
              return (
                <button
                  key={i}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={`snap-start shrink-0 lg:shrink text-start flex items-center gap-3 rounded-2xl border px-4 py-3 lg:py-4 transition-all duration-300 ${
                    selected
                      ? 'border-space-blue/60 bg-space-blue/15 text-white shadow-[0_10px_30px_-18px_rgba(107,111,212,0.9)]'
                      : 'border-white/8 bg-space-navy/50 text-space-gray hover:text-white hover:border-white/20'
                  }`}
                >
                  <span
                    className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                      selected ? 'bg-space-blue text-white' : 'bg-white/5 text-space-electric'
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="flex flex-col">
                    <span className="technical-label text-[0.6rem]">
                      {t('policy')} {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="hidden lg:block text-sm font-medium leading-snug mt-0.5">{p.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Policy detail */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.article
                key={active}
                role="tabpanel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="glass-subtle rounded-2xl p-5 sm:p-8 md:p-10 relative overflow-hidden"
              >
                <ActiveIcon
                  aria-hidden="true"
                  className="absolute -top-6 -end-6 w-40 h-40 text-space-blue/[0.07] pointer-events-none"
                />
                <div className="flex items-center gap-2 mb-3 technical-label text-space-cyan">
                  {t('policy')} {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6 sm:mb-8 relative">
                  {policy.title}
                </h3>

                {policy.application.length > 0 && (
                  <div className="mb-6">
                    <h4 className="technical-label text-space-gray mb-3">{t('application')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {policy.application.map((a) => (
                        <span
                          key={a}
                          className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-space-blue/30 bg-space-blue/10 text-space-white"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="technical-label text-space-gray mb-2 flex items-center gap-2">
                    <Lightbulb size={13} className="text-space-cyan" />
                    {t('reason')}
                  </h4>
                  <p className="text-space-gray text-sm sm:text-base leading-relaxed">{policy.reason}</p>
                </div>

                <div className="rounded-xl border-s-2 border-space-cyan bg-space-black/40 p-4 sm:p-5">
                  <h4 className="technical-label text-space-cyan mb-2 flex items-center gap-2">
                    <Quote size={13} />
                    {t('statement')}
                  </h4>
                  <p className="text-space-white text-sm sm:text-base leading-relaxed">{policy.statement}</p>
                </div>

                {/* Progress dots */}
                <div className="flex gap-1.5 mt-6" aria-hidden="true">
                  {items.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-space-cyan' : 'w-2 bg-white/15'}`}
                    />
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
