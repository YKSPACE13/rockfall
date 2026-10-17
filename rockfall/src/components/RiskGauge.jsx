import React from 'react';
import { motion } from 'framer-motion';

export const RiskGauge = ({ score = 44, label = 'Medium Risk' }) => {
  // Semi-circle gauge calculation
  // Radius = 80, Circumference of full circle = 2 * PI * 80 ~= 502.65
  // Half circle circumference = PI * 80 ~= 251.32
  const radius = 75;
  const strokeWidth = 18;
  const semiCircumference = Math.PI * radius; // ~235.6
  const strokeDashoffset = semiCircumference - (Math.min(100, Math.max(0, score)) / 100) * semiCircumference;

  // Color by risk score
  const getRiskColor = (s) => {
    if (s >= 75) return { stroke: '#ef4444', text: 'text-red-400', glow: 'rgba(239, 68, 68, 0.4)' };
    if (s >= 55) return { stroke: '#f97316', text: 'text-orange-400', glow: 'rgba(249, 115, 22, 0.4)' };
    if (s >= 35) return { stroke: '#f59e0b', text: 'text-amber-400', glow: 'rgba(245, 158, 11, 0.4)' };
    return { stroke: '#10b981', text: 'text-emerald-400', glow: 'rgba(16, 185, 129, 0.4)' };
  };

  const colorInfo = getRiskColor(score);

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full">
      <div className="relative w-64 h-34 flex items-center justify-center overflow-visible">
        <svg
          viewBox="0 0 200 115"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Dynamic gradient for gauge track */}
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Arc */}
          <path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke="#2d223c"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Animated Active Arc */}
          <motion.path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke={colorInfo.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={semiCircumference}
            initial={{ strokeDashoffset: semiCircumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            filter="url(#gaugeGlow)"
          />
        </svg>

        {/* Center Score & Label */}
        <div className="absolute bottom-2 flex flex-col items-center justify-center">
          <motion.span
            key={score}
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-extrabold tracking-tight text-white"
          >
            {score}
          </motion.span>
        </div>
      </div>

      <div className="mt-1 flex items-center gap-1.5">
        <span className={`text-base font-bold tracking-wide ${colorInfo.text}`}>
          {label}
        </span>
      </div>
      <p className="text-[11px] text-gray-400 mt-0.5">
        Rockfall Hazard Probability Index
      </p>
    </div>
  );
};
