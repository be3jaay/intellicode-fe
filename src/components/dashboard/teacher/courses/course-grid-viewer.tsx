"use client"
import { Box, Card, Grid, Group, Stack, Text, TextInput, Badge, Image, Center, Skeleton, Paper } from "@mantine/core"
import { Button } from "@/components/ui"
import { Search, Plus, Users, BookOpen, Filter, AlertCircle, ChevronDown } from "lucide-react"
import { useState } from "react"
import type { CourseValueResponse } from "@/services/course-service/course-type"

export interface Course {
    id: string
    title: string
    description: string
    category: string
    thumbnail?: string
    students?: number
    modules?: number
    lastUpdated?: string
}

interface CourseGridViewerProps {
    courses: CourseValueResponse[]
    onViewCourse: (course: CourseValueResponse) => void
    onCreateCourse: () => void
    isLoading?: boolean
    isError?: boolean
    error?: Error | null
    hasNextPage?: boolean
    isFetchingNextPage?: boolean
    onLoadMore?: () => void
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
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("all")

    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const categories = ["all", ...Array.from(new Set(courses.map((c) => c.category)))]

    const renderStatus = (status: "waiting_for_approval" | "approved" | "rejected") => {
        switch (status) {
            case "waiting_for_approval":
                return "Pending"
            case "approved":
                return "Approved"
            case "rejected":
                return "Rejected"
        }
    }

    const CourseCardSkeleton = () => (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
                height: "100%",
                background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
                border: "1px solid rgba(189, 240, 82, 0.15)",
                position: "relative",
                overflow: "hidden",
            }}
        >

            {/* Thumbnail Skeleton */}
            <Skeleton
                height={180}
                radius="md"
                mb="md"
                style={{
                    background: "linear-gradient(90deg, #2a2a2a 0%, #333333 50%, #2a2a2a 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                }}
            />

            {/* Category Badge Skeleton */}
            <Skeleton
                height={22}
                width={90}
                radius="sm"
                mb="xs"
                style={{
                    background: "linear-gradient(90deg, #2a2a2a 0%, #333333 50%, #2a2a2a 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                }}
            />

            {/* Title Skeleton */}
            <Skeleton
                height={24}
                radius="sm"
                mb="xs"
                style={{
                    background: "linear-gradient(90deg, #2a2a2a 0%, #333333 50%, #2a2a2a 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                }}
            />
            <Skeleton
                height={24}
                width="70%"
                radius="sm"
                mb="md"
                style={{
                    background: "linear-gradient(90deg, #2a2a2a 0%, #333333 50%, #2a2a2a 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                }}
            />

            {/* Description Skeleton */}
            <Skeleton
                height={16}
                radius="sm"
                mb={4}
                style={{
                    background: "linear-gradient(90deg, #2a2a2a 0%, #333333 50%, #2a2a2a 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                }}
            />
            <Skeleton
                height={16}
                radius="sm"
                mb="md"
                style={{
                    background: "linear-gradient(90deg, #2a2a2a 0%, #333333 50%, #2a2a2a 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                }}
            />

            {/* Stats Skeleton */}
            <Group gap="xl" mb="md">
                <Skeleton
                    height={16}
                    width={80}
                    radius="sm"
                    style={{
                        background: "linear-gradient(90deg, #2a2a2a 0%, #333333 50%, #2a2a2a 100%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                    }}
                />
                <Skeleton
                    height={16}
                    width={80}
                    radius="sm"
                    style={{
                        background: "linear-gradient(90deg, #2a2a2a 0%, #333333 50%, #2a2a2a 100%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                    }}
                />
            </Group>

            <Skeleton
                height={40}
                radius="sm"
                style={{
                    background: "linear-gradient(90deg, #2a2a2a 0%, #333333 50%, #2a2a2a 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                }}
            />

        </Card>
    )

    return (
        <Box style={{ minHeight: "100vh" }}>
            <Box
                mb="xl"
                style={{
                    background: "linear-gradient(135deg, #1a1a1a 0%, #222222 50%, #1a1a1a 100%)",
                    borderRadius: 16,
                    padding: "32px 28px",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid rgba(189, 240, 82, 0.15)",
                }}
            >

                <Group justify="space-between" style={{ position: "relative", zIndex: 1 }}>
                    <Box>
                        <Text
                            size="32px"
                            fw={700}
                            mb={8}
                            style={{
                                background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            My Courses
                        </Text>
                        <Text size="sm" c="#9ca3af">
                            Manage and organize your course content
                        </Text>
                    </Box>
                    <Button
                        variant="primary"
                        leftIcon={<Plus size={20} />}
                        onClick={onCreateCourse}
                        size="md"
                        style={{
                            background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                            color: "#0a0a0a",
                            fontWeight: 600,
                            padding: "12px 24px",
                            height: 44,
                            fontSize: 15,
                            border: "none",
                            boxShadow: "0 4px 16px rgba(189, 240, 82, 0.3), 0 0 0 1px rgba(189, 240, 82, 0.2)",
                            transition: "all 0.2s ease",
                        }}
                    >
                        New Course
                    </Button>
                </Group>
            </Box>

            <Card
                shadow="sm"
                padding="xl"
                radius="md"
                mb="xl"
                style={{
                    background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
                    border: "1px solid rgba(189, 240, 82, 0.15)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >

                <Stack gap="md" style={{ position: "relative", zIndex: 1 }}>
                    <TextInput
                        placeholder="Search courses by title or description..."
                        leftSection={<Search size={18} color="#bdf052" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="md"
                        styles={{
                            input: {
                                background: "#1a1a1a",
                                border: "1px solid rgba(189, 240, 82, 0.2)",
                                color: "#ffffff",
                                borderRadius: 8,
                                fontSize: 14,
                                transition: "all 0.2s ease",
                                "&:focus": {
                                    borderColor: "#bdf052",
                                    boxShadow: "0 0 0 3px rgba(189, 240, 82, 0.1)",
                                },
                                "&::placeholder": {
                                    color: "#6b7280",
                                },
                            },
                        }}
                    />

                    <Group gap="xs" align="center">
                        <Filter size={18} color="#b3a1ff" />
                        <Text size="sm" c="#9ca3af" fw={500}>
                            Filter:
                        </Text>
                        {categories.map((cat) => (
                            <Badge
                                key={cat}
                                variant={selectedCategory === cat ? "filled" : "light"}
                                size="lg"
                                style={{
                                    cursor: "pointer",
                                    textTransform: "capitalize",
                                    background:
                                        selectedCategory === cat
                                            ? "linear-gradient(135deg, #b3a1ff 0%, #9b87e8 100%)"
                                            : "rgba(179, 161, 255, 0.1)",
                                    color: selectedCategory === cat ? "#0a0a0a" : "#b3a1ff",
                                    border: selectedCategory === cat ? "none" : "1px solid rgba(179, 161, 255, 0.3)",
                                    fontWeight: 600,
                                    padding: "8px 16px",
                                    transition: "all 0.2s ease",
                                }}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </Badge>
                        ))}
                    </Group>
                </Stack>
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
                        background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
                        border: "2px solid rgba(248, 113, 113, 0.3)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            height: 400,
                            background: "radial-gradient(circle, rgba(246, 172, 174, 0.08) 0%, transparent 70%)",
                            filter: "blur(80px)",
                            pointerEvents: "none",
                        }}
                    />

                    <Stack align="center" gap="md" py="xl" style={{ position: "relative", zIndex: 1 }}>
                        <Box
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, rgba(246, 172, 174, 0.2) 0%, rgba(248, 113, 113, 0.2) 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px solid rgba(248, 113, 113, 0.3)",
                            }}
                        >
                            <AlertCircle size={36} color="#f6acae" />
                        </Box>
                        <Text size="lg" fw={600} c="#f6acae">
                            Failed to load courses
                        </Text>
                        <Text size="sm" c="#9ca3af" maw={400}>
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
                        background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
                        border: "2px dashed rgba(189, 240, 82, 0.3)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            height: 400,
                            background: "radial-gradient(circle, rgba(189, 240, 82, 0.08) 0%, transparent 70%)",
                            filter: "blur(80px)",
                            pointerEvents: "none",
                        }}
                    />

                    <Stack align="center" gap="md" py="xl" style={{ position: "relative", zIndex: 1 }}>
                        <Box
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, rgba(189, 240, 82, 0.15) 0%, rgba(163, 215, 66, 0.15) 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px solid rgba(189, 240, 82, 0.3)",
                            }}
                        >
                            <BookOpen size={36} color="#bdf052" />
                        </Box>
                        <Text size="lg" fw={600} c="#e9eeea">
                            No courses found
                        </Text>
                        <Text size="sm" c="#9ca3af" maw={400}>
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
                                style={{
                                    background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                    color: "#0a0a0a",
                                    fontWeight: 600,
                                    padding: "12px 24px",
                                    height: 44,
                                    border: "none",
                                    boxShadow: "0 4px 16px rgba(189, 240, 82, 0.3)",
                                }}
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
                            <Paper
                                shadow="md"
                                radius="md"
                                style={{
                                    background: "#222222",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    overflow: "hidden",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                    height: 430,

                                }}
                                onClick={() => onViewCourse(course)}
                            >

                                <Box style={{
                                    height: 180,
                                    overflow: "hidden",
                                    background: course.thumbnail
                                        ? "transparent"
                                        : "linear-gradient(135deg, rgba(189, 240, 82, 0.5) 0%, rgba(163, 215, 66, 0.5) 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid rgba(189, 240, 82, 0.2)",
                                }}
                                >
                                    {course.thumbnail ? (
                                        <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} height={180} fit="cover" />
                                    ) : (
                                        <BookOpen size={48} color="#bdf052" />
                                    )}
                                </Box>
                                <Box px="lg" pt="xl" pb="md" style={{
                                    background: "linear-gradient(135deg, #1a1a1a 0%, #222222 100%)",
                                }}>
                                    <Group gap="xs" align="center" justify="space-between" mb="md">
                                        <Badge
                                            size="sm"
                                            variant="light"
                                            style={{
                                                background: "rgba(189, 240, 82, 0.15)",
                                                color: "#bdf052",
                                                border: "1px solid rgba(189, 240, 82, 0.3)",
                                                textTransform: "capitalize",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {course.category}
                                        </Badge>
                                        <Badge
                                            size="sm"
                                            variant="light"
                                            style={{
                                                background: "rgba(179, 161, 255, 0.15)",
                                                color: "#b3a1ff",
                                                border: "1px solid rgba(179, 161, 255, 0.3)",
                                                textTransform: "capitalize",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {renderStatus(course.status) || "Pending"}
                                        </Badge>
                                    </Group>

                                    <Text fw={600} c="#bdf052" size="lg" mb="xs" lineClamp={2}>
                                        {course.title}
                                    </Text>

                                    <Text size="sm" c="#d1d5db" mb="md" h={80} lineClamp={2}>
                                        {course.description}
                                    </Text>

                                    <Group gap="xl" mt="xl">
                                        <Group gap={6}>
                                            <Users size={16} color="#9ca3af" />
                                            <Text size="xs" c="#9ca3af">
                                                {course.students || 0} students
                                            </Text>
                                        </Group>
                                        <Group gap={6}>
                                            <BookOpen size={16} color="#9ca3af" />
                                            <Text size="xs" c="#9ca3af">
                                                {course.modules || 0} modules
                                            </Text>
                                        </Group>
                                    </Group>
                                </Box>
                            </Paper>
                        </Grid.Col>
                    ))}
                </Grid>
            )
            }

            {/* Loading More Skeletons */}
            {
                isFetchingNextPage && (
                    <Grid gutter="lg" mt="lg">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Grid.Col key={`skeleton-more-${index}`} span={{ base: 12, sm: 6, lg: 4 }}>
                                <CourseCardSkeleton />
                            </Grid.Col>
                        ))}
                    </Grid>
                )
            }

            {
                hasNextPage && !isFetchingNextPage && filteredCourses.length > 0 && (
                    <Center mt="xl">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={onLoadMore}
                            leftIcon={<ChevronDown size={18} />}
                            style={{
                                minWidth: 200,
                                background: "rgba(179, 161, 255, 0.1)",
                                border: "1px solid rgba(179, 161, 255, 0.3)",
                                color: "#b3a1ff",
                                fontWeight: 600,
                                height: 44,
                                transition: "all 0.2s ease",
                            }}
                        >
                            Load More Courses
                        </Button>
                    </Center>
                )
            }
        </Box >
    )
}
