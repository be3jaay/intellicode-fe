"use client";

import { Card, Group, Text, Avatar, Button, Stack, Badge } from "@mantine/core";
import { User, Mail, Calendar, Hash, BookOpen, Shield, GraduationCap } from "lucide-react";
import { UserProfile, UserProfileCardProps } from "@/services/user-service/user-management-types";
import { StatusBadge, getUserStatus } from "./status-badge";

export function UserProfileCard({
    user,
    showActions = false,
    onAction,
    compact = false
}: UserProfileCardProps) {
    const status = getUserStatus(user);
    const fullName = `${user.first_name} ${user.last_name}`.trim();
    const roleIcon = user.role === 'student' ? GraduationCap :
        user.role === 'teacher' ? BookOpen : Shield;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (compact) {
        return (
            <Card
                style={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #2D2D2D",
                    borderRadius: "8px",
                    padding: "1rem",
                }}
            >
                <Group justify="space-between" align="center">
                    <Group gap="sm">
                        <Avatar
                            size="md"
                            radius="md"
                            style={{ backgroundColor: "#BDF052" }}
                        >
                            <User size={16} color="#0F0F0F" />
                        </Avatar>
                        <div>
                            <Text style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "0.875rem" }}>
                                {fullName}
                            </Text>
                            <Text style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                                {user.email}
                            </Text>
                        </div>
                    </Group>
                    <StatusBadge status={status} size="sm" />
                </Group>
            </Card>
        );
    }

    return (
        <Card
            style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #2D2D2D",
                borderRadius: "12px",
                padding: "1.5rem",
            }}
        >
            <Stack gap="md">
                {/* Header with Avatar and Basic Info */}
                <Group justify="space-between" align="flex-start">
                    <Group gap="md">
                        <Avatar
                            size="lg"
                            radius="md"
                            style={{ backgroundColor: "#BDF052" }}
                        >
                            <User size={20} color="#0F0F0F" />
                        </Avatar>
                        <div>
                            <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1.125rem", marginBottom: "0.25rem" }}>
                                {fullName}
                            </Text>
                            <Group gap="xs" align="center" style={{ marginBottom: "0.5rem" }}>
                                <Badge
                                    leftSection={roleIcon({ size: 12 })}
                                    style={{
                                        backgroundColor: "#2D2D2D",
                                        color: "#BDF052",
                                        textTransform: "capitalize",
                                        fontWeight: 600,
                                    }}
                                >
                                    {user.role}
                                </Badge>
                                <StatusBadge status={status} size="sm" />
                            </Group>
                            <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                                {user.email}
                            </Text>
                        </div>
                    </Group>
                </Group>

                {/* User Details */}
                <Stack gap="sm">
                    {user.student_number && (
                        <Group gap="xs">
                            <Hash size={16} color="#9CA3AF" />
                            <Text style={{ color: "#E9EEEA", fontSize: "0.875rem" }}>
                                Student Number: {user.student_number}
                            </Text>
                        </Group>
                    )}

                    {user.section && (
                        <Group gap="xs">
                            <BookOpen size={16} color="#9CA3AF" />
                            <Text style={{ color: "#E9EEEA", fontSize: "0.875rem" }}>
                                Section: {user.section}
                            </Text>
                        </Group>
                    )}

                    <Group gap="xs">
                        <Calendar size={16} color="#9CA3AF" />
                        <Text style={{ color: "#E9EEEA", fontSize: "0.875rem" }}>
                            Joined: {formatDate(user.created_at)}
                        </Text>
                    </Group>

                    {/* Status-specific information */}
                    {user.is_suspended && user.suspension_reason && (
                        <div
                            style={{
                                padding: "0.75rem",
                                backgroundColor: "#7F1D1D",
                                borderRadius: "6px",
                                border: "1px solid #EF4444",
                            }}
                        >
                            <Text style={{ color: "#FCA5A5", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                                Suspension Reason:
                            </Text>
                            <Text style={{ color: "#FCA5A5", fontSize: "0.8125rem" }}>
                                {user.suspension_reason}
                            </Text>
                        </div>
                    )}

                    {user.role === 'teacher' && user.approval_reason && (
                        <div
                            style={{
                                padding: "0.75rem",
                                backgroundColor: user.is_approved ? "#064E3B" : "#92400E",
                                borderRadius: "6px",
                                border: `1px solid ${user.is_approved ? "#10B981" : "#F59E0B"}`,
                            }}
                        >
                            <Text style={{
                                color: user.is_approved ? "#A7F3D0" : "#FDE68A",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                marginBottom: "0.25rem"
                            }}>
                                {user.is_approved ? "Approval Reason:" : "Rejection Reason:"}
                            </Text>
                            <Text style={{
                                color: user.is_approved ? "#A7F3D0" : "#FDE68A",
                                fontSize: "0.8125rem"
                            }}>
                                {user.approval_reason}
                            </Text>
                        </div>
                    )}
                </Stack>

                {/* Action Buttons */}
                {showActions && onAction && (
                    <Group gap="sm" style={{ marginTop: "0.5rem" }}>
                        <Button
                            size="sm"
                            variant="outline"
                            style={{
                                borderColor: "#6B7280",
                                color: "#9CA3AF",
                            }}
                            onClick={() => onAction('view', user)}
                        >
                            View Details
                        </Button>

                        {user.role === 'teacher' && !user.is_approved && (
                            <Button
                                size="sm"
                                style={{
                                    backgroundColor: "#10B981",
                                    color: "#FFFFFF",
                                }}
                                onClick={() => onAction('approve', user)}
                            >
                                Approve
                            </Button>
                        )}

                        {!user.is_suspended ? (
                            <Button
                                size="sm"
                                variant="outline"
                                style={{
                                    borderColor: "#EF4444",
                                    color: "#EF4444",
                                }}
                                onClick={() => onAction('suspend', user)}
                            >
                                Suspend
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                style={{
                                    backgroundColor: "#10B981",
                                    color: "#FFFFFF",
                                }}
                                onClick={() => onAction('unsuspend', user)}
                            >
                                Unsuspend
                            </Button>
                        )}
                    </Group>
                )}
            </Stack>
        </Card>
    );
}
