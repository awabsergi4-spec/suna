'use client';

import { motion } from 'framer-motion';

interface OrbitalPathProps {
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  className?: string;
  dotSize?: number;
  duration?: number;
  strokeOpacity?: number;
  delay?: number;
}

export default function OrbitalPath({
  cx = 200,
  cy = 200,
  rx = 150,
  ry = 150,
  className = '',
  dotSize = 3,
  duration = 20,
  strokeOpacity = 0.15,
  delay = 0,
}: OrbitalPathProps) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      width={cx * 2}
      height={cy * 2}
      viewBox={`0 0 ${cx * 2} ${cy * 2}`}
      aria-hidden="true"
    >
      {/* Orbital path */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={`rgba(59, 130, 246, ${strokeOpacity})`}
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      {/* Animated dot */}
      <motion.circle
        r={dotSize}
        fill="rgba(59, 130, 246, 0.8)"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
        style={{
          offsetPath: `path("M ${cx + rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx + rx - 0.01} ${cy}")`,
        }}
      >
        {/* Glow */}
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="3s"
          repeatCount="indefinite"
        />
      </motion.circle>
    </svg>
  );
}
