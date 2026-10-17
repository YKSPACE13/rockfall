import React from 'react';
import { useSensors } from '../context/SensorContext';
import { VibrationChart, TemperatureChart } from '../components/ChartComponents';
import { SensorTable } from '../components/SensorTable';
import { Activity, Thermometer } from 'lucide-react';

export const Sensors = () => {
  const { vibrationHistory, temperatureHistory } = useSensors();

  return (
    <div className="space-y-6 pb-10">
      {/* Top Row: Two Large Chart Cards Side-by-Side (matching Screenshot 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vibration Levels (Last 3 Hours) */}
        <div className="industrial-card p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#2e213e] pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Activity className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Vibration Levels (Last 3 Hours)
              </h2>
            </div>
            <span className="text-[11px] font-mono text-gray-400">
              Unit: Hz (Seismic Acoustic)
            </span>
          </div>

          <VibrationChart data={vibrationHistory} />
        </div>

        {/* Temperature Trends (Last 3 Hours) */}
        <div className="industrial-card p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#2e213e] pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                <Thermometer className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Temperature Trends (Last 3 Hours)
              </h2>
            </div>
            <span className="text-[11px] font-mono text-gray-400">
              Unit: °C (Strata Ambient)
            </span>
          </div>

          <TemperatureChart data={temperatureHistory} />
        </div>
      </div>

      {/* Bottom Row: Sensor Network Status Table */}
      <SensorTable title="Sensor Network Status" showControls={true} />
    </div>
  );
};
