/**
 * Scenario Simulation Engine ("What If?" Analysis)
 * Used to model how emerging weather worsening affects risk scores and relocation urgency.
 * NOTE: Labelled as "Demo Simulation" for SIH presentation.
 */

import { calculatePrototypeRisk } from './riskCalculator';

export function runScenarioSimulation(habitation, { rainfall, coastalErosion, populationExposure }) {
  // Multipliers
  const rainfallMap = {
    normal: 1.0,
    heavy: 1.35,
    extreme: 1.65
  };

  const erosionMap = {
    current: 1.0,
    increased: 1.30,
    severe: 1.60
  };

  const popMap = {
    current: 1.0,
    plus10: 1.10,
    plus25: 1.25
  };

  const rainfallMultiplier = rainfallMap[rainfall] || 1.0;
  const coastalErosionMultiplier = erosionMap[coastalErosion] || 1.0;
  const populationMultiplier = popMap[populationExposure] || 1.0;

  // Baseline
  const baseline = calculatePrototypeRisk(habitation, {
    rainfallMultiplier: 1.0,
    coastalErosionMultiplier: 1.0,
    populationMultiplier: 1.0
  });

  // Simulated
  const simulated = calculatePrototypeRisk(habitation, {
    rainfallMultiplier,
    coastalErosionMultiplier,
    populationMultiplier
  });

  const delta = simulated.riskScore - baseline.riskScore;

  // Impact summary
  let urgencyLevel = 'Standard Monitoring';
  let impactExplanation = 'Baseline environmental conditions. No immediate emergency surge detected.';

  if (delta > 10 || simulated.riskScore >= 88) {
    urgencyLevel = 'CRITICAL PRE-EMPTIVE EVACUATION';
    impactExplanation = `Under this scenario, simulated risk surges by +${delta} points to ${simulated.riskScore}/100. Emergency evacuation corridors may experience inundation within 4-6 hours. Immediate bus convoy staging at ${habitation.name} is advised.`;
  } else if (delta > 5 || simulated.riskScore >= 75) {
    urgencyLevel = 'ELEVATED RELOCATION STANDBY';
    impactExplanation = `Under this scenario, simulated risk increases by +${delta} points to ${simulated.riskScore}/100. Relocation candidate sites should be notified for shelter readiness and inventory check.`;
  } else if (delta > 0) {
    urgencyLevel = 'ADVISORY WATCH';
    impactExplanation = `Under this scenario, minor uptick of +${delta} points observed. Field officers should verify drainage channels and coastal embankments.`;
  }

  return {
    baselineScore: baseline.riskScore,
    baselineClassification: baseline.classification,
    simulatedScore: simulated.riskScore,
    simulatedClassification: simulated.classification,
    delta,
    urgencyLevel,
    impactExplanation,
    simulatedFactors: simulated.contributingFactors,
    methodologyNotice: 'Demo Simulation (Dynamic Multi-Hazard Sensitivity Model)'
  };
}
