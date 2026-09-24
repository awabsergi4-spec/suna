'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Crosshair, ShieldCheck, Zap, Radio, Compass, Weight } from 'lucide-react';

export default function SpacecraftShowcase() {
  const t = useTranslations('spacecraft');

  const specs = [
    {
      title: t('propulsion'),
      val: t('propulsionValue'),
      icon: Zap,
      pos: 'top-10 start-4 lg:start-12',
    },
    {
      title: t('power'),
      val: t('powerValue'),
      icon: Zap,
      pos: 'top-10 end-4 lg:end-12',
    },
    {
      title: t('communication'),
      val: t('communicationValue'),
      icon: Radio,
      pos: 'bottom-20 start-4 lg:start-12',
    },
    {
      title: t('navigation'),
      val: t('navigationValue'),
      icon: Compass,
      pos: 'bottom-20 end-4 lg:end-12',
    },
  ];

  return (
    <section id="spacecraft" className="section-padding relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Crosshair size={16} className="text-space-blue" />
            <span className="technical-label text-space-blue">VESSEL SPECIFICATION // MK-VII</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-space-gray text-base md:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* 3D-Style Showcase Area */}
        <div className="relative min-h-[550px] lg:min-h-[640px] flex items-center justify-center rounded-2xl border border-white/5 bg-space-navy/20 backdrop-blur-sm p-6 overflow-hidden">
          {/* Subtle grid background */}
          <div className="grid-overlay absolute inset-0 opacity-40 pointer-events-none" />

          {/* Central Holographic / 3D Spacecraft Visual (SVG High-Tech Vector) */}
          <motion.div
            animate={{
              y: [-12, 12, -12],
              rotateZ: [-1, 1, -1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 w-full max-w-[580px] aspect-[4/3] flex items-center justify-center"
          >
            {/* Ambient propulsion glow */}
            <div className="absolute bottom-12 w-48 h-48 bg-space-blue/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* High-tech vector spacecraft representation */}
            <svg
              viewBox="0 0 600 450"
              className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,102,255,0.25)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="hull-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="50%" stopColor="#0F172A" />
                  <stop offset="100%" stopColor="#030712" />
                </linearGradient>
                <linearGradient id="panel-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Solar Array Left */}
              <polygon
                points="80,180 230,200 230,250 80,270"
                fill="url(#panel-grad)"
                stroke="#38BDF8"
                strokeWidth="1.5"
                opacity="0.85"
              />
              <line x1="130" y1="187" x2="130" y2="263" stroke="#0F172A" strokeWidth="1" />
              <line x1="180" y1="193" x2="180" y2="257" stroke="#0F172A" strokeWidth="1" />

              {/* Solar Array Right */}
              <polygon
                points="520,180 370,200 370,250 520,270"
                fill="url(#panel-grad)"
                stroke="#38BDF8"
                strokeWidth="1.5"
                opacity="0.85"
              />
              <line x1="470" y1="187" x2="470" y2="263" stroke="#0F172A" strokeWidth="1" />
              <line x1="420" y1="193" x2="420" y2="257" stroke="#0F172A" strokeWidth="1" />

              {/* Spacecraft Main Hull (Angular Stealth Aerodynamic) */}
              <polygon
                points="300,90 350,210 330,320 270,320 250,210"
                fill="url(#hull-grad)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />

              {/* Cockpit / Sensor Dome */}
              <polygon
                points="300,120 320,180 280,180"
                fill="#38BDF8"
                opacity="0.6"
              />

              {/* Hull Armor Plates */}
              <line x1="300" y1="180" x2="300" y2="300" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="300" cy="225" r="16" fill="none" stroke="#06B6D4" strokeWidth="1" />
              <circle cx="300" cy="225" r="5" fill="#06B6D4" />

              {/* Ion Engine Plume Glow */}
              <polygon
                points="285,320 315,320 300,380"
                fill="#3B82F6"
                opacity="0.75"
              />
              <polygon
                points="292,320 308,320 300,360"
                fill="#A5F3FC"
              />

              {/* Orbital Antenna Dish */}
              <ellipse cx="300" cy="80" rx="20" ry="6" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="300" y1="80" x2="300" y2="92" stroke="#60A5FA" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Floating Spec Callouts */}
          <div className="absolute inset-0 pointer-events-none p-4 sm:p-8 flex flex-col justify-between">
            {specs.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div
                  key={i}
                  className={`absolute ${spec.pos} pointer-events-auto p-4 rounded-xl border border-white/10 bg-space-black/75 backdrop-blur-md shadow-xl max-w-[200px]`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} className="text-space-blue" />
                    <span className="technical-label text-[0.6rem] text-space-gray">
                      {spec.title}
                    </span>
                  </div>
                  <div className="font-heading text-sm sm:text-base font-bold text-space-white">
                    {spec.val}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom telemetry indicators */}
          <div className="absolute bottom-4 inset-x-6 flex items-center justify-between text-[0.65rem] font-mono text-space-gray/50 border-t border-white/5 pt-3">
            <span>STATUS: DOCKED // L2 STATION</span>
            <span>PRESSURE: 101.3 KPA // NOMINAL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
