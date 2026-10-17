import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { playAlertSound } from '../utils/soundUtils';

const SensorContext = createContext();

export const DEFAULT_THRESHOLDS = {
  vibration: { warning: 5.0, critical: 8.0, min: 0, max: 15, unit: 'Hz' },
  temperature: { warning: 32.0, critical: 38.0, min: 10, max: 50, unit: '°C' },
  moisture: { warning: 65.0, critical: 80.0, min: 0, max: 100, unit: '%' },
  humidity: { warning: 75.0, critical: 85.0, min: 0, max: 100, unit: '%' },
  tilt: { warning: 0.50, critical: 1.00, min: 0, max: 3.0, unit: '°' },
};

export const SensorProvider = ({ children }) => {
  // Load thresholds from localStorage or use defaults
  const [thresholds, setThresholds] = useState(() => {
    try {
      const saved = localStorage.getItem('rocksafe_thresholds');
      return saved ? JSON.parse(saved) : DEFAULT_THRESHOLDS;
    } catch {
      return DEFAULT_THRESHOLDS;
    }
  });

  const saveThresholds = (newThresholds) => {
    setThresholds(newThresholds);
    localStorage.setItem('rocksafe_thresholds', JSON.stringify(newThresholds));
  };

  const resetThresholds = () => {
    setThresholds(DEFAULT_THRESHOLDS);
    localStorage.setItem('rocksafe_thresholds', JSON.stringify(DEFAULT_THRESHOLDS));
  };

  // Top-level KPI cards matching initial screenshot
  const [summaryKpis, setSummaryKpis] = useState({
    tilt: { value: 0.30, unit: '°', label: 'Normal Range', status: 'Normal' },
    vibration: { value: 6.01, unit: 'Hz', label: 'Elevated', status: 'Warning' },
    moisture: { value: 60.18, unit: '%', label: 'Normal', status: 'Normal' },
    temperature: { value: 29.45, unit: '°C', label: 'High', status: 'Warning' },
    humidity: { value: 69.31, unit: '%', label: 'Normal', status: 'Normal' },
  });

  // Risk Score (initial: 44, Medium Risk)
  const [riskScore, setRiskScore] = useState(44);
  const [riskLabel, setRiskLabel] = useState('Medium Risk');

  // Sensor Table Records (matching Screenshots 1 & 2)
  const [sensors, setSensors] = useState([
    {
      id: 'VIB-007A',
      type: 'Vibration',
      zone: 'Zone 7A',
      value: 8.2,
      rawNumber: 8.2,
      unit: 'Hz',
      status: 'Critical',
      lastUpdated: '2 min ago',
      battery: '88%',
      signal: 'Strong (94%)',
      depth: '420m',
    },
    {
      id: 'TEMP-005B',
      type: 'Temperature',
      zone: 'Zone 5B',
      value: 38,
      rawNumber: 38.0,
      unit: '°C',
      status: 'Warning',
      lastUpdated: '5 min ago',
      battery: '91%',
      signal: 'Moderate (76%)',
      depth: '380m',
    },
    {
      id: 'TILT-003C',
      type: 'Tilt',
      zone: 'Zone 3C',
      value: '--',
      rawNumber: 0.0,
      unit: '°',
      status: 'Offline',
      lastUpdated: '8 min ago',
      battery: '12%',
      signal: 'No Signal',
      depth: '510m',
    },
    {
      id: 'MOIST-002A',
      type: 'Moisture',
      zone: 'Zone 2A',
      value: 23,
      rawNumber: 23.0,
      unit: '%',
      status: 'Normal',
      lastUpdated: '1 min ago',
      battery: '96%',
      signal: 'Strong (98%)',
      depth: '290m',
    },
    {
      id: 'HUM-001D',
      type: 'Humidity',
      zone: 'Zone 1D',
      value: 65,
      rawNumber: 65.0,
      unit: '%',
      status: 'Normal',
      lastUpdated: '30 sec ago',
      battery: '99%',
      signal: 'Strong (95%)',
      depth: '180m',
    },
    {
      id: 'VIB-008B',
      type: 'Vibration',
      zone: 'Zone 3B',
      value: 4.8,
      rawNumber: 4.8,
      unit: 'Hz',
      status: 'Normal',
      lastUpdated: 'Just now',
      battery: '85%',
      signal: 'Strong (91%)',
      depth: '340m',
    },
    {
      id: 'TEMP-009A',
      type: 'Temperature',
      zone: 'Zone 1A',
      value: 25.1,
      rawNumber: 25.1,
      unit: '°C',
      status: 'Normal',
      lastUpdated: 'Just now',
      battery: '94%',
      signal: 'Strong (97%)',
      depth: '210m',
    },
    {
      id: 'TILT-004D',
      type: 'Tilt',
      zone: 'Zone 7A',
      value: 0.42,
      rawNumber: 0.42,
      unit: '°',
      status: 'Normal',
      lastUpdated: 'Just now',
      battery: '79%',
      signal: 'Moderate (82%)',
      depth: '430m',
    },
  ]);

  // Selected sensor for details modal
  const [selectedSensor, setSelectedSensor] = useState(null);

  // Time series data for 3-Hour charts on Sensors page (matching Screenshot 2)
  const [vibrationHistory, setVibrationHistory] = useState(() => {
    const times = ['18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00'];
    const vals = [10.2, 3.8, 3.2, 5.8, 2.4, 3.1, 1.8, 6.2, 8.5, 7.1, 4.3, 8.7, 5.2];
    return times.map((time, idx) => ({ time, vibration: vals[idx] }));
  });

  const [temperatureHistory, setTemperatureHistory] = useState(() => {
    const times = ['18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00'];
    const vals = [21.5, 30.2, 23.4, 33.1, 34.0, 31.2, 33.5, 33.8, 22.4, 27.5, 37.2, 34.1, 37.9];
    return times.map((time, idx) => ({ time, temperature: vals[idx] }));
  });

  // AI Risk Prediction points (Screenshot 3)
  const [aiRiskHistory, setAiRiskHistory] = useState(() => {
    const points = [];
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 6;
      const prob = Math.round(75 + 24 * Math.sin(angle) + (Math.sin(angle * 2.5) * 8));
      points.push({ time: `${i * 5}m`, riskProbability: Math.min(100, Math.max(45, prob)) });
    }
    return points;
  });

  // 7-day Historical Trends (Screenshot 3)
  const [dailyRiskHistory] = useState([
    { day: '7 days ago', risk: 30, color: '#22c55e' },
    { day: '6 days ago', risk: 26, color: '#22c55e' },
    { day: '5 days ago', risk: 84, color: '#22c55e' }, // In screenshot 3, 5 days ago is green bar reaching 80+
    { day: '4 days ago', risk: 14, color: '#f97316' },
    { day: '3 days ago', risk: 42, color: '#f97316' },
    { day: '2 days ago', risk: 80, color: '#f97316' },
    { day: 'Yesterday', risk: 58, color: '#f97316' },
  ]);

  // Heatmap Zones
  const [mineZones, setMineZones] = useState([
    { id: 'Z-1A', name: 'Sector 1 Alpha', code: '1A', risk: 22, status: 'Normal', miners: 2, temp: '25°C', vib: '2.1 Hz' },
    { id: 'Z-1D', name: 'Shaft 1 Deep', code: '1D', risk: 28, status: 'Normal', miners: 1, temp: '27°C', vib: '3.4 Hz' },
    { id: 'Z-2A', name: 'Stope 2 Access', code: '2A', risk: 35, status: 'Normal', miners: 3, temp: '28°C', vib: '4.1 Hz' },
    { id: 'Z-3B', name: 'Sector 3 West', code: '3B', risk: 48, status: 'Elevated', miners: 4, temp: '31°C', vib: '5.6 Hz' },
    { id: 'Z-3C', name: 'Sub-level 3C', code: '3C', risk: 52, status: 'Elevated', miners: 0, temp: '32°C', vib: '5.9 Hz' },
    { id: 'Z-4C', name: 'Haulage Drift 4', code: '4C', risk: 41, status: 'Normal', miners: 2, temp: '29°C', vib: '4.5 Hz' },
    { id: 'Z-5B', name: 'Ventilation Raise 5', code: '5B', risk: 68, status: 'Warning', miners: 1, temp: '38°C', vib: '6.8 Hz' },
    { id: 'Z-7A', name: 'Stope 7 Hangwall', code: '7A', risk: 86, status: 'Critical', miners: 2, temp: '34°C', vib: '8.4 Hz' },
    { id: 'Z-HZ', name: 'Fault Hazard Zone', code: 'HZ', risk: 94, status: 'Critical', miners: 0, temp: '39°C', vib: '9.2 Hz' },
  ]);

  // Miner Roster (Screenshot 5)
  const [miners, setMiners] = useState([
    {
      id: 'M-452',
      name: 'Dr. Sarah Chen',
      initials: 'SC',
      status: 'Active',
      zone: 'Zone 3B',
      lastPing: 'Just now',
      depth: '320m',
      heartRate: '78 bpm',
      oxygen: '98%',
      x: 21,
      y: 33,
    },
    {
      id: 'M-453',
      name: 'Mike Rodriguez',
      initials: 'MR',
      status: 'High-Risk',
      zone: 'Zone 7A',
      lastPing: 'Just now',
      depth: '420m',
      heartRate: '104 bpm',
      oxygen: '94%',
      x: 24,
      y: 41,
    },
    {
      id: 'M-462',
      name: 'Wang',
      initials: 'W',
      status: 'Last Ping: 18 min ago',
      zone: 'Zone 7A',
      lastPing: '18 min ago',
      depth: '410m',
      heartRate: '82 bpm',
      oxygen: '96%',
      x: 26,
      y: 45,
    },
    {
      id: 'M-483',
      name: 'Lisa Wang',
      initials: 'LW',
      status: 'Last Ping: 16 min ago',
      zone: 'Zone 3B',
      lastPing: '16 min ago',
      depth: '315m',
      heartRate: '74 bpm',
      oxygen: '99%',
      x: 28,
      y: 32,
    },
  ]);

  // Selected miner for map modal/detail
  const [selectedMiner, setSelectedMiner] = useState(null);

  // Alerts List (Screenshot 4)
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      zone: 'A',
      type: 'Vibration',
      message: 'High vibration detected in Zone A',
      level: 'High',
      timestamp: '9/19/2025, 11:01:36 PM',
      dismissed: false,
    },
    {
      id: 2,
      zone: 'B',
      type: 'Moisture',
      message: 'Moisture levels rising in Zone B',
      level: 'Warning',
      timestamp: '9/19/2025, 11:01:36 PM',
      dismissed: false,
    },
    {
      id: 3,
      zone: '7A',
      type: 'Vibration',
      message: 'Stope 7A shear stress exceeds critical limit (8.2 Hz)',
      level: 'Critical',
      timestamp: '9/19/2025, 11:15:20 PM',
      dismissed: false,
    },
    {
      id: 4,
      zone: '5B',
      type: 'Temperature',
      message: 'Ventilation raise ambient temperature reached 38°C',
      level: 'Warning',
      timestamp: '9/19/2025, 11:20:04 PM',
      dismissed: false,
    },
  ]);

  // Simulation play/pause state
  const [isSimulating, setIsSimulating] = useState(true);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date());

  // Throttling alert generation
  const lastAlertTimeRef = useRef(0);

  // Dismiss Alert
  const dismissAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  const triggerTestAlert = () => {
    const newAlert = {
      id: Date.now(),
      zone: 'Zone 7A',
      type: 'Vibration',
      message: `Simulated seismic micro-tremor detected (${(thresholds.vibration.critical + 0.5).toFixed(1)} Hz)`,
      level: 'Critical',
      timestamp: new Date().toLocaleTimeString(),
      dismissed: false,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    playAlertSound('critical');
  };

  // Live simulation tick effect
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const now = new Date();
      setLastUpdatedTime(now);

      // Random-walk for summary KPIs
      setSummaryKpis((prev) => {
        // Small realistic drift
        const dTilt = (Math.random() - 0.49) * 0.02;
        const dVib = (Math.random() - 0.49) * 0.15;
        const dMoist = (Math.random() - 0.49) * 0.3;
        const dTemp = (Math.random() - 0.49) * 0.2;
        const dHum = (Math.random() - 0.49) * 0.3;

        const newTilt = Math.max(0.15, Math.min(1.8, +(prev.tilt.value + dTilt).toFixed(2)));
        const newVib = Math.max(2.0, Math.min(11.0, +(prev.vibration.value + dVib).toFixed(2)));
        const newMoist = Math.max(30.0, Math.min(92.0, +(prev.moisture.value + dMoist).toFixed(2)));
        const newTemp = Math.max(22.0, Math.min(42.0, +(prev.temperature.value + dTemp).toFixed(2)));
        const newHum = Math.max(45.0, Math.min(95.0, +(prev.humidity.value + dHum).toFixed(2)));

        // Determine statuses based on current user thresholds
        const getVibStatus = (v) => {
          if (v >= thresholds.vibration.critical) return { status: 'Critical', label: 'Critical' };
          if (v >= thresholds.vibration.warning) return { status: 'Warning', label: 'Elevated' };
          return { status: 'Normal', label: 'Normal' };
        };

        const getTempStatus = (t) => {
          if (t >= thresholds.temperature.critical) return { status: 'Critical', label: 'Critical' };
          if (t >= thresholds.temperature.warning) return { status: 'Warning', label: 'High' };
          return { status: 'Normal', label: 'Normal' };
        };

        const getTiltStatus = (tl) => {
          if (tl >= thresholds.tilt.critical) return { status: 'Critical', label: 'Critical' };
          if (tl >= thresholds.tilt.warning) return { status: 'Warning', label: 'Warning' };
          return { status: 'Normal', label: 'Normal Range' };
        };

        const getMoistStatus = (m) => {
          if (m >= thresholds.moisture.critical) return { status: 'Critical', label: 'Critical' };
          if (m >= thresholds.moisture.warning) return { status: 'Warning', label: 'Warning' };
          return { status: 'Normal', label: 'Normal' };
        };

        const getHumStatus = (h) => {
          if (h >= thresholds.humidity.critical) return { status: 'Critical', label: 'Critical' };
          if (h >= thresholds.humidity.warning) return { status: 'Warning', label: 'High' };
          return { status: 'Normal', label: 'Normal' };
        };

        const vibStat = getVibStatus(newVib);
        const tempStat = getTempStatus(newTemp);
        const tiltStat = getTiltStatus(newTilt);
        const moistStat = getMoistStatus(newMoist);
        const humStat = getHumStatus(newHum);

        // Update overall calculated risk score
        const score = Math.round(
          (newVib / thresholds.vibration.critical) * 35 +
          (newTemp / thresholds.temperature.critical) * 25 +
          (newTilt / thresholds.tilt.critical) * 20 +
          (newMoist / thresholds.moisture.critical) * 10 +
          (newHum / thresholds.humidity.critical) * 10
        );
        const clampedScore = Math.max(15, Math.min(96, score));
        setRiskScore(clampedScore);
        if (clampedScore >= 75) setRiskLabel('Critical Risk');
        else if (clampedScore >= 55) setRiskLabel('High Risk');
        else if (clampedScore >= 35) setRiskLabel('Medium Risk');
        else setRiskLabel('Low Risk');

        return {
          tilt: { ...prev.tilt, value: newTilt, ...tiltStat },
          vibration: { ...prev.vibration, value: newVib, ...vibStat },
          moisture: { ...prev.moisture, value: newMoist, ...moistStat },
          temperature: { ...prev.temperature, value: newTemp, ...tempStat },
          humidity: { ...prev.humidity, value: newHum, ...humStat },
        };
      });

      // Update sensors table with realistic live updates
      setSensors((prev) =>
        prev.map((s) => {
          if (s.status === 'Offline') return s;
          let delta = (Math.random() - 0.49) * (s.type === 'Vibration' ? 0.3 : s.type === 'Temperature' ? 0.2 : 0.4);
          let newVal = +(s.rawNumber + delta).toFixed(s.type === 'Tilt' ? 2 : 1);
          
          let stat = s.status;
          if (s.type === 'Vibration') {
            newVal = Math.max(1.0, Math.min(14.0, newVal));
            stat = newVal >= thresholds.vibration.critical ? 'Critical' : newVal >= thresholds.vibration.warning ? 'Warning' : 'Normal';
          } else if (s.type === 'Temperature') {
            newVal = Math.max(18.0, Math.min(48.0, newVal));
            stat = newVal >= thresholds.temperature.critical ? 'Critical' : newVal >= thresholds.temperature.warning ? 'Warning' : 'Normal';
          } else if (s.type === 'Moisture') {
            newVal = Math.max(10.0, Math.min(95.0, newVal));
            stat = newVal >= thresholds.moisture.critical ? 'Critical' : newVal >= thresholds.moisture.warning ? 'Warning' : 'Normal';
          } else if (s.type === 'Humidity') {
            newVal = Math.max(20.0, Math.min(98.0, newVal));
            stat = newVal >= thresholds.humidity.critical ? 'Critical' : newVal >= thresholds.humidity.warning ? 'Warning' : 'Normal';
          }

          return {
            ...s,
            rawNumber: newVal,
            value: newVal,
            status: stat,
            lastUpdated: 'Just now',
          };
        })
      );

      // Periodically update chart history points
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
      setVibrationHistory((prev) => {
        const lastVib = prev[prev.length - 1]?.vibration || 6.0;
        const nextVib = +(lastVib + (Math.random() - 0.48) * 1.1).toFixed(1);
        const clamped = Math.max(1.0, Math.min(12.0, nextVib));
        const updated = [...prev.slice(1), { time: timeStr, vibration: clamped }];
        return updated;
      });

      setTemperatureHistory((prev) => {
        const lastTemp = prev[prev.length - 1]?.temperature || 30.0;
        const nextTemp = +(lastTemp + (Math.random() - 0.48) * 0.8).toFixed(1);
        const clamped = Math.max(18.0, Math.min(42.0, nextTemp));
        const updated = [...prev.slice(1), { time: timeStr, temperature: clamped }];
        return updated;
      });

      // Miners micro-movement simulation (subtle drift around their radar stations)
      setMiners((prev) =>
        prev.map((m) => {
          const dx = (Math.random() - 0.5) * 0.6;
          const dy = (Math.random() - 0.5) * 0.6;
          return {
            ...m,
            x: +(m.x + dx).toFixed(2),
            y: +(m.y + dy).toFixed(2),
          };
        })
      );

      // Trigger automatic demo alert if a sensor crossed critical and cooldown expired (15 seconds)
      const nowMs = Date.now();
      if (nowMs - lastAlertTimeRef.current > 15000) {
        // Find if any sensor is critical
        const crit = sensors.find((s) => s.status === 'Critical');
        if (crit && Math.random() > 0.65) {
          lastAlertTimeRef.current = nowMs;
          const autoAlert = {
            id: nowMs,
            zone: crit.zone.replace('Zone ', ''),
            type: crit.type,
            message: `Automated notice: ${crit.type} spike at ${crit.value} ${crit.unit} in ${crit.zone}`,
            level: 'High',
            timestamp: now.toLocaleTimeString(),
            dismissed: false,
          };
          setAlerts((a) => [autoAlert, ...a.slice(0, 9)]);
        }
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isSimulating, thresholds, sensors]);

  return (
    <SensorContext.Provider
      value={{
        thresholds,
        saveThresholds,
        resetThresholds,
        summaryKpis,
        riskScore,
        riskLabel,
        sensors,
        selectedSensor,
        setSelectedSensor,
        vibrationHistory,
        temperatureHistory,
        aiRiskHistory,
        dailyRiskHistory,
        mineZones,
        miners,
        selectedMiner,
        setSelectedMiner,
        alerts,
        dismissAlert,
        clearAllAlerts,
        triggerTestAlert,
        isSimulating,
        setIsSimulating,
        lastUpdatedTime,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
};

export const useSensors = () => useContext(SensorContext);
