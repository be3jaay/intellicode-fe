"use client";

import {
  Stack,
  Text,
  SimpleGrid,
  Center,
  Loader,
  Alert,
  Box,
} from "@mantine/core";
import { CertificateCard } from "@/components/dashboard/student/certificate-card";
import { Award, AlertCircle } from "lucide-react";
import { useStudentCertificates } from "@/hooks/query-hooks/student-certificate-query";

// Component to fetch and display all certificates for a student
export function StudentCertificatesView() {
  const { data: certificates, isLoading, error } = useStudentCertificates();

  if (isLoading) {
    return (
      <Center py="xl" style={{ minHeight: "50vh" }}>
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="dimmed">Loading your certificates...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<AlertCircle size={20} />}
        title="Error"
        color="red"
        variant="light"
        styles={{
          root: {
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
          },
        }}
      >
        <Text>Failed to load certificates. Please try again.</Text>
      </Alert>
    );
  }

  return (
    <>
      {!certificates || certificates.length === 0 ? (
        <Box
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "4rem 2rem",
          }}
        >
          <Center>
            <Stack align="center" gap="md">
              <Award size={64} color="#6B7280" strokeWidth={1.5} />
              <div style={{ textAlign: "center" }}>
                <Text size="lg" fw={600} c="#e9eeea" mb="xs">
                  No Certificates Yet
                </Text>
                <Text c="dimmed" size="sm" maw={400}>
                  Complete courses with passing grades to earn certificates and
                  showcase your achievements. Keep learning!
                </Text>
              </div>
            </Stack>
          </Center>
        </Box>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" verticalSpacing="lg">
          {certificates.map((certificate: any) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              onDownload={() => {
                window.open(
                  `/api/certificates/${certificate.id}/download`,
                  "_blank"
                );
              }}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
