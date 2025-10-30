"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Container, Paper, Stack, TextInput, Group, Button, Title, Grid, Alert, Text
} from "@mantine/core";
import CertificateTemplate from "@/components/certificate/CertificateTemplate";
import { CertificateData, normalizeCertificateData } from "@/lib/certificates";
import { IconDownload, IconInfoCircle } from "@tabler/icons-react";
import CertificateService from "@/services/certificate-service/certificate-service";

export default function CertificatePage() {
  const [form, setForm] = useState<CertificateData>({
    studentName: "Gabriel Nasol",
    courseName: "Intermediate C# Programming",
    studentNumber: "STU-00123",
    issuedDate: "2025-10-26",
  });
  
  const [loading, setLoading] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.5);

  // Dynamically scale preview to fit container width while preserving A4 landscape ratio
  useEffect(() => {
    const el = previewContainerRef.current;
    if (!el) return;

    const BASE_WIDTH_PX = 1123; // ~297mm at 96dpi (297 / 25.4 * 96)

    const updateScale = () => {
      const available = el.clientWidth;
      if (!available) return;
      // Leave a tiny margin for borders/padding
      const next = Math.max(0.2, Math.min(available / BASE_WIDTH_PX, 1.2));
      setScale(next);
    };

    updateScale();

    const ro = new ResizeObserver(() => updateScale());
    ro.observe(el);
    window.addEventListener("orientationchange", updateScale);
    window.addEventListener("resize", updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", updateScale);
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  const normalized = useMemo(() => normalizeCertificateData(form), [form]);

  const handleChange = (key: keyof CertificateData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await CertificateService.downloadAndSaveCertificate({
        studentName: form.studentName,
        studentNumber: form.studentNumber,
        courseName: form.courseName,
        referenceCode: normalized.referenceCode,
        issuedAt: normalized.issuedDateISO,
      }, `certificate-${normalized.referenceCode}.pdf`);
    } catch (error: any) {
      console.error("Download failed:", error);
      alert(error?.message || "Failed to download certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="md">Certificate Generator</Title>
      <Alert mb="md" icon={<IconInfoCircle size={16} />} title="Professional Design">
        Generate beautiful, professional certificates with a consistent design. Only the student details change.
      </Alert>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="lg" radius="md" withBorder>
            <Stack gap="md">
              <TextInput
                label="Student Name"
                value={form.studentName}
                onChange={(e) => handleChange("studentName", e.currentTarget.value)}
                placeholder="Enter student name"
                required
              />
              <TextInput
                label="Course Name"
                value={form.courseName}
                onChange={(e) => handleChange("courseName", e.currentTarget.value)}
                placeholder="Enter course name"
                required
              />
              <TextInput
                label="Student Number"
                value={form.studentNumber}
                onChange={(e) => handleChange("studentNumber", e.currentTarget.value)}
                description="e.g. STU-00123"
                placeholder="STU-XXXXX"
                required
              />
              <TextInput
                label="Issue Date"
                value={form.issuedDate ?? ""}
                onChange={(e) => handleChange("issuedDate", e.currentTarget.value)}
                placeholder="YYYY-MM-DD (leave blank for today)"
                description="Format: YYYY-MM-DD"
              />
              
              <Paper p="md" bg="gray.0" radius="md">
                <Text size="sm" fw={600} mb="xs">Certificate Preview Info:</Text>
                <Text size="xs" c="dimmed">Reference: {normalized.referenceCode}</Text>
                <Text size="xs" c="dimmed">Issued: {normalized.issuedDateLong}</Text>
              </Paper>
              
              <Group justify="flex-end" mt="sm">
                <Button 
                  leftSection={<IconDownload size={16} />} 
                  onClick={handleDownload}
                  loading={loading}
                  size="md"
                >
                  Generate PDF
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper p="md" radius="md" withBorder>
            <Text size="sm" fw={600} mb="md" c="dimmed">Live Preview (A4 Landscape):</Text>
            {/* Scaled preview container */}
            <div
              ref={previewContainerRef}
              style={{
                width: "100%",
                overflow: "auto",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                background: "#f8f9fa",
                padding: "8px",
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
                  <CertificateTemplate data={form} />
                </div>
              </div>
            </div>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
