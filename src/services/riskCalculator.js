/**
 * Risk Assessment Calculation Engine
 * Multi-factor normalization: Hazard Exposure, Living Conditions, Population Density, Response Capacity.
 */

export function calculatePrototypeRisk(habitation, scenarioModifiers = {}) {
  const {
    rainfallMultiplier = 1.0,
    coastalErosionMultiplier = 1.0,
    populationMultiplier = 1.0
  } = scenarioModifiers;

  const hb = habitation.hazardBreakdown || {};
  const vf = habitation.vulnerabilityFactors || {};

  // 1. Hazard Composite (Scale 0-100)
  const adjustedCoastal = Math.min(100, (hb.coastalErosion || 20) * coastalErosionMultiplier);
  const adjustedFlood = Math.min(100, (hb.floodExposure || 20) * rainfallMultiplier);
  const adjustedRain = Math.min(100, (hb.heavyRain || 30) * rainfallMultiplier);
  const adjustedLandslide = Math.min(100, (hb.landslide || 10) * (rainfallMultiplier > 1.2 ? 1.3 : 1.0));

  let hazardExposureScore = 0;
  if (habitation.primaryHazard?.toLowerCase().includes('coastal')) {
    hazardExposureScore = (adjustedCoastal * 0.50) + (adjustedRain * 0.25) + (adjustedFlood * 0.25);
  } else if (habitation.primaryHazard?.toLowerCase().includes('flood')) {
    hazardExposureScore = (adjustedFlood * 0.50) + (adjustedRain * 0.30) + (adjustedCoastal * 0.20);
  } else if (habitation.primaryHazard?.toLowerCase().includes('landslide')) {
    hazardExposureScore = (adjustedLandslide * 0.50) + (adjustedRain * 0.35) + (adjustedFlood * 0.15);
  } else {
    hazardExposureScore = (adjustedFlood * 0.35) + (adjustedRain * 0.35) + (adjustedCoastal * 0.30);
  }

  // 2. Social Vulnerability & Housing
  const socialVulnerability = vf.socialVulnerability || 50;
  const kutchaFactor = vf.kutchaHousesPercent || 30;
  const elderlyFactor = vf.elderlyAndChildrenPercent || 25;
  const vulnerabilityScore = (socialVulnerability * 0.40) + (kutchaFactor * 0.35) + (elderlyFactor * 0.25);

  // 3. Population Exposure
  const basePopDensity = vf.populationDensity || 60;
  const populationExposureScore = Math.min(100, basePopDensity * populationMultiplier);

  // 4. Emergency Response Access Capacity
  const responseAccessScore = vf.responseAccessScore || 50;
  const accessDeduction = (responseAccessScore / 100) * 15;

  // Composite Formula
  let rawScore = (hazardExposureScore * 0.45) + (vulnerabilityScore * 0.25) + (populationExposureScore * 0.20) + 10 - accessDeduction;
  const finalScore = Math.min(99, Math.max(15, Math.round(rawScore)));

  // Classification & Light Badges
  let classification = 'Low';
  let badgeColor = 'text-green-800 bg-green-50 border-green-200';
  if (finalScore >= 70) {
    classification = 'High';
    badgeColor = 'text-red-700 bg-red-50 border-red-200';
  } else if (finalScore >= 50) {
    classification = 'Moderate';
    badgeColor = 'text-amber-800 bg-amber-50 border-amber-200';
  }

  const confidence = habitation.confidence || 82;

  // Plain-Language Explanations
  const contributingFactors = [
    {
      factorName: 'Hazard Intensity',
      label: habitation.primaryHazard || 'Hazard Exposure',
      score: Math.round(hazardExposureScore),
      level: hazardExposureScore > 70 ? 'High' : hazardExposureScore > 45 ? 'Moderate' : 'Low',
      plainLanguage: `${habitation.primaryHazard || 'Environmental hazard'} is currently the strongest concern for this area.`
    },
    {
      factorName: 'Housing & Demographics',
      label: 'People at Risk',
      score: Math.round(vulnerabilityScore),
      level: vulnerabilityScore > 65 ? 'High' : vulnerabilityScore > 40 ? 'Moderate' : 'Low',
      plainLanguage: `${kutchaFactor}% semi-permanent housing structures and vulnerable families in flood path.`
    },
    {
      factorName: 'Emergency Access',
      label: 'Evacuation Route Access',
      score: responseAccessScore,
      level: responseAccessScore < 45 ? 'Needs Attention' : responseAccessScore < 70 ? 'Moderate' : 'Good',
      plainLanguage: responseAccessScore < 45 
        ? 'Narrow coastal link roads are prone to early waterlogging, creating vehicle bottlenecks.'
        : 'Viable secondary access exists via highway corridors.'
    }
  ];

  return {
    riskScore: finalScore,
    classification,
    badgeColor,
    confidence,
    hazardExposureScore: Math.round(hazardExposureScore),
    vulnerabilityScore: Math.round(vulnerabilityScore),
    responseAccessScore,
    contributingFactors
  };
}
