"use client";

import { Stack, Text, Button, Card, Center } from "@mantine/core";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
    error: Error | null;
    onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#222222" }}>
            <main style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1rem" }}>
                <Card
                    style={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #2D2D2D",
                        borderRadius: "12px",
                    }}
                    padding="xl"
                >
                    <Stack align="center" gap="lg">
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                backgroundColor: "#7F1D1D",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <AlertCircle size={32} color="#EF4444" />
                        </div>
                        <Stack align="center" gap="sm">
                            <Text style={{ color: "#FFFFFF", fontSize: "1.25rem", fontWeight: 600 }}>
                                Unable to Load Courses
                            </Text>
                            <Text style={{ color: "#9CA3AF", fontSize: "0.875rem", textAlign: "center" }}>
                                {error?.message || "Failed to load course approvals. Please check your connection and try again."}
                            </Text>
                        </Stack>
                        <Button
                            leftSection={<RefreshCw size={16} />}
                            onClick={onRetry}
                            style={{
                                backgroundColor: "#BDF052",
                                color: "#0F0F0F",
                            }}
                            styles={{
                                root: {
                                    "&:hover": {
                                        backgroundColor: "#A8D944",
                                    },
                                },
                            }}
                        >
                            Try Again
                        </Button>
                    </Stack>
                </Card>
            </main>
        </div>
    );
}
