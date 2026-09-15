"""
Pydantic Data Schemas for FastAPI AI/ML Risk Prediction Service
Model: XGBoost Multi-Hazard Regressor + Classifier
"""

from pydantic import BaseModel, Field
from typing import List, Optional

class RiskPredictionRequest(BaseModel):
    habitation_id: str = Field(..., description="Unique identifier of habitation")
    latitude: float = Field(..., ge=-90.0, le=90.0)
    longitude: float = Field(..., ge=-180.0, le=180.0)
    elevation_meters: float = Field(..., description="Digital Elevation Model (DEM) altitude")
    slope_degrees: float = Field(..., ge=0.0, le=90.0)
    precipitation_48h_mm: float = Field(..., ge=0.0, description="Cumulative 48-hour rainfall")
    distance_to_coast_km: float = Field(..., ge=0.0)
    distance_to_river_km: float = Field(..., ge=0.0)
    population_density_sqkm: float = Field(..., ge=0.0)
    kutcha_houses_percentage: float = Field(..., ge=0.0, le=100.0)
    elderly_children_percentage: float = Field(..., ge=0.0, le=100.0)
    road_elevation_clearance_meters: float = Field(..., description="Evacuation road height above flood datum")

class ContributingFactor(BaseModel):
    factor_name: str
    feature_importance: float
    plain_language_explanation: str

class RiskPredictionResponse(BaseModel):
    habitation_id: str
    risk_score: float = Field(..., ge=0.0, le=100.0, description="Normalized risk index (0-100)")
    classification: str = Field(..., description="Low, Moderate, or High")
    confidence: float = Field(..., ge=0.0, le=1.0)
    recommended_action: str
    contributing_factors: List[ContributingFactor]
    model_version: str = "xgboost-kasaragod-v1.0"
