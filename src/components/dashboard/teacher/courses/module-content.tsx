"use client"
import { useState, useEffect } from "react"
import {
    Box,
    Card,
    Group,
    Stack,
    Text,
    Badge,
    ActionIcon,
    Button,
    Loader,
    Center,
    Progress
} from "@mantine/core"
import {
    Edit,
    Trash2,
    BookOpen,
    Activity,
    Calendar,
    Clock,
    Plus,
    ChevronRight
} from "lucide-react"
import { useGetModulesList } from "@/hooks/query-hooks/module-query"
import { Module, ModuleListQueryParams } from "@/services/module-service/module.type"
import { format } from "date-fns"

interface ModuleContentProps {
    courseId: string
}

export function ModuleContent({ courseId }: ModuleContentProps) {
    const [offset, setOffset] = useState(0)
    const [limit] = useState(10)
    const [hasMore, setHasMore] = useState(false)

    const queryParams: ModuleListQueryParams = {
        offset,
        limit,
    }

    const { data, isLoading, error, refetch } = useGetModulesList(courseId, queryParams)

    useEffect(() => {
        if (data?.data) {
            setHasMore(data.data.hasNext)
        }
    }, [data])

    const handleViewMore = () => {
        setOffset(prev => prev + limit)
    }

    if (isLoading && offset === 0) {
        return (
            <Center py="xl">
                <Stack align="center" gap="md">
                    <Loader size="lg" color="#bdf052" />
                    <Text c="dimmed">Loading modules...</Text>
                </Stack>
            </Center>
        )
    }

    if (error) {
        return (
            <Card
                padding="xl"
                radius="md"
                style={{
                    background: "rgba(246, 172, 174, 0.1)",
                    border: "1px solid rgba(246, 172, 174, 0.3)",
                    textAlign: "center",
                }}
            >
                <Text c="#f6acae">Failed to load modules. Please try again.</Text>
                <Button
                    mt="md"
                    size="sm"
                    onClick={() => refetch()}
                    style={{
                        background: "rgba(246, 172, 174, 0.2)",
                        color: "#f6acae",
                        border: "1px solid rgba(246, 172, 174, 0.3)",
                    }}
                >
                    Retry
                </Button>
            </Card>
        )
    }

    const modules = data?.data?.modules || []
    const totalModules = data?.data?.total || 0

    return (
        <Stack gap="md">
            {/* Modules Header */}
            <Group justify="space-between">
                <Text size="sm" c="dimmed">
                    {totalModules} modules total
                </Text>
            </Group>

            {/* Modules List */}
            {modules.length === 0 ? (
                <Card
                    padding="xl"
                    radius="md"
                    style={{
                        background: "rgba(34, 34, 34, 0.4)",
                        border: "1px solid rgba(189, 240, 82, 0.1)",
                        textAlign: "center",
                    }}
                >
                    <Text c="dimmed">No modules found. Create your first module to get started.</Text>
                </Card>
            ) : (
                <Stack gap="sm">
                    {modules.map((module: Module, index: number) => (
                        <Card
                            key={module.id}
                            padding="md"
                            radius="md"
                            style={{
                                background: "rgba(34, 34, 34, 0.6)",
                                border: "1px solid rgba(189, 240, 82, 0.1)",
                                transition: "all 0.2s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.4)"
                                e.currentTarget.style.background = "rgba(189, 240, 82, 0.05)"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(189, 240, 82, 0.1)"
                                e.currentTarget.style.background = "rgba(34, 34, 34, 0.6)"
                            }}
                        >
                            <Group justify="space-between" wrap="nowrap">
                                <Group gap="md" style={{ flex: 1 }}>
                                    <Box
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 8,
                                            background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#1a1a1a",
                                            fontWeight: 700,
                                            fontSize: 16,
                                        }}
                                    >
                                        {index + 1}
                                    </Box>
                                    <Box style={{ flex: 1 }}>
                                        <Group gap="sm" mb={4}>
                                            <Text fw={600} size="sm" c="#e9eeea">
                                                {module.title}
                                            </Text>
                                            <Badge
                                                size="sm"
                                                style={{
                                                    background: "rgba(189, 240, 82, 0.2)",
                                                    color: "#bdf052",
                                                    border: "1px solid rgba(189, 240, 82, 0.3)",
                                                }}
                                            >
                                                Module {index + 1}
                                            </Badge>
                                        </Group>
                                        <Text size="xs" c="dimmed" mb={8} lineClamp={2}>
                                            {module.description}
                                        </Text>
                                        <Group gap="md">
                                            <Group gap={4}>
                                                <BookOpen size={12} color="#9ca3af" />
                                                <Text size="xs" c="dimmed">
                                                    {module.lessons_count} lessons
                                                </Text>
                                            </Group>
                                            <Group gap={4}>
                                                <Activity size={12} color="#9ca3af" />
                                                <Text size="xs" c="dimmed">
                                                    {module.activities_count} activities
                                                </Text>
                                            </Group>
                                            <Group gap={4}>
                                                <Calendar size={12} color="#9ca3af" />
                                                <Text size="xs" c="dimmed">
                                                    Created: {format(new Date(module.created_at), "MMM dd, yyyy")}
                                                </Text>
                                            </Group>
                                        </Group>
                                    </Box>
                                </Group>
                                <Group gap="xs">
                                    <ActionIcon
                                        variant="light"
                                        size="md"
                                        style={{
                                            background: "rgba(179, 161, 255, 0.15)",
                                            color: "#b3a1ff",
                                            border: "1px solid rgba(179, 161, 255, 0.3)",
                                        }}
                                    >
                                        <ChevronRight size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        variant="light"
                                        size="md"
                                        style={{
                                            background: "rgba(189, 240, 82, 0.15)",
                                            color: "#bdf052",
                                            border: "1px solid rgba(189, 240, 82, 0.3)",
                                        }}
                                    >
                                        <Edit size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        variant="light"
                                        size="md"
                                        style={{
                                            background: "rgba(246, 172, 174, 0.15)",
                                            color: "#f6acae",
                                            border: "1px solid rgba(246, 172, 174, 0.3)",
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </ActionIcon>
                                </Group>
                            </Group>
                        </Card>
                    ))}

                    {/* View More Button */}
                    {hasMore && (
                        <Center mt="md">
                            <Button
                                variant="outline"
                                onClick={handleViewMore}
                                loading={isLoading}
                                style={{
                                    borderColor: "rgba(189, 240, 82, 0.3)",
                                    color: "#bdf052",
                                    "&:hover": {
                                        background: "rgba(189, 240, 82, 0.1)",
                                    },
                                }}
                            >
                                View More Modules
                            </Button>
                        </Center>
                    )}
                </Stack>
            )}
        </Stack>
    )
}
