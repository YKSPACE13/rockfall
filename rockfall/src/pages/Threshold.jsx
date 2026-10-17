import React, { useState } from 'react';
import { useSensors, DEFAULT_THRESHOLDS } from '../context/SensorContext';
import { Sliders, Save, RotateCcw, CheckCircle, AlertTriangle, Activity, Thermometer, Droplets, Cloud, Compass } from 'lucide-react';

export const Threshold = () => {
  const { thresholds, saveThresholds, resetThresholds } = useSensors();
  const [localThresholds, setLocalThresholds] = useState(thresholds);
  const [saveMessage, setSaveMessage] = useState(null);

  const sensorConfigs = [
    {
      key: 'vibration',
      name: 'Vibration & Seismic Micro-tremor',
      unit: 'Hz',
      icon: Activity,
      iconColor: 'text-amber-400',
      step: 0.1,
      min: 0,
      max: 15,
      description: 'Acoustic frequency trigger for active rockburst and hangwall shear monitoring.',
    },
    {
      key: 'temperature',
      name: 'Strata & Ambient Temperature',
      unit: '°C',
      icon: Thermometer,
      iconColor: 'text-rose-400',
      step: 0.5,
      min: 10,
      max: 55,
      description: 'Thermal limits for underground ventilation raises, machinery, and geothermal stress.',
    },
    {
      key: 'moisture',
      name: 'Strata Moisture / Water Influx',
      unit: '%',
      icon: Droplets,
      iconColor: 'text-cyan-400',
      step: 1,
      min: 0,
      max: 100,
      description: 'Groundwater saturation index indicating potential mud-rush or ceiling weakness.',
    },
    {
      key: 'humidity',
      name: 'Atmospheric Relative Humidity',
      unit: '%',
      icon: Cloud,
      iconColor: 'text-emerald-400',
      step: 1,
      min: 0,
      max: 100,
      description: 'Mine gallery humidity levels for atmospheric ventilation quality and respiratory safety.',
    },
    {
      key: 'tilt',
      name: 'Borehole Inclinometer / Tilt',
      unit: '°',
      icon: Compass,
      iconColor: 'text-sky-400',
      step: 0.05,
      min: 0,
      max: 3.0,
      description: 'Pillar displacement and borehole tilt angular deviation limits.',
    },
  ];

  const handleInputChange = (key, field, val) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setLocalThresholds((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [field]: num,
        },
      }));
    }
  };

  const handleSave = () => {
    saveThresholds(localThresholds);
    setSaveMessage('Sensor thresholds saved & applied across dashboard!');
    setTimeout(() => setSaveMessage(null), 3500);
  };

  const handleReset = () => {
    resetThresholds();
    setLocalThresholds(DEFAULT_THRESHOLDS);
    setSaveMessage('Thresholds restored to default industrial standards.');
    setTimeout(() => setSaveMessage(null), 3500);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Configurable Sensor Thresholds
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Calibrate automated Warning and Critical trigger levels for the geotechnical monitoring engine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#231731] hover:bg-[#321f44] border border-[#3f2752] text-xs font-medium text-gray-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-900/30"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Threshold Cards List */}
      <div className="space-y-5">
        {sensorConfigs.map((cfg) => {
          const Icon = cfg.icon;
          const current = localThresholds[cfg.key] || DEFAULT_THRESHOLDS[cfg.key];

          return (
            <div key={cfg.key} className="industrial-card p-5 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2e213e] pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${cfg.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">{cfg.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{cfg.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 self-start md:self-auto">
                  Unit: {cfg.unit}
                </div>
              </div>

              {/* Slider & Input Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Warning Level */}
                <div className="p-4 rounded-xl bg-[#170f21] border border-amber-500/25 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Warning Level
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      {current.warning} {cfg.unit}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={cfg.min}
                    max={current.critical}
                    step={cfg.step}
                    value={current.warning}
                    onChange={(e) => handleInputChange(cfg.key, 'warning', e.target.value)}
                    className="w-full accent-amber-500 h-1.5 bg-[#2a1d37] rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span>Min: {cfg.min} {cfg.unit}</span>
                    <div className="flex items-center gap-1">
                      <span>Value:</span>
                      <input
                        type="number"
                        min={cfg.min}
                        max={current.critical}
                        step={cfg.step}
                        value={current.warning}
                        onChange={(e) => handleInputChange(cfg.key, 'warning', e.target.value)}
                        className="w-16 px-1.5 py-0.5 rounded bg-[#20142e] border border-[#36224c] text-center text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Critical Level */}
                <div className="p-4 rounded-xl bg-[#170f21] border border-red-500/25 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Critical Level
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      {current.critical} {cfg.unit}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={current.warning}
                    max={cfg.max}
                    step={cfg.step}
                    value={current.critical}
                    onChange={(e) => handleInputChange(cfg.key, 'critical', e.target.value)}
                    className="w-full accent-red-500 h-1.5 bg-[#2a1d37] rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <div className="flex items-center gap-1">
                      <span>Value:</span>
                      <input
                        type="number"
                        min={current.warning}
                        max={cfg.max}
                        step={cfg.step}
                        value={current.critical}
                        onChange={(e) => handleInputChange(cfg.key, 'critical', e.target.value)}
                        className="w-16 px-1.5 py-0.5 rounded bg-[#20142e] border border-[#36224c] text-center text-xs text-white"
                      />
                    </div>
                    <span>Max: {cfg.max} {cfg.unit}</span>
                  </div>
                </div>
              </div>

              {/* Visual Multi-Zone Gauge Preview Bar */}
              <div className="mt-5 pt-4 border-t border-[#291c38]">
                <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5">
                  <span className="font-medium text-gray-300">Trigger Spectrum Preview:</span>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-semibold">Normal (0 - {current.warning})</span>
                    <span className="text-amber-400 font-semibold">Warning ({current.warning} - {current.critical})</span>
                    <span className="text-red-400 font-semibold">Critical ({current.critical}+)</span>
                  </div>
                </div>

                <div className="w-full h-2.5 rounded-full bg-[#1b1225] overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${(current.warning / cfg.max) * 100}%` }}
                  />
                  <div
                    className="bg-amber-400 h-full"
                    style={{ width: `${((current.critical - current.warning) / cfg.max) * 100}%` }}
                  />
                  <div
                    className="bg-red-500 h-full flex-1"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
