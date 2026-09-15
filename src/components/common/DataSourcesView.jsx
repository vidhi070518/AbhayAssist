import React from 'react';
import { Database, Satellite, ShieldCheck, Radio, CheckCircle, ExternalLink, Info } from 'lucide-react';

export default function DataSourcesView() {
  const sources = [
    {
      id: 'bhuvan',
      name: 'ISRO Bhuvan Geo-Platform',
      role: 'Geographical, Satellite & Coastal Vulnerability Reference',
      icon: Satellite,
      color: 'text-cyan-400',
      badgeBg: 'bg-cyan-950/80 border-cyan-800 text-cyan-300',
      description: 'Used as the geospatial reference framework for Kasaragod digital elevation models (DEM), shoreline change vectors, and coastal land-use data.',
      status: 'Modeled Demonstration Data (SIH Prototype)',
      integrationMode: 'Future WMS/WFS geospatial tile service integration in FastAPI backend'
    },
    {
      id: 'ndem',
      name: 'National Database for Emergency Management (NDEM)',
      role: 'Disaster Inundation & Multi-Hazard Susceptibility Atlas',
      icon: ShieldCheck,
      color: 'text-blue-400',
      badgeBg: 'bg-blue-950/80 border-blue-800 text-blue-300',
      description: 'Used as the domain reference for riverine flood recurrence intervals, Western Ghats landslide hazard zonation (LHZ), and critical infrastructure inventories.',
      status: 'Modeled Demonstration Data (SIH Prototype)',
      integrationMode: 'PostGIS spatial database synchronization layer'
    },
    {
      id: 'sachet',
      name: 'NDMA SACHET Early Warning Portal',
      role: 'Statutory Common Alerting Protocol (CAP) Alerts',
      icon: Radio,
      color: 'text-orange-400',
      badgeBg: 'bg-orange-950/80 border-orange-800 text-orange-300',
      description: 'Used as the reference model for official meteorological alerts, cyclonic swell warnings, and district-level emergency advisories broadcast to authorities.',
      status: 'Demo Data (CAP Schema-Compliant)',
      integrationMode: 'Automated CAP XML/RSS webhook listener in Node.js gateway'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Database className="w-4 h-4" />
          <span>Integration Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Data Sources & Authority Ecosystem
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mt-1">
          AbhayAssist is architected to ingest satellite telemetry, spatial inundation zones, and statutory government alerts without compromising data honesty.
        </p>
      </div>

      {/* Honesty Notice */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-start space-x-3 text-xs text-slate-300">
        <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-extrabold text-slate-100 text-sm">
            Commitment to Data Honesty (SIH Standard)
          </div>
          <p className="text-slate-400 leading-relaxed">
            Live external government APIs (such as secured Bhuvan enterprise servers or NDMA internal CAP feeds) require formal inter-departmental security clearance and token access. For the Smart India Hackathon demonstration, AbhayAssist utilizes rigorously structured, localized demonstration datasets matching the exact schema of these external platforms. <strong>We never fabricate fake live API connections.</strong>
          </p>
        </div>
      </div>

      {/* Data Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sources.map((src) => {
          const Icon = src.icon;
          return (
            <div
              key={src.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${src.color}`} />
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${src.badgeBg}`}>
                  {src.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white">{src.name}</h3>
                <p className="text-xs font-semibold text-cyan-400 mt-0.5">{src.role}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {src.description}
              </p>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                <strong className="text-slate-300 block mb-0.5">Integration Pathway:</strong>
                {src.integrationMode}
              </div>
            </div>
          );
        })}
      </div>

      {/* Future Backend & ML Technical Pipeline Diagram */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white tracking-tight">
          Complete Production Architecture Pipeline
        </h3>
        <p className="text-xs text-slate-400">
          How data flows from spatial satellite repositories through AI models to field decision makers:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-[10px] font-bold text-cyan-400 uppercase">1. Ingestion</div>
            <div className="font-bold text-white mt-1">Bhuvan & NDEM</div>
            <div className="text-[11px] text-slate-400 mt-1">DEM, Slope, River gauges & CAP Alert streams</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-[10px] font-bold text-cyan-400 uppercase">2. Spatial Index</div>
            <div className="font-bold text-white mt-1">PostGIS DB</div>
            <div className="text-[11px] text-slate-400 mt-1">Geospatial bounding boxes & vulnerability polygons</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-[10px] font-bold text-cyan-400 uppercase">3. Inference</div>
            <div className="font-bold text-white mt-1">FastAPI + XGBoost</div>
            <div className="text-[11px] text-slate-400 mt-1">Risk prediction, classification & SHAP factor explanation</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-[10px] font-bold text-cyan-400 uppercase">4. Decision Support</div>
            <div className="font-bold text-white mt-1">AbhayAssist Engine</div>
            <div className="text-[11px] text-slate-400 mt-1">Proactive relocation matching & capacity balance</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/50 shadow-inner">
            <div className="text-[10px] font-bold text-emerald-400 uppercase">5. Field Action</div>
            <div className="font-bold text-white mt-1">District Collectorate</div>
            <div className="text-[11px] text-slate-400 mt-1">Relocation briefs, bus fleet mobilization & early transit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
