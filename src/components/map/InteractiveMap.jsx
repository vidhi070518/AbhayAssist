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
  Crosshair, 
  RotateCcw, 
  Layers, 
  Search, 
  Check, 
  ArrowRight, 
  AlertTriangle, 
  Building2, 
  HeartHandshake 
} from 'lucide-react';
import { HAZARD_GEOJSON } from '../../data/hazardGeoJSON';
import MapLegend from './MapLegend';

// Center of Kasaragod District, Kerala
const KASARAGOD_CENTER = [12.5102, 75.0000];
const DEFAULT_ZOOM = 11;

// Helper component to handle programmatic map movements
function MapFlyController({ targetCoords, zoomLevel }) {
  const map = useMap();
  useEffect(() => {
    if (targetCoords && targetCoords[0] && targetCoords[1]) {
      map.flyTo(targetCoords, zoomLevel || 13, {
        duration: 1.5,
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

  // Layer Visibility Toggles
  const [visibleLayers, setVisibleLayers] = useState({
    coastalErosion: true,
    flood: true,
    landslide: true,
    relocationSites: true,
    healthcare: true,
    shelters: true,
    evacuationCorridor: true
  });

  const toggleLayer = (layerKey) => {
    setVisibleLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Center on selected habitation if changed
  useEffect(() => {
    if (selectedHabitation?.coordinates) {
      setMapCenter(selectedHabitation.coordinates);
      setMapZoom(13);
    }
  }, [selectedHabitation]);

  // Center on selected relocation site if changed
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

  // Filtered Habitations for search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return habitations.filter(h => 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.taluk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.primaryHazard.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, habitations]);

  // Custom Icon Builders using L.divIcon
  const createHabitationIcon = (h) => {
    const isSelected = selectedHabitation?.id === h.id;
    let bgColor = '#10b981'; // Green
    let ringColor = 'rgba(16, 185, 129, 0.4)';
    let pulseClass = '';

    if (h.riskScore >= 70) {
      bgColor = '#ef4444'; // Red
      ringColor = 'rgba(239, 68, 68, 0.5)';
      pulseClass = 'pulse-high-risk';
    } else if (h.riskScore >= 50) {
      bgColor = '#f59e0b'; // Amber
      ringColor = 'rgba(245, 158, 11, 0.4)';
    }

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="custom-risk-marker ${isSelected ? 'selected' : ''} ${pulseClass}" 
               style="background-color: ${bgColor}; width: 34px; height: 34px; border: 2.5px solid #ffffff; box-shadow: 0 0 10px ${ringColor};">
            <span style="color: #ffffff; font-size: 11px; font-weight: 800;">${h.riskScore}</span>
          </div>
          ${isSelected ? `
            <span class="absolute -top-6 bg-slate-900 text-cyan-300 font-bold px-1.5 py-0.5 rounded text-[10px] border border-cyan-500 whitespace-nowrap shadow-lg">
              ${h.name}
            </span>
          ` : ''}
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -18]
    });
  };

  const createRelocationIcon = (site) => {
    const isSelected = selectedRelocationSite?.id === site.id;
    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="custom-risk-marker ${isSelected ? 'selected pulse-safe-site' : ''}" 
               style="background-color: #06b6d4; width: 32px; height: 32px; border-radius: 6px; border: 2px solid #ffffff; box-shadow: 0 0 12px rgba(6, 182, 212, 0.6); display: flex; align-items: center; justify-content: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#042f2e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span class="absolute -bottom-5 bg-cyan-950 text-cyan-300 font-semibold px-1.5 py-0.2 rounded text-[9px] border border-cyan-600 whitespace-nowrap shadow">
            ${site.name.split(' ')[0]} (Safe)
          </span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18]
    });
  };

  const createInfraIcon = (item) => {
    const isHosp = item.category === 'Healthcare';
    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="background-color: ${isHosp ? '#2563eb' : '#7e22ce'}; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">
          <span style="color: #ffffff; font-size: 10px; font-weight: bold;">${isHosp ? '+' : '▲'}</span>
        </div>
      `,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -12]
    });
  };

  // Filtered GeoJSON Features based on layer toggles
  const filteredGeoJSON = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: HAZARD_GEOJSON.features.filter(f => {
        const type = f.properties.hazardType;
        if (type === 'coastal_erosion' && !visibleLayers.coastalErosion) return false;
        if (type === 'flood' && !visibleLayers.flood) return false;
        if (type === 'landslide' && !visibleLayers.landslide) return false;
        return true;
      })
    };
  }, [visibleLayers]);

  // Evacuation route coordinates if in relocation mode
  const evacuationRouteCoords = useMemo(() => {
    if (!selectedHabitation || !selectedRelocationSite) return null;
    // Estimated route line between source habitation and candidate relocation site
    return [
      selectedHabitation.coordinates,
      // Waypoint approximation along NH-66
      [
        (selectedHabitation.coordinates[0] + selectedRelocationSite.coordinates[0]) / 2 + 0.008,
        (selectedHabitation.coordinates[1] + selectedRelocationSite.coordinates[1]) / 2 + 0.015
      ],
      selectedRelocationSite.coordinates
    ];
  }, [selectedHabitation, selectedRelocationSite]);

  return (
    <div className="relative w-full h-full min-h-[550px] flex flex-col bg-slate-950 overflow-hidden">
      {/* Top Map Floating Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Search Bar */}
        <div className="relative w-72 sm:w-80 pointer-events-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search habitations in Kasaragod..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900/90 hover:bg-slate-900 text-xs text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500 shadow-xl backdrop-blur-md transition placeholder:text-slate-400"
            />
          </div>

          {/* Search Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-1.5 w-full bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50">
              {searchResults.map(h => (
                <div
                  key={h.id}
                  onClick={() => {
                    onSelectHabitation(h);
                    setSearchQuery('');
                  }}
                  className="px-3 py-2 hover:bg-slate-800 cursor-pointer border-b border-slate-800 last:border-0 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{h.name}</div>
                    <div className="text-[10px] text-slate-400">{h.taluk} Taluk • {h.primaryHazard}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    h.riskScore >= 70 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    Risk {h.riskScore}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Map Action Buttons */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={handleResetView}
            title="Reset Map to Kasaragod View"
            className="flex items-center space-x-1 px-3 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg border border-slate-700 shadow-xl backdrop-blur-md text-xs font-medium transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Center Map</span>
          </button>

          <button
            onClick={() => setIsLayerControlOpen(!isLayerControlOpen)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg border text-xs font-semibold shadow-xl backdrop-blur-md transition ${
              isLayerControlOpen
                ? 'bg-cyan-900/80 text-cyan-200 border-cyan-500'
                : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Layers</span>
          </button>
        </div>
      </div>

      {/* Layer Control Dropdown Drawer */}
      {isLayerControlOpen && (
        <div className="absolute top-16 right-4 z-[1000] w-64 bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-md p-3 text-xs space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 font-bold text-slate-200">
            <span>MAP LAYERS & HAZARDS</span>
            <span className="text-[10px] text-cyan-400 font-normal">Kasaragod GIS</span>
          </div>

          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Hazard Overlays (Prototype)
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-800">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span>
                  <span className="text-slate-200">Coastal Erosion Strip</span>
                </span>
                <input
                  type="checkbox"
                  checked={visibleLayers.coastalErosion}
                  onChange={() => toggleLayer('coastalErosion')}
                  className="rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-800">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span>
                  <span className="text-slate-200">River Flood Basin</span>
                </span>
                <input
                  type="checkbox"
                  checked={visibleLayers.flood}
                  onChange={() => toggleLayer('flood')}
                  className="rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-800">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                  <span className="text-slate-200">Landslide Slope Zone</span>
                </span>
                <input
                  type="checkbox"
                  checked={visibleLayers.landslide}
                  onChange={() => toggleLayer('landslide')}
                  className="rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
                />
              </label>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Decision & Safety Assets
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-800">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400"></span>
                  <span className="text-slate-200">Candidate Relocation Sites</span>
                </span>
                <input
                  type="checkbox"
                  checked={visibleLayers.relocationSites}
                  onChange={() => toggleLayer('relocationSites')}
                  className="rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-800">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-slate-200">Healthcare Facilities</span>
                </span>
                <input
                  type="checkbox"
                  checked={visibleLayers.healthcare}
                  onChange={() => toggleLayer('healthcare')}
                  className="rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-800">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-purple-600"></span>
                  <span className="text-slate-200">Designated Shelters</span>
                </span>
                <input
                  type="checkbox"
                  checked={visibleLayers.shelters}
                  onChange={() => toggleLayer('shelters')}
                  className="rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Main Leaflet Map Container */}
      <MapContainer
        center={KASARAGOD_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapFlyController targetCoords={mapCenter} zoomLevel={mapZoom} />

        {/* High-quality OpenStreetMap Standard / Positron Tile Provider */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        {/* Prototype GeoJSON Hazard Polygons */}
        <GeoJSON
          key={JSON.stringify(filteredGeoJSON)}
          data={filteredGeoJSON}
          style={(feature) => ({
            color: feature.properties.color || '#ef4444',
            weight: feature.properties.strokeWeight || 2,
            fillColor: feature.properties.fillColor || '#ef4444',
            fillOpacity: feature.properties.fillOpacity || 0.3
          })}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(`
              <div class="text-xs">
                <strong class="text-rose-400 font-bold block mb-1">${feature.properties.name}</strong>
                <p class="text-slate-300 mb-1.5">${feature.properties.description}</p>
                <div class="text-[10px] text-slate-400 italic">${feature.properties.source}</div>
              </div>
            `);
          }}
        />

        {/* Evacuation Route Corridor (Polyline) */}
        {visibleLayers.evacuationCorridor && evacuationRouteCoords && (
          <Polyline
            positions={evacuationRouteCoords}
            pathOptions={{
              color: '#06b6d4',
              weight: 4,
              dashArray: '8, 8',
              opacity: 0.85
            }}
          >
            <Popup>
              <div className="text-xs p-1">
                <div className="font-bold text-cyan-400 mb-1">Estimated Evacuation Transit Corridor</div>
                <div><strong>From:</strong> {selectedHabitation?.name}</div>
                <div><strong>To:</strong> {selectedRelocationSite?.name}</div>
                <div className="text-[10px] text-slate-400 mt-1">Route via NH-66 Arterial Bypass (Prototype Estimation)</div>
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
                  <div className="font-bold text-slate-100 mb-0.5">{item.name}</div>
                  <div className="text-slate-400 text-[10px] mb-1">{item.type} • {item.address}</div>
                  {item.totalBeds && (
                    <div className="text-cyan-400 font-semibold text-[11px]">Total Beds: {item.totalBeds} (ICU: {item.emergencyICU})</div>
                  )}
                  {item.shelterCapacity && (
                    <div className="text-purple-400 font-semibold text-[11px]">Shelter Capacity: {item.shelterCapacity} Persons</div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Relocation Site Markers */}
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
                <div className="font-bold text-cyan-400 text-sm mb-1">{site.name}</div>
                <div className="text-slate-300 text-[11px] mb-1">
                  <strong>Capacity:</strong> {site.capacity.toLocaleString()} persons | <strong>Elevation:</strong> {site.elevationMeters}m
                </div>
                <div className="text-slate-300 text-[11px] mb-2">
                  <strong>Suitability Score:</strong> <span className="text-cyan-300 font-bold">{site.suitabilityScore}/100</span>
                </div>
                <button
                  onClick={() => onSelectRelocationSite(site)}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-1 px-2 rounded text-[11px] transition flex items-center justify-center space-x-1"
                >
                  <span>Select Relocation Hub</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Habitation Markers */}
        {habitations.map(h => (
          <Marker
            key={h.id}
            position={h.coordinates}
            icon={createHabitationIcon(h)}
            eventHandlers={{
              click: () => onSelectHabitation(h)
            }}
          >
            <Popup>
              <div className="text-xs p-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-100 text-sm">{h.name}</span>
                  <span className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                    h.riskScore >= 70 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    Risk {h.riskScore}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px] mb-1">
                  Taluk: {h.taluk} | Primary Hazard: <strong className="text-slate-200">{h.primaryHazard}</strong>
                </div>
                <div className="text-slate-300 text-[11px] mb-2">
                  Population: <strong>{h.population.toLocaleString()}</strong> ({h.households} households)
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => {
                      onSelectHabitation(h);
                      onOpenAssessment && onOpenAssessment();
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-1 px-2 rounded text-[10px] transition text-center"
                  >
                    View Assessment
                  </button>
                  <button
                    onClick={() => {
                      onSelectHabitation(h);
                      onOpenRelocation && onOpenRelocation();
                    }}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-1 px-2 rounded text-[10px] transition text-center"
                  >
                    Find Safe Sites
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
