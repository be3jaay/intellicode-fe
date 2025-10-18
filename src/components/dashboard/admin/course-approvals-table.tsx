"use client";

import { Group, Text, Button, Card, Table, Avatar, Badge, ScrollArea, Center, Loader, ActionIcon, Tooltip } from "@mantine/core";
import { BookOpen, User, Calendar, Code, CheckCircle, XCircle, ChevronDown } from "lucide-react";
import { CourseApprovalItem } from "@/services/course-service/course-approval-type";

interface CourseApprovalsTableProps {
    courses: CourseApprovalItem[];
    onActionClick: (course: CourseApprovalItem, action: "approve" | "reject") => void;
    onLoadMore: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isLoading: boolean;
}

export function CourseApprovalsTable({
    courses,
    onActionClick,
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
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
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Card
            style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #2D2D2D",
                borderRadius: "12px",
                overflow: "hidden",
            }}
            padding={0}
        >
            <div
                style={{
                    padding: "1.5rem",
                    borderBottom: "1px solid #2D2D2D",
                    background: "linear-gradient(90deg, #1A1A1A 0%, #0F0F0F 100%)",
                }}
            >
                <Group justify="space-between" align="center">
                    <Group gap="md">
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#BDF052",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <BookOpen size={20} color="#0F0F0F" />
                        </div>
                        <div>
                            <Text
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                    marginBottom: "0.25rem",
                                }}
                            >
                                Course Approvals
                            </Text>
                            <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                                Review and approve pending course submissions
                            </Text>
                        </div>
                    </Group>
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
                        {isLoading && (
                            <Group gap="xs">
                                <Loader size="sm" color="#BDF052" />
                                <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                                    Processing...
                                </Text>
                            </Group>
                        )}
                    </Group>
                </Group>
            </div>

            <ScrollArea style={{ maxHeight: "600px" }}>
                <Table
                    highlightOnHover
                    verticalSpacing="lg"
                    styles={{
                        table: {
                            backgroundColor: "transparent",
                        },
                        thead: {
                            backgroundColor: "#0F0F0F",
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                        },
                        th: {
                            color: "#BDF052",
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            padding: "1.25rem 1.5rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            borderBottom: "2px solid #2D2D2D",
                        },
                        td: {
                            color: "#FFFFFF",
                            padding: "1.25rem 1.5rem",
                            fontSize: "0.9375rem",
                            borderBottom: "1px solid #2D2D2D",
                            verticalAlign: "top",
                        },
                        tbody: {
                            tr: {
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    backgroundColor: "#2A2A2A !important",
                                    transform: "translateY(-1px)",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                                },
                            },
                        },
                    }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Course Details</Table.Th>
                            <Table.Th>Instructor</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>Submitted</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {courses.map((course) => (
                            <Table.Tr key={course.id}>
                                <Table.Td>
                                    <Group gap="md" align="flex-start">
                                        <div
                                            style={{
                                                width: "56px",
                                                height: "56px",
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
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <Text
                                                style={{
                                                    fontWeight: 700,
                                                    color: "#FFFFFF",
                                                    marginBottom: "0.5rem",
                                                    fontSize: "1rem",
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {course.title}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: "0.875rem",
                                                    color: "#9CA3AF",
                                                    lineHeight: 1.5,
                                                    marginBottom: "0.5rem",
                                                }}
                                            >
                                                {course.description.length > 80
                                                    ? `${course.description.substring(0, 80)}...`
                                                    : course.description}
                                            </Text>
                                            <Group gap="xs">
                                                <Badge
                                                    size="sm"
                                                    style={{
                                                        backgroundColor: "#2D2D2D",
                                                        color: "#9CA3AF",
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    {course.course_invite_code}
                                                </Badge>
                                            </Group>
                                        </div>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="sm" align="flex-start">
                                        <Avatar
                                            size="md"
                                            radius="md"
                                            style={{ backgroundColor: "#BDF052" }}
                                        >
                                            <User size={16} color="#0F0F0F" />
                                        </Avatar>
                                        <div>
                                            <Text style={{ color: "#FFFFFF", fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                                                {course.instructor.first_name} {course.instructor.last_name}
                                            </Text>
                                            <Text style={{ color: "#9CA3AF", fontSize: "0.8125rem" }}>
                                                {course.instructor.email}
                                            </Text>
                                        </div>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
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
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="sm" align="flex-start">
                                        <Calendar size={16} color="#9CA3AF" style={{ marginTop: "2px" }} />
                                        <div>
                                            <Text
                                                style={{
                                                    fontSize: "0.875rem",
                                                    color: "#FFFFFF",
                                                    fontWeight: 500,
                                                    marginBottom: "0.25rem",
                                                }}
                                            >
                                                {formatDate(course.created_at).split(',')[0]}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: "0.8125rem",
                                                    color: "#9CA3AF",
                                                }}
                                            >
                                                {formatDate(course.created_at).split(',')[1]?.trim()}
                                            </Text>
                                        </div>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="sm">
                                        <Tooltip label="Approve Course" position="top">
                                            <ActionIcon
                                                size="xl"
                                                variant="filled"
                                                style={{
                                                    backgroundColor: "#10B981",
                                                    color: "#FFFFFF",
                                                    borderRadius: "10px",
                                                }}
                                                onClick={() => onActionClick(course, "approve")}
                                                disabled={isLoading}
                                                styles={{
                                                    root: {
                                                        "&:hover": {
                                                            backgroundColor: "#059669",
                                                            transform: "scale(1.05)",
                                                        },
                                                        transition: "all 0.2s ease",
                                                    },
                                                }}
                                            >
                                                <CheckCircle size={20} />
                                            </ActionIcon>
                                        </Tooltip>
                                        <Tooltip label="Reject Course" position="top">
                                            <ActionIcon
                                                size="xl"
                                                variant="filled"
                                                style={{
                                                    backgroundColor: "#EF4444",
                                                    color: "#FFFFFF",
                                                    borderRadius: "10px",
                                                }}
                                                onClick={() => onActionClick(course, "reject")}
                                                disabled={isLoading}
                                                styles={{
                                                    root: {
                                                        "&:hover": {
                                                            backgroundColor: "#DC2626",
                                                            transform: "scale(1.05)",
                                                        },
                                                        transition: "all 0.2s ease",
                                                    },
                                                }}
                                            >
                                                <XCircle size={20} />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea>

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
                            leftSection={isFetchingNextPage ? <Loader size="sm" /> : <ChevronDown size={16} />}
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
                            {isFetchingNextPage ? "Loading More Courses..." : "Load More Courses"}
                        </Button>
                    </Center>
                </div>
            )}
        </Card>
    );
}
