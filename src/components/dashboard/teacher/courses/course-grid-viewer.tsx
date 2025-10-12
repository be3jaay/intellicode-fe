"use client";
import { Box, Card, Grid, Group, Stack, Text, TextInput, Badge, Image, Loader, Center, Skeleton } from "@mantine/core";
import { Button } from "@/components/ui";
import { Search, Plus, Users, BookOpen, Filter, ChevronDown, AlertCircle } from "lucide-react";
import { useState } from "react";
import { CourseValueResponse } from "@/services/course-service/course-type";

export interface Course {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail?: string;
    students?: number;
    modules?: number;
    lastUpdated?: string;
}

interface CourseGridViewerProps {
    courses: CourseValueResponse[];
    onViewCourse: (course: CourseValueResponse) => void;
    onCreateCourse: () => void;
    isLoading?: boolean;
    isError?: boolean;
    error?: Error | null;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    onLoadMore?: () => void;
}

export function CourseGridViewer({
    courses,
    onViewCourse,
    onCreateCourse,
    isLoading = false,
    isError = false,
    error = null,
    hasNextPage = false,
    isFetchingNextPage = false,
    onLoadMore,
}: CourseGridViewerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["all", ...Array.from(new Set(courses.map(c => c.category)))];

    // Skeleton Card Component
    const CourseCardSkeleton = () => (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
                height: "100%",
                background: "white",
                border: "1px solid #e5e7eb",
            }}
        >
            {/* Thumbnail Skeleton */}
            <Skeleton height={180} radius="md" mb="md" />

            {/* Category Badge Skeleton */}
            <Skeleton height={20} width={80} radius="sm" mb="xs" />

            {/* Title Skeleton */}
            <Skeleton height={24} radius="sm" mb="xs" />
            <Skeleton height={24} width="70%" radius="sm" mb="md" />

            {/* Description Skeleton */}
            <Skeleton height={16} radius="sm" mb={4} />
            <Skeleton height={16} radius="sm" mb="md" />

            {/* Stats Skeleton */}
            <Group gap="xl" mb="md">
                <Skeleton height={16} width={80} radius="sm" />
                <Skeleton height={16} width={80} radius="sm" />
            </Group>

            {/* Button Skeleton */}
            <Skeleton height={36} radius="sm" />
        </Card>
    );

    return (
        <Box>
            {/* Header Section */}
            <Group justify="space-between" mb="xl">
                <Box>
                    <Text size="xl" fw={700} mb={4}>
                        My Courses
                    </Text>
                    <Text size="sm" c="dimmed">
                        Manage and organize your course content
                    </Text>
                </Box>
                <Button
                    variant="primary"
                    leftIcon={<Plus size={18} />}
                    onClick={onCreateCourse}
                    size="md"
                    style={{
                        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                    }}
                >
                    New Course
                </Button>
            </Group>

            {/* Search and Filter Bar */}
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                mb="xl"
                style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(37, 99, 235, 0.1)",
                }}
            >
                <Group gap="md">
                    <TextInput
                        placeholder="Search courses..."
                        leftSection={<Search size={18} />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ flex: 1 }}
                        styles={{
                            input: {
                                borderRadius: 8,
                            },
                        }}
                    />
                    <Group gap="xs">
                        <Filter size={18} color="#64748b" />
                        {categories.map((cat) => (
                            <Badge
                                key={cat}
                                variant={selectedCategory === cat ? "filled" : "light"}
                                color={selectedCategory === cat ? "blue" : "gray"}
                                style={{
                                    cursor: "pointer",
                                    textTransform: "capitalize",
                                    transition: "all 0.2s ease",
                                }}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </Badge>
                        ))}
                    </Group>
                </Group>
            </Card>

            {/* Loading State with Skeleton */}
            {isLoading && courses.length === 0 ? (
                <Grid gutter="lg">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Grid.Col key={`skeleton-${index}`} span={{ base: 12, sm: 6, lg: 4 }}>
                            <CourseCardSkeleton />
                        </Grid.Col>
                    ))}
                </Grid>
            ) : isError ? (
                <Card
                    shadow="sm"
                    padding="xl"
                    radius="md"
                    style={{
                        textAlign: "center",
                        background: "rgba(254, 242, 242, 0.5)",
                        border: "2px dashed #f87171",
                    }}
                >
                    <Stack align="center" gap="md" py="xl">
                        <Box
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <AlertCircle size={36} color="#dc2626" />
                        </Box>
                        <Text size="lg" fw={600} c="red">
                            Failed to load courses
                        </Text>
                        <Text size="sm" c="dimmed" maw={400}>
                            {error?.message || "Something went wrong. Please try again."}
                        </Text>
                    </Stack>
                </Card>
            ) : filteredCourses.length === 0 ? (
                <Card
                    shadow="sm"
                    padding="xl"
                    radius="md"
                    style={{
                        textAlign: "center",
                        background: "rgba(239, 246, 255, 0.5)",
                        border: "2px dashed #cbd5e1",
                    }}
                >
                    <Stack align="center" gap="md" py="xl">
                        <Box
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <BookOpen size={36} color="#2563eb" />
                        </Box>
                        <Text size="lg" fw={600}>
                            No courses found
                        </Text>
                        <Text size="sm" c="dimmed" maw={400}>
                            {searchQuery || selectedCategory !== "all"
                                ? "Try adjusting your search or filter"
                                : "Get started by creating your first course"}
                        </Text>
                        {!searchQuery && selectedCategory === "all" && (
                            <Button
                                variant="primary"
                                leftIcon={<Plus size={18} />}
                                onClick={onCreateCourse}
                                mt="sm"
                            >
                                Create Your First Course
                            </Button>
                        )}
                    </Stack>
                </Card>
            ) : (
                <Grid gutter="lg">
                    {filteredCourses.map((course) => (
                        <Grid.Col key={course.id} span={{ base: 12, sm: 6, lg: 4 }}>
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                style={{
                                    height: "100%",
                                    background: "white",
                                    border: "1px solid #e5e7eb",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                                styles={{
                                    root: {
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: "0 12px 24px rgba(37, 99, 235, 0.15)",
                                            borderColor: "#2563eb",
                                        },
                                    },
                                }}
                            >
                                {/* Thumbnail */}
                                <Box
                                    mb="md"
                                    style={{
                                        height: 180,
                                        borderRadius: 8,
                                        overflow: "hidden",
                                        background: course.thumbnail
                                            ? "transparent"
                                            : "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {course.thumbnail ? (
                                        <Image
                                            src={course.thumbnail}
                                            alt={course.title}
                                            height={180}
                                            fit="cover"
                                        />
                                    ) : (
                                        <BookOpen size={48} color="#2563eb" />
                                    )}
                                </Box>

                                {/* Category Badge */}
                                <Group gap="xs" align="center" justify="space-between">
                                    <Badge
                                        size="sm"
                                        variant="light"
                                        color="blue"
                                        mb="xs"
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        {course.category}
                                    </Badge>
                                    <Badge
                                        size="sm"
                                        variant="light"
                                        color="blue"
                                        mb="xs"
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        Pending
                                    </Badge>
                                </Group>
                                {/* Course Title */}
                                <Text fw={600} size="lg" mb="xs" lineClamp={2}>
                                    {course.title}
                                </Text>

                                {/* Course Description */}
                                <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                                    {course.description}
                                </Text>

                                {/* Course Stats */}
                                <Group gap="xl" mb="md">
                                    <Group gap={6}>
                                        <Users size={16} color="#64748b" />
                                        <Text size="xs" c="dimmed">
                                            {course.students || 0} students
                                        </Text>
                                    </Group>
                                    <Group gap={6}>
                                        <BookOpen size={16} color="#64748b" />
                                        <Text size="xs" c="dimmed">
                                            {course.modules || 0} modules
                                        </Text>
                                    </Group>
                                </Group>

                                {/* View Course Button */}
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={() => onViewCourse(course)}
                                    style={{
                                        borderColor: "#2563eb",
                                        color: "#f3f3f3",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    View Course
                                </Button>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            )}

            {/* Loading More Skeletons */}
            {isFetchingNextPage && (
                <Grid gutter="lg" mt="lg">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Grid.Col key={`skeleton-more-${index}`} span={{ base: 12, sm: 6, lg: 4 }}>
                            <CourseCardSkeleton />
                        </Grid.Col>
                    ))}
                </Grid>
            )}

            {/* Load More Button */}
            {hasNextPage && !isFetchingNextPage && filteredCourses.length > 0 && (
                <Center mt="xl">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onLoadMore}
                        leftIcon={<ChevronDown size={18} />}
                        style={{
                            minWidth: 200,
                            borderColor: "#2563eb",
                            color: "#2563eb",
                            transition: "all 0.2s ease",
                        }}
                    >
                        View More
                    </Button>
                </Center>
            )}
        </Box>
    );
}

