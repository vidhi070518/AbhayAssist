/**
 * Scenario Simulation Engine ("What If?" Weather & Flood Sensitivity)
 * Models how escalating weather affects risk scores and relocation urgency.
 */

import { calculatePrototypeRisk } from './riskCalculator';

export function runScenarioSimulation(habitation, { rainfall, coastalErosion, populationExposure }) {
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

  const baseline = calculatePrototypeRisk(habitation, {
    rainfallMultiplier: 1.0,
    coastalErosionMultiplier: 1.0,
    populationMultiplier: 1.0
  });

  const simulated = calculatePrototypeRisk(habitation, {
    rainfallMultiplier,
    coastalErosionMultiplier,
    populationMultiplier
  });

  const delta = simulated.riskScore - baseline.riskScore;

  let urgencyLevel = 'Standard Monitoring';
  let impactExplanation = 'Baseline environmental conditions. No immediate emergency surge detected.';

  if (delta > 8 || simulated.riskScore >= 85) {
    urgencyLevel = 'Immediate Evacuation Advisory';
    impactExplanation = `Under this scenario, risk increases by +${delta} points to ${simulated.riskScore}/100. Key transit roads may experience waterlogging within 4 to 6 hours. Advance bus staging at ${habitation.name} is recommended.`;
  } else if (delta > 4 || simulated.riskScore >= 75) {
    urgencyLevel = 'Relocation Standby Warning';
    impactExplanation = `Under this scenario, risk increases by +${delta} points to ${simulated.riskScore}/100. Candidate relocation sites should be verified for shelter readiness.`;
  } else if (delta > 0) {
    urgencyLevel = 'Advisory Watch';
    impactExplanation = `Under this scenario, slight risk increase of +${delta} points observed. Field teams should monitor drainage channels and coastal embankments.`;
  }

  return {
    baselineScore: baseline.riskScore,
    baselineClassification: baseline.classification,
    simulatedScore: simulated.riskScore,
    simulatedClassification: simulated.classification,
    delta,
    urgencyLevel,
    impactExplanation,
    simulatedFactors: simulated.contributingFactors
  };
}
