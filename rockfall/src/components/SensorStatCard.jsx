import React from 'react';
import { motion } from 'framer-motion';

export const SensorStatCard = ({
  title,
  value,
  unit = '',
  statusLabel,
  statusType = 'Normal',
  icon: Icon,
  iconColor = 'text-cyan-400',
  iconBg = 'bg-cyan-500/10',
  onClick,
}) => {
  // Status badge styling
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'critical':
        return 'text-red-400';
      case 'warning':
      case 'elevated':
      case 'high':
        return 'text-amber-400';
      case 'normal':
      case 'normal range':
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="industrial-card p-4 sm:p-5 flex flex-col justify-between cursor-pointer"
    >
      {/* Header: Title and Icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
          {title}
        </span>
        <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
      </div>

      {/* Body: Value and Status */}
      <div className="mt-4 sm:mt-6">
        <div className="flex items-baseline gap-1">
          <motion.span
            key={value}
            initial={{ opacity: 0.6, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            {typeof value === 'number' ? value.toFixed(2) : value}
          </motion.span>
          {unit && (
            <span className="text-xs font-medium text-gray-400">{unit}</span>
          )}
        </div>

        <p className={`text-xs font-medium mt-1 ${getStatusColor(statusLabel)}`}>
          {statusLabel}
        </p>
      </div>
    </motion.div>
  );
};
