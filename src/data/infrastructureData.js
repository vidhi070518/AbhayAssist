/**
 * Infrastructure Facilities around Kasaragod District, Kerala
 * Hospitals, Primary Health Centres, Multi-Purpose Shelters, Fire & Emergency Stations
 */

export const INFRASTRUCTURE_DATA = [
  {
    id: 'infra-hosp-kasaragod',
    name: 'Kasaragod General Hospital',
    type: 'Hospital',
    category: 'Healthcare',
    coordinates: [12.5025, 74.9890],
    totalBeds: 250,
    emergencyICU: 24,
    ambulanceCount: 6,
    contactNumber: '04994-220050',
    address: 'Kasaragod Town, Kerala 671121'
  },
  {
    id: 'infra-hosp-kanhangad',
    name: 'Kanhangad Taluk Headquarters Hospital',
    type: 'Hospital',
    category: 'Healthcare',
    coordinates: [12.3150, 75.0920],
    totalBeds: 180,
    emergencyICU: 18,
    ambulanceCount: 5,
    contactNumber: '0467-2204225',
    address: 'Kanhangad, Kerala 671315'
  },
  {
    id: 'infra-chc-periya',
    name: 'Community Health Centre Periya',
    type: 'Community Health Centre',
    category: 'Healthcare',
    coordinates: [12.3980, 75.0880],
    totalBeds: 40,
    emergencyICU: 4,
    ambulanceCount: 2,
    contactNumber: '0467-2233200',
    address: 'Periya Junction, Kasaragod 671316'
  },
  {
    id: 'infra-phc-mogral',
    name: 'Government PHC Mogral',
    type: 'Primary Health Centre',
    category: 'Healthcare',
    coordinates: [12.5580, 74.9690],
    totalBeds: 12,
    emergencyICU: 0,
    ambulanceCount: 1,
    contactNumber: '04994-245100',
    address: 'Mogral, Kasaragod 671321'
  },
  {
    id: 'infra-shelter-nileshwar',
    name: 'Multi-Hazard Cyclone Shelter Nileshwar',
    type: 'Disaster Shelter',
    category: 'Shelter',
    coordinates: [12.2540, 75.1310],
    shelterCapacity: 1500,
    waterStorageLtrs: 60000,
    generatorPowerKVA: 45,
    address: 'Near Nileshwar Railway Gate, Hosdurg 671314'
  },
  {
    id: 'infra-shelter-cheruvathur',
    name: 'Tejaswini Community Relief Shelter',
    type: 'Disaster Shelter',
    category: 'Shelter',
    coordinates: [12.2220, 75.1610],
    shelterCapacity: 900,
    waterStorageLtrs: 35000,
    generatorPowerKVA: 30,
    address: 'Cheruvathur Town, Kasaragod 671313'
  },
  {
    id: 'infra-fire-kasaragod',
    name: 'Kasaragod Fire & Rescue Headquarters',
    type: 'Emergency Response',
    category: 'Emergency',
    coordinates: [12.5080, 74.9850],
    rescueBoats: 4,
    fireTenders: 6,
    emergencyTollFree: '101 / 04994-230101',
    address: 'Station Road, Kasaragod 671121'
  }
];
