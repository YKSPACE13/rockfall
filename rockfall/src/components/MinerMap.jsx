import React from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, Radio, Shield, Heart, Wind, MapPin } from 'lucide-react';
import { useSensors } from '../context/SensorContext';

export const MinerMap = () => {
  const { miners, selectedMiner, setSelectedMiner } = useSensors();

  return (
    <div className="relative w-full h-[540px] bg-[#0c1220] border border-[#26354f] rounded-2xl overflow-hidden flex items-center justify-center select-none shadow-inner">
      {/* Sector Boundary Labels */}
      <div className="absolute top-6 left-6 z-10">
        <span className="text-amber-400 font-bold text-sm tracking-wide flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Sector Alpha
        </span>
        <p className="text-[10px] text-gray-400 font-mono">Elevation: -340m Level</p>
      </div>

      <div className="absolute bottom-6 left-6 z-10">
        <span className="text-amber-400 font-bold text-sm tracking-wide">
          Sector 3 West
        </span>
        <p className="text-[10px] text-gray-400 font-mono">Stope Extraction Drift</p>
      </div>

      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 80px 80px, 80px 80px',
        }}
      />

      {/* Concentric Dashed Radar/Tracking Rings (matching Screenshot 5) */}
      <div className="absolute left-[30%] top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Ring 1 - inner */}
        <div className="w-48 h-48 rounded-full border border-dashed border-amber-400/40 flex items-center justify-center animate-spin-slow">
          {/* Ring 2 - middle */}
          <div className="w-72 h-72 rounded-full border border-dashed border-amber-400/30 flex items-center justify-center">
            {/* Ring 3 - outer */}
            <div className="w-96 h-96 rounded-full border border-dashed border-amber-400/20" />
          </div>
        </div>
      </div>

      {/* Radar Sweep line */}
      <div className="absolute left-[30%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none overflow-hidden rounded-full opacity-20">
        <div className="w-full h-full animate-radar-sweep bg-gradient-to-tr from-cyan-500/30 via-transparent to-transparent" />
      </div>

      {/* CRITICAL Hazard Zone Box (matching top right in Screenshot 5) */}
      <div className="absolute top-6 right-8 z-10 p-3 sm:p-4 rounded-xl border border-dashed border-red-500/80 bg-red-950/20 backdrop-blur-xs flex flex-col items-center justify-center w-36 sm:w-44 text-center">
        <span className="text-[11px] font-bold text-red-500 tracking-widest uppercase flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          CRITICAL
        </span>
        <AlertTriangle className="w-6 h-6 text-red-500 my-1 animate-pulse" />
        <span className="text-xs font-semibold text-red-300">Hazard Zone</span>
        <span className="text-[9px] text-red-400/80 font-mono mt-0.5">Active Fault Line</span>
      </div>

      {/* Miners Positioned on Map with Animated Coordinates */}
      {miners.map((miner) => (
        <motion.div
          key={miner.id}
          onClick={() => setSelectedMiner(miner)}
          className="absolute z-20 cursor-pointer group flex flex-col items-center"
          style={{
            left: `${miner.x}%`,
            top: `${miner.y}%`,
          }}
          animate={{
            left: `${miner.x}%`,
            top: `${miner.y}%`,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 80 }}
        >
          {/* Miner ID label above marker (matches Screenshot 5) */}
          <div className="bg-[#0b1322]/90 border border-emerald-500/40 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-md mb-1 whitespace-nowrap group-hover:border-emerald-400 group-hover:scale-105 transition-all">
            ID: {miner.id}
          </div>

          {/* Glowing Circular Location Marker with Person Icon */}
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-60" />
            <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-emerald-300 flex items-center justify-center text-[#091e13] shadow-lg shadow-emerald-950/60 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4 fill-emerald-950" />
            </div>
          </div>
        </motion.div>
      ))}

      {/* Selected Miner Details Modal Popover */}
      {selectedMiner && (
        <div className="absolute bottom-6 right-6 z-30 w-72 bg-[#171e2f] border border-cyan-500/40 rounded-xl p-4 shadow-2xl text-white backdrop-blur-md animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#283754] pb-2 mb-3">
            <div>
              <h4 className="font-bold text-sm text-white">{selectedMiner.name}</h4>
              <p className="text-[11px] text-cyan-300 font-mono">ID: {selectedMiner.id}</p>
            </div>
            <button
              onClick={() => setSelectedMiner(null)}
              className="text-gray-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-[#222e44]"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-400" /> Zone:
              </span>
              <span className="font-semibold text-white">{selectedMiner.zone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-400" /> Heart Rate:
              </span>
              <span className="font-semibold text-white">{selectedMiner.heartRate || '82 bpm'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-cyan-400" /> Oxygen:
              </span>
              <span className="font-semibold text-white">{selectedMiner.oxygen || '98%'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-emerald-400" /> Status:
              </span>
              <span
                className={`font-semibold ${
                  selectedMiner.status.includes('High-Risk')
                    ? 'text-red-400'
                    : selectedMiner.status.includes('Ping')
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {selectedMiner.status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 right-6 hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#0b101c]/80 border border-[#232f46] text-[10px] text-gray-300">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Active Miner</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>High Risk Zone</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full border border-dashed border-amber-400" />
          <span>Sonar Perimeter</span>
        </span>
      </div>
    </div>
  );
};
