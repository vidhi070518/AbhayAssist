/**
 * Disaster Alerts Dataset
 * STRICT ARCHITECTURAL SEPARATION:
 * 1. OFFICIAL SACHET ALERTS (CAP-based warnings from NDMA / IMD / Kerala SDMA)
 * 2. ABHAYASSIST AI RISK SIGNALS (Predictive localized signals generated from multi-factor analysis)
 *
 * NOTE: Identified as Demo Data (Referencing SACHET / IMD protocols).
 */

export const SACHET_ALERTS_DATA = [
  {
    id: 'sachet-alert-01',
    type: 'OFFICIAL_SACHET_ALERT',
    headline: 'Heavy to Very Heavy Rainfall (Orange Warning)',
    severity: 'Severe',
    agency: 'India Meteorological Department (IMD) via SACHET / NDMA',
    effectiveFrom: 'Today, 06:00 IST',
    expiresAt: 'Tomorrow, 18:00 IST',
    targetDistricts: ['Kasaragod', 'Kannur', 'Wayanad'],
    affectedZones: 'Coastal & Ghat sectors of Kasaragod district',
    category: 'Heavy Rain / Coastal Inundation',
    color: '#ea580c', // Sachet orange
    bulletinNumber: 'SACHET-KL-KSD-2026-09-082',
    description: 'Sustained precipitation (115 mm - 204 mm) anticipated with squally wind gusts reaching 45-55 km/h along the North Kerala coast. Fishermen advised not to venture into sea.',
    instructions: [
      'Avoid visiting waterlogged coastal roads and river crossings.',
      'Local disaster cells directed to keep rescue boats ready in low-lying taluks.',
      'Monitor water levels at Shiriya and Chandragiri river stations.'
    ],
    isOfficial: true,
    isDemoData: true
  },
  {
    id: 'sachet-alert-02',
    type: 'OFFICIAL_SACHET_ALERT',
    headline: 'High Wave & Coastal Swell Advisory',
    severity: 'Moderate',
    agency: 'INCOIS via SACHET National Disaster Alert Portal',
    effectiveFrom: 'Yesterday, 14:00 IST',
    expiresAt: 'Tomorrow, 23:30 IST',
    targetDistricts: ['Kasaragod', 'Kannur'],
    affectedZones: 'Mogral Puthur to Hosdurg coastal belt',
    category: 'Coastal Erosion / High Waves',
    color: '#f59e0b',
    bulletinNumber: 'INCOIS-KL-2026-HWA-41',
    description: 'High swell waves in the range of 2.8 to 3.4 meters forecasted during high tide windows (11:20 AM and 11:45 PM). Risk of localized seawater ingress.',
    instructions: [
      'Shoreline dwellings to maintain vigil during night high-tide peaks.',
      'Beach recreation and mechanized boat launching suspended.'
    ],
    isOfficial: true,
    isDemoData: true
  }
];

export const ABHAYASSIST_SIGNALS_DATA = [
  {
    id: 'abhay-signal-01',
    type: 'ABHAYASSIST_RISK_SIGNAL',
    headline: 'Mogral Puthur: Coastal Erosion Surge Threshold Exceeded',
    severity: 'High Priority',
    modelConfidence: '86%',
    targetHabitationId: 'hab-mogral-puthur',
    targetHabitationName: 'Mogral Puthur',
    taluk: 'Kasaragod',
    generatedAt: '12 mins ago (Automated Ingestion Cycle)',
    category: 'Coastal Erosion & Social Vulnerability',
    color: '#ef4444',
    signalSummary: 'Wave power index coupled with spring tide height indicates 68% probability of seawall overtopping within 12 hours.',
    actionRequired: 'Pre-emptive relocation advisory recommended for 580 households in coastal wards 3 and 4.',
    recommendedRelocationSite: 'Periya Community Campus (8.4 km)',
    isOfficial: false,
    isPrototypeSignal: true
  },
  {
    id: 'abhay-signal-02',
    type: 'ABHAYASSIST_RISK_SIGNAL',
    headline: 'Kumbla North: Shiriya Estuary Runoff Waterlogging Signal',
    severity: 'Elevated Risk',
    modelConfidence: '82%',
    targetHabitationId: 'hab-kumbla-north',
    targetHabitationName: 'Kumbla North',
    taluk: 'Manjeshwar',
    generatedAt: '28 mins ago',
    category: 'Hydrological Flood Exposure',
    color: '#f59e0b',
    signalSummary: 'Upstream rainfall telemetry reports 88mm cumulative rainfall; backwater drainage rate is impeded by high tide counter-pressure.',
    actionRequired: 'Inspect Kumbla bypass culverts; stage standby passenger transport at panchayat depot.',
    recommendedRelocationSite: 'Vidyanagar Sports Complex (6.2 km)',
    isOfficial: false,
    isPrototypeSignal: true
  },
  {
    id: 'abhay-signal-03',
    type: 'ABHAYASSIST_RISK_SIGNAL',
    headline: 'Pallikkara: Soil Moisture Saturation Slope Warning',
    severity: 'Elevated Risk',
    modelConfidence: '79%',
    targetHabitationId: 'hab-pallikkara',
    targetHabitationName: 'Pallikkara',
    taluk: 'Hosdurg',
    generatedAt: '1 hour ago',
    category: 'Landslide Susceptibility',
    color: '#f59e0b',
    signalSummary: 'Antecedent soil moisture proxy exceeds 84% saturation on 32-degree laterite gradient.',
    actionRequired: 'Issue precautionary alert to 140 households on eastern sub-slope road.',
    recommendedRelocationSite: 'Kanhangad Resilient Hub (7.8 km)',
    isOfficial: false,
    isPrototypeSignal: true
  }
];
