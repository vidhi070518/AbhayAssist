import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  CheckSquare, 
  Square, 
  Truck, 
  Hospital, 
  MapPin, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';

export default function RelocationPlanModal({
  habitation,
  relocationSite,
  onClose,
  onExport
}) {
  const [checklist, setChecklist] = useState({
    routeCleared: true,
    transportNotified: false,
    hospitalAlerted: true,
    powerWaterChecked: false,
    volunteersBriefed: false
  });

  const toggleCheck = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const remaining = relocationSite.capacity - habitation.population;
  const busesNeeded = Math.ceil(habitation.population / 45);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Relocation Action Plan</h3>
              <p className="text-[11px] text-slate-400">Pre-Emptive Evacuation & Transit Protocol</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-200 text-xs">
          {/* Source to Destination Corridor Visual Card */}
          <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Origin (High Risk)</div>
              <div className="text-base font-extrabold text-white mt-0.5">{habitation.name}</div>
              <div className="text-rose-400 font-semibold text-[11px] mt-0.5">
                Risk {habitation.riskScore}/100 • {habitation.population.toLocaleString()} residents
              </div>
            </div>

            <div className="flex flex-col items-center px-4">
              <span className="text-[10px] font-bold text-cyan-400 mb-1">8.4 km Corridor</span>
              <div className="flex items-center space-x-2 text-cyan-400">
                <div className="h-[2px] w-12 bg-cyan-500/50"></div>
                <ArrowRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                <div className="h-[2px] w-12 bg-cyan-500/50"></div>
              </div>
              <span className="text-[9px] text-slate-500 mt-1">NH-66 Highway</span>
            </div>

            <div className="text-center sm:text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Destination (Safe Site)</div>
              <div className="text-base font-extrabold text-cyan-400 mt-0.5">{relocationSite.name}</div>
              <div className="text-emerald-400 font-semibold text-[11px] mt-0.5">
                Suitability {relocationSite.suitabilityScore}/100 • Cap {relocationSite.capacity.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Key Logistics Requisition Table */}
          <div>
            <div className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-2.5 flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>Transit Logistics & Fleet Deployment</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Buses Required</div>
                <div className="text-lg font-bold text-white mt-0.5">{busesNeeded} KSRTC Units</div>
                <div className="text-[9px] text-slate-500">45 pax per vehicle</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Ambulance Fleet</div>
                <div className="text-lg font-bold text-white mt-0.5">8 Ambulances</div>
                <div className="text-[9px] text-slate-500">Vulnerable / Elderly</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Capacity Margin</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">+{remaining} Buffer</div>
                <div className="text-[9px] text-slate-500">25% headroom</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Medical Readiness</div>
                <div className="text-lg font-bold text-cyan-400 mt-0.5">Periya CHC</div>
                <div className="text-[9px] text-slate-500">1.4 km from site</div>
              </div>
            </div>
          </div>

          {/* Field Verification Checklist */}
          <div>
            <div className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-2.5 flex items-center space-x-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <span>Field Verification Checklist (Interactive)</span>
            </div>
            <div className="space-y-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
              <label 
                onClick={() => toggleCheck('routeCleared')}
                className="flex items-center space-x-2.5 cursor-pointer hover:text-white p-1 rounded"
              >
                {checklist.routeCleared ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
                <span className={checklist.routeCleared ? 'line-through text-slate-500' : 'text-slate-300'}>
                  Confirm NH-66 transit corridor clearance with Kasaragod Traffic Sub-division.
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('transportNotified')}
                className="flex items-center space-x-2.5 cursor-pointer hover:text-white p-1 rounded"
              >
                {checklist.transportNotified ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
                <span className={checklist.transportNotified ? 'line-through text-slate-500' : 'text-slate-300'}>
                  Issue mobilization requisition order for 40 KSRTC buses from Kasaragod depot.
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('hospitalAlerted')}
                className="flex items-center space-x-2.5 cursor-pointer hover:text-white p-1 rounded"
              >
                {checklist.hospitalAlerted ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
                <span className={checklist.hospitalAlerted ? 'line-through text-slate-500' : 'text-slate-300'}>
                  Alert Periya CHC and Kasaragod General Hospital emergency triage teams.
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('powerWaterChecked')}
                className="flex items-center space-x-2.5 cursor-pointer hover:text-white p-1 rounded"
              >
                {checklist.powerWaterChecked ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
                <span className={checklist.powerWaterChecked ? 'line-through text-slate-500' : 'text-slate-300'}>
                  Verify functional 120 kVA generator fuel levels and 150,000L water tank chlorination.
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('volunteersBriefed')}
                className="flex items-center space-x-2.5 cursor-pointer hover:text-white p-1 rounded"
              >
                {checklist.volunteersBriefed ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
                <span className={checklist.volunteersBriefed ? 'line-through text-slate-500' : 'text-slate-300'}>
                  Deploy Civil Defence / Aapda Mitra volunteers to Mogral Puthur coastal wards.
                </span>
              </label>
            </div>
          </div>

          {/* Operational Advisory Banner */}
          <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl text-emerald-300 leading-relaxed text-[11px]">
            <strong>Operational Recommendation:</strong> Transition from monitoring to Stage-1 Proactive Relocation within 6 hours before forecasted high-tide swell crests.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
          >
            Close
          </button>

          <button
            onClick={() => {
              onExport();
              onClose();
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-xs font-bold transition shadow-lg shadow-cyan-950"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Relocation Brief</span>
          </button>
        </div>
      </div>
    </div>
  );
}
