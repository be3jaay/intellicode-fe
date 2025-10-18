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
import { UserX, UserCheck, User, AlertTriangle } from "lucide-react";
import { UserProfile, SuspendUserRequest } from "@/services/user-service/user-management-types";
import { StatusBadge, getUserStatus } from "@/components/ui/status-badge";

interface SuspendUserModalProps {
    user: UserProfile | null;
    opened: boolean;
    onClose: () => void;
    onConfirm: (data: SuspendUserRequest) => void;
    isLoading: boolean;
}

export function SuspendUserModal({
    user,
    opened,
    onClose,
    onConfirm,
    isLoading,
}: SuspendUserModalProps) {
    const [isSuspended, setIsSuspended] = useState(false);
    const [reason, setReason] = useState("");

    if (!user) return null;

    const status = getUserStatus(user);
    const fullName = `${user.first_name} ${user.last_name}`.trim();
    const isCurrentlySuspended = user.is_suspended;

    const handleSubmit = () => {
        onConfirm({
            isSuspended,
            reason: reason.trim() || undefined,
        });
    };

    const handleClose = () => {
        setIsSuspended(false);
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
                        background: isSuspended
                            ? "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                            : "linear-gradient(135deg, #10B981 0%, #059669 100%)",
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
                                {isSuspended ? <UserX size={28} color="#FFFFFF" /> : <UserCheck size={28} color="#FFFFFF" />}
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
                                    {isSuspended ? "Suspend User" : "Unsuspend User"}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: "1rem",
                                        color: "rgba(255, 255, 255, 0.9)",
                                        maxWidth: "400px",
                                    }}
                                >
                                    {isSuspended
                                        ? "Are you sure you want to suspend this user? They will lose access to the platform."
                                        : "Are you sure you want to unsuspend this user? They will regain access to the platform."
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
                                    <User size={20} color="#0F0F0F" />
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
                                            style={{
                                                backgroundColor: "#2D2D2D",
                                                color: "#BDF052",
                                                textTransform: "capitalize",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {user.role}
                                        </Badge>
                                        <StatusBadge status={status} size="md" />
                                    </Group>
                                </div>
                            </Group>

                            {/* Current Status */}
                            {isCurrentlySuspended && user.suspension_reason && (
                                <div
                                    style={{
                                        padding: "1rem",
                                        backgroundColor: "#7F1D1D",
                                        borderRadius: "8px",
                                        border: "1px solid #EF4444",
                                    }}
                                >
                                    <Group gap="xs" style={{ marginBottom: "0.5rem" }}>
                                        <AlertTriangle size={16} color="#FCA5A5" />
                                        <Text style={{ color: "#FCA5A5", fontWeight: 600 }}>
                                            Current Suspension Reason:
                                        </Text>
                                    </Group>
                                    <Text style={{ color: "#FCA5A5", fontSize: "0.875rem" }}>
                                        {user.suspension_reason}
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
                                        {isSuspended ? "Suspend User" : "Unsuspend User"}
                                    </Text>
                                    <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                                        {isSuspended
                                            ? "This will prevent the user from accessing the platform"
                                            : "This will restore the user's access to the platform"
                                        }
                                    </Text>
                                </div>
                                <Switch
                                    size="lg"
                                    checked={isSuspended}
                                    onChange={(e) => setIsSuspended(e.currentTarget.checked)}
                                    styles={{
                                        track: {
                                            backgroundColor: isSuspended ? "#EF4444" : "#10B981",
                                        },
                                    }}
                                />
                            </Group>

                            {isSuspended && (
                                <Textarea
                                    label="Suspension Reason"
                                    placeholder="Enter the reason for suspending this user..."
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
                                                borderColor: "#EF4444",
                                            },
                                        },
                                    }}
                                />
                            )}
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
                                leftSection={isLoading ? <Loader size="sm" /> : (isSuspended ? <UserX size={18} /> : <UserCheck size={18} />)}
                                size="lg"
                                style={{
                                    backgroundColor: isSuspended ? "#EF4444" : "#10B981",
                                    color: "#FFFFFF",
                                    borderRadius: "12px",
                                    padding: "0.75rem 2rem",
                                    fontWeight: 600,
                                }}
                                styles={{
                                    root: {
                                        "&:hover": {
                                            backgroundColor: isSuspended ? "#DC2626" : "#059669",
                                            transform: "translateY(-2px)",
                                            boxShadow: isSuspended
                                                ? "0 8px 25px rgba(239, 68, 68, 0.3)"
                                                : "0 8px 25px rgba(16, 185, 129, 0.3)",
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
                                    : isSuspended
                                        ? "Suspend User"
                                        : "Unsuspend User"}
                            </Button>
                        </Group>
                    </Stack>
                </div>
            </div>
        </Modal>
    );
}
