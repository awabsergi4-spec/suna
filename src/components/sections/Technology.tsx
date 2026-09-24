'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Rocket,
  Bot,
  BrainCircuit,
  SatelliteDish,
  RadioTower,
  Compass,
  Cpu,
} from 'lucide-react';

export default function Technology() {
  const t = useTranslations('technology');

  const techItems = [
    {
      key: 'propulsion',
      icon: Rocket,
      tag: 'TECH-01 // PROPULSION',
      code: 'ISP: 4,200s',
    },
    {
      key: 'robotics',
      icon: Bot,
      tag: 'TECH-02 // AUTONOMY',
      code: '6-DOF ARM',
    },
    {
      key: 'ai',
      icon: BrainCircuit,
      tag: 'TECH-03 // NEURAL ARCH',
      code: 'LATENCY: <5ms',
    },
    {
      key: 'satellite',
      icon: SatelliteDish,
      tag: 'TECH-04 // CONSTELLATION',
      code: 'OPTICAL LINK',
    },
    {
      key: 'communication',
      icon: RadioTower,
      tag: 'TECH-05 // TELEMETRY',
      code: 'X-BAND / LASER',
    },
    {
      key: 'navigation',
      icon: Compass,
      tag: 'TECH-06 // GUIDANCE',
      code: 'STAR-TRACKER',
    },
  ];

  return (
    <section id="technology" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 text-center md:text-start"
        >
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <Cpu size={16} className="text-space-blue" />
            <span className="technical-label text-space-blue">AEROSPACE ARCHITECTURE</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-space-gray text-base md:text-lg max-w-xl">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techItems.map((item, idx) => {
            const Icon = item.icon;
            const title = t(`items.${item.key}.title`);
            const desc = t(`items.${item.key}.description`);

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-xl border border-white/5 bg-space-navy/30 p-8 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-space-blue/40 hover:bg-space-navy/60"
              >
                {/* Tech corner accent */}
                <div className="absolute top-0 end-0 w-12 h-12 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 end-0 w-2 h-2 border-t-2 border-r-2 border-space-blue" />
                </div>

                {/* Technical label & code badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="technical-label text-[0.6rem] text-space-gray/80">
                    {item.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[0.65rem] font-mono text-space-cyan bg-cyan-950/30 border border-cyan-800/30">
                    {item.code}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-space-deep/80 border border-white/10 flex items-center justify-center text-space-blue mb-6 group-hover:scale-110 group-hover:text-space-cyan transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <Icon size={24} />
                </div>

                {/* Title & Description */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3 text-space-white group-hover:text-white transition-colors">
                  {title}
                </h3>

                <p className="text-space-gray text-sm leading-relaxed mb-6">
                  {desc}
                </p>

                {/* Bottom telemetry line */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/5 text-[0.65rem] font-mono text-space-gray/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-space-blue group-hover:animate-ping" />
                  <span>STATUS: OPERATIONAL // TRL-9</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
