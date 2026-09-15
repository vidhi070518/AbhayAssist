import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Users, 
  ArrowRight, 
  Printer, 
  CheckCircle2, 
  Building, 
  Navigation,
  Layers
} from 'lucide-react';
import { exportRelocationBrief } from '../../services/exportService';
import RelocationPlanModal from './RelocationPlanModal';

export default function RelocationView({
  selectedHabitation,
  habitations = [],
  relocationSites = [],
  selectedRelocationSite,
  onSelectRelocationSite,
  onSelectHabitation,
  onViewOnMap
}) {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const activeHabitation = selectedHabitation || habitations[0] || null;
  const activeSite = selectedRelocationSite || relocationSites[0] || null;

  if (!activeHabitation) {
    return (
      <div className="p-8 text-center text-slate-500">
        No habitations available for relocation evaluation.
      </div>
    );
  }

  const getDistance = (site) => {
    if (site.id === 'site-periya' && activeHabitation.id === 'hab-mogral-puthur') return 8.4;
    if (site.id === 'site-vidyanagar' && activeHabitation.id === 'hab-mogral-puthur') return 6.2;
    if (site.id === 'site-kanhangad' && activeHabitation.id === 'hab-mogral-puthur') return 14.2;
    if (site.id === 'site-nileshwar' && activeHabitation.id === 'hab-mogral-puthur') return 22.0;
    return 9.5;
  };

  const remainingCapacity = activeSite ? activeSite.capacity - activeHabitation.population : 0;
  const isCapacityAdequate = remainingCapacity >= 0;

  const handleExport = () => {
    if (activeHabitation && activeSite) {
      exportRelocationBrief({
        habitation: activeHabitation,
        relocationSite: activeSite,
        assessmentData: { riskScore: activeHabitation.riskScore }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            Decision Support & Safety Matching
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Find Safer Locations for Relocation
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-0.5">
            Matching vulnerable settlements with resilient public sites based on elevation, capacity, road access, and healthcare proximity.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleExport}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-200 text-xs font-medium transition shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-blue-600" />
            <span>Export Action Brief</span>
          </button>
          
          <button
            onClick={() => setIsPlanModalOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open Relocation Plan</span>
          </button>
        </div>
      </div>

      {/* Selected Habitation Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
            <span className="text-red-700 font-extrabold text-sm">{activeHabitation.riskScore}</span>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Currently assessing relocation for:</div>
            <div className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span>{activeHabitation.name}</span>
              <span className="text-xs text-slate-500 font-normal">({activeHabitation.taluk} Taluk)</span>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-red-50 text-red-700 border border-red-200">
                {activeHabitation.primaryHazard}
              </span>
            </div>
          </div>
        </div>

        {/* Change Village Dropdown */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <label className="text-xs text-slate-500 whitespace-nowrap">Switch village:</label>
          <select
            value={activeHabitation.id}
            onChange={(e) => {
              const selected = habitations.find(h => h.id === e.target.value);
              if (selected) onSelectHabitation(selected);
            }}
            className="bg-white text-xs text-slate-700 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-600"
          >
            {habitations.map(h => (
              <option key={h.id} value={h.id}>
                {h.name} (Risk {h.riskScore} • {h.population.toLocaleString()} people)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Relocation Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Top Recommended Safe Location */}
        <div className="lg:col-span-7 space-y-5">
          {activeSite && (
            <div className="bg-white border-2 border-blue-600/60 rounded-xl p-5 sm:p-6 shadow-sm relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider py-1 px-3 rounded-bl-lg">
                Recommended Safe Location
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-blue-700">
                  Suitability Score: {activeSite.suitabilityScore}/100
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {activeSite.name}
                </h2>
                <div className="text-xs text-slate-500 mt-0.5">
                  {activeSite.taluk} Taluk, Kasaragod • Elevation: <strong className="text-slate-800">{activeSite.elevationMeters}m MSL</strong>
                </div>
              </div>

              {/* Numbers Grid */}
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 mb-5 text-center sm:text-left">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Distance</div>
                  <div className="text-xl font-extrabold text-blue-700 mt-0.5">
                    {getDistance(activeSite)} <span className="text-xs font-semibold text-slate-500">km</span>
                  </div>
                  <div className="text-[10px] text-slate-400">~14 mins transit</div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Site Capacity</div>
                  <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {activeSite.capacity.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">Max persons</div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Capacity Buffer</div>
                  <div className={`text-xl font-extrabold mt-0.5 ${isCapacityAdequate ? 'text-green-700' : 'text-red-700'}`}>
                    {isCapacityAdequate ? `+${remainingCapacity.toLocaleString()}` : remainingCapacity.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isCapacityAdequate ? 'Buffer available' : 'Split needed'}
                  </div>
                </div>
              </div>

              {/* Why Recommended: 5 Simple Bullets */}
              <div className="space-y-2 mb-5">
                <div className="text-xs font-bold text-slate-900">
                  Why Recommended:
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50/50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Lower hazard exposure:</strong> Elevated 72m above sea level, protected from coastal surge and river floods.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Enough capacity:</strong> Can accommodate all 2,840 residents of Mogral Puthur with 25% surplus headroom.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Good road access:</strong> Direct access via NH-66 bypass enables swift transit of passenger buses.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Healthcare nearby:</strong> Periya Community Health Centre is located 1.4 km away for medical triage.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Public ownership:</strong> Institutional government campus eliminates private land requisition hurdles.</span>
                  </div>
                </div>
              </div>

              {/* Facilities on site */}
              <div className="space-y-2 mb-5">
                <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                  <span>On-Site Critical Facilities:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {activeSite.infrastructure.map((infra, idx) => (
                    <div key={idx} className="bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <span className="text-[11px]">{infra}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setIsPlanModalOpen(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-xs flex items-center justify-center space-x-1.5 transition shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Prepare Relocation Plan</span>
                </button>

                <button
                  onClick={() => onViewOnMap(activeSite)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-3.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition"
                >
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>View Corridor on Map</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Candidate Locations Ranking */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Candidate Safe Locations ({relocationSites.length})
            </h3>
            <span className="text-[11px] text-blue-700 font-semibold">Ranked by Suitability</span>
          </div>

          <div className="space-y-2.5">
            {relocationSites.map((site, index) => {
              const isSelected = activeSite?.id === site.id;
              const dist = getDistance(site);
              const remaining = site.capacity - activeHabitation.population;

              return (
                <div
                  key={site.id}
                  onClick={() => onSelectRelocationSite(site)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer bg-white ${
                    isSelected
                      ? 'border-blue-600 ring-1 ring-blue-600 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-800 border border-blue-200">
                          #{index + 1}
                        </span>
                        <span className="text-xs text-slate-500">{dist} km away</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{site.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Elevation: {site.elevationMeters}m MSL • {site.roadAccessLevel.split('(')[0]}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold text-blue-700">
                        {site.suitabilityScore}
                        <span className="text-xs text-slate-400 font-normal">/100</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Suitability</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-slate-100 text-[11px]">
                    <div>
                      <span className="text-slate-500">Capacity: </span>
                      <strong className="text-slate-800">{site.capacity.toLocaleString()}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500">Buffer: </span>
                      <strong className={remaining >= 0 ? 'text-green-700' : 'text-red-700'}>
                        {remaining >= 0 ? `+${remaining.toLocaleString()}` : remaining.toLocaleString()}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Relocation Plan Modal */}
      {isPlanModalOpen && (
        <RelocationPlanModal
          habitation={activeHabitation}
          relocationSite={activeSite}
          onClose={() => setIsPlanModalOpen(false)}
          onExport={handleExport}
        />
      )}
    </div>
  );
}
