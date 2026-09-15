# PostgreSQL + PostGIS Spatial Architecture

## Spatial Indexing Strategy
AbhayAssist leverages PostGIS GiST spatial indexes on EPSG:4326 (WGS 84):

```sql
CREATE INDEX idx_habitations_geom ON habitations USING GIST (geom);
CREATE INDEX idx_hazard_zones_geom ON hazard_zones USING GIST (geom);
CREATE INDEX idx_relocation_sites_geom ON relocation_sites USING GIST (geom);
```

## Relocation Proximity & Hazard Avoidance Query
```sql
-- Query candidate relocation sites within 20km of a high-risk settlement
-- that do NOT intersect any active hazard zones:
SELECT 
    s.id,
    s.name,
    s.capacity,
    s.elevation_meters,
    ST_Distance(h.geom::geography, s.geom::geography) / 1000.0 AS distance_km
FROM habitations h
CROSS JOIN relocation_sites s
WHERE h.id = 'hab-mogral-puthur'
  AND ST_DWithin(h.geom::geography, s.geom::geography, 25000)
  AND NOT EXISTS (
      SELECT 1 
      FROM hazard_zones hz 
      WHERE ST_Intersects(s.geom, hz.geom)
  )
ORDER BY s.suitability_score DESC;
```
