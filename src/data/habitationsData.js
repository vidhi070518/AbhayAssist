/**
 * Habitations Dataset for Kasaragod District, Kerala
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
    secondaryHazard: 'High Tide Swell',
    riskScore: 82,
    riskClassification: 'High',
    confidence: 86,
    verificationStatus: 'Field verification requested',
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
      responseAccessScore: 35
    },
    nearestHealthcare: {
      name: 'Government PHC Mogral',
      distanceKm: 2.1,
      type: 'Primary Health Centre',
      emergencyBeds: 12
    },
    whyAtRisk: [
      'Active seawall breach and accelerating shoreline loss along the coastal stretch.',
      'Over 40% of housing structures are semi-permanent dwellings within 150m of high-tide line.',
      'Narrow coastal access road is prone to waterlogging during peak high tide, restricting vehicle access.',
      'Higher proportion of elderly residents and children requiring organized transport.'
    ],
    fieldAction: 'Initiate advisory for planned relocation to Periya Community Campus.'
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
    primaryHazard: 'Flood Risk',
    secondaryHazard: 'River Estuary Backflow',
    riskScore: 76,
    riskClassification: 'High',
    confidence: 82,
    verificationStatus: 'Inspection scheduled',
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
      'Drainage outlets silted during heavy runoff, creating stagnant waterlogging.',
      'Key access bridge approaches submerged when river gauge crosses warning threshold.'
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
    primaryHazard: 'Landslide Risk',
    secondaryHazard: 'Slope Runoff',
    riskScore: 71,
    riskClassification: 'High',
    confidence: 79,
    verificationStatus: 'Field verification in progress',
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
      lowLyingTopography: 25,
      responseAccessScore: 48
    },
    nearestHealthcare: {
      name: 'Pallikkara Taluk Dispensary',
      distanceKm: 3.4,
      type: 'Dispensary',
      emergencyBeds: 8
    },
    whyAtRisk: [
      'Unstable laterite hill slopes with steep gradient and loose top-layer soil.',
      'Sustained rainfall saturates pore water pressure on eastern slopes.',
      'Narrow arterial road vulnerable to cut-offs from tree falls and debris flow.'
    ],
    fieldAction: 'Issue advisory to families residing directly on the sub-slope terrace.'
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
    primaryHazard: 'Flood Risk',
    secondaryHazard: 'Backwater Inundation',
    riskScore: 64,
    riskClassification: 'Moderate',
    confidence: 84,
    verificationStatus: 'Verified by district team',
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
      responseAccessScore: 68
    },
    nearestHealthcare: {
      name: 'Cheruvathur Primary Health Centre',
      distanceKm: 1.2,
      type: 'Primary Health Centre',
      emergencyBeds: 16
    },
    whyAtRisk: [
      'Tejaswini river basin spillage affects lower wards during high tides.',
      'Agricultural bund breaches have historically caused localized waterlogging.',
      'Emergency response access remains viable via State Highway 57 bypass.'
    ],
    fieldAction: 'Keep local community shelter on standby; verify secondary drainage pumps.'
  }
];
