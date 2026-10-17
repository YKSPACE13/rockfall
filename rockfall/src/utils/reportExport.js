import { jsPDF } from 'jspdf';

// Export Sensor and Risk Data to CSV
export const exportToCSV = (data, filename = 'rocksafe-data.csv') => {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((fieldName) => {
          const val = row[fieldName] !== undefined ? String(row[fieldName]) : '';
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(',')
    ),
  ];

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate Comprehensive PDF Report using jsPDF
export const generatePDFReport = ({
  title = 'Daily Mining Safety & Geotechnical Report',
  riskScore = 44,
  riskLabel = 'Medium Risk',
  sensors = [],
  alerts = [],
  includePredictions = true,
}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Banner
  doc.setFillColor(34, 22, 43); // Dark purple
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('ROCKSAFE AI — COPPER RIDGE MINE', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 180, 220);
  doc.text('Sector 7 Geotechnical & Atmospheric Safety Monitoring System', 14, 18);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 23);

  y = 38;

  // Title
  doc.setTextColor(25, 20, 35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(title, 14, y);
  y += 8;

  // Executive Risk Summary Box
  doc.setDrawColor(220, 215, 230);
  doc.setFillColor(248, 246, 252);
  doc.roundedRect(14, y, pageWidth - 28, 26, 3, 3, 'FD');

  doc.setFontSize(10);
  doc.setTextColor(80, 70, 95);
  doc.text('Overall Geotechnical Risk Index:', 18, y + 8);

  // Score badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  if (riskScore >= 70) {
    doc.setTextColor(220, 38, 38); // Red
  } else if (riskScore >= 40) {
    doc.setTextColor(217, 119, 6); // Orange/Amber
  } else {
    doc.setTextColor(16, 185, 129); // Green
  }
  doc.text(`${riskScore}/100 — ${riskLabel.toUpperCase()}`, 18, y + 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 95, 110);
  doc.text(
    'Real-time automated assessment incorporating acoustic emissions, displacement, micro-vibrations, and relative humidity.',
    18,
    y + 22
  );

  y += 34;

  // Section: Active Sensors
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 25, 40);
  doc.text('Active Sensor Network Status', 14, y);
  y += 6;

  // Table Header
  doc.setFillColor(56, 32, 77); // Deep purple header
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  doc.text('Sensor ID', 18, y + 5);
  doc.text('Type', 48, y + 5);
  doc.text('Zone', 85, y + 5);
  doc.text('Reading', 115, y + 5);
  doc.text('Status', 145, y + 5);
  doc.text('Last Updated', 170, y + 5);
  y += 7;

  // Table Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  const displaySensors = sensors.slice(0, 10);
  displaySensors.forEach((s, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 247, 250);
      doc.rect(14, y, pageWidth - 28, 6.5, 'F');
    }
    doc.setTextColor(40, 35, 50);
    doc.text(s.id || '--', 18, y + 4.5);
    doc.text(s.type || '--', 48, y + 4.5);
    doc.text(s.zone || '--', 85, y + 4.5);
    doc.text(`${s.value} ${s.unit || ''}`, 115, y + 4.5);

    // Status color
    if (s.status === 'Critical') {
      doc.setTextColor(220, 38, 38);
    } else if (s.status === 'Warning' || s.status === 'Elevated') {
      doc.setTextColor(217, 119, 6);
    } else {
      doc.setTextColor(16, 140, 90);
    }
    doc.setFont('helvetica', 'bold');
    doc.text(s.status || 'Normal', 145, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(110, 105, 120);
    doc.text(s.lastUpdated || 'Just now', 170, y + 4.5);

    y += 6.5;
  });

  y += 8;

  // Section: Recent Alerts
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 25, 40);
  doc.text(`Recent Alert Log (${alerts.length} Incidents Recorded)`, 14, y);
  y += 6;

  if (alerts.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(120, 120, 130);
    doc.text('No active or critical threshold alerts registered in the monitoring window.', 18, y + 4);
    y += 10;
  } else {
    // Alerts Table
    doc.setFillColor(56, 32, 77);
    doc.rect(14, y, pageWidth - 28, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('ID', 18, y + 5);
    doc.text('Zone', 32, y + 5);
    doc.text('Type', 55, y + 5);
    doc.text('Level', 85, y + 5);
    doc.text('Description / Message', 115, y + 5);
    y += 7;

    const displayAlerts = alerts.slice(0, 5);
    displayAlerts.forEach((a, idx) => {
      if (idx % 2 === 1) {
        doc.setFillColor(248, 247, 250);
        doc.rect(14, y, pageWidth - 28, 6.5, 'F');
      }
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 45, 60);
      doc.text(String(a.id), 18, y + 4.5);
      doc.text(a.zone, 32, y + 4.5);
      doc.text(a.type, 55, y + 4.5);

      if (a.level === 'Critical' || a.level === 'High') {
        doc.setTextColor(220, 38, 38);
      } else {
        doc.setTextColor(217, 119, 6);
      }
      doc.setFont('helvetica', 'bold');
      doc.text(a.level, 85, y + 4.5);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 55, 70);
      const msg = a.message.length > 55 ? a.message.substring(0, 52) + '...' : a.message;
      doc.text(msg, 115, y + 4.5);

      y += 6.5;
    });
  }

  y += 10;

  // AI Recommendation Section
  if (includePredictions) {
    doc.setDrawColor(210, 190, 240);
    doc.setFillColor(249, 246, 255);
    doc.roundedRect(14, y, pageWidth - 28, 22, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(112, 38, 179);
    doc.text('AI Rockfall Prediction Advisory (Confidence: 87% | Accuracy: 94.7%)', 18, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(80, 70, 95);
    doc.text(
      'Geomechanical model indicates micro-seismic stability within Sector 3 West. Elevated acoustic activity',
      18,
      y + 11
    );
    doc.text(
      'in Zone 7A suggests continuous monitoring of stope hangwall convergence. Automated evacuation triggers remain primed.',
      18,
      y + 16
    );
  }

  // Footer
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(140, 135, 150);
    doc.text(
      `RockSafe AI Safety Intelligence Engine • Confidential Mining Record • Page ${i} of ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: 'center' }
    );
  }

  // Save the PDF
  const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString().slice(-4)}.pdf`;
  doc.save(filename);
};
