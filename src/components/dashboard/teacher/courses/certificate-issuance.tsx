"use client";
import {
  Card,
  Group,
  Stack,
  Text,
  Badge,
  Center,
  Loader,
  Alert,
  Table,
  Avatar,
  ActionIcon,
  Tooltip,
  Modal,
  Textarea,
  Button,
} from "@mantine/core";
import {
  Award,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useEligibleStudentsForCertificates } from "@/hooks/query-hooks/certificate-query";
import {
  useIssueCertificate,
  useRevokeCertificate,
} from "@/hooks/query-hooks/certificate-issue-query";
import { format } from "date-fns";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

interface CertificateIssuanceProps {
  courseId: string;
}

export function CertificateIssuance({ courseId }: CertificateIssuanceProps) {
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [revocationReason, setRevocationReason] = useState("");

  const { data, isLoading, error, refetch } =
    useEligibleStudentsForCertificates(courseId);
  const issueCertificateMutation = useIssueCertificate();
  const revokeCertificateMutation = useRevokeCertificate();

  const handleIssueCertificate = async (
    studentId: string,
    studentName: string
  ) => {
    try {
      await issueCertificateMutation.mutateAsync({
        courseId,
        studentId,
      });

      notifications.show({
        title: "Certificate Issued",
        message: `Certificate successfully issued to ${studentName}`,
        color: "green",
        icon: <Award size={18} />,
      });
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message:
          error.message || "Failed to issue certificate. Please try again.",
        color: "red",
        icon: <AlertCircle size={18} />,
      });
    }
  };

  const handleRevokeClick = (studentId: string, studentName: string) => {
    setSelectedStudent({ id: studentId, name: studentName });
    setRevocationReason("");
    setRevokeModalOpen(true);
  };

  const handleRevokeCertificate = async () => {
    if (!selectedStudent || !revocationReason.trim()) {
      notifications.show({
        title: "Error",
        message: "Please provide a revocation reason",
        color: "red",
      });
      return;
    }

    try {
      await revokeCertificateMutation.mutateAsync({
        courseId,
        studentId: selectedStudent.id,
        revocationReason: revocationReason.trim(),
      });

      notifications.show({
        title: "Certificate Revoked",
        message: `Certificate for ${selectedStudent.name} has been revoked`,
        color: "orange",
        icon: <XCircle size={18} />,
      });

      setRevokeModalOpen(false);
      setSelectedStudent(null);
      setRevocationReason("");
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message:
          error.message || "Failed to revoke certificate. Please try again.",
        color: "red",
        icon: <AlertCircle size={18} />,
      });
    }
  };

  if (isLoading) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="dimmed">Loading eligible students...</Text>
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
        <Text>Failed to load eligible students. Please try again.</Text>
        <Button
          onClick={() => refetch()}
          size="sm"
          style={{
            marginTop: "1rem",
            background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
            color: "#1a1a1a",
          }}
        >
          Retry
        </Button>
      </Alert>
    );
  }

  if (!data?.has_passing_grade) {
    return (
      <Alert
        icon={<AlertCircle size={20} />}
        title="Passing Grade Required"
        color="yellow"
        variant="light"
        styles={{
          root: {
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
          },
        }}
      >
        <Text>
          Please set a passing grade for this course before issuing
          certificates. You can set the passing grade using the Award button in
          the course header.
        </Text>
      </Alert>
    );
  }

  const eligibleStudents = data?.eligible_students || [];
  const totalEligible = data?.total_eligible || 0;
  const totalEnrolled = data?.total_enrolled || 0;
  const passingGrade = data?.passing_grade || 0;

  return (
    <Stack gap="lg">
      {/* Statistics Cards */}
      <Group grow>
        <Card
          padding="lg"
          radius="md"
          style={{
            background:
              "linear-gradient(135deg, rgba(189, 240, 82, 0.1) 0%, rgba(189, 240, 82, 0.05) 100%)",
            border: "1px solid rgba(189, 240, 82, 0.2)",
          }}
        >
          <Group gap="md">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(189, 240, 82, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Award size={24} color="#bdf052" />
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Eligible Students
              </Text>
              <Text size="xl" fw={700} c="#e9eeea">
                {totalEligible}
              </Text>
            </div>
          </Group>
        </Card>

        <Card
          padding="lg"
          radius="md"
          style={{
            background:
              "linear-gradient(135deg, rgba(179, 161, 255, 0.1) 0%, rgba(179, 161, 255, 0.05) 100%)",
            border: "1px solid rgba(179, 161, 255, 0.2)",
          }}
        >
          <Group gap="md">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(179, 161, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Users size={24} color="#b3a1ff" />
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Total Enrolled
              </Text>
              <Text size="xl" fw={700} c="#e9eeea">
                {totalEnrolled}
              </Text>
            </div>
          </Group>
        </Card>

        <Card
          padding="lg"
          radius="md"
          style={{
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
          }}
        >
          <Group gap="md">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(59, 130, 246, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={24} color="#3B82F6" />
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Passing Grade
              </Text>
              <Text size="xl" fw={700} c="#e9eeea">
                {passingGrade}%
              </Text>
            </div>
          </Group>
        </Card>
      </Group>

      {/* Students Table */}
      {eligibleStudents.length === 0 ? (
        <Card
          padding="xl"
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.4)",
            border: "1px solid rgba(189, 240, 82, 0.1)",
            textAlign: "center",
          }}
        >
          <Stack align="center" gap="md">
            <Award size={48} color="#6B7280" />
            <div>
              <Text size="lg" fw={600} c="#e9eeea" mb="xs">
                No Eligible Students Yet
              </Text>
              <Text c="dimmed">
                Students who complete the course with a grade of {passingGrade}%
                or higher will appear here.
              </Text>
            </div>
          </Stack>
        </Card>
      ) : (
        <Card
          padding={0}
          radius="md"
          style={{
            background: "rgba(34, 34, 34, 0.4)",
            border: "1px solid rgba(189, 240, 82, 0.1)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <Table
              striped
              highlightOnHover
              styles={{
                thead: {
                  backgroundColor: "rgba(26, 26, 26, 0.8)",
                },
                th: {
                  color: "#bdf052",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  padding: "1rem",
                  borderBottom: "1px solid rgba(189, 240, 82, 0.2)",
                },
                td: {
                  color: "#e9eeea",
                  background: "#222222",
                  padding: "1rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                },
                tr: {
                  transition: "background-color 0.2s ease",
                },
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Student</Table.Th>
                  <Table.Th>Student Number</Table.Th>
                  <Table.Th>Overall Grade</Table.Th>
                  <Table.Th>Progress</Table.Th>
                  <Table.Th>Certificate Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {eligibleStudents.map((student) => (
                  <Table.Tr key={student.student_id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar
                          size="md"
                          radius="xl"
                          color="#bdf052"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(189, 240, 82, 0.2) 0%, rgba(163, 215, 66, 0.2) 100%)",
                            color: "#bdf052",
                          }}
                        >
                          {student.first_name[0]}
                          {student.last_name[0]}
                        </Avatar>
                        <div>
                          <Text size="sm" fw={500}>
                            {student.first_name} {student.last_name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {student.email}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" style={{ fontFamily: "monospace" }}>
                        {student.student_number}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        size="lg"
                        variant="filled"
                        style={{
                          background:
                            student.overall_grade >= 90
                              ? "rgba(34, 197, 94, 0.2)"
                              : student.overall_grade >= 80
                              ? "rgba(59, 130, 246, 0.2)"
                              : "rgba(245, 158, 11, 0.2)",
                          color:
                            student.overall_grade >= 90
                              ? "#22C55E"
                              : student.overall_grade >= 80
                              ? "#3B82F6"
                              : "#F59E0B",
                          border: `1px solid ${
                            student.overall_grade >= 90
                              ? "rgba(34, 197, 94, 0.3)"
                              : student.overall_grade >= 80
                              ? "rgba(59, 130, 246, 0.3)"
                              : "rgba(245, 158, 11, 0.3)"
                          }`,
                        }}
                      >
                        {student.overall_grade.toFixed(1)}%
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        size="lg"
                        variant="filled"
                        style={{
                          background: "rgba(189, 240, 82, 0.2)",
                          color: "#bdf052",
                          border: "1px solid rgba(189, 240, 82, 0.3)",
                        }}
                      >
                        {student.course_progress}%
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {student.is_certificate_revoked ? (
                        <Stack gap={4}>
                          <Group gap="xs">
                            <XCircle size={18} color="#EF4444" />
                            <div>
                              <Text size="sm" fw={500} c="#EF4444">
                                Revoked
                              </Text>
                              {student.certificate_revoked_at && (
                                <Text size="xs" c="dimmed">
                                  {format(
                                    new Date(student.certificate_revoked_at),
                                    "MMM dd, yyyy"
                                  )}
                                </Text>
                              )}
                            </div>
                          </Group>
                          {student.certificate_revocation_reason && (
                            <Text
                              size="xs"
                              c="dimmed"
                              style={{
                                fontStyle: "italic",
                                maxWidth: "250px",
                              }}
                              lineClamp={2}
                            >
                              Reason: {student.certificate_revocation_reason}
                            </Text>
                          )}
                        </Stack>
                      ) : student.has_certificate ? (
                        <Group gap="xs">
                          <CheckCircle size={18} color="#22C55E" />
                          <div>
                            <Text size="sm" fw={500} c="#22C55E">
                              Issued
                            </Text>
                            {student.certificate_issued_at && (
                              <Text size="xs" c="dimmed">
                                {format(
                                  new Date(student.certificate_issued_at),
                                  "MMM dd, yyyy"
                                )}
                              </Text>
                            )}
                          </div>
                        </Group>
                      ) : (
                        <Group gap="xs">
                          <AlertCircle size={18} color="#F59E0B" />
                          <Text size="sm" c="#F59E0B">
                            Not Issued
                          </Text>
                        </Group>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        {student.is_certificate_revoked ? (
                          <Badge
                            size="sm"
                            variant="light"
                            style={{
                              background: "rgba(156, 163, 175, 0.15)",
                              color: "#9ca3af",
                              border: "1px solid rgba(156, 163, 175, 0.3)",
                            }}
                          >
                            Cannot Re-issue
                          </Badge>
                        ) : student.has_certificate ? (
                          <Tooltip label="Revoke Certificate">
                            <ActionIcon
                              variant="light"
                              size="lg"
                              onClick={() =>
                                handleRevokeClick(
                                  student.student_id,
                                  `${student.first_name} ${student.last_name}`
                                )
                              }
                              loading={revokeCertificateMutation.isPending}
                              style={{
                                background: "rgba(239, 68, 68, 0.15)",
                                color: "#EF4444",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                              }}
                            >
                              <XCircle size={18} />
                            </ActionIcon>
                          </Tooltip>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleIssueCertificate(
                                student.student_id,
                                `${student.first_name} ${student.last_name}`
                              )
                            }
                            disabled={issueCertificateMutation.isPending}
                            style={{
                              background:
                                "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                              color: "#1a1a1a",
                              border: "none",
                              fontWeight: 600,
                              fontSize: "0.875rem",
                            }}
                          >
                            <Award size={14} style={{ marginRight: 6 }} />
                            {issueCertificateMutation.isPending
                              ? "Issuing..."
                              : "Issue Certificate"}
                          </Button>
                        )}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Card>
      )}

      {/* Revoke Certificate Modal */}
      <Modal
        opened={revokeModalOpen}
        onClose={() => {
          setRevokeModalOpen(false);
          setSelectedStudent(null);
          setRevocationReason("");
        }}
        title={
          <Group gap="xs">
            <XCircle size={20} color="#EF4444" />
            <Text fw={600} size="lg">
              Revoke Certificate
            </Text>
          </Group>
        }
        size="lg"
        styles={{
          content: {
            background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
          },
          header: {
            background: "transparent",
            borderBottom: "1px solid rgba(239, 68, 68, 0.2)",
            paddingBottom: "1rem",
            color: "red",
          },
          title: {
            width: "100%",
          },
          body: {
            paddingTop: "1.5rem",
          },
        }}
      >
        <Stack gap="lg">
          <Alert
            icon={<AlertCircle size={20} />}
            color="red"
            variant="light"
            styles={{
              root: {
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              },
            }}
          >
            <Stack gap="xs">
              <Text size="sm" c="white" fw={600}>
                ⚠️ Warning: This action is permanent and cannot be undone
              </Text>
              <Text size="sm" c="white">
                You are about to revoke the certificate for{" "}
                <strong>{selectedStudent?.name}</strong>. This will permanently
                invalidate their certificate.
              </Text>
              <Text size="sm" c="#EF4444" fw={500} mt="xs">
                Once revoked, this certificate cannot be re-issued. The student
                will not be able to get this certificate again.
              </Text>
            </Stack>
          </Alert>

          <Textarea
            label="Revocation Reason (Required)"
            placeholder="Enter the reason for revoking this certificate..."
            description="This reason will be visible to the student and recorded permanently."
            value={revocationReason}
            onChange={(e) => setRevocationReason(e.target.value)}
            minRows={4}
            required
            styles={{
              label: {
                color: "#e9eeea",
                fontWeight: 500,
                marginBottom: "0.5rem",
              },
              description: {
                color: "#9ca3af",
                fontSize: "0.75rem",
                marginTop: "0.25rem",
              },
              input: {
                background: "rgba(26, 26, 26, 0.8)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#e9eeea",
                "&:focus": {
                  borderColor: "#EF4444",
                },
              },
            }}
          />

          <Group justify="flex-end" gap="sm">
            <Button
              variant="outline"
              onClick={() => {
                setRevokeModalOpen(false);
                setSelectedStudent(null);
                setRevocationReason("");
              }}
              style={{
                borderColor: "#6B7280",
                color: "#e9eeea",
                background: "transparent",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRevokeCertificate}
              disabled={
                !revocationReason.trim() || revokeCertificateMutation.isPending
              }
              style={{
                background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                color: "#ffffff",
                border: "none",
                fontWeight: 600,
              }}
            >
              <XCircle size={16} style={{ marginRight: 6 }} />
              {revokeCertificateMutation.isPending
                ? "Revoking..."
                : "Revoke Certificate"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
