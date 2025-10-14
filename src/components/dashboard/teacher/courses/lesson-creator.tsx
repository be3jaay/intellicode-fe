"use client"
import {
    Box,
    Group,
    Stack,
    Text,
    ActionIcon,
    Button,
    Paper,
    rem,
} from "@mantine/core"
import {
    IconArrowLeft,
    IconDeviceFloppy,
    IconSparkles,
    IconBook,
    IconPhoto,
    IconVideo,
} from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import type { CourseValueResponse } from "@/services/course-service/course-type"
import {
    ControlledTextInput,
    ControlledTextArea,
    ControlledSelectInput,
} from "@/components/controlled-fields"
import { RichTextEditor } from "@mantine/tiptap"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { Link as TiptapLink } from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Youtube from "@tiptap/extension-youtube"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import Superscript from "@tiptap/extension-superscript"
import SubScript from "@tiptap/extension-subscript"


interface LessonCreatorProps {
    course: CourseValueResponse
    onBack: () => void
}

type LessonFormData = {
    title: string
    description: string
    content: string
    moduleId: string
}

export function LessonCreator({ course, onBack }: LessonCreatorProps) {
    const form = useForm<LessonFormData>({
        defaultValues: {
            title: "",
            description: "",
            content: "",
            moduleId: "",
        },
    })

    const { control, handleSubmit, setValue } = form

    // Initialize Tiptap editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TiptapLink.configure({
                openOnClick: false,
                HTMLAttributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                },
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: "tiptap-image",
                },
            }),
            Youtube.configure({
                controls: true,
                nocookie: true,
                HTMLAttributes: {
                    class: "tiptap-youtube",
                },
            }),
            Highlight,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Superscript,
            SubScript,
        ],
        content: "",
        immediatelyRender: false,
        onUpdate: ({ editor }: any) => {
            const html = editor.getHTML()
            setValue("content", html)
        },
    })

    const onSubmit = (data: LessonFormData) => {
        const content = editor?.getHTML() || ""
        console.log("=== LESSON SUBMISSION ===")
        console.log("Course ID:", course.id)
        console.log("Lesson Data:", {
            ...data,
            content,
        })
        console.log("Lesson details:", JSON.stringify({
            ...data,
            content,
            contentLength: content.length,
        }, null, 2))
    }

    // Handlers for image and video insertion
    const addImage = () => {
        const choice = window.confirm(
            "Click OK to upload an image from your device, or Cancel to enter an image URL"
        )

        if (choice) {
            // Upload from device
            const input = document.createElement("input")
            input.type = "file"
            input.accept = "image/*"
            input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (file && editor) {
                    const reader = new FileReader()
                    reader.onload = (readerEvent) => {
                        const base64 = readerEvent.target?.result as string
                        editor.chain().focus().setImage({ src: base64 }).run()
                    }
                    reader.readAsDataURL(file)
                }
            }
            input.click()
        } else {
            // Enter URL
            const url = window.prompt("Enter image URL:")
            if (url && editor) {
                editor.chain().focus().setImage({ src: url }).run()
            }
        }
    }

    const addYoutube = () => {
        const url = window.prompt("Enter YouTube URL:")
        if (url && editor) {
            editor.chain().focus().setYoutubeVideo({ src: url }).run()
        }
    }

    // Mock modules - replace with actual modules from your API
    const modules = [
        { value: "1", label: "Module 1: Introduction to Programming" },
        { value: "2", label: "Module 2: Variables and Data Types" },
        { value: "3", label: "Module 3: Control Flow" },
    ]

    return (
        <Box
            style={{
                minHeight: "100vh",
            }}
        >
            <Box>
                {/* Header Section */}
                <Paper
                    shadow="xl"
                    p="xl"
                    radius="lg"
                    mb="xl"
                    style={{
                        background: "linear-gradient(135deg, #4fd1c5 0%, #38b2ac 50%, #319795 100%)",
                        position: "relative",
                        overflow: "hidden",
                        border: "none",
                    }}
                >
                    {/* Decorative elements */}
                    <Box
                        style={{
                            position: "absolute",
                            top: -50,
                            right: -50,
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.1)",
                            filter: "blur(40px)",
                        }}
                    />
                    <Box
                        style={{
                            position: "absolute",
                            bottom: -30,
                            left: -30,
                            width: 150,
                            height: 150,
                            borderRadius: "50%",
                            background: "rgba(0, 0, 0, 0.1)",
                            filter: "blur(30px)",
                        }}
                    />

                    <Group justify="space-between" align="flex-start" style={{ position: "relative", zIndex: 1 }}>
                        <Group align="center" gap="md">
                            <ActionIcon
                                variant="white"
                                size="xl"
                                radius="md"
                                onClick={onBack}
                                style={{
                                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                                    transition: "all 0.2s ease",
                                }}
                                styles={{
                                    root: {
                                        "&:hover": {
                                            transform: "translateX(-4px)",
                                        },
                                    },
                                }}
                            >
                                <IconArrowLeft size={24} stroke={2} color="#222222" />
                            </ActionIcon>

                            <Box>
                                <Group gap="xs" mb={4}>
                                    <IconBook size={28} color="#fff" />
                                    <Text
                                        size="xl"
                                        fw={700}
                                        style={{
                                            color: "#fff",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        Create Lesson
                                    </Text>
                                </Group>
                                <Text
                                    size="sm"
                                    fw={500}
                                    style={{
                                        color: "#f3f3f3",
                                    }}
                                >
                                    Adding lesson to <strong>"{course.title}"</strong>
                                </Text>
                            </Box>
                        </Group>
                    </Group>
                </Paper>

                {/* Main Form */}
                <Paper
                    shadow="md"
                    p="xl"
                    radius="lg"
                    style={{
                        background: "#222222",
                        border: "1px solid rgba(79, 209, 197, 0.2)",
                    }}
                >
                    <Stack gap="lg">
                        {/* Title */}
                        <ControlledTextInput
                            control={control}
                            name="title"
                            label="Lesson Title"
                            placeholder="e.g., Understanding Variables in JavaScript"
                            leftSection={<IconBook size={18} />}
                            isRequired
                            labelColor="#4fd1c5"
                            borderColor="#4fd1c5"
                        />

                        {/* Description */}
                        <ControlledTextArea
                            control={control}
                            name="description"
                            label="Description"
                            placeholder="Provide a brief overview of what students will learn in this lesson..."
                            isRequired
                            labelColor="#38b2ac"
                            borderColor="#38b2ac"
                            minRows={4}
                        />

                        {/* Module Selection */}
                        <ControlledSelectInput
                            control={control}
                            name="moduleId"
                            label="Select Module"
                            placeholder="Choose a module for this lesson"
                            options={modules}
                            isRequired
                            labelColor="#4fd1c5"
                            borderColor="#4fd1c5"
                        />

                        {/* Rich Text Content Editor */}
                        <Box>
                            <Text size="sm" fw={600} mb={8} c="#4fd1c5">
                                Lesson Content
                            </Text>
                            <RichTextEditor
                                editor={editor}
                                styles={{
                                    root: {
                                        border: "1px solid #4fd1c5",
                                        borderRadius: rem(8),
                                        background: "#1a1a1a",
                                    },
                                    toolbar: {
                                        background: "#1a1a1a",
                                        borderBottom: "1px solid #4fd1c5",
                                        borderRadius: `${rem(8)} ${rem(8)} 0 0`,
                                    },
                                    content: {
                                        background: "#1a1a1a",
                                        color: "#ffffff",
                                        minHeight: rem(400),
                                        "& .ProseMirror": {
                                            minHeight: rem(400),
                                            padding: rem(16),
                                            color: "#ffffff",
                                            fontSize: rem(15),
                                            "& p": {
                                                color: "#ffffff",
                                            },
                                            "& h1, & h2, & h3, & h4, & h5, & h6": {
                                                color: "#ffffff",
                                            },
                                            "& ul, & ol": {
                                                color: "#ffffff",
                                            },
                                            "& li": {
                                                color: "#ffffff",
                                            },
                                            "& img": {
                                                maxWidth: "100%",
                                                height: "auto",
                                                borderRadius: rem(8),
                                                margin: "16px 0",
                                            },
                                            "& iframe": {
                                                maxWidth: "100%",
                                                aspectRatio: "16/9",
                                                borderRadius: rem(8),
                                                margin: "16px 0",
                                            },
                                        },
                                        "& .ProseMirror-focused": {
                                            outline: "none",
                                        },
                                    },
                                    controlsGroup: {
                                        background: "transparent",
                                    },
                                }}
                            >
                                <RichTextEditor.Toolbar>
                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Bold />
                                        <RichTextEditor.Italic />
                                        <RichTextEditor.Underline />
                                        <RichTextEditor.Strikethrough />
                                        <RichTextEditor.ClearFormatting />
                                        <RichTextEditor.Highlight />
                                        <RichTextEditor.Code />
                                        <RichTextEditor.SourceCode />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.H1 />
                                        <RichTextEditor.H2 />
                                        <RichTextEditor.H3 />
                                        <RichTextEditor.H4 />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Blockquote />
                                        <RichTextEditor.Hr />
                                        <RichTextEditor.BulletList />
                                        <RichTextEditor.OrderedList />
                                        <RichTextEditor.Subscript />
                                        <RichTextEditor.Superscript />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Link />
                                        <RichTextEditor.Unlink />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Control
                                            onClick={addImage}
                                            aria-label="Insert image"
                                            title="Insert image"
                                        >
                                            <IconPhoto size={16} />
                                        </RichTextEditor.Control>
                                        <RichTextEditor.Control
                                            onClick={addYoutube}
                                            aria-label="Insert YouTube video"
                                            title="Insert YouTube video"
                                        >
                                            <IconVideo size={16} />
                                        </RichTextEditor.Control>
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.AlignLeft />
                                        <RichTextEditor.AlignCenter />
                                        <RichTextEditor.AlignJustify />
                                        <RichTextEditor.AlignRight />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Undo />
                                        <RichTextEditor.Redo />
                                    </RichTextEditor.ControlsGroup>
                                </RichTextEditor.Toolbar>

                                <RichTextEditor.Content />
                            </RichTextEditor>
                        </Box>
                    </Stack>
                </Paper>

                {/* Submit Button */}
                <Paper
                    shadow="lg"
                    p="xl"
                    radius="lg"
                    mt="xl"
                    style={{
                        background: "linear-gradient(135deg, rgba(79, 209, 197, 0.1) 0%, rgba(56, 178, 172, 0.1) 100%)",
                        border: "2px solid rgba(79, 209, 197, 0.3)",
                    }}
                >
                    <Group justify="space-between" align="center">
                        <Box>
                            <Group gap="xs" mb={6}>
                                <IconSparkles size={20} color="#4fd1c5" />
                                <Text size="md" fw={600} c="#4fd1c5">
                                    Ready to create your lesson?
                                </Text>
                            </Group>
                            <Text size="sm" c="dimmed">
                                Students will be able to view this lesson content
                            </Text>
                        </Box>
                        <Button
                            leftSection={<IconDeviceFloppy size={20} />}
                            size="lg"
                            onClick={handleSubmit(onSubmit)}
                            radius="md"
                            styles={{
                                root: {
                                    background: "linear-gradient(135deg, #4fd1c5 0%, #38b2ac 100%)",
                                    color: "#222222",
                                    fontWeight: 700,
                                    fontSize: rem(16),
                                    padding: "0 32px",
                                    height: rem(48),
                                    border: "none",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 12px 24px rgba(79, 209, 197, 0.4)",
                                    },
                                },
                            }}
                        >
                            Create Lesson
                        </Button>
                    </Group>
                </Paper>
            </Box>
        </Box>
    )
}

