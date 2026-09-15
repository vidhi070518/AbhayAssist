import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Map as MapIcon, 
  ListOrdered, 
  Navigation, 
  Sliders, 
  Bell, 
  Info,
  Radio
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, alertCount = 2 }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: ShieldCheck },
    { id: 'map', label: 'Risk Map', icon: MapIcon, highlight: true },
    { id: 'priority', label: 'Priority Areas', icon: ListOrdered },
    { id: 'relocation', label: 'Relocation Hub', icon: Navigation },
    { id: 'simulation', label: 'Scenario Planning', icon: Sliders },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: alertCount },
    { id: 'datasources', label: 'About Data', icon: Info },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Subtitle */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  Abhay<span className="text-blue-600">Assist</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Kasaragod
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Disaster Decision-Support & Proactive Relocation
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
                  className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-orange-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action & Operational Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden xl:flex items-center space-x-2 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Operations Active</span>
            </div>

            <button
              onClick={() => setActiveTab('map')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition flex items-center space-x-1.5"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Open Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Scrollbar */}
      <div className="md:hidden flex overflow-x-auto px-2 py-1.5 bg-slate-50 border-t border-slate-200 space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 flex items-center space-x-1 px-2.5 py-1.5 rounded text-[11px] font-medium ${
                isActive ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-slate-600'
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
