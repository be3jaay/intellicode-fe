import React from "react";
import { CertificateData, normalizeCertificateData, getCertificateCSS, buildCertificateInnerHTML } from "@/lib/certificates";

export interface CertificateTemplateProps {
  data: CertificateData;
}

/**
 * Server-ready certificate markup for on-screen preview.
 * Injects the same CSS used for PDF to ensure WYSIWYG.
 */
export default function CertificateTemplate({ data }: CertificateTemplateProps) {
  const normalized = normalizeCertificateData(data);
  const css = getCertificateCSS();

  return (
    <div aria-live="polite">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: buildCertificateInnerHTML(normalized) }} />
    </div>
  );
}
