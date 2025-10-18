"use client";

import { Badge } from "@mantine/core";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { UserStatus } from "@/services/user-service/user-management-types";

interface StatusBadgeProps {
    status: UserStatus;
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
}

const statusConfig = {
    active: {
        color: "#10B981",
        backgroundColor: "#064E3B",
        icon: CheckCircle,
        label: "Active",
    },
    suspended: {
        color: "#EF4444",
        backgroundColor: "#7F1D1D",
        icon: XCircle,
        label: "Suspended",
    },
    pending_approval: {
        color: "#F59E0B",
        backgroundColor: "#92400E",
        icon: Clock,
        label: "Pending Approval",
    },
    rejected: {
        color: "#6B7280",
        backgroundColor: "#374151",
        icon: AlertTriangle,
        label: "Rejected",
    },
};

export function StatusBadge({ status, size = 'md', showIcon = true }: StatusBadgeProps) {
    const config = statusConfig[status];
    const Icon = config.icon;

    const sizeConfig = {
        sm: { fontSize: "0.75rem", padding: "0.25rem 0.5rem", iconSize: 12 },
        md: { fontSize: "0.875rem", padding: "0.375rem 0.75rem", iconSize: 14 },
        lg: { fontSize: "1rem", padding: "0.5rem 1rem", iconSize: 16 },
    };

    const currentSize = sizeConfig[size];

    return (
        <Badge
            leftSection={showIcon ? <Icon size={currentSize.iconSize} /> : undefined}
            style={{
                backgroundColor: config.backgroundColor,
                color: config.color,
                fontWeight: 600,
                fontSize: currentSize.fontSize,
                padding: currentSize.padding,
                textTransform: "none",
                border: "none",
            }}
            styles={{
                root: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                },
            }}
        >
            {config.label}
        </Badge>
    );
}

// Helper function to determine user status from user profile
export function getUserStatus(user: {
    is_suspended: boolean;
    is_approved: boolean;
    role: string;
}): UserStatus {
    if (user.is_suspended) {
        return 'suspended';
    }

    if (user.role === 'teacher' && !user.is_approved) {
        return 'pending_approval';
    }

    if (user.role === 'teacher' && user.is_approved === false) {
        return 'rejected';
    }

    return 'active';
}
