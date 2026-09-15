/**
 * Habitations Dataset for Kasaragod District, Kerala
 * NOTE: Demonstration dataset referencing official geographical features of Kasaragod.
 * Used for SIH Prototype Risk Assessment demonstration.
 */

export const HABITATIONS_DATA = [
  {
    id: 'hab-mogral-puthur',
    name: 'Mogral Puthur',
    district: 'Kasaragod',
    state: 'Kerala',
    taluk: 'Kasaragod',
    coordinates: [12.5512, 74.9625],
    population: 2840,
    households: 580,
    primaryHazard: 'Coastal Erosion',
    secondaryHazard: 'High Tide Storm Surge',
    riskScore: 82,
    riskClassification: 'High',
    confidence: 86,
    verificationStatus: 'Priority Field Verification Needed',
    recommendedRelocationSiteId: 'site-periya',
    hazardBreakdown: {
      coastalErosion: 91,
      floodExposure: 60,
      heavyRain: 78,
      landslide: 12
    },
    vulnerabilityFactors: {
      socialVulnerability: 74,
      populationDensity: 85,
      kutchaHousesPercent: 42,
      elderlyAndChildrenPercent: 28,
      lowLyingTopography: 88,
      responseAccessScore: 35 // Low score = poorer access
    },
    nearestHealthcare: {
      name: 'Government PHC Mogral',
      distanceKm: 2.1,
      type: 'Primary Health Centre',
      emergencyBeds: 12
    },
    whyAtRisk: [
      'Active seawall breach and accelerating shoreline loss along the 1.4 km coastal stretch.',
      'Over 40% of housing structures are semi-permanent kutcha dwellings within 150m of high-tide line.',
      'Narrow coastal access road is prone to waterlogging during peak high tide, restricting evacuation convoys.',
      'High proportion of vulnerable demographic (elderly and young children) requiring organized transit.'
    ],
    fieldAction: 'Initiate Stage-1 advisory for pre-emptive relocation to Periya Community Campus.'
  },
  {
    id: 'hab-kumbla-north',
    name: 'Kumbla North',
    district: 'Kasaragod',
    state: 'Kerala',
    taluk: 'Manjeshwar',
    coordinates: [12.5938, 74.9458],
    population: 1945,
    households: 410,
    primaryHazard: 'Flood Exposure',
    secondaryHazard: 'River Estuary Backflow',
    riskScore: 76,
    riskClassification: 'High',
    confidence: 82,
    verificationStatus: 'Inspection Scheduled',
    recommendedRelocationSiteId: 'site-vidyanagar',
    hazardBreakdown: {
      coastalErosion: 45,
      floodExposure: 88,
      heavyRain: 82,
      landslide: 18
    },
    vulnerabilityFactors: {
      socialVulnerability: 68,
      populationDensity: 74,
      kutchaHousesPercent: 36,
      elderlyAndChildrenPercent: 24,
      lowLyingTopography: 92,
      responseAccessScore: 42
    },
    nearestHealthcare: {
      name: 'Kumbla Community Health Centre',
      distanceKm: 1.8,
      type: 'Community Health Centre',
      emergencyBeds: 24
    },
    whyAtRisk: [
      'Low elevation river confluence area susceptible to flash backwater inundation from Shiriya river.',
      'Drainage outlets severely silted during monsoon runoff, creating multi-day stagnant waterlogging.',
      'Key access bridge approaches submerged when river gauge crosses 4.2m warning threshold.'
    ],
    fieldAction: 'Monitor river gauge levels and stage response boats near Kumbla bridge junction.'
  },
  {
    id: 'hab-pallikkara',
    name: 'Pallikkara',
    district: 'Kasaragod',
    state: 'Kerala',
    taluk: 'Hosdurg',
    coordinates: [12.3955, 75.0210],
    population: 3120,
    households: 640,
    primaryHazard: 'Landslide',
    secondaryHazard: 'Slope Runoff',
    riskScore: 71,
    riskClassification: 'High',
    confidence: 79,
    verificationStatus: 'Field Verification in Progress',
    recommendedRelocationSiteId: 'site-kanhangad',
    hazardBreakdown: {
      coastalErosion: 28,
      floodExposure: 52,
      heavyRain: 86,
      landslide: 84
    },
    vulnerabilityFactors: {
      socialVulnerability: 62,
      populationDensity: 69,
      kutchaHousesPercent: 31,
      elderlyAndChildrenPercent: 22,
      lowLyingTopography: 25, // Elevated steep slope
      responseAccessScore: 48
    },
    nearestHealthcare: {
      name: 'Pallikkara Taluk Dispensary',
      distanceKm: 3.4,
      type: 'Dispensary',
      emergencyBeds: 8
    },
    whyAtRisk: [
      'Unstable laterite hill slopes with slope angle exceeding 32 degrees and loose soil top-layer.',
      'Sustained rainfall exceeding 180mm over 48 hours saturates pore water pressure on eastern slopes.',
      'Single narrow arterial road vulnerable to cut-offs from tree falls and localized debris flow.'
    ],
    fieldAction: 'Issue advisory to 140 families residing directly on the sub-slope terrace.'
  },
  {
    id: 'hab-cheruvathur',
    name: 'Cheruvathur',
    district: 'Kasaragod',
    state: 'Kerala',
    taluk: 'Hosdurg',
    coordinates: [12.2185, 75.1632],
    population: 2260,
    households: 490,
    primaryHazard: 'Flood Exposure',
    secondaryHazard: 'Backwater Spillage',
    riskScore: 64,
    riskClassification: 'Moderate',
    confidence: 84,
    verificationStatus: 'Verified by District Cell',
    recommendedRelocationSiteId: 'site-nileshwar',
    hazardBreakdown: {
      coastalErosion: 30,
      floodExposure: 72,
      heavyRain: 70,
      landslide: 15
    },
    vulnerabilityFactors: {
      socialVulnerability: 54,
      populationDensity: 62,
      kutchaHousesPercent: 26,
      elderlyAndChildrenPercent: 21,
      lowLyingTopography: 80,
      responseAccessScore: 68 // Better road connectivity
    },
    nearestHealthcare: {
      name: 'Cheruvathur Primary Health Centre',
      distanceKm: 1.2,
      type: 'Primary Health Centre',
      emergencyBeds: 16
    },
    whyAtRisk: [
      'Tejaswini river basin spillage affects lower wards during high spring tides.',
      'Agricultural bund breaches have historically caused localized waterlogging of rural settlements.',
      'Emergency response access remains viable via State Highway 57 bypass.'
    ],
    fieldAction: 'Keep local community shelter on standby; verify secondary drainage pumps.'
  },
  {
    id: 'hab-hosdurg-coastal',
    name: 'Hosdurg Coastal',
    district: 'Kasaragod',
    state: 'Kerala',
    taluk: 'Hosdurg',
    coordinates: [12.3080, 75.0712],
    population: 1820,
    households: 380,
    primaryHazard: 'Coastal Erosion',
    secondaryHazard: 'High Tide Inundation',
    riskScore: 58,
    riskClassification: 'Moderate',
    confidence: 80,
    verificationStatus: 'Verified by District Cell',
    recommendedRelocationSiteId: 'site-kanhangad',
    hazardBreakdown: {
      coastalErosion: 65,
      floodExposure: 42,
      heavyRain: 60,
      landslide: 10
    },
    vulnerabilityFactors: {
      socialVulnerability: 52,
      populationDensity: 58,
      kutchaHousesPercent: 22,
      elderlyAndChildrenPercent: 19,
      lowLyingTopography: 75,
      responseAccessScore: 72
    },
    nearestHealthcare: {
      name: 'Kanhangad District Hospital',
      distanceKm: 2.8,
      type: 'District Hospital',
      emergencyBeds: 120
    },
    whyAtRisk: [
      'Seasonal beach width contraction during southwest monsoon surges.',
      'Direct proximity to Kanhangad urban health infrastructure moderates overall response vulnerability.'
    ],
    fieldAction: 'Maintain coastal warning flags and communicate tidal schedules with fishing hamlets.'
  },
  {
    id: 'hab-manjeshwar-border',
    name: 'Manjeshwar Border Zone',
    district: 'Kasaragod',
    state: 'Kerala',
    taluk: 'Manjeshwar',
    coordinates: [12.7090, 74.8870],
    population: 1450,
    households: 310,
    primaryHazard: 'Flash Flood Runoff',
    secondaryHazard: 'Stream Bank Erosion',
    riskScore: 42,
    riskClassification: 'Low',
    confidence: 76,
    verificationStatus: 'Routine Monitoring',
    recommendedRelocationSiteId: 'site-vidyanagar',
    hazardBreakdown: {
      coastalErosion: 20,
      floodExposure: 46,
      heavyRain: 50,
      landslide: 22
    },
    vulnerabilityFactors: {
      socialVulnerability: 38,
      populationDensity: 45,
      kutchaHousesPercent: 18,
      elderlyAndChildrenPercent: 18,
      lowLyingTopography: 40,
      responseAccessScore: 78
    },
    nearestHealthcare: {
      name: 'Manjeshwar Taluk Hospital',
      distanceKm: 2.4,
      type: 'Taluk Hospital',
      emergencyBeds: 45
    },
    whyAtRisk: [
      'Localized stormwater overflows from stream embankments during torrential cloudbursts.',
      'Good terrain permeability and solid highway connectivity mitigate overall vulnerability.'
    ],
    fieldAction: 'Continue automated weather station telemetry observation.'
  }
];
