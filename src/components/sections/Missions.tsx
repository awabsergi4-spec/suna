'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, ArrowLeft, Compass, CheckCircle2, Radio, Clock } from 'lucide-react';

export default function Missions() {
  const t = useTranslations('missions');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const missionsList = [
    {
      key: 'orion',
      color: 'from-blue-900/30 to-indigo-950/20',
      accent: '#3B82F6',
      icon: CheckCircle2,
      badgeClass: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
      glow: 'rgba(59, 130, 246, 0.15)',
    },
    {
      key: 'luna',
      color: 'from-cyan-900/30 to-slate-950/20',
      accent: '#06B6D4',
      icon: Radio,
      badgeClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
      glow: 'rgba(6, 182, 212, 0.15)',
    },
    {
      key: 'aurora',
      color: 'from-emerald-950/30 to-blue-950/20',
      accent: '#10B981',
      icon: Radio,
      badgeClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
      glow: 'rgba(16, 185, 129, 0.15)',
    },
    {
      key: 'titan',
      color: 'from-violet-950/30 to-amber-950/10',
      accent: '#8B5CF6',
      icon: Clock,
      badgeClass: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
      glow: 'rgba(139, 92, 246, 0.15)',
    },
  ];

  return (
    <section id="missions" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass size={16} className="text-space-blue" />
              <span className="technical-label text-space-blue">EXPLORATION INITIATIVES</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              {t('title')}
            </h2>
          </div>
          <p className="text-space-gray text-base md:text-lg max-w-md">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {missionsList.map((item, idx) => {
            const data = {
              id: t(`items.${item.key}.id`),
              name: t(`items.${item.key}.name`),
              destination: t(`items.${item.key}.destination`),
              year: t(`items.${item.key}.year`),
              description: t(`items.${item.key}.description`),
              status: t(`items.${item.key}.status`),
            };
            const StatusIcon = item.icon;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-xl border border-white/5 bg-space-navy/40 p-8 sm:p-10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-space-blue/30"
              >
                {/* Background atmospheric gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 transition-opacity duration-500 group-hover:opacity-80`}
                />

                {/* Subtle orbital path SVG on hover */}
                <div className="absolute -top-12 -end-12 w-64 h-64 pointer-events-none opacity-0 transition-opacity duration-700 group-hover:opacity-30">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke={item.accent}
                      strokeWidth="1"
                      strokeDasharray="4 6"
                    />
                    <circle cx="180" cy="100" r="3" fill={item.accent} />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                  {/* Top metadata */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="technical-label text-space-gray">
                        {data.id} &bull; {data.year}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${item.badgeClass}`}
                      >
                        <StatusIcon size={12} />
                        {data.status}
                      </span>
                    </div>

                    <h3 className="font-heading text-3xl sm:text-4xl font-bold mb-3 tracking-wide text-space-white group-hover:text-white transition-colors">
                      {data.name}
                    </h3>

                    <div className="inline-block mb-4 text-xs font-mono uppercase tracking-widest text-space-blue">
                      &rarr; {data.destination}
                    </div>

                    <p className="text-space-gray text-sm sm:text-base leading-relaxed">
                      {data.description}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-semibold text-space-white group-hover:text-space-blue transition-colors flex items-center gap-2">
                      {t('viewMission')}
                      <ArrowIcon
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5"
                      />
                    </span>
                    <span className="technical-label text-[0.6rem] text-space-gray/50">
                      SYS_ID: 0{idx + 1}_V3
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
