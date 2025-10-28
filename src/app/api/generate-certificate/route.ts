import { NextRequest } from "next/server";
import { CertificateData, normalizeCertificateData, buildCertificateHTML } from "@/lib/certificates";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CertificateData;
    if (!body?.studentName || !body?.courseName || !body?.studentNumber) {
      return new Response(JSON.stringify({ error: "studentName, courseName, and studentNumber are required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    const normalized = normalizeCertificateData(body);
    const html = buildCertificateHTML(normalized);
    const pdf = await renderWithPuppeteer(html);
    const buffer = Buffer.from(pdf);
    const fileName = `certificate-${normalized.referenceCode}.pdf`;
    return new Response(buffer, {
      status: 200,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename="${fileName}"`,
        "cache-control": "no-store",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

async function renderWithPuppeteer(html: string): Promise<Uint8Array> {
  const isServerless = process.env.NODE_ENV === "production" && !!process.env.VERCEL;
  if (isServerless) {
    const chromium = await import("@sparticuz/chromium");
    const puppeteer = await import("puppeteer-core");
    const browser = await puppeteer.launch({
      args: chromium.default.args,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      try { await page.emulateMediaType("print"); } catch {}
      try { await (await page.evaluateHandle("document.fonts && document.fonts.ready")).jsonValue(); } catch {}
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
  } else {
    const puppeteer = await import("puppeteer");
    const browser = await puppeteer.default.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      try { await page.emulateMediaType("print"); } catch {}
      try { await (await page.evaluateHandle("document.fonts && document.fonts.ready")).jsonValue(); } catch {}
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
}
