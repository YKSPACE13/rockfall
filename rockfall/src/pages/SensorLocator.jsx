import React, { useState } from 'react';
import { useSensors } from '../context/SensorContext';
import { MinerMap } from '../components/MinerMap';
import { AlertOctagon, Radio, ShieldAlert, CheckCircle2, PhoneCall } from 'lucide-react';
import { playAlertSound } from '../utils/soundUtils';

export const SensorLocator = () => {
  const { miners, selectedMiner, setSelectedMiner } = useSensors();
  const [sosAcknowledged, setSosAcknowledged] = useState(false);

  const handleDispatchRescue = () => {
    playAlertSound('critical');
    setSosAcknowledged(true);
    alert('🚨 Emergency Rescue Protocol Dispatched! Rapid Response Team Alpha deployed to Sector 5 Level 4.');
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Page Header (matching Screenshot 5) */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Miner Locator
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/80 font-medium mt-0.5">
          Rockfall Prediction System & Underground Telemetry
        </p>
      </div>

      {/* Main Grid: Map Panel (Left) and Roster / Rescue Panels (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Map Panel (matching Screenshot 5) */}
        <div className="lg:col-span-8">
          <MinerMap />
        </div>

        {/* Right Column: Miner Roster & Status + Rescue & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Miner Roster & Status Card (matching Screenshot 5) */}
          <div className="industrial-card p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[#2e213e] pb-3 mb-4">
              <h2 className="text-base font-bold text-white tracking-wide">
                Miner Roster & Status
              </h2>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                4 Deployed
              </span>
            </div>

            {/* Miners list */}
            <div className="space-y-4">
              {miners.map((miner) => {
                const isSelected = selectedMiner?.id === miner.id;
                const isHighRisk = miner.status.includes('High-Risk');
                const isWarning = miner.status.includes('Ping');

                return (
                  <div
                    key={miner.id}
                    onClick={() => setSelectedMiner(miner)}
                    className={`flex items-center gap-3.5 p-3 rounded-xl transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#312048] border border-purple-500/50 shadow-md'
                        : 'bg-[#181122]/70 hover:bg-[#251936] border border-transparent'
                    }`}
                  >
                    {/* Circle Avatar (e.g. SC, MR, W, LW in purple circle) */}
                    <div className="w-10 h-10 rounded-full bg-[#3d2456] border border-purple-400/30 flex items-center justify-center text-xs font-bold text-purple-200 shrink-0">
                      {miner.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                          {miner.name}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono">
                          ID: {miner.id}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span
                          className={`font-medium ${
                            isHighRisk
                              ? 'text-red-400'
                              : isWarning
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          Status: {miner.status}
                        </span>
                        <span className="text-gray-400 font-medium">
                          Zone: {miner.zone.replace('Zone ', '')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rescue & Alerts Card (matching bottom right in Screenshot 5) */}
          <div className="industrial-card p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[#2e213e] pb-3 mb-4">
              <h2 className="text-base font-bold text-white tracking-wide">
                Rescue & Alerts
              </h2>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>

            {/* Emergency Maroon/Red Box */}
            <div className="p-4 rounded-xl bg-[#391219] border border-red-500/40 text-white space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center gap-2 text-red-300 font-bold text-sm">
                <AlertOctagon className="w-5 h-5 text-red-400 animate-pulse shrink-0" />
                <span>EMERGENCY: Miner Down</span>
              </div>

              <div className="text-xs text-red-200/90 space-y-0.5 pl-7">
                <p>SOS signal from ID-112</p>
                <p className="text-red-300/80 font-mono text-[11px]">
                  Last Known Position: Sector 5
                </p>
              </div>

              <div className="pt-2 pl-7">
                <button
                  onClick={handleDispatchRescue}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                    sosAcknowledged
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-red-600 hover:bg-red-500 text-white animate-pulse'
                  }`}
                >
                  {sosAcknowledged ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Rescue Team Dispatched
                    </>
                  ) : (
                    <>
                      <PhoneCall className="w-3.5 h-3.5" />
                      Dispatch Rescue Team
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
