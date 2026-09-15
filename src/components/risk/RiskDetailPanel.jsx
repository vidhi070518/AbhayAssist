import React from 'react';
import { 
  Users, 
  Home, 
  Hospital, 
  MapPin, 
  ArrowRight, 
  Sliders, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Compass
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
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-500 bg-white">
        <Compass className="w-10 h-10 text-slate-300 mb-2" />
        <h3 className="text-slate-700 font-semibold text-sm">No Location Selected</h3>
        <p className="text-xs text-slate-500 max-w-xs mt-1">
          Click any village marker on the map to view risk details and find safer relocation sites.
        </p>
      </div>
    );
  }

  const assessment = calculatePrototypeRisk(habitation);

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-red-700';
    if (score >= 50) return 'text-amber-700';
    return 'text-green-700';
  };

  const getBarColor = (score) => {
    if (score >= 70) return 'bg-red-600';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-green-600';
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto text-slate-800 text-xs">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50 sticky top-0 z-10">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              {habitation.district} District, {habitation.state} • {habitation.taluk} Taluk
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {habitation.name}
            </h2>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold border ${assessment.badgeColor}`}>
            {assessment.classification} Risk
          </span>
        </div>
      </div>

      {/* Main Score & Primary Call-to-Actions */}
      <div className="p-4 border-b border-slate-200 space-y-3.5">
        {/* Risk Score Summary Card */}
        <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3.5 border border-slate-200">
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              Overall Risk Score
            </div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className={`text-3xl font-extrabold ${getScoreColor(assessment.riskScore)}`}>
                {assessment.riskScore}
              </span>
              <span className="text-slate-400 font-medium text-sm">/ 100</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[11px] text-slate-500">Main concern</div>
            <div className="text-xs font-bold text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 mt-0.5">
              {habitation.primaryHazard}
            </div>
          </div>
        </div>

        {/* Primary Action Button: Find Safer Locations */}
        <div className="space-y-2">
          <button
            onClick={() => onFindSafeSites(habitation)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-xs flex items-center justify-center space-x-2 transition"
          >
            <span>Find Safer Locations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onOpenSimulation(habitation)}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-2 px-3 rounded-lg border border-slate-200 font-medium flex items-center justify-center space-x-1.5 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Scenario Planning: Weather Impact</span>
          </button>
        </div>
      </div>

      {/* Demographics & People at Risk */}
      <div className="p-4 border-b border-slate-200 grid grid-cols-2 gap-2.5">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="flex items-center space-x-1.5 text-slate-500 text-xs mb-0.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>People at Risk</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {habitation.population.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">Residents exposed</div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="flex items-center space-x-1.5 text-slate-500 text-xs mb-0.5">
            <Home className="w-3.5 h-3.5 text-amber-600" />
            <span>Households</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {habitation.households}
          </div>
          <div className="text-[10px] text-slate-500">{habitation.vulnerabilityFactors?.kutchaHousesPercent}% semi-permanent</div>
        </div>
      </div>

      {/* "Why is this area at risk?" Plain Language Breakdown */}
      <div className="p-4 border-b border-slate-200 space-y-3">
        <div className="font-bold text-slate-900 text-xs">
          Why is this area at risk?
        </div>

        <div className="space-y-2.5">
          {assessment.contributingFactors.map((factor, idx) => (
            <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-800">{factor.label}</span>
                <span className={`font-bold ${getScoreColor(factor.score)}`}>
                  {factor.score}/100 • {factor.level}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                <div 
                  className={`h-full ${getBarColor(factor.score)}`} 
                  style={{ width: `${Math.min(100, factor.score)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                {factor.plainLanguage}
              </p>
            </div>
          ))}
        </div>

        {/* Local Ground Observations */}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
          <div className="font-semibold text-slate-700 mb-1.5 text-[11px]">
            Key Field Observations
          </div>
          <ul className="space-y-1 text-[11px] text-slate-600">
            {habitation.whyAtRisk?.map((reason, i) => (
              <li key={i} className="flex items-start space-x-1.5">
                <span className="text-blue-600 font-bold">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nearby Healthcare */}
      <div className="p-4 border-b border-slate-200 space-y-2">
        <div className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
          <Hospital className="w-3.5 h-3.5 text-blue-600" />
          <span>Nearest Healthcare</span>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
          <div>
            <div className="font-semibold text-slate-800">{habitation.nearestHealthcare?.name}</div>
            <div className="text-[10px] text-slate-500">{habitation.nearestHealthcare?.type} • {habitation.nearestHealthcare?.emergencyBeds} Beds</div>
          </div>
          <div className="text-right">
            <span className="font-bold text-blue-700">{habitation.nearestHealthcare?.distanceKm} km</span>
            <div className="text-[9px] text-slate-400">Distance</div>
          </div>
        </div>
      </div>

      {/* Field Action Recommendation */}
      <div className="p-4 bg-blue-50/50">
        <div className="flex items-center space-x-1.5 text-blue-800 font-bold text-xs mb-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Recommended Next Action</span>
        </div>
        <p className="text-slate-700 leading-normal">
          {habitation.fieldAction}
        </p>
      </div>
    </div>
  );
}
