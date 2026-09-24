'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { planets, Planet } from '@/data/planets';
import { Orbit, Globe, Sparkles } from 'lucide-react';

export default function SolarSystem() {
  const t = useTranslations('solarSystem');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(planets[2]); // Default to Earth

  return (
    <section id="solar-system" className="section-padding relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:text-start"
        >
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <Orbit size={16} className="text-space-blue" />
            <span className="technical-label text-space-blue">ASTRONOMICAL RECONNAISSANCE</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-space-gray text-base md:text-lg max-w-xl">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Planet Selection Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-white/5">
          {planets.map((planet) => {
            const isSelected = selectedPlanet.id === planet.id;
            const planetName = isAr ? planet.nameAr : planet.nameEn;

            return (
              <button
                key={planet.id}
                onClick={() => setSelectedPlanet(planet)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  isSelected
                    ? 'bg-space-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                    : 'bg-space-navy/50 text-space-gray hover:text-white hover:bg-space-navy border border-white/5'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: planet.color }}
                />
                {planetName}
              </button>
            );
          })}
        </div>

        {/* Interactive Visual & Planet Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Display (Left / Center) */}
          <div className="lg:col-span-6 relative aspect-square max-w-[500px] mx-auto w-full flex items-center justify-center">
            {/* Orbital Rings in visual background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[95%] h-[95%] rounded-full border border-space-blue/10 border-dashed animate-spin" style={{ animationDuration: '60s' }} />
              <div className="w-[75%] h-[75%] rounded-full border border-space-blue/15 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
              <div className="w-[50%] h-[50%] rounded-full border border-space-blue/10" />
            </div>

            {/* Glowing Planet Representation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlanet.id}
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative flex items-center justify-center"
              >
                {/* Planet Atmosphere Glow */}
                <div
                  className="absolute rounded-full blur-2xl opacity-40 transition-all duration-500"
                  style={{
                    backgroundColor: selectedPlanet.color,
                    width: `${selectedPlanet.size * 9}px`,
                    height: `${selectedPlanet.size * 9}px`,
                  }}
                />

                {/* Planet Body */}
                <div
                  className="relative rounded-full shadow-2xl transition-all duration-500 overflow-hidden"
                  style={{
                    width: `${selectedPlanet.size * 7 + 80}px`,
                    height: `${selectedPlanet.size * 7 + 80}px`,
                    background: `radial-gradient(circle at 35% 30%, ${selectedPlanet.color}, #070B14 85%)`,
                    boxShadow: `inset -20px -20px 40px rgba(0,0,0,0.8), 0 0 35px ${selectedPlanet.color}40`,
                  }}
                >
                  {/* Subtle surface textures */}
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                  
                  {/* Saturn Ring Graphic */}
                  {selectedPlanet.id === 'saturn' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[24px] rounded-full border-t-2 border-b-2 border-[#E8D080]/60 -rotate-12 pointer-events-none" />
                  )}
                </div>

                {/* Orbiting Moon indicator if moons > 0 */}
                {parseInt(selectedPlanet.moons) > 0 && (
                  <motion.div
                    className="absolute w-full h-full pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 rounded-full bg-slate-200 shadow-[0_0_8px_#ffffff]" />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Details Panel (Right) */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlanet.id}
                initial={{ opacity: 0, x: isAr ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isAr ? 20 : -20 }}
                transition={{ duration: 0.5 }}
                className="glass-subtle p-8 sm:p-10 rounded-2xl relative"
              >
                <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-space-blue">
                  <Sparkles size={14} />
                  <span>TARGET PROFILE // 0{planets.findIndex((p) => p.id === selectedPlanet.id) + 1}</span>
                </div>

                <h3 className="font-heading text-4xl sm:text-5xl font-bold mb-3 tracking-wide text-space-white">
                  {isAr ? selectedPlanet.nameAr : selectedPlanet.nameEn}
                </h3>

                <p className="text-space-gray text-base leading-relaxed mb-8">
                  {isAr ? selectedPlanet.descriptionAr : selectedPlanet.descriptionEn}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                  <div className="p-4 rounded-lg bg-space-navy/50 border border-white/5">
                    <div className="technical-label text-[0.65rem] text-space-gray mb-1">
                      {t('distanceFromSun')}
                    </div>
                    <div className="font-mono text-base font-semibold text-space-white">
                      {selectedPlanet.distanceFromSun}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-space-navy/50 border border-white/5">
                    <div className="technical-label text-[0.65rem] text-space-gray mb-1">
                      {t('diameter')}
                    </div>
                    <div className="font-mono text-base font-semibold text-space-white">
                      {selectedPlanet.diameter}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-space-navy/50 border border-white/5">
                    <div className="technical-label text-[0.65rem] text-space-gray mb-1">
                      {t('gravity')}
                    </div>
                    <div className="font-mono text-base font-semibold text-space-white">
                      {selectedPlanet.gravity}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-space-navy/50 border border-white/5">
                    <div className="technical-label text-[0.65rem] text-space-gray mb-1">
                      {t('moons')}
                    </div>
                    <div className="font-mono text-base font-semibold text-space-white">
                      {selectedPlanet.moons}
                    </div>
                  </div>
                </div>

                {/* Atmosphere & Mission telemetry */}
                <div className="mt-4 p-4 rounded-lg bg-space-deep/60 border border-space-blue/20 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-space-gray">{t('atmosphere')}:</span>
                    <span className="text-space-cyan">
                      {isAr ? selectedPlanet.atmosphereAr : selectedPlanet.atmosphereEn}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-space-gray">{t('missions')}:</span>
                    <span className="text-space-blue">
                      {isAr ? selectedPlanet.missionsAr : selectedPlanet.missionsEn}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
