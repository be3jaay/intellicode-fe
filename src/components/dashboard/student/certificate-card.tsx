"use client";

import {
  Card,
  Stack,
  Text,
  Group,
  Badge,
  Center,
  Box,
  Divider,
  Button,
} from "@mantine/core";
import {
  Award,
  Calendar,
  User,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

interface CertificateCardProps {
  certificate: {
    id: string;
    course_id: string;
    student_id: string;
    issued_by: string;
    issued_at: string;
    final_grade: number;
    status: string;
    revoked_at: string | null;
    revoked_by: string | null;
    revocation_reason: string | null;
    course: {
      id: string;
      title: string;
      instructor: {
        first_name: string;
        last_name: string;
      };
    };
    student: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      student_number: string;
    };
    issuer: {
      first_name: string;
      last_name: string;
    };
    revoker: {
      first_name: string;
      last_name: string;
    } | null;
  };
  onDownload?: () => void;
  onPreview?: () => void;
}

export function CertificateCard({
  certificate,
  onDownload,
  onPreview,
}: CertificateCardProps) {
  const isRevoked = certificate.status === "revoked";

  return (
    <Card
      padding={0}
      radius="lg"
      style={{
        background: isRevoked
          ? "rgba(26, 26, 26, 0.8)"
          : "rgba(26, 26, 26, 0.8)",
        border: isRevoked
          ? "1px solid rgba(239, 68, 68, 0.3)"
          : "1px solid rgba(189, 240, 82, 0.2)",
        overflow: "hidden",
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        style={{
          height: "4px",
          background: isRevoked
            ? "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)"
            : "linear-gradient(90deg, #bdf052 0%, #a3d742 100%)",
        }}
      />

      <Stack gap="lg" p="lg" style={{ flex: 1 }}>
        <Group justify="space-between" align="flex-start">
          <Group gap="xs">
            <Award
              size={24}
              color={isRevoked ? "#EF4444" : "#bdf052"}
              strokeWidth={2}
            />
            <Text size="sm" fw={600} c={isRevoked ? "#EF4444" : "#bdf052"}>
              Certificate of Completion
            </Text>
          </Group>
          <Badge
            size="sm"
            variant="filled"
            style={{
              background: isRevoked
                ? "rgba(239, 68, 68, 0.15)"
                : "rgba(189, 240, 82, 0.15)",
              color: isRevoked ? "#EF4444" : "#bdf052",
              border: isRevoked
                ? "1px solid rgba(239, 68, 68, 0.3)"
                : "1px solid rgba(189, 240, 82, 0.3)",
            }}
          >
            {isRevoked ? "Revoked" : "Active"}
          </Badge>
        </Group>

        <Divider
          style={{
            borderColor: "rgba(255, 255, 255, 0.05)",
          }}
        />

        <Stack gap="md" style={{ flex: 1 }}>
          <Box>
            <Text size="xs" c="dimmed" mb={4}>
              Awarded to
            </Text>
            <Text
              size="lg"
              fw={700}
              style={{
                color: isRevoked ? "#EF4444" : "#e9eeea",
              }}
            >
              {certificate.student.first_name} {certificate.student.last_name}
            </Text>
            <Text size="xs" c="dimmed" mt={2}>
              {certificate.student.student_number}
            </Text>
          </Box>

          <Box>
            <Text size="xs" c="dimmed" mb={4}>
              For completing
            </Text>
            <Text size="sm" fw={600} c="#e9eeea" lineClamp={2}>
              {certificate.course.title}
            </Text>
          </Box>

          <Group gap="xs">
            <Text size="xs" c="dimmed">
              Final Grade:
            </Text>
            <Badge
              size="sm"
              variant="filled"
              style={{
                background: isRevoked
                  ? "rgba(239, 68, 68, 0.15)"
                  : "rgba(189, 240, 82, 0.15)",
                color: isRevoked ? "#EF4444" : "#bdf052",
                border: isRevoked
                  ? "1px solid rgba(239, 68, 68, 0.3)"
                  : "1px solid rgba(189, 240, 82, 0.3)",
              }}
            >
              {certificate.final_grade.toFixed(1)}%
            </Badge>
          </Group>

          {isRevoked && certificate.revoked_at && (
            <Box
              style={{
                padding: "0.75rem",
                background: "rgba(239, 68, 68, 0.1)",
                borderRadius: "6px",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              <Group gap="xs" mb={4}>
                <AlertCircle size={14} color="#EF4444" />
                <Text size="xs" c="#EF4444" fw={600}>
                  REVOKED
                </Text>
              </Group>
              <Text size="xs" c="dimmed">
                {format(new Date(certificate.revoked_at), "MMM dd, yyyy")}
              </Text>
              {certificate.revocation_reason && (
                <Text size="xs" c="dimmed" mt={4} lineClamp={2}>
                  {certificate.revocation_reason}
                </Text>
              )}
            </Box>
          )}
        </Stack>

        <Divider
          style={{
            borderColor: "rgba(255, 255, 255, 0.05)",
          }}
        />

        <Stack gap="xs">
          <Group justify="space-between">
            <Group gap="xs">
              <Calendar size={14} color="#9ca3af" />
              <Text size="xs" c="dimmed">
                {format(new Date(certificate.issued_at), "MMM dd, yyyy")}
              </Text>
            </Group>
            <Group gap="xs">
              <GraduationCap size={14} color="#9ca3af" />
              <Text size="xs" c="dimmed">
                {certificate.course.instructor.first_name}{" "}
                {certificate.course.instructor.last_name}
              </Text>
            </Group>
          </Group>

          <Center>
            <Text
              size="xs"
              c="dimmed"
              style={{
                fontFamily: "monospace",
                opacity: 0.5,
              }}
            >
              #{certificate.id.slice(0, 8).toUpperCase()}
            </Text>
          </Center>

          {!isRevoked && (
            <Group justify="space-between" mt="xs">
              <Button variant="light" color="#bdf052" onClick={onPreview} size="xs">
                See certificate
              </Button>
              {onDownload && (
                <Button variant="outline" color="#bdf052" onClick={onDownload} size="xs">
                  Download PDF
                </Button>
              )}
            </Group>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
