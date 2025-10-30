"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Group, Button, Paper, Text } from "@mantine/core";
import CertificateTemplate from "@/components/certificate/CertificateTemplate";
import { CertificateData, normalizeCertificateData } from "@/lib/certificates";
import { IconDownload } from "@tabler/icons-react";
import CertificateService from "@/services/certificate-service/certificate-service";
import {
  debugCertificateDownload,
  testCertificateEndpoint,
} from "@/lib/certificates/debug";

export interface CertificatePreviewModalProps {
  opened: boolean;
  onClose: () => void;
  data: CertificateData | null;
}

export function CertificatePreviewModal({
  opened,
  onClose,
  data,
}: CertificatePreviewModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.5);
  const [downloading, setDownloading] = useState(false);

  const normalized = useMemo(
    () => (data ? normalizeCertificateData(data) : null),
    [data]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const BASE_WIDTH_PX = 1123;

    const updateScale = () => {
      const available = el.clientWidth;
      if (!available) return;
      const next = Math.max(0.2, Math.min(available / BASE_WIDTH_PX, 1));
      setScale(next);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    window.addEventListener("resize", updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [opened]);

  const handleDownload = async () => {
    if (!data || !normalized) return;
    setDownloading(true);
    try {
      await CertificateService.downloadAndSaveCertificate(
        {
          studentName: data.studentName,
          studentNumber: data.studentNumber,
          courseName: data.courseName,
          referenceCode: normalized.referenceCode,
          issuedAt: normalized.issuedDateISO,
        },
        `certificate-${normalized.referenceCode}.pdf`
      );
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Failed to download certificate");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={700}>Certificate Preview</Text>}
      size="auto"
      radius="md"
      centered
      overlayProps={{ opacity: 0.5, blur: 2 }}
      withinPortal
      styles={{
        content: { background: "#ffffff" },
        header: { borderBottom: "1px solid #efefef" },
      }}
    >
      {data && (
        <>
          <Paper p="md" withBorder radius="md">
            <div
              ref={containerRef}
              style={{
                width: "100%",
                overflow: "auto",
                border: "1px solid #e9ecef",
                borderRadius: 8,
                background: "#f8f9fa",
                padding: 8,
              }}
            >
              <div
                style={{
                  width: "max-content",
                  height: "max-content",
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <div style={{ width: "297mm", height: "210mm" }}>
                  <CertificateTemplate data={data} />
                </div>
              </div>
            </div>
          </Paper>

          <Group justify="space-between" mt="md">
            <Text size="sm" c="dimmed">
              {normalized?.referenceCode} • Issued {normalized?.issuedDateLong}
            </Text>
            <Group>
              <Button onClick={onClose} variant="default">
                Close
              </Button>
              <Button
                leftSection={<IconDownload size={16} />}
                onClick={() => {
                  handleDownload();
                  debugCertificateDownload();
                  testCertificateEndpoint();
                }}
                loading={downloading}
              >
                Download PDF
              </Button>
            </Group>
          </Group>
        </>
      )}
    </Modal>
  );
}

export default CertificatePreviewModal;
