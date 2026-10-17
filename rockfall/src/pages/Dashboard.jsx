import React from 'react';
import { Compass, Activity, Droplets, Thermometer, Cloud } from 'lucide-react';
import { useSensors } from '../context/SensorContext';
import { RiskGauge } from '../components/RiskGauge';
import { RiskHeatmap } from '../components/RiskHeatmap';
import { SensorStatCard } from '../components/SensorStatCard';
import { SensorTable } from '../components/SensorTable';

export const Dashboard = () => {
  const { summaryKpis, riskScore, riskLabel, setSelectedSensor, sensors } = useSensors();

  return (
    <div className="space-y-6 pb-10">
      {/* Top Row: Risk Score & Heatmap Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Score Card */}
        <div className="lg:col-span-5 industrial-card p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#2e213e] pb-3 mb-2">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Risk Score
            </h2>
            <span className="text-[11px] font-mono text-purple-300/80 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              AI Geomechanical Index
            </span>
          </div>
          <RiskGauge score={riskScore} label={riskLabel} />
        </div>

        {/* Heatmap Card */}
        <div className="lg:col-span-7 industrial-card p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#2e213e] pb-3 mb-2">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Heatmap
            </h2>
            <span className="text-[11px] font-mono text-gray-400">
              Sector 7 Stope Convergence Matrix
            </span>
          </div>
          <RiskHeatmap />
        </div>
      </div>

      {/* Second Row: 5 Sensor Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <SensorStatCard
          title="Tilt Sensors"
          value={summaryKpis.tilt.value}
          unit={summaryKpis.tilt.unit}
          statusLabel={summaryKpis.tilt.label}
          statusType={summaryKpis.tilt.status}
          icon={Compass}
          iconColor="text-sky-400"
          iconBg="bg-sky-500/10"
          onClick={() => {
            const tiltSensor = sensors.find((s) => s.type === 'Tilt');
            if (tiltSensor) setSelectedSensor(tiltSensor);
          }}
        />

        <SensorStatCard
          title="Vibration"
          value={summaryKpis.vibration.value}
          unit={summaryKpis.vibration.unit}
          statusLabel={summaryKpis.vibration.label}
          statusType={summaryKpis.vibration.status}
          icon={Activity}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
          onClick={() => {
            const vibSensor = sensors.find((s) => s.type === 'Vibration');
            if (vibSensor) setSelectedSensor(vibSensor);
          }}
        />

        <SensorStatCard
          title="Moisture"
          value={summaryKpis.moisture.value}
          unit={summaryKpis.moisture.unit}
          statusLabel={summaryKpis.moisture.label}
          statusType={summaryKpis.moisture.status}
          icon={Droplets}
          iconColor="text-cyan-400"
          iconBg="bg-cyan-500/10"
          onClick={() => {
            const moistSensor = sensors.find((s) => s.type === 'Moisture');
            if (moistSensor) setSelectedSensor(moistSensor);
          }}
        />

        <SensorStatCard
          title="Temperature"
          value={summaryKpis.temperature.value}
          unit={summaryKpis.temperature.unit}
          statusLabel={summaryKpis.temperature.label}
          statusType={summaryKpis.temperature.status}
          icon={Thermometer}
          iconColor="text-rose-400"
          iconBg="bg-rose-500/10"
          onClick={() => {
            const tempSensor = sensors.find((s) => s.type === 'Temperature');
            if (tempSensor) setSelectedSensor(tempSensor);
          }}
        />

        <SensorStatCard
          title="Humidity"
          value={summaryKpis.humidity.value}
          unit={summaryKpis.humidity.unit}
          statusLabel={summaryKpis.humidity.label}
          statusType={summaryKpis.humidity.status}
          icon={Cloud}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
          onClick={() => {
            const humSensor = sensors.find((s) => s.type === 'Humidity');
            if (humSensor) setSelectedSensor(humSensor);
          }}
        />
      </div>

      {/* Third Row: Sensor Network Status Table */}
      <SensorTable title="Sensor Network Status" showControls={true} />
    </div>
  );
};
