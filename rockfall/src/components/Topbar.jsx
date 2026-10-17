import React from 'react';
import { Volume2, Sun, Moon, Menu, Play, Pause, Radio } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSensors } from '../context/SensorContext';
import { playAlertSound } from '../utils/soundUtils';

export const Topbar = ({ onOpenSidebar }) => {
  const { isDark, toggleTheme } = useTheme();
  const { isSimulating, setIsSimulating, lastUpdatedTime } = useSensors();

  const handleSoundDemo = () => {
    playAlertSound('warning');
  };

  return (
    <header className="h-16 px-4 md:px-8 border-b border-[#291e34] bg-[#140f1a]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Project Location */}
      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-purple-300 hover:bg-[#2b1b36] transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-200">
              Project: <span className="text-white font-semibold">Copper Ridge Mine - Sector 7</span>
            </span>
          </div>
        </div>

        {/* Live Monitoring Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-semibold text-emerald-400 tracking-wider">
            LIVE MONITORING
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Simulation Pause / Resume */}
        <button
          onClick={() => setIsSimulating(!isSimulating)}
          title={isSimulating ? 'Pause live simulation' : 'Resume live simulation'}
          className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            isSimulating
              ? 'bg-[#251731] border-[#3d274e] text-purple-200 hover:bg-[#321f42]'
              : 'bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25'
          }`}
        >
          {isSimulating ? <Pause className="w-3.5 h-3.5 text-purple-400" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
          <span>{isSimulating ? 'Simulating' : 'Paused'}</span>
        </button>

        {/* Alert Sound Demo button (matches screenshot) */}
        <button
          onClick={handleSoundDemo}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#2a1d35] hover:bg-[#362444] text-purple-200 border border-[#402a4e] transition-all hover:scale-102 active:scale-98 shadow-sm"
          title="Test industrial siren tone"
        >
          <Volume2 className="w-3.5 h-3.5 text-purple-400" />
          <span>Alert Sound Demo</span>
        </button>

        {/* Dark / Light Toggle (matches screenshot) */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#2a1d35] hover:bg-[#362444] text-purple-200 border border-[#402a4e] transition-colors"
          title="Toggle Dark/Light theme"
        >
          {isDark ? (
            <>
              <Moon className="w-3.5 h-3.5 text-purple-300" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light</span>
            </>
          )}
        </button>

        {/* User Profile (matches screenshot "Dr. Sarah Chen") */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#2e213b]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-1 ring-purple-400/30">
            SC
          </div>
          <span className="hidden sm:inline text-xs font-medium text-gray-200">
            Dr. Sarah Chen
          </span>
        </div>
      </div>
    </header>
  );
};
