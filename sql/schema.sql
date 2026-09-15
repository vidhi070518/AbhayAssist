-- AbhayAssist Database Schema
-- PostgreSQL 15+ with PostGIS Extension
-- Designed for spatial indexing, polygon intersection queries, and proximity search

CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Habitations Entity
CREATE TABLE habitations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    taluk VARCHAR(100) NOT NULL,
    district VARCHAR(100) DEFAULT 'Kasaragod',
    state VARCHAR(100) DEFAULT 'Kerala',
    geom GEOMETRY(Point, 4326) NOT NULL,
    population INTEGER NOT NULL,
    households INTEGER NOT NULL,
    primary_hazard VARCHAR(100) NOT NULL,
    kutcha_houses_pct NUMERIC(5,2),
    elderly_children_pct NUMERIC(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_habitations_geom ON habitations USING GIST (geom);

-- 2. Hazard Zones Entity (GeoJSON Polygons from Bhuvan / NDEM)
CREATE TABLE hazard_zones (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hazard_type VARCHAR(100) NOT NULL, -- 'coastal_erosion', 'flood', 'landslide', 'cyclone'
    severity_level VARCHAR(50) NOT NULL, -- 'High', 'Moderate', 'Low'
    geom GEOMETRY(Polygon, 4326) NOT NULL,
    data_source VARCHAR(100) DEFAULT 'Bhuvan / NDEM',
    effective_date DATE NOT NULL,
    expiry_date DATE,
    metadata JSONB
);

CREATE INDEX idx_hazard_zones_geom ON hazard_zones USING GIST (geom);

-- 3. Candidate Relocation Sites Entity
CREATE TABLE relocation_sites (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    district VARCHAR(100) DEFAULT 'Kasaragod',
    taluk VARCHAR(100) NOT NULL,
    geom GEOMETRY(Point, 4326) NOT NULL,
    capacity INTEGER NOT NULL,
    elevation_meters NUMERIC(6,2) NOT NULL,
    suitability_score NUMERIC(5,2) NOT NULL,
    road_access_tier VARCHAR(100) NOT NULL,
    infrastructure JSONB,
    verification_status VARCHAR(100) DEFAULT 'Pending Inspection',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_relocation_sites_geom ON relocation_sites USING GIST (geom);

-- 4. Infrastructure Facilities (Hospitals, PHCs, Shelters, Fire)
CREATE TABLE infrastructure_facilities (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Healthcare', 'Shelter', 'Emergency'
    facility_type VARCHAR(100) NOT NULL,
    geom GEOMETRY(Point, 4326) NOT NULL,
    capacity_or_beds INTEGER,
    contact_phone VARCHAR(50),
    address TEXT
);

CREATE INDEX idx_infra_geom ON infrastructure_facilities USING GIST (geom);

-- 5. AI Risk Assessments (Historical & Real-Time Predictions from FastAPI/XGBoost)
CREATE TABLE risk_assessments (
    id SERIAL PRIMARY KEY,
    habitation_id VARCHAR(64) REFERENCES habitations(id) ON DELETE CASCADE,
    risk_score NUMERIC(5,2) NOT NULL,
    risk_classification VARCHAR(50) NOT NULL,
    confidence_score NUMERIC(5,2),
    hazard_intensity_score NUMERIC(5,2),
    social_vulnerability_score NUMERIC(5,2),
    response_access_score NUMERIC(5,2),
    contributing_factors JSONB,
    model_version VARCHAR(50) DEFAULT 'xgboost-v1.0-prototype',
    assessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_risk_assessments_habitation ON risk_assessments (habitation_id);

-- Spatial Query: Find nearest safe relocation sites within 20km that have zero hazard intersection
-- Example query:
-- SELECT s.id, s.name, ST_Distance(h.geom::geography, s.geom::geography)/1000.0 as distance_km, s.capacity
-- FROM habitations h, relocation_sites s
-- WHERE h.id = 'hab-mogral-puthur'
-- AND ST_DWithin(h.geom::geography, s.geom::geography, 25000)
-- ORDER BY s.suitability_score DESC;
