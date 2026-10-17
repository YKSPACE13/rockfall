import React, { useState } from 'react';
import { useSensors } from '../context/SensorContext';
import { AlertTriangle, Users, Thermometer, Activity } from 'lucide-react';

export const RiskHeatmap = () => {
  const { mineZones } = useSensors();
  const [hoveredZone, setHoveredZone] = useState(null);

  const getRiskStyle = (risk) => {
    if (risk >= 75) {
      return {
        bg: 'bg-red-500/25 hover:bg-red-500/40',
        border: 'border-red-500/60',
        text: 'text-red-300',
        dot: 'bg-red-500',
        glow: 'shadow-lg shadow-red-950/50',
      };
    }
    if (risk >= 55) {
      return {
        bg: 'bg-orange-500/20 hover:bg-orange-500/35',
        border: 'border-orange-500/50',
        text: 'text-orange-300',
        dot: 'bg-orange-400',
        glow: 'shadow-md shadow-orange-950/40',
      };
    }
    if (risk >= 35) {
      return {
        bg: 'bg-amber-500/20 hover:bg-amber-500/35',
        border: 'border-amber-500/50',
        text: 'text-amber-300',
        dot: 'bg-amber-400',
        glow: 'shadow-md shadow-amber-950/40',
      };
    }
    return {
      bg: 'bg-emerald-500/15 hover:bg-emerald-500/30',
      border: 'border-emerald-500/40',
      text: 'text-emerald-300',
      dot: 'bg-emerald-400',
      glow: 'shadow-sm shadow-emerald-950/30',
    };
  };

  return (
    <div className="relative flex flex-col justify-between h-full p-2">
      {/* Sector Layout Grid */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 flex-1 min-h-[160px]">
        {mineZones.map((zone) => {
          const style = getRiskStyle(zone.risk);
          const isHovered = hoveredZone?.id === zone.id;

          return (
            <div
              key={zone.id}
              onMouseEnter={() => setHoveredZone(zone)}
              onMouseLeave={() => setHoveredZone(null)}
              className={`relative rounded-xl border p-2.5 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                style.bg
              } ${style.border} ${style.glow} ${
                isHovered ? 'scale-103 z-10 ring-1 ring-white/30' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white tracking-wide">
                  {zone.code}
                </span>
                <span className={`w-2 h-2 rounded-full ${style.dot} ${zone.risk >= 75 ? 'animate-ping' : ''}`} />
              </div>

              {/* Center Info */}
              <div className="my-1">
                <p className="text-[11px] font-medium text-gray-200 truncate">
                  {zone.name}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs font-bold ${style.text}`}>
                    Risk: {zone.risk}%
                  </span>
                  {zone.miners > 0 && (
                    <span className="flex items-center gap-0.5 text-[10px] text-purple-300">
                      <Users className="w-2.5 h-2.5" />
                      {zone.miners}
                    </span>
                  )}
                </div>
              </div>

              {/* Mini status bar */}
              <div className="w-full bg-[#160f21] rounded-full h-1 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    zone.risk >= 75
                      ? 'bg-red-500'
                      : zone.risk >= 55
                      ? 'bg-orange-500'
                      : zone.risk >= 35
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`}
                  style={{ width: `${zone.risk}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Hover Details Floating Banner */}
      {hoveredZone && (
        <div className="absolute top-2 right-2 bg-[#201431] border border-purple-500/40 rounded-xl p-3 shadow-2xl z-20 text-xs w-60 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-[#32204a] pb-1.5 mb-2">
            <span className="font-bold text-white">{hoveredZone.name}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                hoveredZone.risk >= 75
                  ? 'bg-red-500/20 text-red-300'
                  : hoveredZone.risk >= 55
                  ? 'bg-orange-500/20 text-orange-300'
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}
            >
              {hoveredZone.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-yellow-400" />
              <span>Vib: {hoveredZone.vib}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-red-400" />
              <span>Temp: {hoveredZone.temp}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Miners: {hoveredZone.miners}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-purple-400" />
              <span>Risk: {hoveredZone.risk}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Heatmap Legend */}
      <div className="mt-3 pt-2 border-t border-[#2d213c] flex items-center justify-between text-[11px] text-gray-400">
        <span className="font-medium text-gray-300">Risk Gradient:</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Low (0-34)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Moderate (35-54)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Elevated (55-74)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Critical (75+)</span>
          </span>
        </div>
      </div>
    </div>
  );
};
