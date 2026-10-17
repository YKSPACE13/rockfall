import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Activity } from 'lucide-react';
import { useSensors } from '../context/SensorContext';
import { SensorDetailModal } from './SensorDetailModal';

export const SensorTable = ({ title = 'Sensor Network Status', showControls = true }) => {
  const { sensors, selectedSensor, setSelectedSensor } = useSensors();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredSensors = sensors.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'All' || s.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3d111c] text-red-400 border border-red-600/30">
            Critical
          </span>
        );
      case 'Warning':
      case 'Elevated':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3d2710] text-amber-300 border border-amber-500/30">
            Warning
          </span>
        );
      case 'Offline':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2d2538] text-gray-400 border border-gray-600/30">
            Offline
          </span>
        );
      case 'Normal':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0f3427] text-emerald-400 border border-emerald-500/30">
            Normal
          </span>
        );
    }
  };

  return (
    <div className="industrial-card p-5 sm:p-6">
      {/* Table Title and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
            {title}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Active geotechnical and telemetry nodes across all mine sub-levels
          </p>
        </div>

        {showControls && (
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search sensor ID or zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 sm:w-56 pl-9 pr-3 py-1.5 rounded-xl bg-[#171021] border border-[#342448] text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#171021] border border-[#342448] text-xs text-gray-300 focus:outline-hidden focus:border-purple-500 cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Vibration">Vibration</option>
              <option value="Temperature">Temperature</option>
              <option value="Tilt">Tilt</option>
              <option value="Moisture">Moisture</option>
              <option value="Humidity">Humidity</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#171021] border border-[#342448] text-xs text-gray-300 focus:outline-hidden focus:border-purple-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Normal">Normal</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#2d203e] text-gray-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="pb-3 px-3">Sensor ID</th>
              <th className="pb-3 px-3">Type</th>
              <th className="pb-3 px-3">Zone</th>
              <th className="pb-3 px-3">Value</th>
              <th className="pb-3 px-3">Status</th>
              <th className="pb-3 px-3">Last Updated</th>
              <th className="pb-3 px-2 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#271b36]">
            {filteredSensors.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  No sensors match the current filter criteria.
                </td>
              </tr>
            ) : (
              filteredSensors.map((sensor) => (
                <tr
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className="group hover:bg-[#251936]/80 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3 font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {sensor.id}
                  </td>
                  <td className="py-3 px-3 text-gray-300">{sensor.type}</td>
                  <td className="py-3 px-3 text-gray-300 font-medium">
                    {sensor.zone}
                  </td>
                  <td className="py-3 px-3 text-white font-mono font-medium">
                    {sensor.value} {sensor.value !== '--' ? sensor.unit : ''}
                  </td>
                  <td className="py-3 px-3">{getStatusBadge(sensor.status)}</td>
                  <td className="py-3 px-3 text-gray-400">{sensor.lastUpdated}</td>
                  <td className="py-3 px-2 text-right">
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 inline-block transition-transform group-hover:translate-x-0.5" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Sensor Modal */}
      {selectedSensor && (
        <SensorDetailModal
          sensor={selectedSensor}
          onClose={() => setSelectedSensor(null)}
        />
      )}
    </div>
  );
};
