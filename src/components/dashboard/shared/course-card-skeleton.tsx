import { Card, Skeleton, Stack, Group, Box } from "@mantine/core"

export function CourseCardSkeleton() {
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
                background: "rgba(34, 34, 34, 0.6)",
                border: "1px solid rgba(189, 240, 82, 0.1)",
                height: "100%",
            }}
        >
            <Stack gap="md">
                {/* Course Image Skeleton */}
                <Skeleton height={120} radius="md" />

                {/* Course Title Skeleton */}
                <Skeleton height={20} width="80%" radius="sm" />

                {/* Course Description Skeleton */}
                <Skeleton height={16} width="100%" radius="sm" />
                <Skeleton height={16} width="70%" radius="sm" />

                {/* Progress Bar Skeleton */}
                <Box>
                    <Skeleton height={8} width="100%" radius="md" mb="xs" />
                    <Skeleton height={12} width="40%" radius="sm" />
                </Box>

                {/* Last Activity Skeleton */}
                <Skeleton height={14} width="60%" radius="sm" />
            </Stack>
        </Card>
    )
}

