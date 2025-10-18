"use client";

import { Center, Stack, Text, Button } from "@mantine/core";
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
    totalCourses: number;
    hasActiveFilters: boolean;
    onClearFilters: () => void;
}

export function EmptyState({ totalCourses, hasActiveFilters, onClearFilters }: EmptyStateProps) {
    const isNoCourses = totalCourses === 0;
    const isFilteredEmpty = totalCourses > 0 && hasActiveFilters;

    return (
        <Center style={{ padding: "4rem 2rem" }}>
            <Stack align="center" gap="lg">
                <div
                    style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        backgroundColor: "#2D2D2D",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    <BookOpen size={48} color="#6B7280" />
                    <div
                        style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor: "#F59E0B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: "#FFFFFF", fontSize: "12px", fontWeight: 600 }}>
                            {isNoCourses ? "0" : "!"}
                        </Text>
                    </div>
                </div>
                <Stack align="center" gap="sm">
                    <Text style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: 600 }}>
                        {isNoCourses ? "All Caught Up!" : "No Matching Courses"}
                    </Text>
                    <Text style={{ color: "#9CA3AF", fontSize: "1rem", textAlign: "center", maxWidth: "400px" }}>
                        {isNoCourses
                            ? "All course approvals have been reviewed. New submissions will appear here."
                            : "No courses match your current search and filter criteria. Try adjusting your filters."
                        }
                    </Text>
                </Stack>
                {isFilteredEmpty && (
                    <Button
                        variant="outline"
                        onClick={onClearFilters}
                        style={{
                            borderColor: "#BDF052",
                            color: "#BDF052",
                        }}
                        styles={{
                            root: {
                                "&:hover": {
                                    backgroundColor: "rgba(189, 240, 82, 0.1)",
                                },
                            },
                        }}
                    >
                        Clear Filters
                    </Button>
                )}
            </Stack>
        </Center>
    );
}
