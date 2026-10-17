import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckSquare, FileText, Download } from 'lucide-react';
import { generatePDFReport, exportToCSV } from '../utils/reportExport';
import { useSensors } from '../context/SensorContext';

export const CustomReportModal = ({ isOpen, onClose }) => {
  const { sensors, alerts, riskScore, riskLabel } = useSensors();

  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportTitle, setReportTitle] = useState('Copper Ridge Mining Safety Audit');
  const [format, setFormat] = useState('pdf');
  const [selectedTypes, setSelectedTypes] = useState({
    Vibration: true,
    Temperature: true,
    Tilt: true,
    Moisture: true,
    Humidity: true,
  });
  const [includeAlerts, setIncludeAlerts] = useState(true);
  const [includePredictions, setIncludePredictions] = useState(true);

  if (!isOpen) return null;

  const handleToggleType = (type) => {
    setSelectedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleGenerate = () => {
    const filteredSensors = sensors.filter((s) => selectedTypes[s.type]);
    const filteredAlerts = includeAlerts ? alerts : [];

    if (format === 'pdf') {
      generatePDFReport({
        title: reportTitle,
        riskScore,
        riskLabel,
        sensors: filteredSensors,
        alerts: filteredAlerts,
        includePredictions,
      });
    } else {
      const csvData = filteredSensors.map((s) => ({
        SensorID: s.id,
        Type: s.type,
        Zone: s.zone,
        Value: s.value,
        Unit: s.unit,
        Status: s.status,
        LastUpdated: s.lastUpdated,
      }));
      exportToCSV(csvData, `${reportTitle.toLowerCase().replace(/\s+/g, '-')}.csv`);
    }

    onClose();
  };

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

        {/* Modal Dialog */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-xl bg-[#1f162c] border border-purple-500/40 rounded-2xl p-6 shadow-2xl z-10 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#312246] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-lg text-white">Custom Safety Report Builder</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#2d1e3e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 my-5 text-xs sm:text-sm">
            {/* Report Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Report Name / Subject
              </label>
              <input
                type="text"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#160f21] border border-[#342448] text-xs text-white focus:outline-hidden focus:border-purple-500"
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-[#160f21] border border-[#342448] text-xs text-white focus:outline-hidden focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-[#160f21] border border-[#342448] text-xs text-white focus:outline-hidden focus:border-purple-500"
                />
              </div>
            </div>

            {/* Sensors to Include */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Sensor Types to Include
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(selectedTypes).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => handleToggleType(type)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs transition-colors ${
                      selectedTypes[type]
                        ? 'bg-purple-600/25 border-purple-500/50 text-white font-medium'
                        : 'bg-[#160f21] border-[#312044] text-gray-400'
                    }`}
                  >
                    <CheckSquare
                      className={`w-3.5 h-3.5 ${
                        selectedTypes[type] ? 'text-purple-400' : 'text-gray-500'
                      }`}
                    />
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Sections */}
            <div className="space-y-2 pt-2 border-t border-[#312246]">
              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAlerts}
                  onChange={(e) => setIncludeAlerts(e.target.checked)}
                  className="rounded bg-[#160f21] border-purple-500/40 text-purple-600 focus:ring-0"
                />
                <span>Include Incident Alert Log</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includePredictions}
                  onChange={(e) => setIncludePredictions(e.target.checked)}
                  className="rounded bg-[#160f21] border-purple-500/40 text-purple-600 focus:ring-0"
                />
                <span>Include AI Geotechnical Risk Assessment</span>
              </label>
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Output Format
              </label>
              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="pdf"
                    checked={format === 'pdf'}
                    onChange={() => setFormat('pdf')}
                    className="text-purple-600 focus:ring-0"
                  />
                  <span>PDF Document (.pdf)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={format === 'csv'}
                    onChange={() => setFormat('csv')}
                    className="text-purple-600 focus:ring-0"
                  />
                  <span>Spreadsheet Raw Data (.csv)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#312246]">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:bg-[#2d1e3d] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-900/30"
            >
              <Download className="w-4 h-4" />
              <span>Generate & Download</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
