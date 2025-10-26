"use client";

import { Stack, Text } from "@mantine/core";
import { StudentCertificatesView } from "@/components/dashboard/student/student-certificates-view";

export default function CertificatesPage() {
  return (
    <Stack gap="xl">
      {/* Header */}
      <div>
        <Text
          size="2rem"
          fw={700}
          style={{
            background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
          }}
        >
          My Certificates
        </Text>
        <Text c="dimmed" size="lg">
          View your course completion certificates
        </Text>
      </div>

      {/* Certificates View */}
      <StudentCertificatesView />
    </Stack>
  );
}
