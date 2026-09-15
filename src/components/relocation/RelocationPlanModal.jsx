import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  CheckSquare, 
  Square, 
  Truck, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { calculateDistanceKm } from '../../services/relocationEngine';

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

  const distanceKm = relocationSite.distanceKm || calculateDistanceKm(habitation?.coordinates, relocationSite?.coordinates);
  const remaining = relocationSite.capacity - habitation.population;
  const busesNeeded = Math.ceil(habitation.population / 45);
  const ambulancesNeeded = Math.max(2, Math.ceil(habitation.population * 0.003));
  const bufferPercent = Math.round((remaining / habitation.population) * 100);
  const nearestHosp = relocationSite.nearestHospital || 'District Hospital';

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full shadow-xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <ClipboardList className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Relocation Action Plan: {habitation.name}</h3>
              <p className="text-[11px] text-slate-500">Planned Evacuation & Transit Protocol to {relocationSite.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto text-slate-800 text-xs">
          {/* Origin to Destination Card */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Origin (High Risk)</div>
              <div className="text-base font-bold text-slate-900">{habitation.name}</div>
              <div className="text-red-700 font-semibold text-[11px]">
                Risk {habitation.riskScore}/100 • {habitation.population.toLocaleString()} residents
              </div>
            </div>

            <div className="flex flex-col items-center px-2">
              <span className="text-[10px] font-bold text-blue-700">~{distanceKm} km Transit</span>
              <div className="flex items-center space-x-1.5 text-blue-600 my-0.5">
                <div className="h-[2px] w-8 bg-blue-300"></div>
                <ArrowRight className="w-4 h-4" />
                <div className="h-[2px] w-8 bg-blue-300"></div>
              </div>
              <span className="text-[9px] text-slate-400">{relocationSite.roadAccessLevel.split('(')[0]}</span>
            </div>

            <div className="text-center sm:text-right">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Destination (Safe Site)</div>
              <div className="text-base font-bold text-blue-700">{relocationSite.name}</div>
              <div className="text-green-700 font-semibold text-[11px]">
                Suitability {relocationSite.suitabilityScore}/100 • Cap {relocationSite.capacity.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Logistics Summary */}
          <div>
            <div className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Transit Logistics Requirements</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500">Buses Needed</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">{busesNeeded} KSRTC Units</div>
                <div className="text-[9px] text-slate-400">45 pax per bus</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500">Ambulances</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">{ambulancesNeeded} Units</div>
                <div className="text-[9px] text-slate-400">For vulnerable/elderly</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500">Buffer Headroom</div>
                <div className={`text-base font-bold mt-0.5 ${remaining >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {remaining >= 0 ? `+${remaining.toLocaleString()}` : remaining.toLocaleString()}
                </div>
                <div className="text-[9px] text-slate-400">{bufferPercent >= 0 ? `+${bufferPercent}% headroom` : 'Deficit'}</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500">Medical Facility</div>
                <div className="text-base font-bold text-blue-700 mt-0.5 truncate" title={nearestHosp}>{nearestHosp}</div>
                <div className="text-[9px] text-slate-400">Designated triage centre</div>
              </div>
            </div>
          </div>

          {/* Interactive Field Checklist */}
          <div>
            <div className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
              <CheckSquare className="w-4 h-4 text-green-600" />
              <span>Field Verification Checklist</span>
            </div>
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label 
                onClick={() => toggleCheck('routeCleared')}
                className="flex items-center space-x-2.5 cursor-pointer p-1 rounded hover:bg-white"
              >
                {checklist.routeCleared ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className={checklist.routeCleared ? 'line-through text-slate-400' : 'text-slate-700'}>
                  Confirm transit corridor clearance via {relocationSite.roadAccessLevel.split('(')[0]} with Traffic Police.
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('transportNotified')}
                className="flex items-center space-x-2.5 cursor-pointer p-1 rounded hover:bg-white"
              >
                {checklist.transportNotified ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className={checklist.transportNotified ? 'line-through text-slate-400' : 'text-slate-700'}>
                  Issue mobilization requisition order for {busesNeeded} KSRTC buses from Kasaragod/Kanhangad depots.
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('hospitalAlerted')}
                className="flex items-center space-x-2.5 cursor-pointer p-1 rounded hover:bg-white"
              >
                {checklist.hospitalAlerted ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className={checklist.hospitalAlerted ? 'line-through text-slate-400' : 'text-slate-700'}>
                  Alert {nearestHosp} emergency triage team for resident reception.
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('powerWaterChecked')}
                className="flex items-center space-x-2.5 cursor-pointer p-1 rounded hover:bg-white"
              >
                {checklist.powerWaterChecked ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className={checklist.powerWaterChecked ? 'line-through text-slate-400' : 'text-slate-700'}>
                  Verify functional generator fuel reserves and clean drinking water tanks at {relocationSite.name}.
                </span>
              </label>

              <label 
                onClick={() => toggleCheck('volunteersBriefed')}
                className="flex items-center space-x-2.5 cursor-pointer p-1 rounded hover:bg-white"
              >
                {checklist.volunteersBriefed ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
                <span className={checklist.volunteersBriefed ? 'line-through text-slate-400' : 'text-slate-700'}>
                  Deploy Aapda Mitra / Civil Defence volunteers to {habitation.name} residential sectors.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition"
          >
            Close
          </button>

          <button
            onClick={() => {
              onExport();
              onClose();
            }}
            className="flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Relocation Brief</span>
          </button>
        </div>
      </div>
    </div>
  );
}
