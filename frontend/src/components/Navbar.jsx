import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Activity, 
  Moon, 
  Sun, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  FileText, 
  UserCheck, 
  Stethoscope, 
  Layers
} from 'lucide-react';
import BackendStatusBadge from './BackendStatusBadge';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  voiceEnabled, 
  setVoiceEnabled, 
  onOpenSOS,
  stats 
}) {
  const { theme, toggleTheme, isDark } = useTheme();

  const navItems = [
    { id: 'solutions', label: 'Medicines & Solutions', icon: Layers },
    { id: 'kiosk', label: 'Patient Kiosk Check-In', icon: UserCheck },
    { id: 'scanner', label: 'Prescription Scanner', icon: FileText },
    { id: 'doctor', label: 'Doctor OPD Desk', icon: Stethoscope },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b transition-colors duration-200 backdrop-blur-md bg-slate-950/80 border-slate-800 dark:bg-slate-950/85 dark:border-slate-800/80 light:bg-white/90 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => setActiveTab('solutions')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white dark:text-white light:text-slate-900">
                  Medi<span className="text-cyan-400">Kiosk</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  AI OPD
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 hidden sm:block">
                Allopathy • Ayurveda • Homeopathy
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 p-1.5 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md shadow-cyan-500/25 font-semibold'
                      : 'text-slate-400 hover:text-white dark:text-slate-400 dark:hover:text-white light:text-slate-600 light:hover:text-slate-900 hover:bg-slate-800/40 dark:hover:bg-slate-800/40 light:hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Real-time Backend Status */}
            <BackendStatusBadge />

            {/* Audio Voice Readout Toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? "Voice Assistant Enabled" : "Enable Audio Voice"}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                voiceEnabled 
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 light:bg-slate-100 light:border-slate-200 light:text-slate-600'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden md:inline">{voiceEnabled ? 'Audio ON' : 'Audio OFF'}</span>
            </button>

            {/* Dark / Light Mode Switcher (Default Dark) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Light and Dark Mode"
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold border transition-all bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300 dark:bg-slate-900/70 dark:border-slate-800 dark:text-slate-300 light:bg-slate-100 light:border-slate-300 light:text-slate-800"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-90 duration-300" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-500 transition-transform -rotate-12 hover:rotate-0 duration-300" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Emergency SOS Button */}
            <button
              onClick={onOpenSOS}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
            >
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>SOS 108</span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2.5 gap-1 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-white font-semibold'
                    : 'text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
