"use client";

import { Group, Text, Button, Card } from "@mantine/core";
import { BookOpen, TrendingUp, Clock, RefreshCw } from "lucide-react";

interface CourseManagementHeaderProps {
    totalCourses: number;
    filteredCourses: number;
    onRefresh: () => void;
    isLoading: boolean;
}

export function CourseManagementHeader({
    totalCourses,
    filteredCourses,
    onRefresh,
    isLoading,
}: CourseManagementHeaderProps) {
    return (
        <Card
            style={{
                background: "linear-gradient(135deg, #BDF052 0%, #A8D944 100%)",
                border: "none",
                borderRadius: "16px",
                marginBottom: "2rem",
                position: "relative",
                overflow: "hidden",
            }}
            padding="xl"
        >
            <div
                style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "200px",
                    height: "200px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-30px",
                    left: "-30px",
                    width: "150px",
                    height: "150px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "50%",
                }}
            />
            <Group justify="space-between" align="center" style={{ position: "relative", zIndex: 1 }}>
                <Group>
                    <div
                        style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "16px",
                            backgroundColor: "#0F0F0F",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <BookOpen size={28} color="#BDF052" />
                    </div>
                    <div>
                        <Text
                            style={{
                                fontSize: "2.5rem",
                                fontWeight: 800,
                                marginBottom: "0.5rem",
                                color: "#0F0F0F",
                                lineHeight: 1.2,
                            }}
                        >
                            Course Management
                        </Text>
                        <Group gap="lg">
                            <Group gap="xs">
                                <TrendingUp size={16} color="#0F0F0F" />
                                <Text style={{ fontSize: "1rem", color: "#0F0F0F", fontWeight: 500 }}>
                                    {totalCourses} Pending Reviews
                                </Text>
                            </Group>
                            <Group gap="xs">
                                <Clock size={16} color="#0F0F0F" />
                                <Text style={{ fontSize: "1rem", color: "#0F0F0F", fontWeight: 500 }}>
                                    {filteredCourses} Filtered
                                </Text>
                            </Group>
                        </Group>
                    </div>
                </Group>
                <Button
                    leftSection={<RefreshCw size={16} />}
                    onClick={onRefresh}
                    disabled={isLoading}
                    style={{
                        backgroundColor: "#0F0F0F",
                        color: "#BDF052",
                        border: "2px solid #0F0F0F",
                    }}
                    styles={{
                        root: {
                            "&:hover": {
                                backgroundColor: "#1A1A1A",
                                transform: "translateY(-2px)",
                            },
                            transition: "all 0.2s ease",
                        },
                    }}
                >
                    Refresh
                </Button>
            </Group>
        </Card>
    );
}
