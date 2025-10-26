"use client";

import {
  Modal,
  Text,
  Button,
  Group,
  Stack,
  Loader,
  Card,
  Avatar,
  Badge,
  Divider,
  Textarea,
  ScrollArea,
} from "@mantine/core";
import {
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Code,
  BookOpen,
} from "lucide-react";
import { CourseApprovalItem } from "@/services/course-service/course-approval-type";
import { useState } from "react";

interface CourseApprovalModalProps {
  opened: boolean;
  onClose: () => void;
  course: CourseApprovalItem | null;
  action: "approve" | "reject" | null;
  onConfirm: (adminNotes?: string) => void;
  isLoading: boolean;
}

export function CourseApprovalModal({
  opened,
  onClose,
  course,
  action,
  onConfirm,
  isLoading,
}: CourseApprovalModalProps) {
  const [adminNotes, setAdminNotes] = useState("");

  if (!course || !action) return null;

  const isApprove = action === "approve";
  const title = isApprove ? "Approve Course" : "Reject Course";
  const description = isApprove
    ? "Are you sure you want to approve this course? This action will make the course available to students."
    : "Are you sure you want to reject this course? Please provide a reason for rejection.";

  const handleConfirm = () => {
    onConfirm(isApprove ? undefined : adminNotes);
    setAdminNotes("");
  };

  const handleClose = () => {
    setAdminNotes("");
    onClose();
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "programming":
        return <Code size={16} />;
      default:
        return <BookOpen size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={null}
      centered
      size="lg"
      styles={{
        content: {
          backgroundColor: "#0F0F0F",
          border: "1px solid #2D2D2D",
          borderRadius: "16px",
          overflow: "hidden",
          maxHeight: "85vh",
        },
        header: {
          display: "none",
        },
        body: {
          padding: 0,
          maxHeight: "85vh",
          overflow: "hidden",
        },
      }}
    >
      <ScrollArea style={{ maxHeight: "85vh" }} offsetScrollbars>
        <div style={{ position: "relative" }}>
          {/* Header with gradient background */}
          <div
            style={{
              background: isApprove
                ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                : "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "150px",
                height: "150px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-30px",
                left: "-30px",
                width: "100px",
                height: "100px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "50%",
              }}
            />

            <Group
              justify="space-between"
              align="center"
              style={{ position: "relative", zIndex: 1 }}
            >
              <Group gap="lg">
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {isApprove ? (
                    <CheckCircle size={28} color="#FFFFFF" />
                  ) : (
                    <XCircle size={28} color="#FFFFFF" />
                  )}
                </div>
                <div>
                  <Text
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {title}
                  </Text>
                  <Text
                    style={{
                      fontSize: "1rem",
                      color: "rgba(255, 255, 255, 0.9)",
                      maxWidth: "400px",
                    }}
                  >
                    {description}
                  </Text>
                </div>
              </Group>
              {isLoading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Loader size="sm" color="#FFFFFF" />
                  <Text style={{ color: "#FFFFFF", fontSize: "0.875rem" }}>
                    Processing...
                  </Text>
                </div>
              )}
            </Group>
          </div>

          {/* Course Details Section */}
          <div style={{ padding: "1.5rem" }}>
            <Card
              style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #2D2D2D",
                borderRadius: "12px",
                marginBottom: "1.25rem",
              }}
              padding="md"
            >
              <Stack gap="lg">
                {/* Course Header */}
                <Group gap="md" align="flex-start">
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "12px",
                      backgroundColor: "#2D2D2D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {getCategoryIcon(course.category)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {course.title}
                    </Text>
                    <Group
                      gap="md"
                      align="center"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Group gap="xs">
                        <User size={16} color="#9CA3AF" />
                        <Text
                          style={{ color: "#9CA3AF", fontSize: "0.875rem" }}
                        >
                          {course.instructor.first_name}{" "}
                          {course.instructor.last_name}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <Calendar size={16} color="#9CA3AF" />
                        <Text
                          style={{ color: "#9CA3AF", fontSize: "0.875rem" }}
                        >
                          {formatDate(course.created_at)}
                        </Text>
                      </Group>
                    </Group>
                    <Text
                      style={{
                        fontSize: "1rem",
                        color: "#E9EEEA",
                        lineHeight: 1.6,
                        marginBottom: "1rem",
                      }}
                    >
                      {course.description}
                    </Text>
                  </div>
                </Group>

                <Divider style={{ borderColor: "#2D2D2D" }} />

                {/* Course Metadata */}
                <Group gap="md" wrap="wrap">
                  <Badge
                    leftSection={getCategoryIcon(course.category)}
                    size="lg"
                    style={{
                      backgroundColor: "#2D2D2D",
                      color: "#BDF052",
                      textTransform: "capitalize",
                      fontWeight: 600,
                    }}
                  >
                    {course.category}
                  </Badge>
                  <Badge
                    size="lg"
                    style={{
                      backgroundColor: "#2D2D2D",
                      color: "#9CA3AF",
                      fontWeight: 500,
                    }}
                  >
                    {course.course_invite_code}
                  </Badge>
                  <Badge
                    size="lg"
                    style={{
                      backgroundColor: "#F59E0B",
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                  >
                    Waiting for Approval
                  </Badge>
                </Group>
              </Stack>
            </Card>

            {/* Instructor Details */}
            <Card
              style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #2D2D2D",
                borderRadius: "12px",
                marginBottom: "1.25rem",
              }}
              padding="md"
            >
              <Group gap="md">
                <Avatar
                  size="lg"
                  radius="md"
                  style={{ backgroundColor: "#BDF052" }}
                >
                  <User size={20} color="#0F0F0F" />
                </Avatar>
                <div style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {course.instructor.first_name} {course.instructor.last_name}
                  </Text>
                  <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                    {course.instructor.email}
                  </Text>
                </div>
              </Group>
            </Card>

            {/* Admin Notes for Rejection */}
            {!isApprove && (
              <Card
                style={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #2D2D2D",
                  borderRadius: "12px",
                  marginBottom: "1.25rem",
                }}
                padding="md"
              >
                <Text
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "0.75rem",
                  }}
                >
                  Reason for Rejection *
                </Text>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.currentTarget.value)}
                  placeholder="Please provide a detailed reason for rejecting this course..."
                  minRows={3}
                  maxRows={6}
                  required
                  styles={{
                    input: {
                      backgroundColor: "#0F0F0F",
                      border: "1px solid #2D2D2D",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                      fontSize: "0.9375rem",
                      "&:focus": {
                        borderColor: "#EF4444",
                      },
                      "&::placeholder": {
                        color: "#6B7280",
                      },
                    },
                  }}
                />
              </Card>
            )}

            {/* Action Buttons */}
            <Group justify="flex-end" gap="md">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                size="lg"
                style={{
                  borderColor: "#6B7280",
                  color: "#9CA3AF",
                  borderRadius: "12px",
                  padding: "0.75rem 2rem",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor: "rgba(107, 114, 128, 0.1)",
                      borderColor: "#9CA3AF",
                    },
                    transition: "all 0.2s ease",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={isLoading || (!isApprove && !adminNotes.trim())}
                leftSection={
                  isLoading ? (
                    <Loader size="sm" color="white" />
                  ) : isApprove ? (
                    <CheckCircle size={18} />
                  ) : (
                    <XCircle size={18} />
                  )
                }
                size="lg"
                style={{
                  backgroundColor:
                    isLoading || (!isApprove && !adminNotes.trim())
                      ? "#6B7280"
                      : isApprove
                      ? "#10B981"
                      : "#EF4444",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "0.75rem 2rem",
                  fontWeight: 600,
                  cursor:
                    isLoading || (!isApprove && !adminNotes.trim())
                      ? "not-allowed"
                      : "pointer",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor:
                        isLoading || (!isApprove && !adminNotes.trim())
                          ? "#6B7280"
                          : isApprove
                          ? "#059669"
                          : "#DC2626",
                      transform:
                        isLoading || (!isApprove && !adminNotes.trim())
                          ? "none"
                          : "translateY(-2px)",
                      boxShadow:
                        isLoading || (!isApprove && !adminNotes.trim())
                          ? "none"
                          : isApprove
                          ? "0 8px 25px rgba(16, 185, 129, 0.3)"
                          : "0 8px 25px rgba(239, 68, 68, 0.3)",
                    },
                    "&:disabled": {
                      backgroundColor: "#6B7280",
                      opacity: 0.6,
                      transform: "none",
                    },
                    transition: "all 0.3s ease",
                  },
                }}
              >
                {isLoading
                  ? "Processing..."
                  : isApprove
                  ? "Approve Course"
                  : "Reject Course"}
              </Button>
            </Group>
          </div>
        </div>
      </ScrollArea>
    </Modal>
  );
}
