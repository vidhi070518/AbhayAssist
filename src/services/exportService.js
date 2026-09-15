/**
 * Relocation Mitigation Action Brief Export Service
 * Generates an executive decision-support brief suitable for District Disaster Management Authorities.
 */

export function exportRelocationBrief({ habitation, relocationSite, assessmentData }) {
  const printWindow = window.open('', '_blank', 'width=900,height=1000');
  if (!printWindow) {
    alert('Please allow popups to export the official Relocation Action Brief.');
    return;
  }

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const remainingCapacity = relocationSite.capacity - habitation.population;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>AbhayAssist - Relocation Mitigation Action Brief: ${habitation.name}</title>
      <style>
        @page {
          size: A4;
          margin: 18mm;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1e293b;
          line-height: 1.5;
          margin: 0;
          padding: 24px;
        }
        .header {
          border-bottom: 3px solid #0f172a;
          padding-bottom: 16px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #0f172a;
          letter-spacing: -0.5px;
        }
        .header .badge {
          display: inline-block;
          background: #fee2e2;
          color: #991b1b;
          font-weight: 700;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid #f87171;
          margin-top: 6px;
        }
        .meta-info {
          font-size: 12px;
          color: #64748b;
          text-align: right;
        }
        .section-title {
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          color: #334155;
          border-bottom: 1px solid #cbd5e1;
          padding-bottom: 6px;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
        }
        .metric-val {
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
        }
        .metric-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        ul {
          margin: 0;
          padding-left: 20px;
        }
        li {
          margin-bottom: 6px;
          font-size: 13px;
        }
        .checklist-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          padding: 6px 0;
          border-bottom: 1px dotted #e2e8f0;
        }
        .check-box {
          width: 14px;
          height: 14px;
          border: 1.5px solid #64748b;
          border-radius: 3px;
          display: inline-block;
        }
        .disclaimer {
          margin-top: 36px;
          padding: 12px;
          background: #f1f5f9;
          border-left: 4px solid #64748b;
          font-size: 11px;
          color: #475569;
        }
        .action-banner {
          background: #f0fdf4;
          border: 1px solid #86efac;
          color: #166534;
          padding: 12px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          margin-top: 18px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>ABHAYASSIST — RELOCATION ACTION BRIEF</h1>
          <div style="font-size: 13px; color: #475569; margin-top: 2px;">
            State & District Disaster Management Decision-Support Platform (SIH-2026)
          </div>
          <div class="badge">URGENT: HIGH RELOCATION PRIORITY</div>
        </div>
        <div class="meta-info">
          <div><strong>District:</strong> Kasaragod, Kerala</div>
          <div><strong>Generated:</strong> ${currentDate}</div>
          <div><strong>Document ID:</strong> ABHAY-RELOC-${habitation.id.toUpperCase()}</div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="metric-label">High-Risk Source Habitation</div>
          <div style="font-size: 18px; font-weight: 700; margin-top: 4px; color: #0f172a;">${habitation.name}</div>
          <div style="font-size: 13px; color: #64748b;">Taluk: ${habitation.taluk} | Primary Hazard: ${habitation.primaryHazard}</div>
          <div style="display: flex; gap: 24px; margin-top: 14px;">
            <div>
              <div class="metric-val" style="color: #dc2626;">${assessmentData ? assessmentData.riskScore : habitation.riskScore}/100</div>
              <div class="metric-label">Overall Risk</div>
            </div>
            <div>
              <div class="metric-val">${habitation.population.toLocaleString()}</div>
              <div class="metric-label">Residents Exposed</div>
            </div>
            <div>
              <div class="metric-val">${habitation.households}</div>
              <div class="metric-label">Households</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="metric-label">Recommended Safe Relocation Destination</div>
          <div style="font-size: 18px; font-weight: 700; margin-top: 4px; color: #0891b2;">${relocationSite.name}</div>
          <div style="font-size: 13px; color: #64748b;">Elevation: ${relocationSite.elevationMeters}m MSL | Access: ${relocationSite.roadAccessLevel}</div>
          <div style="display: flex; gap: 24px; margin-top: 14px;">
            <div>
              <div class="metric-val" style="color: #0891b2;">${relocationSite.suitabilityScore}/100</div>
              <div class="metric-label">Suitability</div>
            </div>
            <div>
              <div class="metric-val">${relocationSite.capacity.toLocaleString()}</div>
              <div class="metric-label">Site Capacity</div>
            </div>
            <div>
              <div class="metric-val" style="color: #16a34a;">+${remainingCapacity.toLocaleString()}</div>
              <div class="metric-label">Buffer Margin</div>
            </div>
          </div>
        </div>
      </div>

      <div class="action-banner">
        RECOMMENDED DECISION: ${habitation.fieldAction || 'Initiate Stage-1 Pre-emptive Relocation Protocol.'}
      </div>

      <div class="section-title">Why this Area is at Risk</div>
      <ul>
        ${habitation.whyAtRisk.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <div class="section-title">Why ${relocationSite.name} is Recommended</div>
      <ul>
        ${relocationSite.whyRecommended.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <div class="section-title">Available Infrastructure at Safe Site</div>
      <ul>
        ${relocationSite.infrastructure.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <div class="section-title">Field Verification & Dispatch Checklist</div>
      <div>
        <div class="checklist-item"><span class="check-box"></span> Confirm NH-66 transit corridor passability with Kasaragod Traffic Control.</div>
        <div class="checklist-item"><span class="check-box"></span> Pre-alert ${relocationSite.nearestHospital} to stage mobile medical triage unit.</div>
        <div class="checklist-item"><span class="check-box"></span> Mobilize 40 KSRTC state transport buses for prioritized vulnerable transit.</div>
        <div class="checklist-item"><span class="check-box"></span> Verify backup diesel generator (120 kVA) and clean water reserves at campus.</div>
        <div class="checklist-item"><span class="check-box"></span> Dispatch civil defense volunteers for household-level verification.</div>
      </div>

      <div class="disclaimer">
        <strong>IMPORTANT PROTOTYPE DISCLAIMER:</strong> AbhayAssist is a Smart India Hackathon (SIH) prototype platform. Risk assessments, population vulnerability indicators, and relocation suitability scores shown in this brief are prototype calculations referencing Bhuvan, NDEM, and SACHET frameworks. For official operational deployment, verify through District Collectorate Kasaragod.
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
