/* 
  Certificate utilities (types, formatting, HTML builders)

  Reference code algorithm:
  - Take the issued date's 4-digit year (YYYY).
  - Extract only alphanumeric characters from studentNumber.
  - Take the last 5 characters of that cleaned string; padStart to 5 with '0'.
  - Format: REF-{YYYY}-{last5}

  Date formatting:
  - Display issued date in long form using toLocaleDateString('en-US', 
    { year: 'numeric', month: 'long', day: 'numeric' }).
*/
export interface CertificateData {
  studentName: string;
  courseName: string;
  studentNumber: string;
  issuedDate?: string; // ISO string or omitted
}

export interface NormalizedCertificateData {
  studentName: string;
  courseName: string;
  studentNumber: string;
  issuedDateISO: string;
  issuedDateObj: Date;
  issuedDateLong: string;
  referenceCode: string;
}

export function formatIssuedDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateReference(issuedDate: Date, studentNumber: string): string {
  const year = issuedDate.getFullYear();
  const alnum = (studentNumber || "").replace(/[^a-zA-Z0-9]/g, "");
  const last5 = alnum.slice(-5).padStart(5, "0");
  return `REF-${year}-${last5}`;
}

export function normalizeCertificateData(input: CertificateData): NormalizedCertificateData {
  const issued = input.issuedDate ? new Date(input.issuedDate) : new Date();
  const issuedDateISO = issued.toISOString();
  return {
    studentName: input.studentName.trim(),
    courseName: input.courseName.trim(),
    studentNumber: input.studentNumber.trim(),
    issuedDateISO,
    issuedDateObj: issued,
    issuedDateLong: formatIssuedDate(issued),
    referenceCode: generateReference(issued, input.studentNumber),
  };
}

export function getCertificateCSS() {
  return `
  /* Print setup - A4 Landscape */
  @page {
    size: A4 landscape;
    margin: 0;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    background: white;
  }
  
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .cert-page {
    width: 297mm;
    height: 210mm;
    background: #fafafa;
    position: relative;
    overflow: hidden;
  }

  .cert-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 12mm;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cert-card {
    width: 100%;
    height: 100%;
    background: white;
    border: 1px solid #d1d5db;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  /* Subtle decorative top wave + inner frame */
  .cert-card::before {
    content: '';
    position: absolute;
    inset: 0 0 55% 0; /* top area */
    background:
      radial-gradient(120% 80% at 100% 0%, #eef2ff 0%, #ffffff 70%),
      repeating-linear-gradient(-12deg, rgba(30, 64, 175, 0.06) 0 2px, transparent 2px 10px);
    -webkit-mask: linear-gradient(to bottom, black 70%, transparent);
            mask: linear-gradient(to bottom, black 70%, transparent);
    pointer-events: none;
    z-index: 0;
  }

  .cert-card::after {
    content: '';
    position: absolute;
    inset: 8mm;
    border: 1px solid #e5e7eb;
    border-radius: 2mm;
    pointer-events: none;
    z-index: 0;
  }

  .cert-inner {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20mm 30mm;
    display: flex;
    flex-direction: column;
    z-index: 1; /* above decorative layers */
  }

  /* Faint diagonal watermark */
  .cert-watermark {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 90pt;
    letter-spacing: 8px;
    color: #1e40af;
    opacity: 0.03;
    transform: rotate(-8deg);
    user-select: none;
    pointer-events: none;
    z-index: 0;
  }
  
  /* Logo positioned at top-left like Cisco */
  .cert-logo-wrapper {
    position: absolute;
    top: 20mm;
    left: 30mm;
  }
  
  .cert-logo-box {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .cert-logo-svg { height: 40px; width: auto; display: block; }
  
  .cert-logo-circle {
    width: 35px;
    height: 35px;
    background: #000000;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .cert-logo-text {
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 700;
  }
  
  .cert-logo-name {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    line-height: 1.2;
  }
  
  .cert-logo-name-main {
    font-family: 'Montserrat', sans-serif;
    font-size:20pt;
    font-weight: 700;
    color: #000000;
  }
  
  .cert-logo-name-sub {
    font-family: 'Montserrat', sans-serif;
    font-size: 20pt;
    font-weight: 700;
    color: #BDF052;
    margin-left: 2px;
  }

  /* Main content area - centered */
  .cert-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 15mm;
  }
  
  .cert-award-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 11pt;
    color: #6b7280;
    font-weight: 400;
    margin-bottom: 8mm;
    letter-spacing: 0.5px;
  }
  
  .cert-student-name {
    font-family: 'Crimson Text', serif;
    font-size: 48pt;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 8mm;
    line-height: 1.2;
  }
  
  .cert-completion-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 11pt;
    color: #6b7280;
    font-weight: 400;
    margin-bottom: 6mm;
    letter-spacing: 0.5px;
  }
  
  .cert-course-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 26pt;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 3mm;
    line-height: 1.3;
    letter-spacing: 0.5px;
  }
  
  .cert-course-subtext {
    font-family: 'Montserrat', sans-serif;
    font-size: 11pt;
    color: #6b7280;
    font-weight: 400;
    font-style: italic;
  }

  /* Footer - aligned like Cisco */
  .cert-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 5mm;
  }
  
  .cert-footer-left {
    text-align: left;
  }
  
  .cert-footer-right {
    text-align: right;
  }
  
  .cert-footer-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 8pt;
    color: #9ca3af;
    font-weight: 400;
    margin-bottom: 1mm;
    letter-spacing: 0.5px;
  }
  
  .cert-footer-value {
    font-family: 'Montserrat', sans-serif;
    font-size: 10pt;
    color: #374151;
    font-weight: 600;
  }
  
  @media print {
    .cert-page {
      box-shadow: none;
    }
  }
  `;
}

export function buildCertificateInnerHTML(d: NormalizedCertificateData): string {
  return `
    <div class="cert-page" role="document" aria-label="Certificate of Completion">
      <div class="cert-container">
        <div class="cert-card">
          <div class="cert-watermark" aria-hidden="true">INTELLICODE</div>
          <div class="cert-inner">
            <!-- Logo at top-left -->
            <div class="cert-logo-wrapper">
              <div class="cert-logo-box" aria-label="IntelliCode logo">
                <svg class="cert-logo-svg" viewBox="0 0 40 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                  <g stroke="#A3E635" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 16 L4 8" />
                    <path d="M12 16 L4 24" />
                    <path d="M28 16 L36 8" />
                    <path d="M28 16 L36 24" />
                  </g>
                </svg>
                <div class="cert-logo-name" aria-hidden="true">
                  <span class="cert-logo-name-main">Intelli</span>
                  <span class="cert-logo-name-sub">code</span>
                </div>
              </div>
            </div>

            <!-- Main centered content -->
            <div class="cert-content">
              <p class="cert-award-text">This certificate is awarded to</p>
              
              <div class="cert-student-name">${escapeHtml(d.studentName)}</div>
              
              <p class="cert-completion-text">for successfully completing</p>
              
              <div class="cert-course-name">${escapeHtml(d.courseName)}</div>
              
              <p class="cert-course-subtext">through the IntelliCode program.</p>
            </div>

            <!-- Footer with date and reference -->
            <footer class="cert-footer">
              <div class="cert-footer-left">
                <div class="cert-footer-value">${d.issuedDateLong}</div>
                <div class="cert-footer-label">Completion Date</div>
              </div>
              
              <div class="cert-footer-right">
                <div class="cert-footer-value">${d.referenceCode}</div>
                <div class="cert-footer-label">Certificate Reference</div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function buildCertificateHTML(d: NormalizedCertificateData): string {
  const css = getCertificateCSS();

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Certificate of Completion - ${escapeHtml(d.studentName)}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>${css}</style>
    </head>
    <body>
      ${buildCertificateInnerHTML(d)}
    </body>
  </html>
  `;
}

// Minimal HTML escaping for content fields
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
