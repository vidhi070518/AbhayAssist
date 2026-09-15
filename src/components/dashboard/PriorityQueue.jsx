import React from 'react';
import { 
  Users, 
  ArrowRight, 
  MapPin, 
  Compass, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';

export default function PriorityQueue({
  habitations = [],
  selectedHabitation,
  onSelectHabitation,
  onOpenMap,
  onOpenRelocation
}) {
  const sortedHabitations = [...habitations].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            District Action Triage
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Priority Areas Requiring Attention
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-0.5">
            Habitations ranked by risk score, resident vulnerability, and evacuation road constraints.
          </p>
        </div>

        <button
          onClick={onOpenMap}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition self-start md:self-auto"
        >
          <Compass className="w-4 h-4" />
          <span>Open GIS Map</span>
        </button>
      </div>

      {/* Priority Cards List */}
      <div className="space-y-3">
        {sortedHabitations.map((item, index) => {
          const isSelected = selectedHabitation?.id === item.id;
          const isHigh = item.riskScore >= 70;
          const isModerate = item.riskScore >= 50 && item.riskScore < 70;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition bg-white ${
                isSelected
                  ? 'border-blue-500 ring-1 ring-blue-500 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Info */}
                <div className="flex items-start space-x-3.5">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex-shrink-0">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">RANK</span>
                    <span className={`text-base font-extrabold ${isHigh ? 'text-red-600' : isModerate ? 'text-amber-600' : 'text-green-600'}`}>
                      #{index + 1}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                      <span className="text-xs text-slate-500">({item.taluk} Taluk, Kasaragod)</span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold border ${
                        isHigh 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : isModerate 
                          ? 'bg-amber-50 text-amber-800 border-amber-200' 
                          : 'bg-green-50 text-green-800 border-green-200'
                      }`}>
                        {item.riskClassification} Risk • Score {item.riskScore}/100
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-600">
                      <div>
                        Main concern: <strong className="text-slate-800">{item.primaryHazard}</strong>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        <span><strong>{item.population.toLocaleString()}</strong> residents ({item.households} households)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.verificationStatus}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
                      {item.whyAtRisk?.[0]}
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center space-x-2 self-end lg:self-center flex-shrink-0">
                  <button
                    onClick={() => {
                      onSelectHabitation(item);
                      onOpenMap();
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition"
                  >
                    View on Map
                  </button>

                  <button
                    onClick={() => {
                      onSelectHabitation(item);
                      onOpenRelocation();
                    }}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition shadow-xs"
                  >
                    <span>Find Safer Locations</span>
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
