/**
 * Disaster Alerts Dataset
 * SEPARATION:
 * 1. OFFICIAL SACHET ALERTS (CAP-based warnings from NDMA / IMD / Kerala SDMA)
 * 2. ABHAYASSIST RISK ALERTS (Early warnings generated from multi-factor analysis)
 */

export const SACHET_ALERTS_DATA = [
  {
    id: 'sachet-alert-01',
    type: 'OFFICIAL_SACHET_ALERT',
    headline: 'Heavy to Very Heavy Rainfall (Orange Warning)',
    severity: 'Severe',
    agency: 'India Meteorological Department (IMD) via SACHET',
    effectiveFrom: 'Today, 06:00 IST',
    expiresAt: 'Tomorrow, 18:00 IST',
    targetDistricts: ['Kasaragod', 'Kannur', 'Wayanad'],
    affectedZones: 'Coastal & Ghat sectors of Kasaragod district',
    category: 'Heavy Rain / Coastal Inundation',
    bulletinNumber: 'SACHET-KL-KSD-2026-09-082',
    description: 'Sustained precipitation (115 mm - 204 mm) anticipated with squally wind gusts reaching 45-55 km/h along the North Kerala coast. Fishermen advised not to venture into sea.',
    instructions: [
      'Avoid visiting waterlogged coastal roads and river crossings.',
      'Local disaster cells directed to keep rescue boats ready in low-lying taluks.',
      'Monitor water levels at Shiriya and Chandragiri river stations.'
    ],
    isOfficial: true
  },
  {
    id: 'sachet-alert-02',
    type: 'OFFICIAL_SACHET_ALERT',
    headline: 'High Wave & Coastal Swell Advisory',
    severity: 'Moderate',
    agency: 'INCOIS via SACHET National Alert Portal',
    effectiveFrom: 'Yesterday, 14:00 IST',
    expiresAt: 'Tomorrow, 23:30 IST',
    targetDistricts: ['Kasaragod', 'Kannur'],
    affectedZones: 'Mogral Puthur to Hosdurg coastal belt',
    category: 'Coastal Erosion / High Waves',
    bulletinNumber: 'INCOIS-KL-2026-HWA-41',
    description: 'High swell waves in the range of 2.8 to 3.4 meters forecasted during high tide windows. Risk of localized seawater ingress.',
    instructions: [
      'Shoreline dwellings to maintain vigil during night high-tide peaks.',
      'Beach recreation and mechanized boat launching suspended.'
    ],
    isOfficial: true
  }
];

export const ABHAYASSIST_ALERTS_DATA = [
  {
    id: 'abhay-alert-01',
    type: 'ABHAYASSIST_RISK_ALERT',
    headline: 'Mogral Puthur: Coastal Erosion Swell Threshold Exceeded',
    severity: 'High Risk',
    targetHabitationId: 'hab-mogral-puthur',
    targetHabitationName: 'Mogral Puthur',
    taluk: 'Kasaragod',
    generatedAt: '12 mins ago',
    category: 'Coastal Erosion',
    alertSummary: 'Wave power index coupled with spring tide indicates high probability of seawall overtopping within 12 hours.',
    actionRequired: 'Pre-emptive relocation advisory recommended for 580 households in coastal wards 3 and 4.',
    recommendedRelocationSite: 'Periya Community Campus (8.4 km)',
    isOfficial: false
  },
  {
    id: 'abhay-alert-02',
    type: 'ABHAYASSIST_RISK_ALERT',
    headline: 'Kumbla North: Shiriya Estuary Runoff Waterlogging Alert',
    severity: 'Elevated Risk',
    targetHabitationId: 'hab-kumbla-north',
    targetHabitationName: 'Kumbla North',
    taluk: 'Manjeshwar',
    generatedAt: '28 mins ago',
    category: 'River Flood',
    alertSummary: 'Upstream rainfall reports 88mm cumulative rain; backwater drainage is impeded by high tide counter-pressure.',
    actionRequired: 'Inspect Kumbla bypass culverts; stage standby passenger transport at panchayat depot.',
    recommendedRelocationSite: 'Vidyanagar Sports Complex (6.2 km)',
    isOfficial: false
  },
  {
    id: 'abhay-alert-03',
    type: 'ABHAYASSIST_RISK_ALERT',
    headline: 'Pallikkara: Soil Moisture Saturation Slope Warning',
    severity: 'Elevated Risk',
    targetHabitationId: 'hab-pallikkara',
    targetHabitationName: 'Pallikkara',
    taluk: 'Hosdurg',
    generatedAt: '1 hour ago',
    category: 'Landslide Risk',
    alertSummary: 'Soil moisture saturation exceeds 84% on steep 32-degree laterite gradient.',
    actionRequired: 'Issue precautionary alert to 140 households on eastern sub-slope road.',
    recommendedRelocationSite: 'Kanhangad Resilient Hub (7.8 km)',
    isOfficial: false
  }
];
