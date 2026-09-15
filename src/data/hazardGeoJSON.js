/**
 * Prototype Hazard Zone Boundaries (GeoJSON format)
 * Focused on Kasaragod, Kerala:
 * 1. Coastal Erosion Vulnerability Strip (Arabian Sea shoreline)
 * 2. Riverine Inundation Flood Zone (Shiriya & Chandragiri River basins)
 * 3. Landslide Susceptibility Zone (Eastern laterite foothill slopes)
 *
 * NOTE: Clearly labelled as Prototype / Demonstration GIS Layer for SIH.
 */

export const HAZARD_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    // 1. Coastal Erosion Hazard Zone (Along Mogral - Kasaragod coastline)
    {
      type: 'Feature',
      id: 'hazard-coastal-erosion-1',
      properties: {
        hazardType: 'coastal_erosion',
        name: 'Mogral - Kasaragod Coastal Erosion Corridor',
        severity: 'High',
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.35,
        strokeWeight: 2,
        description: 'Vulnerable shoreline strip with progressive beach erosion and high wave action risk.',
        source: 'Prototype GIS Layer (Modeled on Bhuvan Coastal Vulnerability Index)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [74.9550, 12.5700],
            [74.9650, 12.5700],
            [74.9750, 12.5300],
            [74.9820, 12.4900],
            [74.9720, 12.4900],
            [74.9600, 12.5350],
            [74.9550, 12.5700]
          ]
        ]
      }
    },
    // 2. Flood Inundation Basin (Kumbla - Shiriya River Basin)
    {
      type: 'Feature',
      id: 'hazard-flood-basin-1',
      properties: {
        hazardType: 'flood',
        name: 'Shiriya River Flood Inundation Zone',
        severity: 'High',
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.3,
        strokeWeight: 2,
        description: 'Low-lying river confluence basin prone to backwater spillage and flash waterlogging.',
        source: 'Prototype GIS Layer (Modeled on NDEM Flood Hazard Guidelines)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [74.9350, 12.6050],
            [74.9650, 12.6100],
            [74.9800, 12.5850],
            [74.9550, 12.5750],
            [74.9350, 12.5900],
            [74.9350, 12.6050]
          ]
        ]
      }
    },
    // 3. Landslide Susceptibility Zone (Western Ghats Foot-Slopes near Pallikkara/Bedadka)
    {
      type: 'Feature',
      id: 'hazard-landslide-zone-1',
      properties: {
        hazardType: 'landslide',
        name: 'Pallikkara Foothill Slope Instability Zone',
        severity: 'High',
        color: '#f59e0b',
        fillColor: '#f59e0b',
        fillOpacity: 0.3,
        strokeWeight: 2,
        description: 'Steep laterite terrain with historical debris slip and high pore water saturation.',
        source: 'Prototype GIS Layer (Modeled on GSI Landslide Susceptibility Atlas)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [75.0250, 12.4100],
            [75.0550, 12.4150],
            [75.0650, 12.3800],
            [75.0350, 12.3750],
            [75.0200, 12.3950],
            [75.0250, 12.4100]
          ]
        ]
      }
    },
    // 4. Southern Coastal Surge & Flood Zone (Cheruvathur / Tejaswini Backwaters)
    {
      type: 'Feature',
      id: 'hazard-flood-cheruvathur',
      properties: {
        hazardType: 'flood',
        name: 'Tejaswini Estuary Tidal Surge & Lowland Zone',
        severity: 'Moderate',
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.25,
        strokeWeight: 1.5,
        description: 'Tidal backwater zone with seasonal waterlogging during extreme spring tides.',
        source: 'Prototype GIS Layer (Referencing NDEM Hydrological Data)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [75.1450, 12.2350],
            [75.1800, 12.2400],
            [75.1950, 12.2050],
            [75.1600, 12.1950],
            [75.1450, 12.2150],
            [75.1450, 12.2350]
          ]
        ]
      }
    }
  ]
};
