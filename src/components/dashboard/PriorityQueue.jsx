import React from 'react';
import { 
  AlertOctagon, 
  MapPin, 
  Users, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  Sparkles 
} from 'lucide-react';

export default function PriorityQueue({
  habitations = [],
  selectedHabitation,
  onSelectHabitation,
  onOpenMap,
  onOpenRelocation
}) {
  // Sort habitations by risk score descending
  const sortedHabitations = [...habitations].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <AlertOctagon className="w-4 h-4" />
            <span>District Priority Triage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Vulnerable Habitations Priority Queue
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Ranked queue of exposed settlements requiring field verification, early warnings, and pre-emptive relocation planning.
          </p>
        </div>

        <button
          onClick={onOpenMap}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-cyan-950 transition self-start md:self-auto"
        >
          <Compass className="w-4 h-4" />
          <span>Inspect All on GIS Map</span>
        </button>
      </div>

      {/* Priority Queue Cards List */}
      <div className="space-y-4">
        {sortedHabitations.map((item, index) => {
          const isSelected = selectedHabitation?.id === item.id;
          const isHigh = item.riskScore >= 70;
          const isModerate = item.riskScore >= 50 && item.riskScore < 70;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500'
                  : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Rank & Information */}
                <div className="flex items-start space-x-4">
                  {/* Priority Rank Indicator */}
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">PRIORITY</span>
                    <span className={`text-lg font-black ${isHigh ? 'text-rose-400' : isModerate ? 'text-amber-400' : 'text-emerald-400'}`}>
                      #{index + 1}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-extrabold text-white">{item.name}</h3>
                      <span className="text-xs text-slate-400">({item.taluk} Taluk, {item.district})</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                        isHigh 
                          ? 'bg-rose-950/70 text-rose-300 border-rose-800' 
                          : isModerate 
                          ? 'bg-amber-950/70 text-amber-300 border-amber-800' 
                          : 'bg-emerald-950/70 text-emerald-300 border-emerald-800'
                      }`}>
                        {item.riskClassification.toUpperCase()} RISK • SCORE {item.riskScore}
                      </span>
                    </div>

                    {/* Quick Hazard & Demographics Badges */}
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-300">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-slate-500">Primary Hazard:</span>
                        <strong className="text-rose-300">{item.primaryHazard}</strong>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        <span><strong>{item.population.toLocaleString()}</strong> residents ({item.households} households)</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-slate-400">{item.verificationStatus}</span>
                      </div>
                    </div>

                    {/* Plain Language Ground Summary */}
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 max-w-3xl leading-relaxed">
                      {item.whyAtRisk?.[0]}
                    </p>
                  </div>
                </div>

                {/* Right Interactive Buttons */}
                <div className="flex items-center space-x-2.5 self-end lg:self-center">
                  <button
                    onClick={() => {
                      onSelectHabitation(item);
                      onOpenMap();
                    }}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition"
                  >
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View on Map</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectHabitation(item);
                      onOpenRelocation();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-cyan-950 transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Find Safe Sites</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
