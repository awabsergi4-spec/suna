'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  label: string;
  title: string;
  subtitle?: string;
  align?: 'start' | 'center';
}

export default function SectionHeader({ icon: Icon, label, title, subtitle, align = 'start' }: SectionHeaderProps) {
  const centered = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-8 sm:mb-12 md:mb-16 ${centered ? 'text-center max-w-2xl mx-auto' : 'text-center md:text-start'}`}
    >
      <div className={`flex items-center gap-2 mb-3 justify-center ${centered ? '' : 'md:justify-start'}`}>
        <Icon size={16} className="text-space-electric" />
        <span className="technical-label text-space-electric">{label}</span>
      </div>
      <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 sm:mb-4 leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-space-gray text-base md:text-lg max-w-xl mx-auto ${centered ? '' : 'md:mx-0'}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}
