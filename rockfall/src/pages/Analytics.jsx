import React, { useState } from 'react';
import { useSensors } from '../context/SensorContext';
import { HistoricalRiskBarChart, AiRiskPredictionChart } from '../components/ChartComponents';
import { Cpu, Target, Clock, ShieldCheck, Calendar } from 'lucide-react';

export const Analytics = () => {
  const { dailyRiskHistory, aiRiskHistory } = useSensors();
  const [timeRange, setTimeRange] = useState('7d');

  // Dynamic multiplier based on time range
  const adjustedDailyData = dailyRiskHistory.map((d) => {
    if (timeRange === '24h') {
      return { ...d, day: d.day.replace('days ago', 'h ago').replace('Yesterday', '6h ago') };
    }
    return d;
  });

  return (
    <div className="space-y-6 pb-10">
      {/* Top Header & Time Range Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Geomechanical Analytics & AI Forecasting
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Rockfall probability projection calculated via neural seismic decomposition
          </p>
        </div>

        {/* Time-range Selector */}
        <div className="inline-flex items-center p-1 rounded-xl bg-[#1a1224] border border-[#312044]">
          {['24h', '7d', '30d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Top Card: Historical Trends (7 Days) (matching Screenshot 3) */}
      <div className="industrial-card p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-[#2e213e] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-purple-400" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Historical Trends ({timeRange === '24h' ? '24 Hours' : timeRange === '7d' ? '7 Days' : '30 Days'})
            </h2>
          </div>
          <span className="text-[11px] font-mono text-gray-400">
            Daily Aggregated Geotechnical Stress Score
          </span>
        </div>

        <HistoricalRiskBarChart data={adjustedDailyData} />
      </div>

      {/* Bottom Row: AI Risk Prediction Model & Summary Cards (matching Screenshot 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Risk Prediction Model Chart */}
        <div className="lg:col-span-8 industrial-card p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#2e213e] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                AI Risk Prediction Model
              </h2>
            </div>
            <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              Live Neural Inference
            </span>
          </div>

          <AiRiskPredictionChart data={aiRiskHistory} />
        </div>

        {/* Right Column: 3 Analytics Summary Cards (matching Screenshot 3) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Prediction Accuracy */}
          <div className="industrial-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">
                Prediction Accuracy
              </span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                94.7%
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Based on last 1000 predictions
              </p>
            </div>
          </div>

          {/* Card 2: Next Risk Assessment */}
          <div className="industrial-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">
                Next Risk Assessment
              </span>
              <Clock className="w-4 h-4 text-sky-400" />
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-sky-400 tracking-tight">
                12 min
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Automated analysis cycle
              </p>
            </div>
          </div>

          {/* Card 3: Model Confidence */}
          <div className="industrial-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">
                Model Confidence
              </span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-amber-400 tracking-tight">
                High
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                87% confidence level
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
