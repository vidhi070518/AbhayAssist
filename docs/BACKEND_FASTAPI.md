# AbhayAssist Backend & AI/ML Architecture

## Overview
AbhayAssist is designed with a decoupled, high-performance architecture:
1. **Frontend (React 18 + Leaflet + Tailwind CSS)**: Interactive geospatial dashboard for disaster-management authorities.
2. **Node.js Gateway / Express API**: Handles session management, verification reporting, and relays spatial requests.
3. **FastAPI AI/ML Service**: High-throughput microservice in Python executing XGBoost inference and SHAP explainability calculations.
4. **PostgreSQL + PostGIS**: Spatially indexed database storing hazard polygons, habitations, and infrastructure.

```
React Frontend
      ↓ (REST / JSON)
Node.js Gateway
      ↓ (Internal RPC / REST)
FastAPI Python Microservice
      ↓ (Model Inference)
XGBoost Risk Regressor + SHAP Factor Breakdown
      ↓ (Spatial Queries: ST_DWithin, ST_Intersects)
PostgreSQL / PostGIS Database
```

## Future FastAPI Endpoint Specification
- **Endpoint**: `POST /api/v1/risk/predict`
- **Request Body**: See `services/ml/schemas.py:RiskPredictionRequest`
- **Response**: Risk score (0-100), classification ('Low' / 'Moderate' / 'High'), confidence score, and explainability factors.
- **Model Training Data**: Bhuvan satellite elevation layers, IMD rainfall gauges, Kerala State Disaster Management Authority historical flood lines.
