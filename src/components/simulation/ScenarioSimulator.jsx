import React, { useState } from 'react';
import { 
  Sliders, 
  CloudRain, 
  Waves, 
  Users, 
  ArrowRight, 
  RotateCcw, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Info,
  Sparkles
} from 'lucide-react';
import { runScenarioSimulation } from '../../services/simulationEngine';

export default function ScenarioSimulator({
  habitations = [],
  selectedHabitation,
  onSelectHabitation,
  onProceedToRelocation
}) {
  // Select active habitation (defaulting to Mogral Puthur)
  const activeHabitation = selectedHabitation || habitations[0] || null;

  // Simulator State
  const [rainfall, setRainfall] = useState('normal'); // 'normal' | 'heavy' | 'extreme'
  const [coastalErosion, setCoastalErosion] = useState('current'); // 'current' | 'increased' | 'severe'
  const [populationExposure, setPopulationExposure] = useState('current'); // 'current' | 'plus10' | 'plus25'

  if (!activeHabitation) {
    return <div className="p-8 text-center text-slate-400">No habitations available for simulation.</div>;
  }

  // Run the simulation dynamically
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
    if (score >= 70) return 'text-rose-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-emerald-400';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" />
            <span>Interactive Sensitivity Modeling</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            "What If?" Disaster Scenario Simulation
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Explore how escalating monsoonal precipitation, high-tide coastal erosion, and demographic density shift risk profiles and trigger earlier relocation timelines.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-semibold transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset to Baseline</span>
          </button>
          
          <button
            onClick={() => onProceedToRelocation(activeHabitation)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-950 transition"
          >
            <span>Plan Relocation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Habitation Selector Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400">Simulation Focus Habitation:</span>
          <div className="text-base font-bold text-white mt-0.5 flex items-center space-x-2">
            <span>{activeHabitation.name}</span>
            <span className="text-xs text-slate-400">({activeHabitation.taluk} Taluk, Kasaragod)</span>
            <span className="text-xs px-2 py-0.5 rounded font-bold bg-rose-950 text-rose-300 border border-rose-800">
              {activeHabitation.primaryHazard}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-400">Test other location:</label>
          <select
            value={activeHabitation.id}
            onChange={(e) => {
              const selected = habitations.find(h => h.id === e.target.value);
              if (selected) onSelectHabitation(selected);
            }}
            className="bg-slate-950 text-xs text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            {habitations.map(h => (
              <option key={h.id} value={h.id}>
                {h.name} (Base Risk {h.riskScore})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Simulation Layout: Left Controls, Right Dynamic Impact Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Simulation Environmental Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-200">
                Environmental & Exposure Variables
              </h3>
              <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                Demo Simulation
              </span>
            </div>

            {/* Variable 1: Rainfall Intensity */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                  <CloudRain className="w-4 h-4 text-blue-400" />
                  <span>Monsoon Rainfall Intensity</span>
                </span>
                <span className="text-cyan-400 font-bold uppercase">{rainfall}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'normal', label: 'Normal Rain', desc: 'Standard monsoon' },
                  { id: 'heavy', label: 'Heavy Rain', desc: '+35% precipitation' },
                  { id: 'extreme', label: 'Extreme Cloudburst', desc: '+65% severe flash' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setRainfall(opt.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      rainfall === opt.id
                        ? 'bg-blue-950/80 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Variable 2: Coastal Erosion & Storm Surge */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  <span>Coastal Surge & Shoreline Loss</span>
                </span>
                <span className="text-cyan-400 font-bold uppercase">{coastalErosion}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'current', label: 'Current Tide', desc: 'Baseline wave action' },
                  { id: 'increased', label: 'High Spring Tide', desc: '+30% wave height' },
                  { id: 'severe', label: 'Storm Inundation', desc: '+60% seawall overtop' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setCoastalErosion(opt.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      coastalErosion === opt.id
                        ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Variable 3: Population Exposure Multiplier */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Population Density & Night Exposure</span>
                </span>
                <span className="text-cyan-400 font-bold uppercase">
                  {populationExposure === 'current' ? 'Current' : populationExposure === 'plus10' ? '+10%' : '+25%'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'current', label: 'Current Census', desc: `${activeHabitation.population.toLocaleString()} residents` },
                  { id: 'plus10', label: '+10% Influx', desc: `${Math.round(activeHabitation.population * 1.1).toLocaleString()} residents` },
                  { id: 'plus25', label: '+25% Peak Night', desc: `${Math.round(activeHabitation.population * 1.25).toLocaleString()} residents` }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setPopulationExposure(opt.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      populationExposure === opt.id
                        ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-md'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800'
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

        {/* Right Col: Dynamic Simulation Output & Decision Urgency (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-200">
                Simulated Risk & Priority Shift
              </h3>
              <span className="text-xs font-bold text-rose-400">
                {simResult.delta > 0 ? `+${simResult.delta} Points Surge` : 'Baseline Stable'}
              </span>
            </div>

            {/* Score Comparison Display */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Baseline Risk</div>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className={`text-3xl font-black ${getScoreColor(simResult.baselineScore)}`}>
                    {simResult.baselineScore}
                  </span>
                  <span className="text-slate-500 text-sm font-bold">/ 100</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                  {simResult.baselineClassification} Risk
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/50 shadow-inner">
                <div className="text-[10px] text-cyan-400 uppercase font-semibold">Simulated Risk Under Scenario</div>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className={`text-3xl font-black ${getScoreColor(simResult.simulatedScore)}`}>
                    {simResult.simulatedScore}
                  </span>
                  <span className="text-slate-500 text-sm font-bold">/ 100</span>
                </div>
                <div className="text-[10px] text-rose-400 mt-1 uppercase font-extrabold">
                  {simResult.simulatedClassification} Risk Surge
                </div>
              </div>
            </div>

            {/* Urgency Alert Banner */}
            <div className={`p-4 rounded-xl border ${
              simResult.delta > 8 || simResult.simulatedScore >= 85
                ? 'bg-rose-950/60 border-rose-500/60 text-rose-200'
                : 'bg-amber-950/60 border-amber-500/60 text-amber-200'
            }`}>
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>{simResult.urgencyLevel}</span>
              </div>
              <p className="text-xs leading-relaxed mt-1">
                {simResult.impactExplanation}
              </p>
            </div>

            {/* Contributing Factor Impact Bars */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Simulated Factor Breakdown
              </div>
              {simResult.simulatedFactors?.map((f, i) => (
                <div key={i} className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">{f.label}</span>
                    <span className={`font-bold ${getScoreColor(f.score)}`}>{f.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${f.score >= 70 ? 'bg-rose-500' : f.score >= 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(100, f.score)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Footer */}
            <div className="pt-2">
              <button
                onClick={() => onProceedToRelocation(activeHabitation)}
                className="w-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-950 transition"
              >
                <span>Trigger Pre-Emptive Relocation Protocol</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
