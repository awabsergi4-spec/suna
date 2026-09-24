'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Activity, Radio, Satellite } from 'lucide-react';

function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toString().padStart(2, '0')}{suffix}</span>;
}

export default function MissionControl() {
  const t = useTranslations('missionControl');

  const stats = [
    { label: t('activeMissions'), value: 7, display: t('activeMissionsValue') },
    { label: t('satellitesInOrbit'), value: 24, display: t('satellitesValue') },
    { label: t('distanceTraveled'), value: null, display: t('distanceValue') },
    { label: t('dataCollected'), value: null, display: t('dataValue') },
  ];

  return (
    <section id="mission-control" className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity size={16} className="text-space-blue" />
            <span className="technical-label text-space-blue">{t('statusNominal')}</span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold">{t('title')}</h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-subtle p-6"
            >
              <p className="technical-label text-space-gray mb-2 text-[0.6rem]">{stat.label}</p>
              <p className="font-heading text-2xl md:text-3xl font-bold text-space-white" style={{ animation: 'counter-pulse 4s ease-in-out infinite' }}>
                {stat.value !== null ? (
                  <AnimatedCounter end={stat.value} />
                ) : (
                  stat.display
                )}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-subtle p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative orbital */}
          <div className="absolute top-0 end-0 w-80 h-80 pointer-events-none opacity-20" aria-hidden="true">
            <svg viewBox="0 0 320 320" className="w-full h-full">
              <circle cx="160" cy="160" r="100" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="1" strokeDasharray="3 8" />
              <circle cx="260" cy="160" r="4" fill="rgba(59,130,246,0.6)">
                <animateTransform attributeName="transform" type="rotate" from="0 160 160" to="360 160 160" dur="20s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Satellite size={16} className="text-space-blue" />
                <span className="technical-label text-space-blue">{t('missionLabel')}</span>
              </div>
              <h3 className="font-heading text-4xl md:text-5xl font-bold mb-6">{t('missionName')}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="technical-label text-space-gray w-24">{t('statusLabel')}</span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">{t('missionStatus')}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="technical-label text-space-gray w-24">{t('objectiveLabel')}</span>
                  <span className="text-space-white text-sm">{t('missionObjective')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="technical-label text-space-gray w-24">{t('distanceLabel')}</span>
                  <span className="text-space-white text-sm font-mono">{t('missionDistance')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="glass-subtle p-4 flex items-center justify-between">
                <span className="technical-label text-space-gray">{t('orbitalClass')}</span>
                <span className="font-heading text-lg font-bold text-space-blue">{t('orbitalClassValue')}</span>
              </div>
              <div className="glass-subtle p-4 flex items-center justify-between">
                <span className="technical-label text-space-gray">{t('dataStatus')}</span>
                <span className="flex items-center gap-2">
                  <Radio size={12} className="text-green-400 animate-pulse" />
                  <span className="font-heading text-lg font-bold text-green-400">{t('dataStatusValue')}</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
