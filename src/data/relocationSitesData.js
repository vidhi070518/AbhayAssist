/**
 * Candidate Relocation Sites Dataset for Kasaragod District, Kerala
 * Identified on elevated, hazard-resilient public & institutional grounds.
 */

export const RELOCATION_SITES_DATA = [
  {
    id: 'site-periya',
    name: 'Periya Community Campus',
    district: 'Kasaragod',
    taluk: 'Hosdurg',
    coordinates: [12.3950, 75.0920],
    capacity: 3600,
    currentOccupancy: 0,
    elevationMeters: 72,
    suitabilityScore: 94,
    hazardResilienceScore: 98,
    roadAccessLevel: 'NH-66 Arterial Corridor (High Capacity)',
    nearestHospital: 'Kasaragod District Hospital (7.2 km) / Periya CHC (1.4 km)',
    nearestHospitalBeds: 140,
    verificationStatus: 'District Administration Verified',
    infrastructure: [
      '24/7 Diesel Generator Power Backup (120 kVA)',
      '150,000 Litre Overhead Treated Water Sump',
      '48 Functional Sanitation / Hygiene Units',
      'Open Ground Suitable for Emergency Helicopter Landing',
      'Pre-designated Medical Triage Wing'
    ],
    whyRecommended: [
      'Elevated tableland (72m above sea level) completely immune to coastal surge and river floods.',
      'Sufficient capacity (3,600 people) comfortably accommodates Mogral Puthur (2,840) with 25% buffer.',
      'Direct dual-carriageway access via NH-66 bypass enables swift transit of evacuation convoys.',
      'Close proximity to Periya Community Health Centre (1.4 km) ensures immediate medical triage.',
      'Government institutional land ownership eliminates private land requisition bottlenecks.'
    ]
  },
  {
    id: 'site-kanhangad',
    name: 'Kanhangad Resilient Hub & Mini Stadium',
    district: 'Kasaragod',
    taluk: 'Hosdurg',
    coordinates: [12.3120, 75.0890],
    capacity: 2800,
    currentOccupancy: 0,
    elevationMeters: 42,
    suitabilityScore: 88,
    hazardResilienceScore: 92,
    roadAccessLevel: 'State Highway 56 + Municipal Arterial Road',
    nearestHospital: 'Kanhangad Taluk Headquarters Hospital (2.0 km)',
    nearestHospitalBeds: 120,
    verificationStatus: 'Revenue Department Cleared',
    infrastructure: [
      'Indoor Sports Hall with High Ceiling Ventilation',
      '80,000 Litre Municipal Water Supply + Borewell',
      '36 Sanitary Blocks with Disability Access',
      'Commercial Kitchen Setup for Community Cooked Meals',
      'Telecom Tower with Dedicated Disaster Priority Line'
    ],
    whyRecommended: [
      'Well-drained higher elevation terrain with zero history of flash floods or slope failures.',
      'Solid indoor shelter halls capable of housing 2,800 individuals with family separation zones.',
      'Rapid connection to Kanhangad Taluk Hospital within a 7-minute ambulance run.',
      'Equipped community kitchen facility ready for immediate deployment of hot meals.'
    ]
  },
  {
    id: 'site-vidyanagar',
    name: 'Vidyanagar Sports Complex & Multi-Purpose Hall',
    district: 'Kasaragod',
    taluk: 'Kasaragod',
    coordinates: [12.5180, 75.0120],
    capacity: 1800,
    currentOccupancy: 0,
    elevationMeters: 48,
    suitabilityScore: 85,
    hazardResilienceScore: 90,
    roadAccessLevel: 'Cheruvathur-Kasaragod Road (Good Condition)',
    nearestHospital: 'Kasaragod General Hospital (3.1 km)',
    nearestHospitalBeds: 180,
    verificationStatus: 'Municipal Inspection Completed',
    infrastructure: [
      'Two Multi-Purpose Covered Auditoriums',
      'Solar Power Array with Battery Storage Support',
      'Dedicated Quarantine / Isolation Block',
      'Ample Bus & Heavy Vehicle Parking Bay'
    ],
    whyRecommended: [
      'Strategic urban-fringe location with multi-modal highway and bypass connections.',
      'Robust masonry structures certified by Public Works Department for storm tolerance.',
      'Dedicated isolation rooms to prevent outbreaks of water-borne pathogens during emergencies.'
    ]
  },
  {
    id: 'site-nileshwar',
    name: 'Nileshwar Safe Shelter Centre',
    district: 'Kasaragod',
    taluk: 'Hosdurg',
    coordinates: [12.2560, 75.1320],
    capacity: 1500,
    currentOccupancy: 0,
    elevationMeters: 36,
    suitabilityScore: 81,
    hazardResilienceScore: 88,
    roadAccessLevel: 'State Highway 57 Main Corridor',
    nearestHospital: 'Nileshwar Taluk Hospital (1.9 km)',
    nearestHospitalBeds: 60,
    verificationStatus: 'Designated Cyclone Shelter',
    infrastructure: [
      'Reinforced Concrete Multi-hazard Shelter Architecture',
      'Rooftop Rainwater Harvesting with Filtration Tanks',
      'Emergency Satellite Phone Station'
    ],
    whyRecommended: [
      'Officially engineered disaster shelter designed to withstand cyclonic wind gusts up to 140 km/h.',
      'Elevated plinth above historic 100-year flood levels of the nearby Tejaswini tributary.',
      'Quick transit route for habitations in the southern Hosdurg coastal belt.'
    ]
  }
];
