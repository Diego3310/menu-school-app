import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export function downloadHtmlFile(finalHtml) {
  const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'menu-semanal-final.html';
  a.click();
  URL.revokeObjectURL(url);
}

async function renderHtmlInHiddenFrame(finalHtml) {
  const frame = document.createElement('iframe');
  frame.style.position = 'fixed';
  frame.style.left = '-10000px';
  frame.style.top = '0';
  frame.style.width = '1366px';
  frame.style.height = '900px';
  frame.style.opacity = '0';
  frame.style.pointerEvents = 'none';
  frame.style.border = '0';
  document.body.appendChild(frame);

  await new Promise((resolve) => {
    frame.onload = resolve;
    frame.srcdoc = finalHtml;
  });

  const doc = frame.contentDocument;
  if (doc?.fonts?.ready) {
    try {
      await doc.fonts.ready;
    } catch {
      // Si falla la carga de fuentes externas, continuamos con fuentes de respaldo.
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 120));

  return frame;
}

export async function downloadPdfFromHtml(finalHtml, fileName) {
  const frame = await renderHtmlInHiddenFrame(finalHtml);

  try {
    const doc = frame.contentDocument;
    if (!doc?.documentElement) {
      throw new Error('No se pudo preparar el documento para PDF');
    }

    const target = doc.querySelector('.sheet') || doc.documentElement;

    const canvas = await html2canvas(target, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      windowWidth: doc.documentElement.scrollWidth,
      windowHeight: doc.documentElement.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imageRatio = canvas.width / canvas.height;
    const pageRatio = pageWidth / pageHeight;

    let drawWidth;
    let drawHeight;

    if (imageRatio > pageRatio) {
      drawWidth = pageWidth;
      drawHeight = pageWidth / imageRatio;
    } else {
      drawHeight = pageHeight;
      drawWidth = pageHeight * imageRatio;
    }

    const x = (pageWidth - drawWidth) / 2;
    const y = (pageHeight - drawHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, drawWidth, drawHeight, undefined, 'SLOW');
    pdf.save(fileName);
  } finally {
    document.body.removeChild(frame);
  }
}
