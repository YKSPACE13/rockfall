import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  MapPin,
  BarChart3,
  Bell,
  FileText,
  Sliders,
  ShieldAlert,
  HardHat,
  X,
} from 'lucide-react';
import { useSensors } from '../context/SensorContext';

export const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Sensors', path: '/sensors', icon: Activity },
  { name: 'Sensor Locator', path: '/locator', icon: MapPin },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Alerts', path: '/alerts', icon: Bell, showBadge: true },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Threshold', path: '/threshold', icon: Sliders },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const { alerts } = useSensors();
  const alertCount = alerts.filter((a) => !a.dismissed).length;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#22162b] border-r border-[#31203d] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-18 flex items-center justify-between px-6 border-b border-[#31203d]/60">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white tracking-tight">
                RockSafe AI
              </span>
              <span className="text-[10px] text-purple-300/70 font-mono tracking-wider uppercase">
                Mining Safety OS
              </span>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-purple-300 hover:bg-[#342242] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-3.5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#3d2454] text-white shadow-sm shadow-purple-950/40'
                      : 'text-[#a394b2] hover:text-white hover:bg-[#2c1d37]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{item.name}</span>
                </div>

                {item.showBadge && alertCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                    {alertCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Mine Badge */}
        <div className="p-4 m-3.5 rounded-xl bg-[#1b1022] border border-[#362243] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
            <HardHat className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">Copper Ridge</p>
            <p className="text-[11px] text-purple-300/60 truncate">Sector 7 • Stope Alpha</p>
          </div>
        </div>
      </aside>
    </>
  );
};
