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
      integrationMode: 'CAP XML alert specification reference'
    },
    {
      id: 'osm',
      name: 'OpenStreetMap (OSM)',
      role: 'Base Geographic Mapping & Road Network Layer',
      icon: Database,
      color: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      description: 'Provides live geographic context, road infrastructure (NH-66, arterial roads), administrative boundaries, and coastal geography without requiring proprietary API keys.',
      integrationMode: 'Live TileLayer raster tile stream'
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sources.map((src) => {
          const Icon = src.icon;
          return (
            <div
              key={src.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${src.color}`} />
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${src.badgeBg}`}>
                    Reference Source
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{src.name}</h3>
                  <p className="text-[11px] text-blue-700 font-medium mt-0.5">{src.role}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {src.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <strong className="text-slate-700 block mb-0.5">Integration Method:</strong>
                {src.integrationMode}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Operational Data vs Planned Live APIs */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">
          Data Governance: Current Implementation vs Planned Live Integrations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-1.5">
            <div className="font-bold text-blue-800 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Current Application Data (Pilot)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Active decision models operate on verified geographic data for Kasaragod District, Kerala (Mogral Puthur, Kumbla North, Pallikkara, Cheruvathur). Coordinates, elevations, census demographics, and route distance matrices are stored locally to guarantee deterministic response times and offline resilience during emergency operations.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-1.5">
            <div className="font-bold text-emerald-800 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Live Geographic Mapping</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Base cartography is rendered via OpenStreetMap standard tiles using React-Leaflet. No third-party proprietary API keys (e.g. Google Maps or Mapbox) are required, preventing sudden service throttling or billable quotas during disaster surges.
            </p>
          </div>
        </div>
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
