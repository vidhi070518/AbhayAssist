import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';

export default function MapLegend() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="absolute bottom-6 left-6 z-[1000] bg-slate-900/95 border border-slate-700/80 rounded-lg shadow-2xl backdrop-blur-md text-xs text-slate-200 p-3 max-w-[260px]">
      <div 
        className="flex items-center justify-between cursor-pointer pb-1.5 border-b border-slate-800"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-1.5 font-bold tracking-wide text-slate-100">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>MAP LEGEND</span>
        </div>
        <button className="text-slate-400 hover:text-white">
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-2.5 space-y-3">
          {/* Risk Levels */}
          <div>
            <div className="text-[10px] font-semibold uppercase text-slate-400 mb-1.5 tracking-wider">
              Habitation Risk Level
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 border border-white shadow-sm"></span>
                <span className="font-medium text-slate-200">High Risk (Score ≥ 70)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-white shadow-sm"></span>
                <span className="font-medium text-slate-200">Moderate Risk (50–69)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-sm"></span>
                <span className="font-medium text-slate-200">Low Risk (&lt; 50)</span>
              </div>
            </div>
          </div>

          {/* Key Entities */}
          <div>
            <div className="text-[10px] font-semibold uppercase text-slate-400 mb-1.5 tracking-wider">
              Strategic Assets
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-sm bg-cyan-400 border border-white shadow-sm flex items-center justify-center text-[9px] font-bold text-slate-950">
                  S
                </span>
                <span>Candidate Safe Relocation Site</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 border border-white text-white flex items-center justify-center text-[8px] font-bold">
                  +
                </span>
                <span>Hospital / Health Centre</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-sm bg-purple-600 border border-white text-white flex items-center justify-center text-[8px] font-bold">
                  ▲
                </span>
                <span>Designated Cyclone Shelter</span>
              </div>
            </div>
          </div>

          {/* Prototype Hazard Overlays */}
          <div>
            <div className="text-[10px] font-semibold uppercase text-slate-400 mb-1.5 tracking-wider">
              Prototype Hazard Polygons
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-2 rounded bg-rose-500/40 border border-rose-500"></span>
                <span>Coastal Erosion Corridor</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-2 rounded bg-blue-500/40 border border-blue-500"></span>
                <span>River Flood Basin</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-2 rounded bg-amber-500/40 border border-amber-500"></span>
                <span>Landslide Slope Zone</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
