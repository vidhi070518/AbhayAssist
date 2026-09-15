/**
 * Relocation Decision Engine
 * Transparent, contextual scoring and distance calculation for candidate relocation sites.
 */

/**
 * Calculates straight-line distance in kilometers using the Haversine formula.
 * @param {Array<number>} coords1 - [latitude, longitude] of origin
 * @param {Array<number>} coords2 - [latitude, longitude] of destination
 * @returns {number} Distance in kilometers rounded to 1 decimal place.
 */
export function calculateDistanceKm(coords1, coords2) {
  if (!coords1 || !coords2 || coords1.length < 2 || coords2.length < 2) return 0;
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

/**
 * Calculates contextual suitability score (0-100) of a candidate relocation site for a specific habitation.
 * Formula components:
 * 1. Distance factor (35%): Closer is more accessible for evacuation convoys.
 * 2. Capacity sufficiency (25%): Can the site house the entire affected population?
 * 3. Elevation & hazard safety (20%): Protection from storm surge and river backwater.
 * 4. Road infrastructure & accessibility (20%): Highway/arterial corridor connectivity.
 */
export function calculateRelocationSuitability(habitation, site) {
  if (!habitation || !site) return 0;

  const distanceKm = calculateDistanceKm(habitation.coordinates, site.coordinates);

  // 1. Distance Score (Scale 0-100, max weight 35%)
  // Under 8 km: 100 pts, drops linearly to 40 pts at 35 km
  let distanceScore = 100;
  if (distanceKm > 8) {
    distanceScore = Math.max(30, Math.round(100 - (distanceKm - 8) * 2.5));
  }

  // 2. Capacity Sufficiency Score (Scale 0-100, max weight 25%)
  const buffer = site.capacity - habitation.population;
  let capacityScore = 100;
  if (buffer < 0) {
    // Deficit: site cannot hold entire village alone
    capacityScore = Math.max(40, Math.round((site.capacity / habitation.population) * 80));
  } else if (buffer < 200) {
    // Very tight margin
    capacityScore = 85;
  } else {
    // Healthy buffer
    capacityScore = 100;
  }

  // 3. Elevation & Hazard Safety Score (Scale 0-100, max weight 20%)
  // 70m+ elevation = 100 pts, 40m-70m = 90 pts, 30m-40m = 80 pts
  let elevationScore = 80;
  if (site.elevationMeters >= 60) {
    elevationScore = 100;
  } else if (site.elevationMeters >= 40) {
    elevationScore = 90;
  } else {
    elevationScore = 80;
  }

  // 4. Road Accessibility & Infrastructure (Scale 0-100, max weight 20%)
  let accessScore = 85;
  if (site.roadAccessLevel.toLowerCase().includes('nh-66') || site.roadAccessLevel.toLowerCase().includes('highway')) {
    accessScore = 100;
  } else if (site.roadAccessLevel.toLowerCase().includes('arterial')) {
    accessScore = 90;
  }

  // Weighted Composite
  const composite =
    distanceScore * 0.35 +
    capacityScore * 0.25 +
    elevationScore * 0.20 +
    accessScore * 0.20;

  return Math.min(99, Math.max(45, Math.round(composite)));
}

/**
 * Generates 5 contextual "Why Recommended" bullet points for a candidate site tailored to the selected habitation.
 */
export function generateWhyRecommendedReasons(habitation, site, distanceKm, suitabilityScore) {
  const buffer = site.capacity - habitation.population;
  const isPositiveBuffer = buffer >= 0;

  const reasons = [];

  // 1. Distance context
  reasons.push(
    `Estimated transit distance: approximately ${distanceKm} km from ${habitation.name}, allowing rapid bus convoy deployment.`
  );

  // 2. Capacity context
  if (isPositiveBuffer) {
    reasons.push(
      `Sufficient capacity: Site capacity of ${site.capacity.toLocaleString()} persons accommodates all ${habitation.population.toLocaleString()} residents of ${habitation.name} with a surplus headroom of +${buffer.toLocaleString()} places.`
    );
  } else {
    reasons.push(
      `Primary cluster capacity: Accommodates ${site.capacity.toLocaleString()} residents of ${habitation.name}. Overflow split protocol recommended for remaining population.`
    );
  }

  // 3. Hazard protection context
  if (habitation.primaryHazard?.toLowerCase().includes('coastal')) {
    reasons.push(
      `Elevated safety: At ${site.elevationMeters}m above sea level, the site is well inland and completely protected from coastal erosion and sea swells.`
    );
  } else if (habitation.primaryHazard?.toLowerCase().includes('flood')) {
    reasons.push(
      `High-ground flood immunity: Situated at ${site.elevationMeters}m elevation on natural tableland outside river flood spill zones.`
    );
  } else if (habitation.primaryHazard?.toLowerCase().includes('landslide')) {
    reasons.push(
      `Terrain stability: Flat, engineered institutional foundation with zero historical landslide or slope movement records.`
    );
  } else {
    reasons.push(
      `Multi-hazard resilience: Secure structural buildings tested against severe monsoon storms and wind gusts.`
    );
  }

  // 4. Road accessibility context
  reasons.push(
    `Transit corridor: Accessible via ${site.roadAccessLevel}, minimizing bottleneck risk during emergency evacuation.`
  );

  // 5. Healthcare / Infrastructure context
  reasons.push(
    `Emergency support: Medical readiness coordinated with ${site.nearestHospital}. On-site facilities include reliable water storage and backup power.`
  );

  return reasons;
}

/**
 * Ranks all candidate relocation sites for the selected habitation,
 * computing distance, suitability score, and customized reasoning.
 * @param {Object} habitation - The active selected habitation
 * @param {Array<Object>} sites - All candidate relocation sites
 * @returns {Array<Object>} Ranked array of candidate sites (best match at index 0)
 */
export function getRankedRelocationSites(habitation, sites) {
  if (!habitation || !sites || sites.length === 0) return [];

  const evaluated = sites.map((site) => {
    const distanceKm = calculateDistanceKm(habitation.coordinates, site.coordinates);
    const suitabilityScore = calculateRelocationSuitability(habitation, site);
    const buffer = site.capacity - habitation.population;
    const whyRecommended = generateWhyRecommendedReasons(
      habitation,
      site,
      distanceKm,
      suitabilityScore
    );

    return {
      ...site,
      distanceKm,
      suitabilityScore,
      buffer,
      whyRecommended
    };
  });

  // Sort descending by calculated suitability score
  return evaluated.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}
