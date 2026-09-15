import React from 'react';
import { 
  ShieldCheck, 
  Map as MapIcon, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Navigation, 
  Sliders, 
  Bell, 
  ArrowRight, 
  MapPin, 
  Building,
  Radio
} from 'lucide-react';

export default function OverviewView({
  habitations = [],
  relocationSites = [],
  onSelectHabitation,
  onOpenMap,
  onOpenRelocation,
  onOpenSimulation,
  onOpenAlerts
}) {
  const highRiskHabitations = habitations.filter(h => h.riskScore >= 70);
  const totalPeopleAtRisk = habitations.reduce((sum, h) => sum + (h.population || 0), 0);
  const totalSafeCapacity = relocationSites.reduce((sum, s) => sum + (s.capacity || 0), 0);
  const topRelocationSite = relocationSites[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Banner / Mission Statement */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-blue-50 text-blue-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Kasaragod District Disaster Decision Support</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            From disaster monitoring to proactive relocation.
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            AbhayAssist helps state and district disaster-management authorities identify vulnerable habitations, understand why they are at risk, and plan safe relocation <strong className="text-slate-900">before</strong> a disaster becomes catastrophic.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-3">
            <button
              onClick={onOpenMap}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs shadow-xs transition"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Open Risk Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                const mogral = habitations.find(h => h.id === 'hab-mogral-puthur') || habitations[0];
                if (mogral) onSelectHabitation(mogral);
                onOpenRelocation();
              }}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg text-xs transition"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Find Safer Locations</span>
            </button>

            <button
              onClick={onOpenSimulation}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg text-xs transition"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>Scenario Planning</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Clear Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Areas Needing Attention</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {highRiskHabitations.length} <span className="text-xs font-medium text-red-700">High Risk</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            4 mapped habitations in Kasaragod
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">People at Risk</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {totalPeopleAtRisk.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Residents in vulnerable zones
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Candidate Safe Sites</span>
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {relocationSites.length} <span className="text-xs font-medium text-slate-500">Locations</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {totalSafeCapacity.toLocaleString()} total shelter capacity
          </div>
        </div>

        <div 
          onClick={onOpenAlerts}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs cursor-pointer hover:border-blue-400 transition"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Active Official Alerts</span>
            <Bell className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-orange-600 mt-1">
            2
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
            <span>Heavy rain / swell warnings</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Human Dashboard Layout: Areas Needing Attention & Recommended Relocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Areas Needing Attention */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Areas Needing Attention
              </h2>
              <p className="text-xs text-slate-500">
                Habitations prioritized based on hazard exposure and emergency access.
              </p>
            </div>
            <button
              onClick={onOpenMap}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>View Map</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {habitations.slice(0, 4).map((h) => {
              const isHigh = h.riskScore >= 70;
              return (
                <div
                  key={h.id}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-blue-400 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-sm text-slate-900">{h.name}</h3>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold border ${
                        isHigh ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {isHigh ? 'High Risk' : 'Moderate Risk'} • {h.riskScore}/100
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Main concern: <strong className="text-slate-700">{h.primaryHazard}</strong> • {h.population.toLocaleString()} people ({h.households} households)
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      {h.whyAtRisk?.[0]}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center flex-shrink-0">
                    <button
                      onClick={() => {
                        onSelectHabitation(h);
                        onOpenMap();
                      }}
                      className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded text-xs font-medium border border-slate-200 transition"
                    >
                      View on Map
                    </button>
                    <button
                      onClick={() => {
                        onSelectHabitation(h);
                        onOpenRelocation();
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition flex items-center space-x-1"
                    >
                      <span>Find Safer Locations</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Recommended Relocation & Active Alerts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recommended Relocation Card */}
          {topRelocationSite && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">
                  Recommended Relocation
                </h2>
                <span className="text-xs font-bold text-blue-700">
                  {topRelocationSite.suitabilityScore}/100 Suitability
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{topRelocationSite.name}</h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Capacity: <strong className="text-slate-800">{topRelocationSite.capacity.toLocaleString()} people</strong> • Distance: <strong className="text-slate-800">8.4 km</strong>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1 text-[11px]">Why recommended:</div>
                <div className="flex items-start space-x-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Lower hazard exposure (elevated 72m above sea level)</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Sufficient capacity for Mogral Puthur (2,840 people)</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Direct highway access via NH-66 bypass</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Healthcare facility nearby (Periya CHC within 1.4 km)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const mogral = habitations[0];
                  if (mogral) onSelectHabitation(mogral);
                  onOpenRelocation();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg text-xs transition text-center"
              >
                View Relocation Plan
              </button>
            </div>
          )}

          {/* Current Alerts Snippet */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">
                Current Weather Alerts
              </h2>
              <button
                onClick={onOpenAlerts}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                All Alerts
              </button>
            </div>

            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-orange-900">Heavy Rainfall Advisory</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-orange-200 text-orange-900">Orange Alert</span>
              </div>
              <p className="text-orange-950/80 text-[11px] leading-snug">
                Sustained precipitation (115–204 mm) anticipated across Kasaragod coastal and hill sectors.
              </p>
              <div className="text-[10px] text-orange-800 pt-1">
                Issued by IMD via SACHET • Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Workflow Steps */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900">
          How AbhayAssist Supports Decisions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 text-center text-xs">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-900 text-[11px]">1. Detect Risk</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Identifies coastal erosion & flood signals</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-900 text-[11px]">2. Assess & Explain</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Explains why the area is vulnerable</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-900 text-[11px]">3. Prioritize</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Ranks villages by resident exposure</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-900 text-[11px]">4. Find Safer Sites</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Matches with resilient relocation hubs</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-900 text-[11px]">5. Plan Relocation</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Prepares transport fleets & briefs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
