import React, { useState } from 'react';
import { useSensors } from '../context/SensorContext';
import { Search, Bell, AlertTriangle, CheckCircle, Trash2, PlusCircle, Volume2 } from 'lucide-react';
import { playAlertSound } from '../utils/soundUtils';

export const Alerts = () => {
  const { alerts, dismissAlert, clearAllAlerts, triggerTestAlert } = useSensors();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All Levels');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      String(alert.id).includes(searchTerm) ||
      alert.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      severityFilter === 'All Levels' || alert.level === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  const getLevelBadge = (level) => {
    switch (level) {
      case 'Critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#42121c] text-red-400 border border-red-500/30">
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#42121c] text-red-400 border border-red-500/30">
            High
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#3d2710] text-amber-300 border border-amber-500/30">
            Warning
          </span>
        );
      case 'Normal':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#0e392b] text-emerald-400 border border-emerald-500/30">
            Normal
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Safety Alerts & Incident Dispatch
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Real-time threshold violation notifications and automated emergency dispatches
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerTestAlert}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-medium transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>Simulate Alert</span>
          </button>

          {alerts.length > 0 && (
            <button
              onClick={clearAllAlerts}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-xs font-medium transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Alerts Main Card (recreating Screenshot 4) */}
      <div className="industrial-card p-5 sm:p-6">
        {/* Card Header & Controls (matching Screenshot 4) */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Alerts
            </h2>
            <span className="text-xs font-medium text-gray-400">
              Active Incidents: <span className="text-white font-bold">{alerts.length}</span>
            </span>
          </div>

          {/* Search & Level Dropdown Row (matching Screenshot 4) */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#160f21] border border-[#342448] text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-purple-500 transition-colors"
              />
            </div>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#160f21] border border-[#342448] text-xs text-gray-300 focus:outline-hidden focus:border-purple-500 cursor-pointer"
            >
              <option value="All Levels">All Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Warning">Warning</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
        </div>

        {/* Alerts Table (matching Screenshot 4) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#2d203e] text-gray-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="pb-3 px-3">Alert ID</th>
                <th className="pb-3 px-3">Zone</th>
                <th className="pb-3 px-3">Type</th>
                <th className="pb-3 px-3">Message</th>
                <th className="pb-3 px-3">Level</th>
                <th className="pb-3 px-3">Timestamp</th>
                <th className="pb-3 px-2 text-right">Dismiss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#271b36]">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <CheckCircle className="w-8 h-8 text-emerald-400 opacity-60" />
                      <p className="font-medium text-white">All Clear — No Active Alerts</p>
                      <p className="text-xs text-gray-500">All sensor readings remain within calibrated thresholds</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="hover:bg-[#251936]/80 transition-colors group"
                  >
                    <td className="py-3.5 px-3 font-semibold text-white font-mono">
                      {alert.id}
                    </td>
                    <td className="py-3.5 px-3 text-gray-300 font-medium">
                      {alert.zone}
                    </td>
                    <td className="py-3.5 px-3 text-gray-300">{alert.type}</td>
                    <td className="py-3.5 px-3 text-white font-medium">
                      {alert.message}
                    </td>
                    <td className="py-3.5 px-3">{getLevelBadge(alert.level)}</td>
                    <td className="py-3.5 px-3 text-gray-400 font-mono text-[11px]">
                      {alert.timestamp}
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="px-2 py-1 rounded-md text-xs text-gray-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                        title="Dismiss alert"
                      >
                        Dismiss
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
