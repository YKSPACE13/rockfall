import React, { useState } from 'react';
import { FileText, FileSpreadsheet, Settings, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { useSensors } from '../context/SensorContext';
import { generatePDFReport, exportToCSV } from '../utils/reportExport';
import { CustomReportModal } from '../components/CustomReportModal';

export const Reports = () => {
  const { sensors, alerts, riskScore, riskLabel } = useSensors();
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [lastExportMessage, setLastExportMessage] = useState(null);

  const showNotification = (msg) => {
    setLastExportMessage(msg);
    setTimeout(() => setLastExportMessage(null), 4000);
  };

  const handleDownloadDailyPDF = () => {
    generatePDFReport({
      title: 'Daily Mining Safety & Geotechnical Assessment',
      riskScore,
      riskLabel,
      sensors,
      alerts,
      includePredictions: true,
    });
    showNotification('Daily Safety Report PDF successfully generated & downloaded!');
  };

  const handleExportWeeklyCSV = () => {
    const csvData = sensors.map((s) => ({
      SensorID: s.id,
      Type: s.type,
      Zone: s.zone,
      Value: s.value,
      Unit: s.unit,
      Status: s.status,
      LastUpdated: s.lastUpdated,
      Signal: s.signal,
      Battery: s.battery,
    }));
    exportToCSV(csvData, `weekly-mine-analytics-${new Date().toISOString().slice(0, 10)}.csv`);
    showNotification('Weekly Analytics CSV successfully exported & downloaded!');
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Page Title & Notification */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Safety & Geotechnical Reports
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Audit-grade safety compliance exports, CSV sensor logs, and PDF intelligence summaries
          </p>
        </div>

        {lastExportMessage && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{lastExportMessage}</span>
          </div>
        )}
      </div>

      {/* 3 Large Report Cards (recreating Screenshot 6 / Section 9) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Daily Safety Report */}
        <div className="industrial-card p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
              <FileText className="w-6 h-6" />
            </div>

            <h2 className="text-lg font-bold text-white tracking-wide">
              Daily Safety Report
            </h2>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Comprehensive daily analysis of sensor data and risk assessments. Includes live geotechnical index, active zone metrics, and emergency threshold logs.
            </p>

            <div className="mt-4 pt-4 border-t border-[#2e213e] flex items-center justify-between text-[11px] text-gray-400">
              <span>Format: PDF</span>
              <span>Generated in real-time</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleDownloadDailyPDF}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-900/30 active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Card 2: Weekly Analytics Report */}
        <div className="industrial-card p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
              <FileSpreadsheet className="w-6 h-6" />
            </div>

            <h2 className="text-lg font-bold text-white tracking-wide">
              Weekly Analytics Report
            </h2>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Detailed trends, patterns, and AI predictions for the past week. Formatted in standard CSV suitable for mining engineering spreadsheets and CAD simulation tools.
            </p>

            <div className="mt-4 pt-4 border-t border-[#2e213e] flex items-center justify-between text-[11px] text-gray-400">
              <span>Format: CSV</span>
              <span>8 Active Sensors Recorded</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleExportWeeklyCSV}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2a1d37] hover:bg-[#39244c] border border-purple-500/40 text-purple-200 text-xs font-bold transition-all active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Card 3: Custom Report Builder */}
        <div className="industrial-card p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
              <Settings className="w-6 h-6" />
            </div>

            <h2 className="text-lg font-bold text-white tracking-wide">
              Custom Report Builder
            </h2>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Create custom reports with specific date ranges and parameters. Filter by sensor categories, include AI neural projections, or audit emergency response logs.
            </p>

            <div className="mt-4 pt-4 border-t border-[#2e213e] flex items-center justify-between text-[11px] text-gray-400">
              <span>Format: PDF or CSV</span>
              <span>User Configurable</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2a1d37] hover:bg-[#39244c] border border-amber-500/40 text-amber-300 text-xs font-bold transition-all active:scale-98"
            >
              <Settings className="w-4 h-4" />
              <span>Configure Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Compliance & Audit Banner */}
      <div className="p-5 rounded-2xl bg-[#1b1225] border border-purple-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">
              MSHA / ISO 45001 Compliance Guaranteed
            </h4>
            <p className="text-xs text-gray-400">
              All exported logs meet underground geotechnical stability telemetry standards with cryptographic timestamp verification.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-purple-300 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 shrink-0">
          Engine: RS-Export-4.2
        </span>
      </div>

      {/* Custom Report Configuration Modal */}
      <CustomReportModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
    </div>
  );
};
