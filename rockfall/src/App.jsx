import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { SensorProvider } from './context/SensorContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';

import { Dashboard } from './pages/Dashboard';
import { Sensors } from './pages/Sensors';
import { SensorLocator } from './pages/SensorLocator';
import { Analytics } from './pages/Analytics';
import { Alerts } from './pages/Alerts';
import { Reports } from './pages/Reports';
import { Threshold } from './pages/Threshold';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/locator" element={<SensorLocator />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/threshold" element={<Threshold />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <SensorProvider>
        <Router>
          <div className="min-h-screen bg-[#130f19] text-[#e5e7eb] flex flex-col font-sans transition-colors duration-200">
            {/* Sidebar Navigation */}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Application Area */}
            <div className="lg:pl-64 flex flex-col min-h-screen flex-1">
              {/* Top Navigation Bar */}
              <Topbar onOpenSidebar={() => setIsSidebarOpen(true)} />

              {/* Page Content Viewport */}
              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                <AnimatedRoutes />
              </main>

              {/* Clean Industrial Footer */}
              <footer className="py-4 px-6 border-t border-[#251b32] text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>RockSafe AI Core Engine v4.8 • Telemetry Sub-level 7 Active</span>
                </div>
                <div className="text-[11px] text-gray-400">
                  Simulated Demo Environment • No Live Explosive Triggers
                </div>
              </footer>
            </div>
          </div>
        </Router>
      </SensorProvider>
    </ThemeProvider>
  );
}

export default App;
