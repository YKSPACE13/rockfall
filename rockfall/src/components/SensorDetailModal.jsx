import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Battery, Wifi, MapPin, Gauge, Clock, ShieldCheck, Wrench } from 'lucide-react';

export const SensorDetailModal = ({ sensor, onClose }) => {
  if (!sensor) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-lg bg-[#1f162c] border border-purple-500/30 rounded-2xl p-6 shadow-2xl z-10 text-white overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#312246] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold">
                {sensor.type.slice(0, 3).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{sensor.id}</h3>
                <p className="text-xs text-gray-400">
                  {sensor.type} Sensor • {sensor.zone}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#2d1e3e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Reading Hero */}
          <div className="my-5 p-4 rounded-xl bg-[#160f21] border border-[#2d1e3d] flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-medium">Real-Time Reading</span>
              <div className="text-3xl font-extrabold text-white mt-0.5">
                {sensor.value} {sensor.unit}
              </div>
            </div>
            <div className="text-right">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  sensor.status === 'Critical'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : sensor.status === 'Warning'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : sensor.status === 'Offline'
                    ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {sensor.status}
              </span>
              <p className="text-[11px] text-gray-400 mt-1">
                Updated {sensor.lastUpdated}
              </p>
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#251a36] border border-[#36264d] flex items-center gap-3">
              <MapPin className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-gray-400 text-[10px]">Depth Level</p>
                <p className="font-semibold text-white">{sensor.depth || '380m Level'}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#251a36] border border-[#36264d] flex items-center gap-3">
              <Battery className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-gray-400 text-[10px]">Battery Health</p>
                <p className="font-semibold text-white">{sensor.battery || '94%'}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#251a36] border border-[#36264d] flex items-center gap-3">
              <Wifi className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-gray-400 text-[10px]">Telemetry Signal</p>
                <p className="font-semibold text-white">{sensor.signal || 'Strong (98%)'}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#251a36] border border-[#36264d] flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-gray-400 text-[10px]">Calibration Status</p>
                <p className="font-semibold text-white">Verified Pass</p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-[#312246] flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-mono">
              Mesh Protocol: RS-ZigBee-v2
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert(`Zero-calibration command dispatched to telemetry node ${sensor.id}`);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#312046] hover:bg-[#3d2856] text-purple-200 text-xs font-medium transition-colors"
              >
                <Wrench className="w-3.5 h-3.5" />
                Calibrate
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
