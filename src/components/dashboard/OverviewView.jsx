import React from 'react';
import { 
  ShieldAlert, 
  Map as MapIcon, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Navigation, 
  Sliders, 
  Bell, 
  ArrowRight, 
  Radio, 
  Compass, 
  Building2,
  FileText,
  Clock,
  ExternalLink
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
  const highRiskCount = habitations.filter(h => h.riskScore >= 70).length;
  const moderateRiskCount = habitations.filter(h => h.riskScore >= 50 && h.riskScore < 70).length;
  const totalExposedPopulation = habitations.reduce((sum, h) => sum + (h.population || 0), 0);
  const totalSafeCapacity = relocationSites.reduce((sum, s) => sum + (s.capacity || 0), 0);
  const pendingVerificationCount = habitations.filter(h => h.verificationStatus.includes('Needed') || h.verificationStatus.includes('Progress')).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Welcome & Tagline */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-[#0a1829] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Kasaragod District Disaster Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            From disaster monitoring <br className="hidden sm:inline" />
            to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">proactive relocation.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed pt-1">
            AbhayAssist helps State & District Disaster Management Authorities identify emerging high-risk areas, understand <strong>why they are at risk</strong>, prioritize vulnerable populations, and match them with hazard-resilient relocation sites <strong>before a disaster becomes catastrophic</strong>.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={onOpenMap}
              className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-xl shadow-cyan-900/40 border border-cyan-300/50 transition transform active:scale-95"
            >
              <MapIcon className="w-4 h-4 text-slate-950" />
              <span>Launch Interactive GIS Map</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => {
                const mogral = habitations.find(h => h.id === 'hab-mogral-puthur') || habitations[0];
                if (mogral) onSelectHabitation(mogral);
                onOpenRelocation();
              }}
              className="flex items-center space-x-2 px-4 py-3 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold rounded-xl text-xs sm:text-sm border border-slate-700 transition"
            >
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Evaluate Safe Relocation Sites</span>
            </button>

            <button
              onClick={onOpenSimulation}
              className="flex items-center space-x-2 px-4 py-3 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold rounded-xl text-xs sm:text-sm border border-slate-700 transition"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Simulate Scenarios</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Metrics Row */}
      <div>
        <div className="flex items-center justify-between pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            District Operational Status • Kasaragod, Kerala (Demo Data)
          </div>
          <span className="text-[11px] text-cyan-400 font-semibold">
            {habitations.length} Habitations Mapped
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Card 1: High Risk Habitations */}
          <div className="bg-slate-900/90 border border-rose-900/50 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between text-rose-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">High Risk Areas</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">
              {highRiskCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {moderateRiskCount} moderate risk
            </div>
          </div>

          {/* Card 2: Exposed Population */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between text-cyan-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">People at Risk</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {totalExposedPopulation.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Across mapped habitations
            </div>
          </div>

          {/* Card 3: Areas Needing Verification */}
          <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between text-amber-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Pending Verification</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              {pendingVerificationCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Priority ground audits
            </div>
          </div>

          {/* Card 4: Safe Relocation Sites */}
          <div className="bg-slate-900/90 border border-cyan-900/50 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between text-cyan-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Candidate Safe Sites</span>
              <Navigation className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">
              {relocationSites.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {totalSafeCapacity.toLocaleString()} total capacity
            </div>
          </div>

          {/* Card 5: Active Official Alerts */}
          <div 
            onClick={onOpenAlerts}
            className="col-span-2 lg:col-span-1 bg-slate-900/90 border border-orange-900/50 rounded-2xl p-4 shadow-xl cursor-pointer hover:border-orange-500 transition"
          >
            <div className="flex items-center justify-between text-orange-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active SACHET Alerts</span>
              <Bell className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-orange-400 mt-1">
              2
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>IMD Orange Bulletins</span>
              <ArrowRight className="w-3 h-3 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Core Workflow Showcase: The 8-Step Product Story */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight">
              The AbhayAssist Decision Workflow
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              How AbhayAssist transforms raw satellite telemetry into life-saving district relocation decisions:
            </p>
          </div>
          <span className="text-xs font-bold text-cyan-400 hidden sm:inline">End-to-End SIH Flow</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
          {[
            { step: '1. DETECT', label: 'Multi-hazard signals', color: 'text-rose-400' },
            { step: '2. ASSESS', label: 'Overall risk score (0-100)', color: 'text-rose-300' },
            { step: '3. IDENTIFY', label: 'People & houses exposed', color: 'text-amber-400' },
            { step: '4. PRIORITIZE', label: 'Triage vulnerable areas', color: 'text-amber-300' },
            { step: '5. FIND SITES', label: 'High-elevation safe hubs', color: 'text-cyan-400' },
            { step: '6. EXPLAIN', label: 'Plain-language reasons', color: 'text-cyan-300' },
            { step: '7. PLAN', label: 'Transit route & logistics', color: 'text-blue-400' },
            { step: '8. SIMULATE', label: 'What-if weather surges', color: 'text-emerald-400' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
              <div className={`font-black text-[11px] ${item.color}`}>{item.step}</div>
              <div className="text-[10px] text-slate-400 mt-1 leading-snug">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Priority Habitations Quick Action Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-base font-extrabold text-white">
              Vulnerable Habitations Requiring Attention
            </h3>
            <p className="text-xs text-slate-400">
              Click any habitation to assess risk breakdown or evaluate candidate relocation campuses.
            </p>
          </div>
          <button
            onClick={onOpenMap}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>View All on Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habitations.slice(0, 4).map((h) => {
            const isHigh = h.riskScore >= 70;
            return (
              <div
                key={h.id}
                className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 hover:border-cyan-500/50 transition flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-base text-white">{h.name}</h4>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold border ${
                        isHigh ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}>
                        {h.riskClassification} Risk
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {h.taluk} Taluk • Primary Signal: <strong className="text-slate-200">{h.primaryHazard}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-2xl font-black ${isHigh ? 'text-rose-400' : 'text-amber-400'}`}>
                      {h.riskScore}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold block">/ 100</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span><strong>{h.population.toLocaleString()}</strong> residents</span>
                  </div>
                  <div className="text-emerald-400 font-medium text-[11px]">
                    Safe Hub: Periya Campus
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      onSelectHabitation(h);
                      onOpenMap();
                    }}
                    className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold py-1.5 px-3 rounded-lg text-xs transition text-center"
                  >
                    View on Map
                  </button>

                  <button
                    onClick={() => {
                      onSelectHabitation(h);
                      onOpenRelocation();
                    }}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-1.5 px-3 rounded-lg text-xs transition text-center flex items-center justify-center space-x-1"
                  >
                    <span>Find Safe Sites</span>
                    <ArrowRight className="w-3 h-3 text-slate-950" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
