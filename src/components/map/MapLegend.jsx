import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';

export default function MapLegend() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 border border-slate-200 rounded-lg shadow-md text-xs text-slate-700 p-3 max-w-[240px]">
      <div 
        className="flex items-center justify-between cursor-pointer pb-1.5 border-b border-slate-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-1.5 font-bold text-slate-800 text-[11px] tracking-wide">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>MAP LEGEND</span>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-2 space-y-2.5 text-[11px]">
          {/* Risk Levels */}
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">
              Risk Level
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <span>High Risk (Score ≥ 70)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Moderate Risk (50–69)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                <span>Lower Risk (&lt; 50)</span>
              </div>
            </div>
          </div>

          {/* Map Entities */}
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">
              Locations & Facilities
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 flex items-center justify-center text-[8px] text-white font-bold">
                  S
                </span>
                <span>Safe Relocation Site</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[7px] font-bold">
                  +
                </span>
                <span>Healthcare Facility</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-600 text-white flex items-center justify-center text-[7px] font-bold">
                  ▲
                </span>
                <span>Cyclone Shelter</span>
              </div>
            </div>
          </div>

          {/* Hazard Zones */}
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">
              Hazard Zones
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-2 rounded bg-red-100 border border-red-500"></span>
                <span>Coastal Erosion Zone</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-2 rounded bg-blue-100 border border-blue-500"></span>
                <span>River Flood Basin</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-2 rounded bg-amber-100 border border-amber-500"></span>
                <span>Landslide Slope Area</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
