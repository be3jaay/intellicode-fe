"use client";

import { useState } from "react";
import {
    Modal,
    Text,
    Button,
    Group,
    Stack,
    Textarea,
    Switch,
    Card,
    Avatar,
    Badge,
    Loader,
} from "@mantine/core";
import { UserCheck, UserX, User, BookOpen, AlertTriangle } from "lucide-react";
import { UserProfile, ApproveInstructorRequest } from "@/services/user-service/user-management-types";
import { StatusBadge, getUserStatus } from "@/components/ui/status-badge";

interface ApproveInstructorModalProps {
    user: UserProfile | null;
    opened: boolean;
    onClose: () => void;
    onConfirm: (data: ApproveInstructorRequest) => void;
    isLoading: boolean;
}

export function ApproveInstructorModal({
    user,
    opened,
    onClose,
    onConfirm,
    isLoading,
}: ApproveInstructorModalProps) {
    const [isApproved, setIsApproved] = useState(true);
    const [reason, setReason] = useState("");

    if (!user) return null;

    const status = getUserStatus(user);
    const fullName = `${user.first_name} ${user.last_name}`.trim();
    const isCurrentlyApproved = user.is_approved;

    const handleSubmit = () => {
        onConfirm({
            isApproved,
            reason: reason.trim() || undefined,
        });
    };

    const handleClose = () => {
        setIsApproved(true);
        setReason("");
        onClose();
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
                },
                header: {
                    display: "none",
                },
                body: {
                    padding: 0,
                },
            }}
        >
            <div style={{ position: "relative" }}>
                {/* Header with gradient background */}
                <div
                    style={{
                        background: isApproved
                            ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                            : "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                        padding: "2rem",
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

                    <Group justify="space-between" align="center" style={{ position: "relative", zIndex: 1 }}>
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
                                {isApproved ? <UserCheck size={28} color="#FFFFFF" /> : <UserX size={28} color="#FFFFFF" />}
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
                                    {isApproved ? "Approve Instructor" : "Reject Instructor"}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: "1rem",
                                        color: "rgba(255, 255, 255, 0.9)",
                                        maxWidth: "400px",
                                    }}
                                >
                                    {isApproved
                                        ? "Are you sure you want to approve this instructor? They will gain access to teaching features."
                                        : "Are you sure you want to reject this instructor? They will not be able to access teaching features."
                                    }
                                </Text>
                            </div>
                        </Group>
                        {isLoading && (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <Loader size="sm" color="#FFFFFF" />
                                <Text style={{ color: "#FFFFFF", fontSize: "0.875rem" }}>
                                    Processing...
                                </Text>
                            </div>
                        )}
                    </Group>
                </div>

                {/* User Details Section */}
                <div style={{ padding: "2rem" }}>
                    <Card
                        style={{
                            backgroundColor: "#1A1A1A",
                            border: "1px solid #2D2D2D",
                            borderRadius: "12px",
                            marginBottom: "2rem",
                        }}
                        padding="xl"
                    >
                        <Stack gap="lg">
                            {/* User Header */}
                            <Group gap="md" align="flex-start">
                                <Avatar
                                    size="lg"
                                    radius="md"
                                    style={{ backgroundColor: "#BDF052" }}
                                >
                                    <BookOpen size={20} color="#0F0F0F" />
                                </Avatar>
                                <div style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: "1.5rem",
                                            fontWeight: 700,
                                            color: "#FFFFFF",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        {fullName}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "1rem",
                                            color: "#9CA3AF",
                                            marginBottom: "1rem",
                                        }}
                                    >
                                        {user.email}
                                    </Text>
                                    <Group gap="md">
                                        <Badge
                                            leftSection={<BookOpen size={12} />}
                                            style={{
                                                backgroundColor: "#2D2D2D",
                                                color: "#BDF052",
                                                textTransform: "capitalize",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Instructor
                                        </Badge>
                                        <StatusBadge status={status} size="md" />
                                    </Group>
                                </div>
                            </Group>

                            {/* Current Status */}
                            {user.approval_reason && (
                                <div
                                    style={{
                                        padding: "1rem",
                                        backgroundColor: isCurrentlyApproved ? "#064E3B" : "#92400E",
                                        borderRadius: "8px",
                                        border: `1px solid ${isCurrentlyApproved ? "#10B981" : "#F59E0B"}`,
                                    }}
                                >
                                    <Group gap="xs" style={{ marginBottom: "0.5rem" }}>
                                        <AlertTriangle size={16} color={isCurrentlyApproved ? "#A7F3D0" : "#FDE68A"} />
                                        <Text style={{
                                            color: isCurrentlyApproved ? "#A7F3D0" : "#FDE68A",
                                            fontWeight: 600
                                        }}>
                                            {isCurrentlyApproved ? "Previous Approval Reason:" : "Previous Rejection Reason:"}
                                        </Text>
                                    </Group>
                                    <Text style={{
                                        color: isCurrentlyApproved ? "#A7F3D0" : "#FDE68A",
                                        fontSize: "0.875rem"
                                    }}>
                                        {user.approval_reason}
                                    </Text>
                                </div>
                            )}
                        </Stack>
                    </Card>

                    {/* Action Controls */}
                    <Stack gap="lg">
                        <div
                            style={{
                                padding: "1.5rem",
                                backgroundColor: "#1A1A1A",
                                borderRadius: "12px",
                                border: "1px solid #2D2D2D",
                            }}
                        >
                            <Group justify="space-between" align="center" style={{ marginBottom: "1rem" }}>
                                <div>
                                    <Text
                                        style={{
                                            fontSize: "1.125rem",
                                            fontWeight: 600,
                                            color: "#FFFFFF",
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        {isApproved ? "Approve Instructor" : "Reject Instructor"}
                                    </Text>
                                    <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                                        {isApproved
                                            ? "This will grant the instructor access to teaching features"
                                            : "This will deny the instructor access to teaching features"
                                        }
                                    </Text>
                                </div>
                                <Switch
                                    size="lg"
                                    checked={isApproved}
                                    onChange={(e) => setIsApproved(e.currentTarget.checked)}
                                    styles={{
                                        track: {
                                            backgroundColor: isApproved ? "#10B981" : "#EF4444",
                                        },
                                    }}
                                />
                            </Group>

                            <Textarea
                                label={isApproved ? "Approval Reason" : "Rejection Reason"}
                                placeholder={`Enter the reason for ${isApproved ? 'approving' : 'rejecting'} this instructor...`}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                minRows={3}
                                maxRows={6}
                                styles={{
                                    label: {
                                        color: "#FFFFFF",
                                        fontWeight: 600,
                                        marginBottom: "0.5rem",
                                    },
                                    input: {
                                        backgroundColor: "#0F0F0F",
                                        border: "1px solid #2D2D2D",
                                        color: "#FFFFFF",
                                        "&:focus": {
                                            borderColor: isApproved ? "#10B981" : "#EF4444",
                                        },
                                    },
                                }}
                            />
                        </div>

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
                                onClick={handleSubmit}
                                disabled={isLoading}
                                leftSection={isLoading ? <Loader size="sm" /> : (isApproved ? <UserCheck size={18} /> : <UserX size={18} />)}
                                size="lg"
                                style={{
                                    backgroundColor: isApproved ? "#10B981" : "#EF4444",
                                    color: "#FFFFFF",
                                    borderRadius: "12px",
                                    padding: "0.75rem 2rem",
                                    fontWeight: 600,
                                }}
                                styles={{
                                    root: {
                                        "&:hover": {
                                            backgroundColor: isApproved ? "#059669" : "#DC2626",
                                            transform: "translateY(-2px)",
                                            boxShadow: isApproved
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
                                    : isApproved
                                        ? "Approve Instructor"
                                        : "Reject Instructor"}
                            </Button>
                        </Group>
                    </Stack>
                </div>
            </div>
        </Modal>
    );
}
