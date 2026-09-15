import React from 'react';
import { Database, Satellite, ShieldCheck, Radio, Info } from 'lucide-react';

export default function DataSourcesView() {
  const sources = [
    {
      id: 'bhuvan',
      name: 'ISRO Bhuvan Geo-Portal',
      role: 'Geographical, Satellite & Coastal Vulnerability Reference',
      icon: Satellite,
      color: 'text-blue-600',
      badgeBg: 'bg-blue-50 border-blue-200 text-blue-800',
      description: 'Used as the geospatial reference framework for Kasaragod digital elevation models (DEM), shoreline change vectors, and coastal terrain data.',
      integrationMode: 'Connected via geospatial WMS/WFS tile layers'
    },
    {
      id: 'ndem',
      name: 'National Database for Emergency Management (NDEM)',
      role: 'Disaster Inundation & Hazard Susceptibility Atlas',
      icon: ShieldCheck,
      color: 'text-blue-600',
      badgeBg: 'bg-blue-50 border-blue-200 text-blue-800',
      description: 'Used as the reference dataset for river flood recurrence intervals, Western Ghats landslide zonation, and district infrastructure inventories.',
      integrationMode: 'Connected via spatial geometry index'
    },
    {
      id: 'sachet',
      name: 'NDMA SACHET Early Warning Portal',
      role: 'Statutory Common Alerting Protocol (CAP) Alerts',
      icon: Radio,
      color: 'text-orange-600',
      badgeBg: 'bg-orange-50 border-orange-200 text-orange-800',
      description: 'Used for meteorological warnings, cyclonic swell alerts, and district emergency bulletins broadcast directly to authorities.',
      integrationMode: 'Ingested via CAP XML alert feed'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
          Authority Integration
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          About Data Sources
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mt-0.5">
          Data sources include Bhuvan, NDEM, and SACHET. Availability and update frequency depend on the connected source.
        </p>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sources.map((src) => {
          const Icon = src.icon;
          return (
            <div
              key={src.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${src.color}`} />
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${src.badgeBg}`}>
                  Official Source
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">{src.name}</h3>
                <p className="text-xs text-blue-700 font-medium mt-0.5">{src.role}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {src.description}
              </p>

              <div className="pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                <strong className="text-slate-700 block mb-0.5">Integration:</strong>
                {src.integrationMode}
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Flow */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">
          How Data Powers Relocation Decisions
        </h3>
        <p className="text-xs text-slate-600">
          Geospatial layers and weather alerts are processed to rank vulnerable habitations and identify resilient relocation hubs:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-[10px] font-bold text-blue-700 uppercase">1. Ingestion</div>
            <div className="font-bold text-slate-800 mt-1">Satellite & Weather Telemetry</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Rainfall, elevation, coastal erosion, river gauge data.</div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-[10px] font-bold text-blue-700 uppercase">2. Spatial Processing</div>
            <div className="font-bold text-slate-800 mt-1">GIS Vulnerability Modeling</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Intersecting settlements with flood plains and steep slopes.</div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-[10px] font-bold text-blue-700 uppercase">3. Relocation Matching</div>
            <div className="font-bold text-slate-800 mt-1">Safe Campus Assessment</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Matching population with elevated public campuses.</div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-[10px] font-bold text-blue-700 uppercase">4. Action Briefs</div>
            <div className="font-bold text-slate-800 mt-1">District Directives</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Fleet logistics, medical readiness, and field verification.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
