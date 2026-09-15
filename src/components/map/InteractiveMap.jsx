import React, { useEffect, useState, useMemo } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  GeoJSON, 
  Polyline, 
  useMap 
} from 'react-leaflet';
import L from 'leaflet';
import { 
  RotateCcw, 
  Layers, 
  Search, 
  Filter, 
  ArrowRight, 
  Building, 
  Hospital,
  ShieldCheck,
  Check
} from 'lucide-react';
import { HAZARD_GEOJSON } from '../../data/hazardGeoJSON';
import MapLegend from './MapLegend';

// Geographic center for Kasaragod District, Kerala
const KASARAGOD_CENTER = [12.5102, 75.0000];
const DEFAULT_ZOOM = 11;

// Programmatic map movement controller
function MapFlyController({ targetCoords, zoomLevel }) {
  const map = useMap();
  useEffect(() => {
    if (targetCoords && targetCoords[0] && targetCoords[1]) {
      map.flyTo(targetCoords, zoomLevel || 13, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [targetCoords, zoomLevel, map]);
  return null;
}

export default function InteractiveMap({
  habitations = [],
  relocationSites = [],
  infrastructure = [],
  selectedHabitation,
  onSelectHabitation,
  selectedRelocationSite,
  onSelectRelocationSite,
  isRelocationMode = false,
  onOpenAssessment,
  onOpenRelocation
}) {
  const [mapCenter, setMapCenter] = useState(KASARAGOD_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLayerControlOpen, setIsLayerControlOpen] = useState(false);

  // Filters
  const [hazardFilter, setHazardFilter] = useState('all'); // 'all' | 'coastal' | 'flood' | 'landslide'
  const [riskFilter, setRiskFilter] = useState('all'); // 'all' | 'high' | 'moderate' | 'low'

  // Layer Toggles
  const [visibleLayers, setVisibleLayers] = useState({
    hazards: true,
    habitations: true,
    relocationSites: true,
    healthcare: true,
    shelters: true,
    corridor: true
  });

  const toggleLayer = (key) => {
    setVisibleLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Center on selected habitation when it changes
  useEffect(() => {
    if (selectedHabitation?.coordinates) {
      setMapCenter(selectedHabitation.coordinates);
      setMapZoom(13);
    }
  }, [selectedHabitation]);

  // Center on selected relocation site if selected in relocation mode
  useEffect(() => {
    if (selectedRelocationSite?.coordinates && !selectedHabitation) {
      setMapCenter(selectedRelocationSite.coordinates);
      setMapZoom(13);
    }
  }, [selectedRelocationSite, selectedHabitation]);

  const handleResetView = () => {
    setMapCenter([...KASARAGOD_CENTER]);
    setMapZoom(DEFAULT_ZOOM);
  };

  // Filter habitations based on active risk & hazard filters
  const filteredHabitations = useMemo(() => {
    return habitations.filter(h => {
      // Risk filter
      if (riskFilter === 'high' && h.riskScore < 70) return false;
      if (riskFilter === 'moderate' && (h.riskScore < 50 || h.riskScore >= 70)) return false;
      if (riskFilter === 'low' && h.riskScore >= 50) return false;

      // Hazard filter
      if (hazardFilter === 'coastal' && !h.primaryHazard.toLowerCase().includes('coastal')) return false;
      if (hazardFilter === 'flood' && !h.primaryHazard.toLowerCase().includes('flood')) return false;
      if (hazardFilter === 'landslide' && !h.primaryHazard.toLowerCase().includes('landslide')) return false;

      return true;
    });
  }, [habitations, riskFilter, hazardFilter]);

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return habitations.filter(h => 
      h.name.toLowerCase().includes(q) ||
      h.taluk.toLowerCase().includes(q) ||
      h.primaryHazard.toLowerCase().includes(q)
    );
  }, [searchQuery, habitations]);

  // Clean, professional SVG Map Pin Icons
  const createHabitationIcon = (h) => {
    const isSelected = selectedHabitation?.id === h.id;
    let pinColor = '#16a34a'; // Green
    if (h.riskScore >= 70) {
      pinColor = '#dc2626'; // Red
    } else if (h.riskScore >= 50) {
      pinColor = '#d97706'; // Amber
    }

    return L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div class="relative flex flex-col items-center">
          <div class="${isSelected ? 'selected' : ''}" style="
            background: ${pinColor};
            color: #ffffff;
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid #ffffff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <span style="transform: rotate(45deg); font-weight: 800; font-size: 11px;">
              ${h.riskScore}
            </span>
          </div>
          ${isSelected ? `
            <div style="
              margin-top: 4px;
              background: #0f172a;
              color: #ffffff;
              font-size: 10px;
              font-weight: 700;
              padding: 2px 6px;
              border-radius: 4px;
              white-space: nowrap;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">
              ${h.name}
            </div>
          ` : ''}
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  // Safe Relocation Site Marker (Blue Shelter Shield Pin)
  const createRelocationIcon = (site) => {
    const isSelected = selectedRelocationSite?.id === site.id;
    return L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div class="relative flex flex-col items-center">
          <div class="${isSelected ? 'selected' : ''}" style="
            background: #2563eb;
            color: #ffffff;
            width: 30px;
            height: 30px;
            border-radius: 6px;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 6px rgba(37,99,235,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div style="
            margin-top: 3px;
            background: #1e3a8a;
            color: #ffffff;
            font-size: 9px;
            font-weight: 600;
            padding: 1px 5px;
            border-radius: 3px;
            white-space: nowrap;
            box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          ">
            Safe Site
          </div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  };

  // Infrastructure Markers (Hospitals & Shelters)
  const createInfraIcon = (item) => {
    const isHosp = item.category === 'Healthcare';
    return L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="
          background: ${isHosp ? '#0284c7' : '#7c3aed'};
          color: #ffffff;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid #ffffff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 9px;
        ">
          ${isHosp ? '+' : '▲'}
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10]
    });
  };

  // Evacuation route coordinates
  const evacuationRouteCoords = useMemo(() => {
    if (!selectedHabitation || !selectedRelocationSite) return null;
    return [
      selectedHabitation.coordinates,
      [
        (selectedHabitation.coordinates[0] + selectedRelocationSite.coordinates[0]) / 2 + 0.005,
        (selectedHabitation.coordinates[1] + selectedRelocationSite.coordinates[1]) / 2 + 0.012
      ],
      selectedRelocationSite.coordinates
    ];
  }, [selectedHabitation, selectedRelocationSite]);

  return (
    <div className="relative w-full h-full min-h-[500px] flex flex-col bg-slate-100 overflow-hidden">
      {/* Top Map Toolbar: Clean Light Design */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Search Bar */}
        <div className="relative w-64 sm:w-72 pointer-events-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search village or location..."
              className="w-full pl-9 pr-3 py-2 bg-white text-xs text-slate-800 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition placeholder:text-slate-400"
            />
          </div>

          {/* Search Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50">
              {searchResults.map(h => (
                <div
                  key={h.id}
                  onClick={() => {
                    onSelectHabitation(h);
                    setSearchQuery('');
                  }}
                  className="px-3 py-2 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{h.name}</div>
                    <div className="text-[10px] text-slate-500">{h.taluk} Taluk • {h.primaryHazard}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    h.riskScore >= 70 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    Risk {h.riskScore}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Filter Controls */}
        <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
          {/* Hazard Filter Pill */}
          <select
            value={hazardFilter}
            onChange={(e) => setHazardFilter(e.target.value)}
            className="bg-white text-xs text-slate-700 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-600 shadow-xs"
          >
            <option value="all">All Hazards</option>
            <option value="coastal">Coastal Erosion</option>
            <option value="flood">Flood</option>
            <option value="landslide">Landslide</option>
          </select>

          {/* Risk Level Filter Pill */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-white text-xs text-slate-700 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-600 shadow-xs"
          >
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk (≥70)</option>
            <option value="moderate">Moderate Risk (50-69)</option>
            <option value="low">Lower Risk (&lt;50)</option>
          </select>

          {/* Reset View Button */}
          <button
            onClick={handleResetView}
            title="Reset Map to Kasaragod View"
            className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-300 shadow-xs text-xs font-medium transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Center on Kasaragod</span>
          </button>

          {/* Layer Control Button */}
          <button
            onClick={() => setIsLayerControlOpen(!isLayerControlOpen)}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg border text-xs font-medium shadow-xs transition ${
              isLayerControlOpen
                ? 'bg-blue-50 text-blue-700 border-blue-400'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Layers</span>
          </button>
        </div>
      </div>

      {/* Layer Control Dropdown */}
      {isLayerControlOpen && (
        <div className="absolute top-14 right-3 z-[1000] w-60 bg-white border border-slate-200 rounded-lg shadow-xl p-3 text-xs space-y-2.5">
          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center justify-between">
            <span>Map Layers</span>
            <span className="text-[10px] text-slate-500 font-normal">Kasaragod</span>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span>
                <span className="text-slate-700">Hazard Risk Zones</span>
              </span>
              <input
                type="checkbox"
                checked={visibleLayers.hazards}
                onChange={() => toggleLayer('hazards')}
                className="rounded border-slate-300 text-blue-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-slate-700">Habitations</span>
              </span>
              <input
                type="checkbox"
                checked={visibleLayers.habitations}
                onChange={() => toggleLayer('habitations')}
                className="rounded border-slate-300 text-blue-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600"></span>
                <span className="text-slate-700">Safe Relocation Sites</span>
              </span>
              <input
                type="checkbox"
                checked={visibleLayers.relocationSites}
                onChange={() => toggleLayer('relocationSites')}
                className="rounded border-slate-300 text-blue-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                <span className="text-slate-700">Healthcare Facilities</span>
              </span>
              <input
                type="checkbox"
                checked={visibleLayers.healthcare}
                onChange={() => toggleLayer('healthcare')}
                className="rounded border-slate-300 text-blue-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-600"></span>
                <span className="text-slate-700">Cyclone Shelters</span>
              </span>
              <input
                type="checkbox"
                checked={visibleLayers.shelters}
                onChange={() => toggleLayer('shelters')}
                className="rounded border-slate-300 text-blue-600 focus:ring-0"
              />
            </label>
          </div>
        </div>
      )}

      {/* Main Interactive Leaflet Map */}
      <MapContainer
        center={KASARAGOD_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapFlyController targetCoords={mapCenter} zoomLevel={mapZoom} />

        {/* Real OpenStreetMap Basemap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Transparent GeoJSON Hazard Overlays */}
        {visibleLayers.hazards && (
          <GeoJSON
            key={JSON.stringify(HAZARD_GEOJSON)}
            data={HAZARD_GEOJSON}
            style={(feature) => ({
              color: feature.properties.color || '#dc2626',
              weight: feature.properties.strokeWeight || 1.5,
              fillColor: feature.properties.fillColor || '#ef4444',
              fillOpacity: feature.properties.fillOpacity || 0.16
            })}
            onEachFeature={(feature, layer) => {
              layer.bindPopup(`
                <div class="text-xs">
                  <strong class="font-bold text-slate-900 block mb-0.5">${feature.properties.name}</strong>
                  <div class="text-slate-500 text-[11px] mb-1">${feature.properties.areaName}</div>
                  <p class="text-slate-600">${feature.properties.description}</p>
                </div>
              `);
            }}
          />
        )}

        {/* Evacuation Route Line */}
        {visibleLayers.corridor && evacuationRouteCoords && (
          <Polyline
            positions={evacuationRouteCoords}
            pathOptions={{
              color: '#2563eb',
              weight: 3.5,
              dashArray: '6, 6',
              opacity: 0.8
            }}
          >
            <Popup>
              <div className="text-xs p-1">
                <div className="font-bold text-blue-700 mb-0.5">Evacuation Transit Corridor</div>
                <div><strong>From:</strong> {selectedHabitation?.name}</div>
                <div><strong>To:</strong> {selectedRelocationSite?.name}</div>
                <div className="text-[10px] text-slate-500 mt-1">Route via NH-66 Corridor</div>
              </div>
            </Popup>
          </Polyline>
        )}

        {/* Infrastructure Markers */}
        {infrastructure.map(item => {
          if (item.category === 'Healthcare' && !visibleLayers.healthcare) return null;
          if (item.category === 'Shelter' && !visibleLayers.shelters) return null;

          return (
            <Marker
              key={item.id}
              position={item.coordinates}
              icon={createInfraIcon(item)}
            >
              <Popup>
                <div className="text-xs">
                  <div className="font-bold text-slate-900 mb-0.5">{item.name}</div>
                  <div className="text-slate-500 text-[10px] mb-1">{item.type} • {item.address}</div>
                  {item.totalBeds && (
                    <div className="text-blue-700 font-semibold text-[11px]">Total Beds: {item.totalBeds} (ICU: {item.emergencyICU})</div>
                  )}
                  {item.shelterCapacity && (
                    <div className="text-purple-700 font-semibold text-[11px]">Shelter Capacity: {item.shelterCapacity} Persons</div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Candidate Safe Relocation Site Markers */}
        {visibleLayers.relocationSites && relocationSites.map(site => (
          <Marker
            key={site.id}
            position={site.coordinates}
            icon={createRelocationIcon(site)}
            eventHandlers={{
              click: () => onSelectRelocationSite(site)
            }}
          >
            <Popup>
              <div className="text-xs">
                <div className="font-bold text-blue-700 text-sm mb-0.5">{site.name}</div>
                <div className="text-slate-600 text-[11px] mb-1">
                  Capacity: <strong>{site.capacity.toLocaleString()}</strong> people • Elevation: <strong>{site.elevationMeters}m</strong>
                </div>
                <div className="text-slate-600 text-[11px] mb-2">
                  Suitability: <strong className="text-blue-700">{site.suitabilityScore}/100</strong>
                </div>
                <button
                  onClick={() => onSelectRelocationSite(site)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded text-[11px] transition text-center"
                >
                  Select This Location
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Habitation Markers */}
        {visibleLayers.habitations && filteredHabitations.map(h => (
          <Marker
            key={h.id}
            position={h.coordinates}
            icon={createHabitationIcon(h)}
            eventHandlers={{
              click: () => onSelectHabitation(h)
            }}
          >
            <Popup>
              <div className="text-xs p-0.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-sm">{h.name}</span>
                  <span className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                    h.riskScore >= 70 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    Risk {h.riskScore}/100
                  </span>
                </div>
                <div className="text-slate-600 text-[11px] mb-1">
                  Taluk: {h.taluk} | Main concern: <strong className="text-slate-800">{h.primaryHazard}</strong>
                </div>
                <div className="text-slate-600 text-[11px] mb-2">
                  Population: <strong>{h.population.toLocaleString()}</strong> ({h.households} households)
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => {
                      onSelectHabitation(h);
                      onOpenAssessment && onOpenAssessment();
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-1 px-2 rounded text-[10px] transition text-center"
                  >
                    View Assessment
                  </button>
                  <button
                    onClick={() => {
                      onSelectHabitation(h);
                      onOpenRelocation && onOpenRelocation();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded text-[10px] transition text-center"
                  >
                    Find Safer Locations
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <MapLegend />
    </div>
  );
}
