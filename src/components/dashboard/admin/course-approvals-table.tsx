"use client";

import {
  Group,
  Text,
  Button,
  Card,
  Table,
  Avatar,
  Badge,
  ScrollArea,
  Center,
  Loader,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  BookOpen,
  User,
  Calendar,
  Code,
  CheckCircle,
  XCircle,
  ChevronDown,
  Eye,
} from "lucide-react";
import { CourseApprovalItem } from "@/services/course-service/course-approval-type";

export interface CourseApprovalsTableProps {
  courses: CourseApprovalItem[];
  onActionClick: (
    course: CourseApprovalItem,
    action: "approve" | "reject"
  ) => void;
  onViewCourse?: (courseId: string) => void;
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isRefetching?: boolean;
}

export function CourseApprovalsTable({
  courses,
  onActionClick,
  onViewCourse,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isRefetching,
}: CourseApprovalsTableProps) {
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
    });
  };

  return (
    <Card
      style={{
        backgroundColor: "#1A1A1A",
        border: "1px solid #2D2D2D",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
      }}
      padding={0}
    >
      <div
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid #2D2D2D",
          background: "#0F0F0F",
        }}
      >
        <Group justify="space-between" align="center">
          <Text
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            Pending Course Approvals
          </Text>
          <Group gap="sm">
            <Badge
              size="lg"
              style={{
                backgroundColor: "#F59E0B",
                color: "#FFFFFF",
                fontWeight: 600,
              }}
            >
              {courses.length} Pending
            </Badge>
            {isLoading && <Loader size="sm" color="#BDF052" />}
          </Group>
        </Group>
      </div>

      {isRefetching && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 15, 15, 0.8)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Loader size="lg" color="#BDF052" />
            <Text
              style={{
                color: "#BDF052",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Refreshing courses...
            </Text>
          </div>
        </div>
      )}

      <div style={{ overflow: "auto" }}>
        <Table
          highlightOnHover
          verticalSpacing="md"
          styles={{
            table: {
              backgroundColor: "transparent",
            },
            thead: {
              backgroundColor: "#0F0F0F",
            },
            th: {
              color: "#BDF052",
              fontWeight: 700,
              fontSize: "0.875rem",
              padding: "1rem 1.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderBottom: "2px solid #2D2D2D",
            },
            td: {
              color: "#FFFFFF",
              padding: "1rem 1.5rem",
              fontSize: "0.9375rem",
              borderBottom: "1px solid #2D2D2D",
            },
            tr: {
              backgroundColor: "#1A1A1A",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#252525 !important",
              },
            },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Course</Table.Th>
              <Table.Th>Instructor</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Submitted</Table.Th>
              <Table.Th style={{ width: "180px", textAlign: "center" }}>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {courses.map((course) => (
              <Table.Tr key={course.id}>
                <Table.Td>
                  <Group gap="md">
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "8px",
                        backgroundColor: "#2D2D2D",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {getCategoryIcon(course.category)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Text
                        style={{
                          fontWeight: 600,
                          color: "#FFFFFF",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {course.title}
                      </Text>
                      <Text
                        size="sm"
                        style={{
                          color: "#9CA3AF",
                        }}
                        lineClamp={1}
                      >
                        {course.description}
                      </Text>
                    </div>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar
                      size="sm"
                      radius="md"
                      style={{ backgroundColor: "#BDF052" }}
                    >
                      <User size={16} color="#0F0F0F" />
                    </Avatar>
                    <div>
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                        }}
                      >
                        {course.instructor.first_name}{" "}
                        {course.instructor.last_name}
                      </Text>
                      <Text size="xs" style={{ color: "#9CA3AF" }}>
                        {course.instructor.email}
                      </Text>
                    </div>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge
                    leftSection={getCategoryIcon(course.category)}
                    size="md"
                    style={{
                      backgroundColor: "#2D2D2D",
                      color: "#BDF052",
                      textTransform: "capitalize",
                    }}
                  >
                    {course.category}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge
                    size="md"
                    style={{
                      backgroundColor:
                        course.status === "approved"
                          ? "rgba(16, 185, 129, 0.15)"
                          : course.status === "rejected"
                            ? "rgba(239, 68, 68, 0.15)"
                            : "rgba(245, 158, 11, 0.15)",
                      color:
                        course.status === "approved"
                          ? "#10B981"
                          : course.status === "rejected"
                            ? "#EF4444"
                            : "#F59E0B",
                      textTransform: "capitalize",
                      border:
                        course.status === "approved"
                          ? "1px solid #10B981"
                          : course.status === "rejected"
                            ? "1px solid #EF4444"
                            : "1px solid #F59E0B",
                    }}
                  >
                    {course.status.replace(/_/g, " ")}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text style={{ color: "#FFFFFF", fontSize: "0.9375rem" }}>
                    {formatDate(course.created_at)}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="center">
                    <Tooltip label="View Course" position="top">
                      <ActionIcon
                        size="lg"
                        variant="filled"
                        style={{
                          backgroundColor: "#3B82F6",
                          color: "#FFFFFF",
                        }}
                        onClick={() => onViewCourse?.(course.id)}
                        disabled={isLoading}
                        styles={{
                          root: {
                            "&:hover": {
                              backgroundColor: "#2563EB",
                            },
                          },
                        }}
                      >
                        <Eye size={18} />
                      </ActionIcon>
                    </Tooltip>
                    {course.status !== "approved" && (
                      <>
                        <Tooltip label="Approve" position="top">
                          <ActionIcon
                            size="lg"
                            variant="filled"
                            style={{
                              backgroundColor: "#10B981",
                              color: "#FFFFFF",
                            }}
                            onClick={() => onActionClick(course, "approve")}
                            disabled={isLoading}
                            styles={{
                              root: {
                                "&:hover": {
                                  backgroundColor: "#059669",
                                },
                              },
                            }}
                          >
                            <CheckCircle size={18} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Reject" position="top">
                          <ActionIcon
                            size="lg"
                            variant="filled"
                            style={{
                              backgroundColor: "#EF4444",
                              color: "#FFFFFF",
                            }}
                            onClick={() => onActionClick(course, "reject")}
                            disabled={isLoading}
                            styles={{
                              root: {
                                "&:hover": {
                                  backgroundColor: "#DC2626",
                                },
                              },
                            }}
                          >
                            <XCircle size={18} />
                          </ActionIcon>
                        </Tooltip>
                      </>
                    )}
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>

      {/* Load More Section */}
      {hasNextPage && (
        <div
          style={{
            padding: "2rem",
            borderTop: "1px solid #2D2D2D",
            background: "linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)",
          }}
        >
          <Center>
            <Button
              onClick={onLoadMore}
              disabled={isFetchingNextPage}
              leftSection={
                isFetchingNextPage ? (
                  <Loader size="sm" />
                ) : (
                  <ChevronDown size={16} />
                )
              }
              size="lg"
              style={{
                backgroundColor: "#BDF052",
                color: "#0F0F0F",
                fontWeight: 600,
                borderRadius: "12px",
                padding: "0.75rem 2rem",
              }}
              styles={{
                root: {
                  "&:hover": {
                    backgroundColor: "#A8D944",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(189, 240, 82, 0.3)",
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
              {isFetchingNextPage
                ? "Loading More Courses..."
                : "Load More Courses"}
            </Button>
          </Center>
        </div>
      )}
    </Card>
  );
}
