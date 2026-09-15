import { calculateDistanceKm } from './relocationEngine';

/**
 * Relocation Action Brief Export Service
 * Generates an executive decision-support brief for Disaster Management Authorities.
 */

export function exportRelocationBrief({ habitation, relocationSite, assessmentData }) {
  const printWindow = window.open('', '_blank', 'width=900,height=1000');
  if (!printWindow) {
    alert('Please allow popups to print or export the Relocation Action Brief.');
    return;
  }

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const distanceKm = relocationSite.distanceKm || calculateDistanceKm(habitation?.coordinates, relocationSite?.coordinates);
  const remainingCapacity = relocationSite.capacity - habitation.population;
  const busesNeeded = Math.ceil(habitation.population / 45);
  const whyRecommendedList = relocationSite.whyRecommended || [];
  const nearestHosp = relocationSite.nearestHospital || 'District Emergency Hospital';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>AbhayAssist - Relocation Action Brief: ${habitation.name}</title>
      <style>
        @page {
          size: A4;
          margin: 16mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          line-height: 1.5;
          margin: 0;
          padding: 24px;
          background: #ffffff;
        }
        .header {
          border-bottom: 2px solid #1e40af;
          padding-bottom: 16px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .header h1 {
          margin: 0;
          font-size: 22px;
          color: #1e3a8a;
          letter-spacing: -0.3px;
        }
        .header .badge {
          display: inline-block;
          background: #fee2e2;
          color: #b91c1c;
          font-weight: 700;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid #fca5a5;
          margin-top: 6px;
        }
        .meta-info {
          font-size: 12px;
          color: #475569;
          text-align: right;
        }
        .section-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          color: #1e3a8a;
          border-bottom: 1px solid #cbd5e1;
          padding-bottom: 6px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 14px;
        }
        .metric-val {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
        }
        .metric-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        ul {
          margin: 0;
          padding-left: 20px;
        }
        li {
          margin-bottom: 5px;
          font-size: 12.5px;
          color: #334155;
        }
        .checklist-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          padding: 5px 0;
          border-bottom: 1px dotted #e2e8f0;
        }
        .check-box {
          width: 14px;
          height: 14px;
          border: 1.5px solid #64748b;
          border-radius: 3px;
          display: inline-block;
        }
        .action-banner {
          background: #f0fdf4;
          border: 1px solid #86efac;
          color: #166534;
          padding: 10px 14px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 12.5px;
          margin-top: 16px;
        }
        .footer-note {
          margin-top: 30px;
          padding: 10px;
          background: #f8fafc;
          border-left: 3px solid #94a3b8;
          font-size: 11px;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>ABHAYASSIST — RELOCATION ACTION BRIEF</h1>
          <div style="font-size: 13px; color: #475569; margin-top: 2px;">
            Disaster Decision-Support & Relocation Platform
          </div>
          <div class="badge">HIGH RELOCATION PRIORITY</div>
        </div>
        <div class="meta-info">
          <div><strong>District:</strong> Kasaragod, Kerala</div>
          <div><strong>Generated:</strong> ${currentDate}</div>
          <div><strong>Reference:</strong> ABHAY-RELOC-${habitation.id.toUpperCase()}</div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="metric-label">High-Risk Habitation</div>
          <div style="font-size: 17px; font-weight: 700; margin-top: 4px; color: #0f172a;">${habitation.name}</div>
          <div style="font-size: 12px; color: #64748b;">Taluk: ${habitation.taluk} | Concern: ${habitation.primaryHazard}</div>
          <div style="display: flex; gap: 20px; margin-top: 12px;">
            <div>
              <div class="metric-val" style="color: #dc2626;">${assessmentData ? assessmentData.riskScore : habitation.riskScore}/100</div>
              <div class="metric-label">Overall Risk</div>
            </div>
            <div>
              <div class="metric-val">${habitation.population.toLocaleString()}</div>
              <div class="metric-label">People at Risk</div>
            </div>
            <div>
              <div class="metric-val">${habitation.households}</div>
              <div class="metric-label">Households</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="metric-label">Recommended Safe Location</div>
          <div style="font-size: 17px; font-weight: 700; margin-top: 4px; color: #1d4ed8;">${relocationSite.name}</div>
          <div style="font-size: 12px; color: #64748b;">Estimated Transit: ~${distanceKm} km | Elevation: ${relocationSite.elevationMeters}m MSL | Access: ${relocationSite.roadAccessLevel.split('(')[0]}</div>
          <div style="display: flex; gap: 20px; margin-top: 12px;">
            <div>
              <div class="metric-val" style="color: #1d4ed8;">${relocationSite.suitabilityScore}/100</div>
              <div class="metric-label">Suitability</div>
            </div>
            <div>
              <div class="metric-val">${relocationSite.capacity.toLocaleString()}</div>
              <div class="metric-label">Capacity</div>
            </div>
            <div>
              <div class="metric-val" style="color: ${remainingCapacity >= 0 ? '#16a34a' : '#dc2626'};">${remainingCapacity >= 0 ? '+' + remainingCapacity.toLocaleString() : remainingCapacity.toLocaleString()}</div>
              <div class="metric-label">Buffer</div>
            </div>
          </div>
        </div>
      </div>

      <div class="action-banner">
        RECOMMENDED ACTION: ${habitation.fieldAction || 'Initiate Stage-1 planned relocation protocol.'}
      </div>

      <div class="section-title">Why this Area is at Risk</div>
      <ul>
        ${(habitation.whyAtRisk || []).map(item => `<li>${item}</li>`).join('')}
      </ul>

      <div class="section-title">Why ${relocationSite.name} is Recommended for ${habitation.name}</div>
      <ul>
        ${whyRecommendedList.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <div class="section-title">Critical Facilities at Site</div>
      <ul>
        ${(relocationSite.infrastructure || []).map(item => `<li>${item}</li>`).join('')}
      </ul>

      <div class="section-title">Field Verification & Dispatch Checklist</div>
      <div>
        <div class="checklist-item"><span class="check-box"></span> Confirm ${relocationSite.roadAccessLevel.split('(')[0]} transit corridor clearance with Kasaragod Traffic Police.</div>
        <div class="checklist-item"><span class="check-box"></span> Pre-alert ${nearestHosp} emergency reception & triage teams.</div>
        <div class="checklist-item"><span class="check-box"></span> Mobilize ${busesNeeded} KSRTC buses from district depots for ${habitation.population.toLocaleString()} residents.</div>
        <div class="checklist-item"><span class="check-box"></span> Verify backup generator fuel reserves and drinking water tanks at ${relocationSite.name}.</div>
        <div class="checklist-item"><span class="check-box"></span> Dispatch Aapda Mitra / local team for household-level verification in ${habitation.name}.</div>
      </div>

      <div class="footer-note">
        <strong>Official Notice:</strong> Generated by AbhayAssist decision-support platform for Kasaragod District Emergency Operations Centre. Subject to field inspection prior to evacuation order.
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
