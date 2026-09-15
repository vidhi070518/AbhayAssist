import React from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  Home, 
  Hospital, 
  Compass, 
  ArrowRight, 
  Sliders, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { calculatePrototypeRisk } from '../../services/riskCalculator';

export default function RiskDetailPanel({
  habitation,
  onFindSafeSites,
  onOpenSimulation,
  onClose
}) {
  if (!habitation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 bg-slate-900/90 border-l border-slate-800">
        <Compass className="w-12 h-12 text-slate-600 mb-3 animate-pulse" />
        <h3 className="text-slate-200 font-semibold text-sm mb-1">No Habitation Selected</h3>
        <p className="text-xs max-w-xs text-slate-400">
          Click on any priority marker on the map or choose from the Priority Queue to assess vulnerability factors.
        </p>
      </div>
    );
  }

  const assessment = calculatePrototypeRisk(habitation);

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-rose-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getProgressBarColor = (score) => {
    if (score >= 70) return 'bg-rose-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/95 border-l border-slate-800 overflow-y-auto text-slate-200">
      {/* Panel Top Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 flex items-start justify-between sticky top-0 z-10 backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              {habitation.district}, Kerala
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{habitation.taluk} Taluk</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
            {habitation.name}
          </h2>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold border ${assessment.badgeColor}`}>
            {assessment.classification.toUpperCase()} RISK
          </span>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-end space-x-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{assessment.confidence}% Confidence</span>
          </div>
        </div>
      </div>

      {/* Main Score & Primary Call to Action */}
      <div className="p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 space-y-4">
        {/* Risk Score Gauge Display */}
        <div className="flex items-center justify-between bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 shadow-inner">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Overall Risk Score
            </div>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className={`text-4xl font-black tracking-tight ${getScoreColor(assessment.riskScore)}`}>
                {assessment.riskScore}
              </span>
              <span className="text-slate-500 font-bold text-base">/ 100</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {assessment.methodology}
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-[11px] text-slate-400">Primary Signal</div>
            <div className="text-xs font-bold text-rose-300 bg-rose-950/60 px-2 py-1 rounded border border-rose-900/50">
              {habitation.primaryHazard}
            </div>
          </div>
        </div>

        {/* PRIMARY DIFFERENTIATOR ACTION: FIND SAFE SITES */}
        <div className="space-y-2">
          <button
            onClick={() => onFindSafeSites(habitation)}
            className="w-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-cyan-900/40 border border-cyan-300/40 flex items-center justify-center space-x-2 transition transform active:scale-[0.99]"
          >
            <ShieldCheck className="w-5 h-5 text-slate-950" />
            <span className="text-sm tracking-wide">FIND SAFE RELOCATION SITES</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
          
          <button
            onClick={() => onOpenSimulation(habitation)}
            className="w-full bg-slate-800/80 hover:bg-slate-800 text-cyan-300 hover:text-white py-2 px-3 rounded-lg border border-slate-700/80 text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simulate Worsening Weather Scenarios</span>
          </button>
        </div>
      </div>

      {/* Demographics & Exposure Card */}
      <div className="p-4 border-b border-slate-800/80 grid grid-cols-2 gap-2.5">
        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>People at Risk</span>
          </div>
          <div className="text-lg font-extrabold text-white">
            {habitation.population.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400">Total resident exposure</div>
        </div>

        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>Households</span>
          </div>
          <div className="text-lg font-extrabold text-white">
            {habitation.households}
          </div>
          <div className="text-[10px] text-slate-400">{habitation.vulnerabilityFactors?.kutchaHousesPercent}% semi-permanent</div>
        </div>
      </div>

      {/* "Why is this area at risk?" Plain Language Breakdown */}
      <div className="p-4 border-b border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 font-bold text-xs uppercase tracking-wider text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Why is this area at risk?</span>
          </div>
          <span className="text-[10px] text-slate-400">Plain Language Analysis</span>
        </div>

        <div className="space-y-2.5">
          {assessment.contributingFactors.map((factor, idx) => (
            <div key={idx} className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="font-semibold text-slate-200">{factor.label}</span>
                <span className={`font-bold ${getScoreColor(factor.score)}`}>
                  {factor.score}/100 • {factor.level}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                <div 
                  className={`h-full ${getProgressBarColor(factor.score)}`} 
                  style={{ width: `${Math.min(100, factor.score)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {factor.plainLanguage}
              </p>
            </div>
          ))}
        </div>

        {/* Bullet Explanations */}
        <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 mt-3">
          <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Field Ground Realities
          </div>
          <ul className="space-y-1.5">
            {habitation.whyAtRisk?.map((reason, i) => (
              <li key={i} className="flex items-start space-x-2 text-[11px] text-slate-300 leading-normal">
                <span className="text-rose-400 font-bold mt-0.5">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Emergency Response Infrastructure */}
      <div className="p-4 border-b border-slate-800/80 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-1.5">
          <Hospital className="w-3.5 h-3.5 text-blue-400" />
          <span>Nearest Health Infrastructure</span>
        </div>
        <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">{habitation.nearestHealthcare?.name}</div>
            <div className="text-[10px] text-slate-400">{habitation.nearestHealthcare?.type} • {habitation.nearestHealthcare?.emergencyBeds} Beds</div>
          </div>
          <div className="text-right">
            <span className="text-xs font-extrabold text-cyan-400">{habitation.nearestHealthcare?.distanceKm} km</span>
            <div className="text-[9px] text-slate-500">Transit Distance</div>
          </div>
        </div>
      </div>

      {/* Recommended Action Advisory */}
      <div className="p-4 bg-emerald-950/20 border-t border-emerald-900/30">
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold mb-1">
          <CheckCircle2 className="w-4 h-4" />
          <span>Recommended Next Action</span>
        </div>
        <p className="text-xs text-emerald-200/90 leading-relaxed">
          {habitation.fieldAction}
        </p>
      </div>
    </div>
  );
}
