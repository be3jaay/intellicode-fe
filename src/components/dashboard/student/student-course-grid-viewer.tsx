"use client";
import {
  Box,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Badge,
  Image,
  Center,
  Skeleton,
} from "@mantine/core";
import { Button } from "@/components/ui";
import {
  Search,
  Users,
  BookOpen,
  Filter,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { Enrollment } from "@/services/course-service/course-type";

interface StudentCourseGridViewerProps {
  enrollments: Enrollment[];
  onViewCourse: (enrollment: Enrollment) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

export function StudentCourseGridViewer({
  enrollments,
  onViewCourse,
  isLoading = false,
  isError = false,
  error = null,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
}: StudentCourseGridViewerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      enrollment.course.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      enrollment.course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...Array.from(new Set(enrollments.map((e) => e.course.category))),
  ];

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
        <Skeleton height={16} width={100} radius="sm" />
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
            Continue your learning journey
          </Text>
        </Box>
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
          border: "1px solid rgba(189, 240, 82, 0.2)",
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
      {isLoading && enrollments.length === 0 ? (
        <Grid gutter="lg">
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid.Col
              key={`skeleton-${index}`}
              span={{ base: 12, sm: 6, lg: 4 }}
            >
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
      ) : filteredEnrollments.length === 0 ? (
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
                background: "linear-gradient(135deg, #d9f7ba 0%, #c5f09b 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen size={36} color="#8bc232" />
            </Box>
            <Text size="lg" fw={600}>
              No courses found
            </Text>
            <Text size="sm" c="dimmed" maw={400}>
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your search or filter"
                : "You haven't enrolled in any courses yet. Ask your instructor for an invitation link."}
            </Text>
          </Stack>
        </Card>
      ) : (
        <Grid gutter="lg">
          {filteredEnrollments.map((enrollment) => (
            <Grid.Col key={enrollment.id} span={{ base: 12, sm: 6, lg: 4 }}>
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
                      boxShadow: "0 12px 24px rgba(189, 240, 82, 0.18)",
                      borderColor: "#8bc232",
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
                    background: enrollment.course.thumbnail
                      ? "transparent"
                      : "linear-gradient(135deg, #d9f7ba 0%, #c5f09b 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {enrollment.course.thumbnail ? (
                    <Image
                      src={enrollment.course.thumbnail}
                      alt={enrollment.course.title}
                      height={180}
                      fit="cover"
                    />
                  ) : (
                    <BookOpen size={48} color="#8bc232" />
                  )}
                </Box>

                {/* Category Badge & Status */}
                <Group gap="xs" align="center" justify="space-between" mb="xs">
                  <Badge
                    size="sm"
                    variant="light"
                    color="blue"
                    style={{ textTransform: "capitalize" }}
                  >
                    {enrollment.course.category}
                  </Badge>
                  <Badge
                    size="sm"
                    variant="light"
                    color={enrollment.status === "active" ? "green" : "gray"}
                    style={{ textTransform: "capitalize" }}
                  >
                    {enrollment.status}
                  </Badge>
                </Group>

                {/* Course Title */}
                <Text fw={600} size="lg" mb="xs" lineClamp={2}>
                  {enrollment.course.title}
                </Text>

                {/* Course Description */}
                <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                  {enrollment.course.description}
                </Text>

                {/* Instructor Info */}
                <Group gap={8} mb="md">
                  <Users size={16} color="#64748b" />
                  <Text size="xs" c="dimmed">
                    {enrollment.course.instructor.first_name}{" "}
                    {enrollment.course.instructor.last_name}
                  </Text>
                </Group>

                {/* View Course Button */}
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => onViewCourse(enrollment)}
                  style={{
                    borderColor: "#8bc232",
                    color: "#f3f3f3",
                    transition: "all 0.2s ease",
                  }}
                >
                  Continue Learning
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
            <Grid.Col
              key={`skeleton-more-${index}`}
              span={{ base: 12, sm: 6, lg: 4 }}
            >
              <CourseCardSkeleton />
            </Grid.Col>
          ))}
        </Grid>
      )}

      {/* Load More Button */}
      {hasNextPage && !isFetchingNextPage && filteredEnrollments.length > 0 && (
        <Center mt="xl">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            leftIcon={<ChevronDown size={18} />}
            style={{
              minWidth: 200,
              borderColor: "#8bc232",
              color: "#8bc232",
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
