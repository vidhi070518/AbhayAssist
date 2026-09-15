import React, { useState } from 'react';
import { 
  Sliders, 
  CloudRain, 
  Waves, 
  Users, 
  ArrowRight, 
  RotateCcw, 
  AlertTriangle 
} from 'lucide-react';
import { runScenarioSimulation } from '../../services/simulationEngine';

export default function ScenarioSimulator({
  habitations = [],
  selectedHabitation,
  onSelectHabitation,
  onProceedToRelocation
}) {
  const activeHabitation = selectedHabitation || habitations[0] || null;

  const [rainfall, setRainfall] = useState('normal');
  const [coastalErosion, setCoastalErosion] = useState('current');
  const [populationExposure, setPopulationExposure] = useState('current');

  if (!activeHabitation) {
    return <div className="p-8 text-center text-slate-500">No habitations available for simulation.</div>;
  }

  const simResult = runScenarioSimulation(activeHabitation, {
    rainfall,
    coastalErosion,
    populationExposure
  });

  const handleReset = () => {
    setRainfall('normal');
    setCoastalErosion('current');
    setPopulationExposure('current');
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-red-700';
    if (score >= 50) return 'text-amber-700';
    return 'text-green-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            Predictive Decision Support
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Scenario Planning: Weather Impact
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-0.5">
            Test how worsening monsoonal rainfall and coastal surge shift risk scores and advance evacuation urgency.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-200 text-xs font-medium transition shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
            <span>Reset Variables</span>
          </button>
          
          <button
            onClick={() => onProceedToRelocation(activeHabitation)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <span>Find Safer Locations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Focus Village Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <span className="text-[11px] text-slate-500 font-medium">Currently simulating:</span>
          <div className="text-sm font-bold text-slate-900 mt-0.5 flex items-center space-x-2">
            <span>{activeHabitation.name}</span>
            <span className="text-xs text-slate-500 font-normal">({activeHabitation.taluk} Taluk)</span>
            <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-red-50 text-red-700 border border-red-200">
              {activeHabitation.primaryHazard}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-500">Switch village:</label>
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
                {h.name} (Base Risk {h.riskScore})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Controls Left, Dynamic Outcome Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (6 cols): Environmental Variables */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Weather & Population Variables
            </h3>

            {/* Variable 1: Rainfall */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center space-x-1.5">
                  <CloudRain className="w-4 h-4 text-blue-600" />
                  <span>Monsoon Rainfall</span>
                </span>
                <span className="text-blue-700 font-bold uppercase">{rainfall}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'normal', label: 'Normal Rain', desc: 'Typical monsoon' },
                  { id: 'heavy', label: 'Heavy Rain', desc: '+35% precipitation' },
                  { id: 'extreme', label: 'Extreme Rain', desc: '+65% cloudburst' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setRainfall(opt.id)}
                    className={`p-2.5 rounded-lg border text-left transition ${
                      rainfall === opt.id
                        ? 'bg-blue-50 border-blue-600 text-blue-950 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Variable 2: Coastal Swell */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center space-x-1.5">
                  <Waves className="w-4 h-4 text-blue-600" />
                  <span>Coastal Swell & Tide</span>
                </span>
                <span className="text-blue-700 font-bold uppercase">{coastalErosion}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'current', label: 'Normal Tide', desc: 'Baseline wave height' },
                  { id: 'increased', label: 'Spring Tide', desc: '+30% wave energy' },
                  { id: 'severe', label: 'Storm Surge', desc: '+60% seawall breach' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setCoastalErosion(opt.id)}
                    className={`p-2.5 rounded-lg border text-left transition ${
                      coastalErosion === opt.id
                        ? 'bg-blue-50 border-blue-600 text-blue-950 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Variable 3: Population Exposure */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Demographic Exposure</span>
                </span>
                <span className="text-blue-700 font-bold uppercase">
                  {populationExposure === 'current' ? 'Current' : populationExposure === 'plus10' ? '+10%' : '+25%'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'current', label: 'Baseline', desc: `${activeHabitation.population.toLocaleString()} residents` },
                  { id: 'plus10', label: '+10% Influx', desc: `${Math.round(activeHabitation.population * 1.1).toLocaleString()} residents` },
                  { id: 'plus25', label: '+25% Peak', desc: `${Math.round(activeHabitation.population * 1.25).toLocaleString()} residents` }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setPopulationExposure(opt.id)}
                    className={`p-2.5 rounded-lg border text-left transition ${
                      populationExposure === opt.id
                        ? 'bg-blue-50 border-blue-600 text-blue-950 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Projected Outcome */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-slate-900">
                Projected Impact on Risk
              </h3>
              <span className="text-xs font-bold text-red-700">
                {simResult.delta > 0 ? `+${simResult.delta} Points Increase` : 'Baseline Stable'}
              </span>
            </div>

            {/* Score Comparison */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Current Risk</div>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className={`text-2xl font-black ${getScoreColor(simResult.baselineScore)}`}>
                    {simResult.baselineScore}
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">/ 100</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {simResult.baselineClassification} Risk
                </div>
              </div>

              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200">
                <div className="text-[10px] text-blue-700 uppercase font-semibold">Projected Risk Under Scenario</div>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className={`text-2xl font-black ${getScoreColor(simResult.simulatedScore)}`}>
                    {simResult.simulatedScore}
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">/ 100</span>
                </div>
                <div className="text-[10px] text-red-700 mt-0.5 font-bold">
                  {simResult.simulatedClassification} Risk Surge
                </div>
              </div>
            </div>

            {/* Advisory Directive */}
            <div className={`p-3.5 rounded-xl border ${
              simResult.delta > 6 || simResult.simulatedScore >= 85
                ? 'bg-red-50 border-red-200 text-red-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center space-x-1.5 text-xs font-bold mb-1">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>{simResult.urgencyLevel}</span>
              </div>
              <p className="text-xs leading-relaxed">
                {simResult.impactExplanation}
              </p>
            </div>

            {/* Factor Impact */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800">
                Projected Factor Changes
              </div>
              {simResult.simulatedFactors?.map((f, i) => (
                <div key={i} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">{f.label}</span>
                    <span className={`font-bold ${getScoreColor(f.score)}`}>{f.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${f.score >= 70 ? 'bg-red-600' : f.score >= 50 ? 'bg-amber-500' : 'bg-green-600'}`}
                      style={{ width: `${Math.min(100, f.score)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onProceedToRelocation(activeHabitation)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center space-x-1.5 transition shadow-xs"
            >
              <span>Prepare Relocation for this Scenario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
