import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  Info
} from 'lucide-react';
import { SACHET_ALERTS_DATA, ABHAYASSIST_ALERTS_DATA } from '../../data/sachetAlertsData';

export default function AlertsView({ onInspectHabitation }) {
  const [activeSubTab, setActiveSubTab] = useState('all'); // 'all' | 'official' | 'signals'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            Early Warning Feeds
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Official SACHET Alerts & Risk Alerts
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-0.5">
            Strict separation between statutory government meteorological bulletins and localized risk alerts.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 self-start md:self-auto text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-1.5 rounded-md transition ${
              activeSubTab === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Alerts ({SACHET_ALERTS_DATA.length + ABHAYASSIST_ALERTS_DATA.length})
          </button>
          <button
            onClick={() => setActiveSubTab('official')}
            className={`px-3 py-1.5 rounded-md transition flex items-center space-x-1.5 ${
              activeSubTab === 'official' ? 'bg-white text-orange-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-600"></span>
            <span>Official SACHET ({SACHET_ALERTS_DATA.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('signals')}
            className={`px-3 py-1.5 rounded-md transition flex items-center space-x-1.5 ${
              activeSubTab === 'signals' ? 'bg-white text-blue-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>AbhayAssist Alerts ({ABHAYASSIST_ALERTS_DATA.length})</span>
          </button>
        </div>
      </div>

      {/* Notice Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-slate-600 shadow-xs">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Alert Architecture: </span>
          <span>Official SACHET Alerts originate from India Meteorological Department (IMD) and NDMA via the Common Alerting Protocol. AbhayAssist Risk Alerts are computed locally from terrain and water level thresholds.</span>
        </div>
      </div>

      {/* Two-Column Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Official SACHET Alerts */}
        {(activeSubTab === 'all' || activeSubTab === 'official') && (
          <div className="space-y-3.5">
            <div className="flex items-center space-x-2 pb-1 border-b border-orange-200">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-orange-900">
                Official SACHET Alerts
              </h3>
            </div>

            {SACHET_ALERTS_DATA.map((alert) => (
              <div
                key={alert.id}
                className="bg-white border border-orange-200 rounded-xl p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-800 border border-orange-200">
                      OFFICIAL SACHET ALERT
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {alert.headline}
                    </h4>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Agency: <strong className="text-slate-700">{alert.agency}</strong>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-100 text-orange-800">
                    {alert.severity}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-orange-50/40 p-2.5 rounded border border-orange-100">
                  {alert.description}
                </p>

                <div>
                  <div className="text-[11px] font-bold text-slate-700 mb-1">
                    Official Advisory Instructions:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {alert.instructions.map((inst, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                  <div>Bulletin: {alert.bulletinNumber}</div>
                  <div>Valid: {alert.effectiveFrom} — {alert.expiresAt}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Right: AbhayAssist Risk Alerts */}
        {(activeSubTab === 'all' || activeSubTab === 'signals') && (
          <div className="space-y-3.5">
            <div className="flex items-center space-x-2 pb-1 border-b border-blue-200">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-blue-900">
                AbhayAssist Risk Alerts
              </h3>
            </div>

            {ABHAYASSIST_ALERTS_DATA.map((alert) => (
              <div
                key={alert.id}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3 hover:border-blue-300 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      ABHAYASSIST RISK ALERT
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {alert.headline}
                    </h4>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Target Area: <strong className="text-slate-800">{alert.targetHabitationName}</strong> ({alert.taluk} Taluk)
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                    {alert.severity}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                  {alert.alertSummary}
                </p>

                <div className="bg-blue-50/60 border border-blue-100 p-2.5 rounded text-xs text-blue-900">
                  <div className="font-bold text-[11px] text-blue-800 mb-0.5">
                    Recommended Action:
                  </div>
                  <div>{alert.actionRequired}</div>
                  <div className="text-[11px] text-blue-700 font-semibold mt-1">
                    Safe Relocation Site: {alert.recommendedRelocationSite}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-[10px] text-slate-400">
                    Generated: {alert.generatedAt}
                  </div>

                  <button
                    onClick={() => onInspectHabitation(alert.targetHabitationId)}
                    className="flex items-center space-x-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                  >
                    <span>View on Map</span>
                    <ArrowRight className="w-3 h-3" />
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
