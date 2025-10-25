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
} from "@mantine/core";
import { Award, Calendar, User, GraduationCap } from "lucide-react";
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
}

export function CertificateCard({
  certificate,
  onDownload,
}: CertificateCardProps) {
  const isRevoked = certificate.status === "revoked";

  return (
    <Card
      padding={0}
      radius="xl"
      style={{
        background: isRevoked
          ? "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)"
          : "linear-gradient(135deg, rgba(189, 240, 82, 0.15) 0%, rgba(163, 215, 66, 0.1) 100%)",
        border: isRevoked
          ? "2px solid rgba(239, 68, 68, 0.3)"
          : "2px solid rgba(189, 240, 82, 0.3)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative top border */}
      <Box
        style={{
          height: "8px",
          background: isRevoked
            ? "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)"
            : "linear-gradient(90deg, #bdf052 0%, #a3d742 100%)",
        }}
      />

      <Stack gap="xl" p="xl">
        {/* Header with Award Icon */}
        <Center>
          <Stack align="center" gap="md">
            <Box
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: isRevoked
                  ? "rgba(239, 68, 68, 0.2)"
                  : "rgba(189, 240, 82, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: isRevoked
                  ? "3px solid rgba(239, 68, 68, 0.4)"
                  : "3px solid rgba(189, 240, 82, 0.4)",
              }}
            >
              <Award
                size={40}
                color={isRevoked ? "#EF4444" : "#bdf052"}
                fill={isRevoked ? "rgba(239, 68, 68, 0.2)" : "rgba(189, 240, 82, 0.2)"}
              />
            </Box>
            <Text
              size="xl"
              fw={700}
              style={{
                textAlign: "center",
                color: "#e9eeea",
                letterSpacing: "0.5px",
              }}
            >
              Certificate of Completion
            </Text>
          </Stack>
        </Center>

        {/* Status Badge */}
        <Center>
          <Badge
            size="lg"
            variant="filled"
            leftSection={
              isRevoked ? <Award size={14} /> : <GraduationCap size={14} />
            }
            style={{
              background: isRevoked
                ? "rgba(239, 68, 68, 0.2)"
                : "rgba(189, 240, 82, 0.2)",
              color: isRevoked ? "#EF4444" : "#bdf052",
              border: isRevoked
                ? "1px solid rgba(239, 68, 68, 0.4)"
                : "1px solid rgba(189, 240, 82, 0.4)",
              padding: "1rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {isRevoked ? "Revoked" : "Active Certificate"}
          </Badge>
        </Center>

        <Divider
          style={{
            borderColor: isRevoked
              ? "rgba(239, 68, 68, 0.2)"
              : "rgba(189, 240, 82, 0.2)",
          }}
        />

        {/* Certificate Details */}
        <Stack gap="lg">
          {/* Student Name */}
          <Box
            style={{
              textAlign: "center",
              padding: "1.5rem",
              background: "rgba(26, 26, 26, 0.5)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Text size="xs" c="dimmed" mb="xs" fw={500}>
              This is to certify that
            </Text>
            <Text
              size="xl"
              fw={700}
              style={{
                color: isRevoked ? "#EF4444" : "#bdf052",
                fontFamily: "serif",
                fontSize: "1.75rem",
              }}
            >
              {certificate.student.first_name} {certificate.student.last_name}
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              Student Number: {certificate.student.student_number}
            </Text>
          </Box>

          {/* Course Title */}
          <Box style={{ textAlign: "center" }}>
            <Text size="xs" c="dimmed" mb="xs" fw={500}>
              has successfully completed the course
            </Text>
            <Text
              size="lg"
              fw={700}
              style={{
                color: "#e9eeea",
                fontSize: "1.25rem",
              }}
            >
              {certificate.course.title}
            </Text>
          </Box>

          {/* Grade Display */}
          <Center>
            <Box
              style={{
                padding: "1rem 2rem",
                background: isRevoked
                  ? "rgba(239, 68, 68, 0.1)"
                  : "rgba(189, 240, 82, 0.1)",
                borderRadius: "12px",
                border: isRevoked
                  ? "1px solid rgba(239, 68, 68, 0.3)"
                  : "1px solid rgba(189, 240, 82, 0.3)",
              }}
            >
              <Group gap="xs">
                <Text size="sm" c="dimmed">
                  Final Grade:
                </Text>
                <Text
                  size="xl"
                  fw={700}
                  style={{
                    color: isRevoked ? "#EF4444" : "#bdf052",
                  }}
                >
                  {certificate.final_grade.toFixed(2)}%
                </Text>
              </Group>
            </Box>
          </Center>

          <Divider
            style={{
              borderColor: isRevoked
                ? "rgba(239, 68, 68, 0.2)"
                : "rgba(189, 240, 82, 0.2)",
            }}
          />

          {/* Certificate Info */}
          <Group grow>
            <Box
              style={{
                padding: "1rem",
                background: "rgba(26, 26, 26, 0.3)",
                borderRadius: "8px",
              }}
            >
              <Group gap="xs" mb="xs">
                <Calendar size={16} color="#b3a1ff" />
                <Text size="xs" c="dimmed" fw={500}>
                  Issued Date
                </Text>
              </Group>
              <Text size="sm" c="#e9eeea" fw={600}>
                {format(new Date(certificate.issued_at), "MMMM dd, yyyy")}
              </Text>
            </Box>

            <Box
              style={{
                padding: "1rem",
                background: "rgba(26, 26, 26, 0.3)",
                borderRadius: "8px",
              }}
            >
              <Group gap="xs" mb="xs">
                <User size={16} color="#b3a1ff" />
                <Text size="xs" c="dimmed" fw={500}>
                  Issued By
                </Text>
              </Group>
              <Text size="sm" c="#e9eeea" fw={600}>
                {certificate.issuer.first_name} {certificate.issuer.last_name}
              </Text>
            </Box>
          </Group>

          {/* Instructor Info */}
          <Box
            style={{
              padding: "1rem",
              background: "rgba(26, 26, 26, 0.3)",
              borderRadius: "8px",
            }}
          >
            <Group gap="xs" mb="xs">
              <GraduationCap size={16} color="#b3a1ff" />
              <Text size="xs" c="dimmed" fw={500}>
                Course Instructor
              </Text>
            </Group>
            <Text size="sm" c="#e9eeea" fw={600}>
              {certificate.course.instructor.first_name}{" "}
              {certificate.course.instructor.last_name}
            </Text>
          </Box>

          {/* Revocation Info */}
          {isRevoked && certificate.revoked_at && (
            <Box
              style={{
                padding: "1rem",
                background: "rgba(239, 68, 68, 0.1)",
                borderRadius: "8px",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              }}
            >
              <Text size="xs" c="#EF4444" fw={600} mb="xs">
                REVOKED
              </Text>
              <Text size="xs" c="dimmed" mb="xs">
                Revoked on:{" "}
                {format(new Date(certificate.revoked_at), "MMMM dd, yyyy")}
              </Text>
              {certificate.revocation_reason && (
                <Text size="xs" c="dimmed">
                  Reason: {certificate.revocation_reason}
                </Text>
              )}
            </Box>
          )}

          {/* Certificate ID */}
          <Center>
            <Text
              size="xs"
              c="dimmed"
              style={{
                fontFamily: "monospace",
                letterSpacing: "1px",
              }}
            >
              Certificate ID: {certificate.id.slice(0, 8).toUpperCase()}
            </Text>
          </Center>
        </Stack>

        {/* Download Button */}
        {!isRevoked && onDownload && (
          <button
            onClick={onDownload}
            style={{
              background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
              border: "none",
              borderRadius: "12px",
              color: "#1a1a1a",
              fontWeight: 700,
              padding: "1rem 2rem",
              cursor: "pointer",
              fontSize: "1rem",
              width: "100%",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Download Certificate
          </button>
        )}
      </Stack>
    </Card>
  );
}
