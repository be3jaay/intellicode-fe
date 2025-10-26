import { NextRequest } from "next/server";
import { CertificateData, normalizeCertificateData, buildCertificateHTML } from "@/lib/certificates";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CertificateData;

    // Basic validation
    if (!body?.studentName || !body?.courseName || !body?.studentNumber) {
      return new Response(JSON.stringify({ error: "studentName, courseName, and studentNumber are required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const normalized = normalizeCertificateData(body);
    const html = buildCertificateHTML(normalized);

    const engine = (process.env.PDF_ENGINE || "puppeteer").toLowerCase();
    const pdfBuffer =
      engine === "playwright" ? await renderWithPlaywright(html) : await renderWithPuppeteer(html);

    const fileName = `certificate-${normalized.referenceCode}.pdf`;
    // Convert Uint8Array to Buffer for Response
    const buffer = Buffer.from(pdfBuffer);
    
    return new Response(buffer, {
      status: 200,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename="${fileName}"`,
        "cache-control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("Certificate generation failed:", err);
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

async function renderWithPuppeteer(html: string): Promise<Uint8Array> {
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    // Use print media and wait for web fonts to load
    try { await page.emulateMediaType("print"); } catch {}
  try { await (await page.evaluateHandle('document.fonts && document.fonts.ready')).jsonValue(); } catch {}
    const pdf = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });
    return pdf;
  } finally {
    await browser.close();
  }
}

async function renderWithPlaywright(html: string): Promise<Uint8Array> {
  try {
    const { chromium } = await import("playwright");
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle" });
      try { await page.emulateMedia({ media: 'print' }); } catch {}
  try { await (await page.evaluateHandle('document.fonts && document.fonts.ready')).jsonValue(); } catch {}
      const pdf = await page.pdf({
        format: "A4",
        landscape: true,
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
      });
      return pdf;
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error("Playwright not available, falling back to Puppeteer:", error);
    // Fallback to Puppeteer if Playwright is not installed
    return renderWithPuppeteer(html);
  }
}
