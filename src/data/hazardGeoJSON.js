/**
 * Hazard Risk Zones (GeoJSON format)
 * Focused on Kasaragod District, Kerala:
 * 1. Coastal Erosion Risk (Shoreline zone along Mogral Puthur coast)
 * 2. River Flood Risk (Low-lying Shiriya River basin near Kumbla)
 * 3. Landslide Risk (Eastern laterite slope terrain near Pallikkara)
 */

export const HAZARD_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    // 1. Coastal Erosion Risk Zone
    {
      type: 'Feature',
      id: 'hazard-coastal-erosion-1',
      properties: {
        hazardType: 'coastal_erosion',
        name: 'Coastal Erosion Risk Zone',
        areaName: 'Mogral Puthur Coastal Strip',
        severity: 'High',
        color: '#dc2626',
        fillColor: '#ef4444',
        fillOpacity: 0.16,
        strokeWeight: 1.5,
        description: 'Vulnerable shoreline strip subject to wave overtopping and beach recession during peak monsoon swells.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [74.9580, 12.5650],
            [74.9650, 12.5650],
            [74.9740, 12.5250],
            [74.9670, 12.5250],
            [74.9580, 12.5650]
          ]
        ]
      }
    },
    // 2. River Flood Risk Zone
    {
      type: 'Feature',
      id: 'hazard-flood-basin-1',
      properties: {
        hazardType: 'flood',
        name: 'Flood Risk Zone',
        areaName: 'Shiriya River Lower Basin',
        severity: 'High',
        color: '#2563eb',
        fillColor: '#3b82f6',
        fillOpacity: 0.16,
        strokeWeight: 1.5,
        description: 'Low-lying river confluence basin prone to backwater spillage and localized waterlogging.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [74.9400, 12.6020],
            [74.9650, 12.6040],
            [74.9720, 12.5850],
            [74.9480, 12.5820],
            [74.9400, 12.6020]
          ]
        ]
      }
    },
    // 3. Landslide Susceptibility Zone
    {
      type: 'Feature',
      id: 'hazard-landslide-zone-1',
      properties: {
        hazardType: 'landslide',
        name: 'Landslide Risk Zone',
        areaName: 'Pallikkara Eastern Foothill Slopes',
        severity: 'High',
        color: '#d97706',
        fillColor: '#f59e0b',
        fillOpacity: 0.16,
        strokeWeight: 1.5,
        description: 'Steep laterite terrain with loose topsoil layers vulnerable to slope slippage after prolonged rainfall.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [75.0300, 12.4080],
            [75.0520, 12.4100],
            [75.0580, 12.3850],
            [75.0360, 12.3820],
            [75.0300, 12.4080]
          ]
        ]
      }
    }
  ]
};
