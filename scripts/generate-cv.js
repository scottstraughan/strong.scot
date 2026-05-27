#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const CV_DIR = path.join(ROOT, 'src', 'public', 'files', 'cv');
const HTML_FILE = path.join(CV_DIR, 'index.html');
const OUTPUT_PDF = path.join(CV_DIR, '..', 'cv.pdf');

async function main() {
  const { default: puppeteer } = await import('puppeteer');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Use deviceScaleFactor: 2 for retina-quality sharpness.
  // The CSS layout is still 900px wide, but the screenshot pixels are 1800px.
  // This gives us 192 DPI which produces crisp text in the PDF.
  await page.setViewport({ width: 900, height: 1, deviceScaleFactor: 2 });

  const htmlPath = `file://${HTML_FILE}`;
  await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 30000 });

  // Screenshot at 2x resolution — 1800px wide instead of 900px
  const screenshotBuffer = await page.screenshot({ fullPage: true, type: 'png' });

  // Read pixel dimensions (these are 2x the CSS pixels)
  const imgWidthPx = screenshotBuffer.readUInt32BE(16);
  const imgHeightPx = screenshotBuffer.readUInt32BE(20);

  await browser.close();

  // PDF page size in inches: CSS pixels / 96 DPI
  // Even though the image is 2x, the intended physical size is based on CSS pixels
  const cssWidth = imgWidthPx / 2;  // back to CSS pixel dimensions
  const cssHeight = imgHeightPx / 2;
  const pageWidthIn = cssWidth / 96;
  const pageHeightIn = cssHeight / 96;

  // Now embed the 2x image in the PDF, displayed at the CSS pixel size.
  // The higher pixel density means text and lines render crisply.
  const pdfBrowser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const pdfPage = await pdfBrowser.newPage();

  const imgB64 = screenshotBuffer.toString('base64');

  await pdfPage.setContent(`
    <html><head><style>
      @page { size: ${pageWidthIn}in ${pageHeightIn}in; margin: 0; }
      body { margin: 0; padding: 0; width: ${pageWidthIn}in; height: ${pageHeightIn}in; }
      img { width: 100%; height: 100%; display: block; }
    </style></head>
    <body>
      <img src="data:image/png;base64,${imgB64}" />
    </body></html>
  `, { waitUntil: 'networkidle0' });

  await pdfPage.pdf({
    path: OUTPUT_PDF,
    width: `${pageWidthIn}in`,
    height: `${pageHeightIn}in`,
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  await pdfBrowser.close();

  const stats = fs.statSync(OUTPUT_PDF);
  console.log(`CV PDF generated: ${OUTPUT_PDF} (${(stats.size / 1024).toFixed(0)} KB, ${pageWidthIn.toFixed(2)}x${pageHeightIn.toFixed(2)}in)`);
}

main().catch((error) => {
  console.error('Failed to generate CV PDF:', error);
  process.exit(1);
});