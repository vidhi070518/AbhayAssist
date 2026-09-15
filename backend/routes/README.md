# Backend API Routes Architecture (Node.js Gateway)

## Structure
```
backend/
├── routes/
│   ├── habitations.js       # CRUD & spatial querying for habitations
│   ├── relocation.js        # Safe site matching & suitability ranking
│   ├── alerts.js            # SACHET CAP XML feed ingestion
│   └── riskPrediction.js    # Proxy relay to Python FastAPI ML service
├── middleware/
│   ├── auth.js              # State/District disaster official session auth
│   └── rateLimiter.js       # Emergency operational burst capacity
└── server.js                # Express / Fastify server entry
```

## Relocation Matching Endpoint
```http
POST /api/v1/relocation/recommend
Content-Type: application/json

{
  "habitationId": "hab-mogral-puthur",
  "searchRadiusKm": 25,
  "minElevationMeters": 20,
  "requireRoadTier": "High"
}
```
Response returns ranked candidate campuses sorted by multi-factor suitability with capacity reservation.
