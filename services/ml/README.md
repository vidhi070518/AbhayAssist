# Python AI/ML Risk Engine Architecture (FastAPI + XGBoost)

## Model Objective
To predict a normalized multi-hazard risk index (0–100) and identify primary SHAP explainability drivers for vulnerable habitations.

## Features Ingested:
- `precipitation_48h_mm`: Cumulative 48-hour rainfall from automated weather stations.
- `elevation_meters` & `slope_degrees`: Digital Elevation Model (DEM) metrics.
- `distance_to_coast_km` & `distance_to_river_km`: Proximity to hydrologic boundaries.
- `kutcha_houses_percentage`: Structural building material vulnerability proxy.
- `elderly_children_percentage`: Demographic evacuation speed constraint.
- `road_elevation_clearance_meters`: Evacuation road passability index.

## FastAPI Service Run Command (Future Deployment)
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```
Client code in `src/services/riskCalculator.js` can seamlessly switch from client-side prototype calculation to the FastAPI endpoint by setting `VITE_USE_REMOTE_ML_API=true`.
