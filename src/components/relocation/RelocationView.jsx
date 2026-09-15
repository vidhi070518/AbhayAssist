import React, { useState, useMemo } from 'react';
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
import { getRankedRelocationSites, calculateDistanceKm } from '../../services/relocationEngine';
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

  // Contextually rank all candidate sites for the active habitation
  const rankedCandidates = useMemo(() => {
    if (!activeHabitation) return [];
    return getRankedRelocationSites(activeHabitation, relocationSites);
  }, [activeHabitation, relocationSites]);

  // Match the user's selected relocation site or fall back to the top ranked option
  const activeSite = useMemo(() => {
    if (selectedRelocationSite) {
      const match = rankedCandidates.find(s => s.id === selectedRelocationSite.id);
      if (match) return match;
    }
    return rankedCandidates[0] || null;
  }, [selectedRelocationSite, rankedCandidates]);

  if (!activeHabitation) {
    return (
      <div className="p-8 text-center text-slate-500">
        No habitations available for relocation evaluation.
      </div>
    );
  }

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
            Safer relocation options for {activeHabitation.name}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-0.5">
            Evaluating safe public sites for {activeHabitation.population.toLocaleString()} exposed residents based on transit distance, capacity buffer, high-ground elevation, and healthcare proximity.
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
                  <div className="text-[11px] text-slate-500 font-medium">Estimated Distance</div>
                  <div className="text-xl font-extrabold text-blue-700 mt-0.5">
                    {activeSite.distanceKm} <span className="text-xs font-semibold text-slate-500">km</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Direct transit corridor</div>
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

              {/* Why Recommended: Contextual Bullets */}
              <div className="space-y-2 mb-5">
                <div className="text-xs font-bold text-slate-900">
                  Why Recommended for {activeHabitation.name}:
                </div>
                <div className="space-y-2 text-xs text-slate-700 bg-slate-50/70 p-3.5 rounded-lg border border-slate-200">
                  {activeSite.whyRecommended?.map((reason, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{reason}</span>
                    </div>
                  ))}
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
              Candidate Safe Locations ({rankedCandidates.length})
            </h3>
            <span className="text-[11px] text-blue-700 font-semibold">Ranked for {activeHabitation.name}</span>
          </div>

          <div className="space-y-2.5">
            {rankedCandidates.map((site, index) => {
              const isSelected = activeSite?.id === site.id;
              const isTop = index === 0;

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
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                          isTop ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}>
                          #{index + 1} {isTop ? 'Top Match' : ''}
                        </span>
                        <span className="text-xs text-slate-500">~{site.distanceKm} km estimated distance</span>
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
                      <strong className={site.buffer >= 0 ? 'text-green-700' : 'text-red-700'}>
                        {site.buffer >= 0 ? `+${site.buffer.toLocaleString()}` : site.buffer.toLocaleString()}
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
