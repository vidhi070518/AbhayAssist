import React from 'react';
import { 
  ShieldAlert, 
  Map as MapIcon, 
  ListOrdered, 
  Navigation, 
  Sliders, 
  Bell, 
  Database,
  ExternalLink,
  Radio
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, alertCount = 2 }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: ShieldAlert },
    { id: 'map', label: 'Risk Map', icon: MapIcon, highlight: true },
    { id: 'priority', label: 'Priority Queue', icon: ListOrdered },
    { id: 'relocation', label: 'Relocation Hub', icon: Navigation },
    { id: 'simulation', label: 'Scenario Simulation', icon: Sliders },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: alertCount },
    { id: 'datasources', label: 'Data & Sources', icon: Database },
  ];

  return (
    <header className="bg-[#0f172a] border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Subtitle */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  ABHAY<span className="text-cyan-400">ASSIST</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Disaster Intelligence & Proactive Relocation Platform
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  } ${item.highlight && !isActive ? 'border border-cyan-500/30 text-cyan-200' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-orange-600 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status Badge */}
          <div className="flex items-center space-x-3">
            <div className="hidden xl:flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-2.5 py-1.5 rounded-lg text-[11px]">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-slate-300">Kasaragod EOC Active</span>
            </div>
            <button
              onClick={() => setActiveTab('map')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-cyan-900/40 border border-cyan-400/30 transition flex items-center space-x-1.5"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Launch Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex overflow-x-auto px-2 py-1.5 bg-slate-950 border-t border-slate-800/80 space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 flex items-center space-x-1 px-2.5 py-1.5 rounded text-[11px] font-medium ${
                isActive ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50' : 'text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-1 py-0.1 text-[9px] font-bold rounded bg-orange-600 text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
