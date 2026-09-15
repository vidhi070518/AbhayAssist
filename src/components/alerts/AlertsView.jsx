import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  Building,
  Info,
  ExternalLink
} from 'lucide-react';
import { SACHET_ALERTS_DATA, ABHAYASSIST_SIGNALS_DATA } from '../../data/sachetAlertsData';

export default function AlertsView({ onInspectHabitation }) {
  const [activeSubTab, setActiveSubTab] = useState('all'); // 'all' | 'official' | 'signals'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Early Warning Intelligence Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Official SACHET Alerts & Predictive Risk Signals
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            AbhayAssist maintains a strict architectural separation between statutory government broadcasts and automated machine-generated early risk warnings.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === 'all' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Feeds ({SACHET_ALERTS_DATA.length + ABHAYASSIST_SIGNALS_DATA.length})
          </button>
          <button
            onClick={() => setActiveSubTab('official')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
              activeSubTab === 'official' ? 'bg-orange-950/80 text-orange-300 border border-orange-800' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>Official SACHET Alerts ({SACHET_ALERTS_DATA.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('signals')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
              activeSubTab === 'signals' ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>AbhayAssist Signals ({ABHAYASSIST_SIGNALS_DATA.length})</span>
          </button>
        </div>
      </div>

      {/* Important Source Separation Notice */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-start space-x-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-slate-200 uppercase text-[11px] tracking-wider">
            Architectural Ingestion Architecture:
          </div>
          <p className="text-slate-400 leading-relaxed">
            <strong>Official SACHET Alerts</strong> represent Common Alerting Protocol (CAP) compliant warnings from IMD / NDMA / Kerala SDMA. <strong>AbhayAssist Risk Signals</strong> represent predictive multi-factor threshold triggers computed locally across high-risk habitations.
          </p>
        </div>
      </div>

      {/* Feed Columns / Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Official SACHET Alerts */}
        {(activeSubTab === 'all' || activeSubTab === 'official') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-orange-900/40">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-orange-400">
                  OFFICIAL SACHET ALERTS
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Demo Data • IMD / NDMA</span>
            </div>

            {SACHET_ALERTS_DATA.map((alert) => (
              <div
                key={alert.id}
                className="bg-slate-900/90 border border-orange-800/50 rounded-2xl p-5 shadow-xl space-y-4 hover:border-orange-500/70 transition"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-950 text-orange-300 border border-orange-700">
                      OFFICIAL SACHET ALERT
                    </span>
                    <h4 className="text-base font-extrabold text-white mt-1.5 leading-snug">
                      {alert.headline}
                    </h4>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Agency: <strong className="text-slate-300">{alert.agency}</strong>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded text-xs font-extrabold bg-orange-900/40 text-orange-300 border border-orange-700/60 whitespace-nowrap">
                    {alert.severity}
                  </span>
                </div>

                {/* Details */}
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {alert.description}
                </p>

                {/* Instructions */}
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Official Advisory Directives:
                  </div>
                  <ul className="space-y-1">
                    {alert.instructions.map((inst, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                        <span className="text-orange-400 font-bold mt-0.5">•</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Metadata */}
                <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-800/80">
                  <div>Bulletin: {alert.bulletinNumber}</div>
                  <div>Valid: {alert.effectiveFrom} — {alert.expiresAt}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Right Column: AbhayAssist AI Risk Signals */}
        {(activeSubTab === 'all' || activeSubTab === 'signals') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-900/40">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-cyan-400">
                  ABHAYASSIST AI RISK SIGNALS
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Automated Localized Ingestion</span>
            </div>

            {ABHAYASSIST_SIGNALS_DATA.map((signal) => (
              <div
                key={signal.id}
                className="bg-slate-900/90 border border-cyan-800/50 rounded-2xl p-5 shadow-xl space-y-4 hover:border-cyan-500/70 transition"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-700">
                      ABHAYASSIST RISK SIGNAL
                    </span>
                    <h4 className="text-base font-extrabold text-white mt-1.5 leading-snug">
                      {signal.headline}
                    </h4>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Target Area: <strong className="text-slate-200">{signal.targetHabitationName}</strong> ({signal.taluk} Taluk)
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded text-xs font-extrabold bg-rose-950 text-rose-300 border border-rose-800 whitespace-nowrap">
                    {signal.severity}
                  </span>
                </div>

                {/* Signal Summary */}
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {signal.signalSummary}
                </p>

                {/* Action Required */}
                <div className="bg-emerald-950/30 border border-emerald-800/40 p-3 rounded-xl">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Decision Support Directive:</span>
                  </div>
                  <div className="text-xs text-emerald-200 font-medium">
                    {signal.actionRequired}
                  </div>
                  <div className="text-[11px] text-cyan-300 font-semibold mt-1">
                    Safe Relocation Hub: {signal.recommendedRelocationSite}
                  </div>
                </div>

                {/* Footer Metadata & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <div className="text-[10px] text-slate-400">
                    Generated: {signal.generatedAt} • Model Confidence: {signal.modelConfidence}
                  </div>

                  <button
                    onClick={() => onInspectHabitation(signal.targetHabitationId)}
                    className="flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                  >
                    <span>Assess Habitation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
