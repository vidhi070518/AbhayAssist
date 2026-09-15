# AbhayAssist — Disaster Decision-Support & Proactive Relocation Platform

> **"From disaster monitoring to proactive relocation."**  
> *Smart India Hackathon (SIH) 2026 Prototype*

---

## 1. Executive Summary

Disaster management authorities frequently receive early warnings, but converting those warnings into proactive field action remains a bottleneck. **AbhayAssist** bridges this gap: it does not merely forecast disaster risks—it actively guides State and District Disaster Management Authorities on **who is exposed, why they are at risk, where they can safely relocate, and how to execute pre-emptive evacuation.**

### Core Product Story:
```
DETECT RISK
  ↓
ASSESS RISK ("Why is this area at risk?")
  ↓
IDENTIFY VULNERABLE HABITATIONS
  ↓
PRIORITIZE (Triage queue based on social vulnerability & access bottlenecks)
  ↓
FIND SAFE RELOCATION SITES ("Where can people safely go?")
  ↓
EXPLAIN WHY ("Why this site was recommended?")
  ↓
PLAN RELOCATION (Capacity, distance, route preview, verification checklist, Export Brief)
  ↓
SIMULATE WHAT-IF SCENARIOS (Rainfall surges, coastal swell, demographic density)
```

---

## 2. Pilot Region: Kasaragod District, Kerala

The pilot demonstration focuses on Kasaragod, Kerala—a multi-hazard district facing:
1. **Coastal Erosion & High Swell Waves** (e.g., *Mogral Puthur*, *Hosdurg Coastal*)
2. **Riverine Backwater Inundation & Flash Floods** (e.g., *Kumbla North* / Shiriya river, *Cheruvathur* / Tejaswini river)
3. **Slope Instability & Landslides** (e.g., *Pallikkara* laterite foothill slopes)

---

## 3. Key Differentiators & Features

1. **Centerpiece Interactive GIS Map**:
   - Built with `Leaflet` + `React-Leaflet` over OpenStreetMap.
   - Dynamic layer toggles: Coastal Erosion corridor, River Flood basin, Landslide slopes, Critical Infrastructure (Hospitals, PHCs, Cyclone Shelters), and Candidate Relocation Campuses.
   - Real-time click synchronization between the map and priority triage lists.
2. **Intelligent Relocation Engine**:
   - Automatically matches high-risk settlements with candidate safe refuges (e.g., *Periya Community Campus*: 72m elevation, 3,600 capacity, 8.4 km via NH-66).
   - Transparent capacity accounting: calculates buffer headroom and required transit bus fleets.
3. **"Why Recommended?" Decision Explainability**:
   - Transparent plain-language bullets so non-technical judges and district collectors immediately understand why a site was chosen over alternatives.
4. **"What If?" Scenario Simulator**:
   - Interactive sliders for rainfall severity, coastal swell, and population influx.
   - Recalculates risk live (e.g., surges from 82 to 91) and upgrades operational urgency to *Critical Pre-emptive Evacuation*.
5. **Separation of Official SACHET Alerts vs AI Risk Signals**:
   - Strict visual and conceptual separation between statutory government broadcasts and algorithmic early warnings.
6. **One-Click Relocation Mitigation Action Brief**:
   - Generates and exports executive decision briefs ready for field teams.

---

## 4. Technology Stack & Future Architecture

### Current Client MVP (Zero Python Dependency Locally)
- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS (Tailored Disaster Operations Dark Palette)
- **GIS Mapping**: Leaflet, React-Leaflet, OpenStreetMap
- **Icons**: Lucide React
- **Deployment**: Netlify

### Future Enterprise Architecture
- **API Gateway**: Node.js / Express
- **AI/ML Microservice**: Python, FastAPI, XGBoost, SHAP explainability
- **Database**: PostgreSQL with PostGIS extension (`GEOMETRY(Polygon, 4326)`)
- **Data Ingestion**: Bhuvan WMS/WFS, NDEM hazard boundaries, SACHET CAP feeds

---

## 5. Local Development Quickstart

```bash
# Clone the repository
git clone https://github.com/<your-username>/AbhayAssist.git
cd AbhayAssist

# Install dependencies (Node 18+)
npm install

# Start local dev server
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 6. Netlify Deployment

This repository includes a pre-configured `netlify.toml`:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA Redirection**: `/* -> /index.html 200`

---

## 7. Data Honesty & Disclaimer

*AbhayAssist is an SIH prototype platform. Risk assessments, population vulnerability indicators, and relocation suitability scores shown in this demonstration are prototype calculations referencing Bhuvan, NDEM, and SACHET frameworks. External live APIs are modeled via structured schemas without fabricating connectivity.*
