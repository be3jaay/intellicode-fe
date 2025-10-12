"use client";
import { Card, Stack, Text, Group } from "@mantine/core";
import { AlertCircle, Inbox } from "lucide-react";
import { Button } from "./button";
import React from "react";

interface StateCardProps {
    variant: "empty" | "error";
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
}

export const StateCard = ({
    variant,
    title,
    description,
    actionLabel,
    onAction,
    icon,
    style,
}: StateCardProps) => {
    const variantStyles = {
        empty: {
            background: "#1d4ed810",
            border: "2px solid #1d4ed8",
            iconColor: "#1d4ed8",
            defaultIcon: <Inbox size={48} />,
        },
        error: {
            background: "#dc262610",
            border: "2px solid #dc2626",
            iconColor: "#dc2626",
            defaultIcon: <AlertCircle size={48} />,
        },
    };

    const currentVariant = variantStyles[variant];
    const displayIcon = icon || currentVariant.defaultIcon;

    return (
        <Card
            shadow="xs"
            padding="xl"
            radius="md"
            withBorder
            style={{
                background: currentVariant.background,
                border: currentVariant.border,
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 2px 12px 0 rgba(40,40,120,0.07)",
                ...style,
            }}
        >
            <Group justify="center" align="center" style={{ minHeight: 240, width: "100%" }}>
                <Stack align="center" gap={16}>
                    <div style={{ color: currentVariant.iconColor }}>
                        {displayIcon}
                    </div>
                    <Text fw={700} size="xl" mb={4} style={{ textAlign: "center" }}>
                        {title}
                    </Text>
                    <Text size="sm" c="dimmed" mb="md" style={{ textAlign: "center", maxWidth: 400 }}>
                        {description}
                    </Text>
                    {actionLabel && onAction && (
                        <Button
                            variant={variant === "error" ? "outline" : "primary"}
                            onClick={onAction}
                        >
                            {actionLabel}
                        </Button>
                    )}
                </Stack>
            </Group>
        </Card>
    );
};

