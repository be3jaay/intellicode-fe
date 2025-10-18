"use client";

import { Group, Text, Button, Card, TextInput, Select } from "@mantine/core";
import { Search, Filter } from "lucide-react";

interface SearchAndFilterControlsProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    categoryFilter: string | null;
    onCategoryFilterChange: (category: string | null) => void;
    categories: string[];
    filteredCount: number;
    totalCount: number;
    onClearFilters: () => void;
}

export function SearchAndFilterControls({
    searchQuery,
    onSearchChange,
    categoryFilter,
    onCategoryFilterChange,
    categories,
    filteredCount,
    totalCount,
    onClearFilters,
}: SearchAndFilterControlsProps) {
    const hasActiveFilters = searchQuery || categoryFilter;

    return (
        <Card
            style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #2D2D2D",
                borderRadius: "12px",
                marginBottom: "1.5rem",
            }}
            padding="lg"
        >
            <Group justify="space-between" align="flex-end" gap="md">
                <Group gap="md" style={{ flex: 1 }}>
                    <TextInput
                        placeholder="Search courses, instructors..."
                        leftSection={<Search size={16} color="#9CA3AF" />}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        style={{ flex: 1, maxWidth: "400px" }}
                        styles={{
                            input: {
                                backgroundColor: "#0F0F0F",
                                border: "1px solid #2D2D2D",
                                color: "#FFFFFF",
                                "&:focus": {
                                    borderColor: "#BDF052",
                                },
                            },
                        }}
                    />
                    <Select
                        placeholder="Filter by category"
                        leftSection={<Filter size={16} color="#9CA3AF" />}
                        data={categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))}
                        value={categoryFilter}
                        onChange={onCategoryFilterChange}
                        clearable
                        style={{ minWidth: "180px" }}
                        styles={{
                            input: {
                                backgroundColor: "#0F0F0F",
                                border: "1px solid #2D2D2D",
                                color: "#FFFFFF",
                                "&:focus": {
                                    borderColor: "#BDF052",
                                },
                            },
                            dropdown: {
                                backgroundColor: "#1A1A1A",
                                border: "1px solid #2D2D2D",
                            },
                        }}
                    />
                </Group>
                <Group gap="xs">
                    <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                        {filteredCount} of {totalCount} courses
                    </Text>
                    {hasActiveFilters && (
                        <Button
                            variant="subtle"
                            size="xs"
                            onClick={onClearFilters}
                            style={{ color: "#9CA3AF" }}
                        >
                            Clear filters
                        </Button>
                    )}
                </Group>
            </Group>
        </Card>
    );
}
