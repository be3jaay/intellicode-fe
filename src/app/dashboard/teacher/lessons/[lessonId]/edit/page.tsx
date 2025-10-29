"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Container,
    Paper,
    Title,
    TextInput,
    Textarea,
    Button,
    Group,
    Stack,
    Select,
    NumberInput,
    Switch,
    MultiSelect,
    Loader,
    Center,
    Text,
    Card,
    Breadcrumbs,
    Anchor,
} from "@mantine/core";
import { ArrowLeft, Save, BookOpen } from "lucide-react";
import { useFetchLesson, useUpdateLesson } from "@/hooks/query-hooks/lesson-detail-query";
import { CustomRichTextEditor } from "@/components/dashboard/teacher/courses/components/rich-text-editor";

interface LessonFormData {
    title: string;
    description: string;
    content: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    estimated_duration: number;
    order_index: number;
    is_published: boolean;
    tags: string[];
}

export default function EditLessonPage() {
    const params = useParams();
    const router = useRouter();
    const lessonId = params.lessonId as string;

    const { data, isLoading, isError, error } = useFetchLesson(lessonId);
    const { mutate: updateLesson, isPending: isUpdating } = useUpdateLesson();

    const [formData, setFormData] = useState<LessonFormData>({
        title: "",
        description: "",
        content: "",
        difficulty: "beginner",
        estimated_duration: 0,
        order_index: 0,
        is_published: false,
        tags: [],
    });

    const [errors, setErrors] = useState<Partial<Record<keyof LessonFormData, string>>>({});
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        if (data?.data) {
            setFormData({
                title: data.data.title,
                description: data.data.description,
                content: data.data.content,
                difficulty: data.data.difficulty,
                estimated_duration: data.data.estimated_duration,
                order_index: data.data.order_index,
                is_published: data.data.is_published,
                tags: data.data.tags,
            });
        }
    }, [data]);

    const validate = () => {
        const newErrors: Partial<Record<keyof LessonFormData, string>> = {};
        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }
        if (!formData.content.trim()) {
            newErrors.content = "Content is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        updateLesson(
            {
                lessonId,
                data: formData,
            },
            {
                onSuccess: () => {
                    router.back();
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#222222" }}>
                <Container size="xl" py="xl">
                    <Center style={{ height: "60vh" }}>
                        <Stack align="center" gap="md">
                            <Loader size="lg" color="#BDF052" />
                            <Text style={{ color: "#9CA3AF" }}>Loading lesson...</Text>
                        </Stack>
                    </Center>
                </Container>
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#222222" }}>
                <Container size="xl" py="xl">
                    <Card
                        style={{
                            backgroundColor: "#1A1A1A",
                            border: "1px solid #EF4444",
                            borderRadius: "12px",
                            padding: "3rem",
                            textAlign: "center",
                        }}
                    >
                        <Text style={{ color: "#EF4444", fontSize: "1.125rem", marginBottom: "1rem" }}>
                            Failed to load lesson
                        </Text>
                        <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                            {error?.message || "An error occurred"}
                        </Text>
                        <Button
                            mt="xl"
                            onClick={() => router.back()}
                            style={{
                                backgroundColor: "#BDF052",
                                color: "#0F0F0F",
                            }}
                        >
                            Go Back
                        </Button>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#222222" }}>
            <Container size="xl" py="xl">
                <Stack gap="xl">
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        styles={{
                            root: { color: "#9CA3AF" },
                            separator: { color: "#6B7280" },
                        }}
                    >
                        <Anchor
                            onClick={() => router.push("/dashboard/teacher")}
                            style={{ color: "#9CA3AF", textDecoration: "none" }}
                        >
                            Dashboard
                        </Anchor>
                        <Anchor
                            onClick={() => router.back()}
                            style={{ color: "#9CA3AF", textDecoration: "none" }}
                        >
                            Courses
                        </Anchor>
                        <Text style={{ color: "#BDF052" }}>Edit Lesson</Text>
                    </Breadcrumbs>

                    {/* Header */}
                    <Group justify="space-between" align="center">
                        <Group gap="md">
                            <Button
                                variant="subtle"
                                leftSection={<ArrowLeft size={20} />}
                                onClick={() => router.back()}
                                style={{
                                    color: "#9CA3AF",
                                }}
                            >
                                Back
                            </Button>
                            <div>
                                <Group gap="sm">
                                    <BookOpen size={24} color="#BDF052" />
                                    <Title
                                        order={2}
                                        style={{
                                            color: "#FFFFFF",
                                            fontSize: "1.75rem",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Edit Lesson
                                    </Title>
                                </Group>
                                <Text
                                    style={{
                                        color: "#9CA3AF",
                                        fontSize: "0.875rem",
                                        marginTop: "0.25rem",
                                    }}
                                >
                                    Update lesson details and content
                                </Text>
                            </div>
                        </Group>
                    </Group>

                    {/* Form */}
                    <Paper
                        style={{
                            backgroundColor: "#1A1A1A",
                            border: "1px solid #2D2D2D",
                            borderRadius: "12px",
                            padding: "2rem",
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Stack gap="xl">
                                {/* Title */}
                                <TextInput
                                    label="Lesson Title"
                                    placeholder="Enter lesson title"
                                    required
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    error={errors.title}
                                    styles={{
                                        label: {
                                            color: "#FFFFFF",
                                            fontWeight: 600,
                                            marginBottom: "0.5rem",
                                        },
                                        input: {
                                            backgroundColor: "#0F0F0F",
                                            border: "1px solid #2D2D2D",
                                            color: "#FFFFFF",
                                            "&:focus": {
                                                borderColor: "#BDF052",
                                            },
                                        },
                                        error: {
                                            color: "#EF4444",
                                        },
                                    }}
                                />

                                {/* Description */}
                                <Textarea
                                    label="Lesson Description"
                                    placeholder="Enter lesson description"
                                    required
                                    minRows={3}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    error={errors.description}
                                    styles={{
                                        label: {
                                            color: "#FFFFFF",
                                            fontWeight: 600,
                                            marginBottom: "0.5rem",
                                        },
                                        input: {
                                            backgroundColor: "#0F0F0F",
                                            border: "1px solid #2D2D2D",
                                            color: "#FFFFFF",
                                            "&:focus": {
                                                borderColor: "#BDF052",
                                            },
                                        },
                                        error: {
                                            color: "#EF4444",
                                        },
                                    }}
                                />

                                {/* Content Editor */}
                                <div>
                                    <CustomRichTextEditor
                                        content={formData.content}
                                        onChange={(value) =>
                                            setFormData({ ...formData, content: value })
                                        }
                                        onAddLink={() => { }}
                                    />
                                    {errors.content && (
                                        <Text
                                            style={{
                                                color: "#EF4444",
                                                fontSize: "0.875rem",
                                                marginTop: "0.25rem",
                                            }}
                                        >
                                            {errors.content}
                                        </Text>
                                    )}
                                </div>

                                {/* Row 1: Difficulty and Duration */}
                                <Group grow>
                                    <Select
                                        label="Difficulty Level"
                                        placeholder="Select difficulty"
                                        data={[
                                            { value: "beginner", label: "Beginner" },
                                            { value: "intermediate", label: "Intermediate" },
                                            { value: "advanced", label: "Advanced" },
                                        ]}
                                        value={formData.difficulty}
                                        onChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                difficulty: value as "beginner" | "intermediate" | "advanced",
                                            })
                                        }
                                        styles={{
                                            label: {
                                                color: "#FFFFFF",
                                                fontWeight: 600,
                                                marginBottom: "0.5rem",
                                            },
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

                                    <NumberInput
                                        label="Estimated Duration (minutes)"
                                        placeholder="Enter duration"
                                        min={0}
                                        value={formData.estimated_duration}
                                        onChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                estimated_duration: typeof value === "number" ? value : 0,
                                            })
                                        }
                                        styles={{
                                            label: {
                                                color: "#FFFFFF",
                                                fontWeight: 600,
                                                marginBottom: "0.5rem",
                                            },
                                            input: {
                                                backgroundColor: "#0F0F0F",
                                                border: "1px solid #2D2D2D",
                                                color: "#FFFFFF",
                                                "&:focus": {
                                                    borderColor: "#BDF052",
                                                },
                                            },
                                            control: {
                                                color: "#FFFFFF",
                                                borderColor: "#2D2D2D",
                                            },
                                        }}
                                    />
                                </Group>

                                {/* Row 2: Order Index */}
                                <NumberInput
                                    label="Order Index"
                                    placeholder="Enter lesson order"
                                    required
                                    min={0}
                                    value={formData.order_index}
                                    onChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            order_index: typeof value === "number" ? value : 0,
                                        })
                                    }
                                    styles={{
                                        label: {
                                            color: "#FFFFFF",
                                            fontWeight: 600,
                                            marginBottom: "0.5rem",
                                        },
                                        input: {
                                            backgroundColor: "#0F0F0F",
                                            border: "1px solid #2D2D2D",
                                            color: "#FFFFFF",
                                            "&:focus": {
                                                borderColor: "#BDF052",
                                            },
                                        },
                                        control: {
                                            color: "#FFFFFF",
                                            borderColor: "#2D2D2D",
                                        },
                                    }}
                                />

                                {/* Tags */}
                                <MultiSelect
                                    label="Tags"
                                    placeholder="Select or create tags"
                                    data={formData.tags}
                                    value={formData.tags}
                                    onChange={(value) => setFormData({ ...formData, tags: value })}
                                    searchable
                                    styles={{
                                        label: {
                                            color: "#FFFFFF",
                                            fontWeight: 600,
                                            marginBottom: "0.5rem",
                                        },
                                        input: {
                                            backgroundColor: "#0F0F0F",
                                            border: "1px solid #2D2D2D",
                                            color: "#FFFFFF",
                                            "&:focus": {
                                                borderColor: "#BDF052",
                                            },
                                        },
                                        pill: {
                                            backgroundColor: "#BDF052",
                                            color: "#0F0F0F",
                                        },
                                    }}
                                />

                                {/* Published Switch */}
                                <Switch
                                    label="Published"
                                    description="Make this lesson visible to students"
                                    checked={formData.is_published}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            is_published: e.currentTarget.checked,
                                        })
                                    }
                                    styles={{
                                        label: {
                                            color: "#FFFFFF",
                                            fontWeight: 600,
                                        },
                                        description: {
                                            color: "#9CA3AF",
                                        },
                                        track: {
                                            backgroundColor: formData.is_published ? "#BDF052" : "#2D2D2D",
                                        },
                                    }}
                                />

                                {/* Action Buttons */}
                                <Group justify="flex-end" gap="md" mt="lg">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.back()}
                                        disabled={isUpdating}
                                        style={{
                                            borderColor: "#2D2D2D",
                                            color: "#9CA3AF",
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        loading={isUpdating}
                                        leftSection={<Save size={18} />}
                                        style={{
                                            backgroundColor: "#BDF052",
                                            color: "#0F0F0F",
                                            fontWeight: 600,
                                        }}
                                        styles={{
                                            root: {
                                                "&:hover": {
                                                    backgroundColor: "#A8D944",
                                                },
                                            },
                                        }}
                                    >
                                        Save Changes
                                    </Button>
                                </Group>
                            </Stack>
                        </form>
                    </Paper>
                </Stack>
            </Container>
        </div>
    );
}

