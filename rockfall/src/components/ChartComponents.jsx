import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

export const CustomChartTooltip = ({ active, payload, label, unit = '' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1b1226] border border-purple-500/40 rounded-xl p-3 shadow-xl backdrop-blur-md text-xs">
        <p className="text-gray-400 font-medium mb-1">{label}</p>
        <p className="text-white font-bold flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ backgroundColor: payload[0].color || payload[0].stroke }}
          />
          <span>{payload[0].name || 'Value'}:</span>
          <span className="font-mono text-sm">{payload[0].value} {unit}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Vibration Line Chart (Screenshot 2)
export const VibrationChart = ({ data }) => {
  return (
    <div className="w-full" style={{ minHeight: 260 }}>
      <ResponsiveContainer width="100%" height={260} minWidth={100}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d203a" vertical={false} />
          <XAxis
            dataKey="time"
            stroke="#6b7280"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={{ stroke: '#2e203c' }}
          />
          <YAxis
            domain={[0, 12]}
            ticks={[0, 3, 6, 9, 12]}
            stroke="#6b7280"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={{ stroke: '#2e203c' }}
          />
          <Tooltip content={<CustomChartTooltip unit="Hz" />} />
          <Line
            type="monotone"
            dataKey="vibration"
            name="Vibration"
            stroke="#ef4444"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#ef4444', stroke: '#ffffff', strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-2 mt-2 text-xs text-red-400 font-medium">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span>vibration</span>
      </div>
    </div>
  );
};

// Temperature Line Chart (Screenshot 2)
export const TemperatureChart = ({ data }) => {
  return (
    <div className="w-full" style={{ minHeight: 260 }}>
      <ResponsiveContainer width="100%" height={260} minWidth={100}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d203a" vertical={false} />
          <XAxis
            dataKey="time"
            stroke="#6b7280"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={{ stroke: '#2e203c' }}
          />
          <YAxis
            domain={[0, 45]}
            ticks={[0, 10, 20, 30, 40]}
            stroke="#6b7280"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={{ stroke: '#2e203c' }}
          />
          <Tooltip content={<CustomChartTooltip unit="°C" />} />
          <Line
            type="monotone"
            dataKey="temperature"
            name="Temperature"
            stroke="#eab308"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#eab308', stroke: '#ffffff', strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-2 mt-2 text-xs text-yellow-400 font-medium">
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span>temperature</span>
      </div>
    </div>
  );
};

// Historical Trends 7 Days Bar Chart (Screenshot 3)
export const HistoricalRiskBarChart = ({ data }) => {
  return (
    <div className="w-full" style={{ minHeight: 280 }}>
      <ResponsiveContainer width="100%" height={280} minWidth={100}>
        <BarChart data={data} margin={{ top: 15, right: 20, left: -10, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d203a" />
          <XAxis
            dataKey="day"
            stroke="#6b7280"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            angle={-35}
            textAnchor="end"
            axisLine={{ stroke: '#2e203c' }}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80]}
            stroke="#6b7280"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            label={{ value: 'Risk Score', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 11, dy: 30 }}
            axisLine={{ stroke: '#2e203c' }}
          />
          <Tooltip content={<CustomChartTooltip unit="pts" />} />
          <Bar dataKey="risk" name="Risk Score" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || (entry.risk > 50 ? '#f97316' : '#22c55e')} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// AI Risk Prediction Line Chart (Screenshot 3)
export const AiRiskPredictionChart = ({ data }) => {
  return (
    <div className="w-full" style={{ minHeight: 260 }}>
      <ResponsiveContainer width="100%" height={260} minWidth={100}>
        <LineChart data={data} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d203a" />
          <XAxis
            dataKey="time"
            stroke="#6b7280"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={{ stroke: '#2e203c' }}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[25, 50, 75, 100]}
            stroke="#6b7280"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            label={{ value: 'Risk Probability', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 11, dy: 45 }}
            axisLine={{ stroke: '#2e203c' }}
          />
          <Tooltip content={<CustomChartTooltip unit="%" />} />
          <Line
            type="monotone"
            dataKey="riskProbability"
            name="Risk Probability"
            stroke="#a855f7"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#c084fc', stroke: '#ffffff', strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
