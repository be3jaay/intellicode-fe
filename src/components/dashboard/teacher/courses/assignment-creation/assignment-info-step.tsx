"use client"
import { Box, Group, Stack, Text, Radio, Paper, Button, rem, NumberInput } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { IconSparkles, IconTrophy, IconCalendar, IconFileText, IconUpload, IconHelp, IconCode } from "@tabler/icons-react"
import { type Control, type UseFormSetValue, type UseFormWatch } from "react-hook-form"
import {
    ControlledTextInput,
    ControlledTextArea,
    ControlledSelectInput,
} from "@/components/controlled-fields"
import type { AssignmentFormData, AssignmentType } from "./types"
import { useState } from "react"

interface AssignmentInfoStepProps {
    control: Control<AssignmentFormData>
    setValue: UseFormSetValue<AssignmentFormData>
    watch: UseFormWatch<AssignmentFormData>
    onNext: () => void
}

const modules = [
    { value: "1", label: "Module 1: Introduction to Programming" },
    { value: "2", label: "Module 2: Variables and Data Types" },
    { value: "3", label: "Module 3: Control Flow" },
]

export function AssignmentInfoStep({ control, setValue, watch, onNext }: AssignmentInfoStepProps) {
    const [dueDate, setDueDate] = useState<Date | null>(null)
    const assignmentType = watch("assignmentType")

    const handleNext = () => {
        const title = watch("title")
        const description = watch("description")
        const moduleId = watch("moduleId")
        const points = watch("points")

        if (!title?.trim()) {
            alert("Please enter an assignment title")
            return
        }
        if (!description?.trim()) {
            alert("Please enter a description")
            return
        }
        if (!moduleId) {
            alert("Please select a module")
            return
        }
        if (!points || points < 1) {
            alert("Please enter valid points (at least 1)")
            return
        }
        onNext()
    }

    const handleTypeChange = (value: AssignmentType) => {
        setValue("assignmentType", value)

        // Clear type-specific data when switching types
        if (value === "file_upload") {
            // Clear quiz and code sandbox data
            setValue("questions", [])
            setValue("editingIndex", null)
            setValue("isAddingNew", false)
            setValue("starterCode", "")
            setValue("testCases", "")
        } else if (value === "quiz_form") {
            // Clear file upload and code sandbox data
            setValue("attachment", null)
            setValue("starterCode", "")
            setValue("testCases", "")
        } else if (value === "code_sandbox") {
            // Clear file upload and quiz data
            setValue("attachment", null)
            setValue("questions", [])
            setValue("editingIndex", null)
            setValue("isAddingNew", false)
        }
    }

    return (
        <Stack gap="lg" mt="xl">
            {/* Title */}
            <ControlledTextInput
                control={control}
                name="title"
                label="Assignment Title"
                placeholder="e.g., Build a Calculator App"
                leftSection={<IconFileText size={18} />}
                isRequired
            />

            {/* Description */}
            <ControlledTextArea
                control={control}
                name="description"
                label="Description"
                placeholder="Provide instructions and details for the assignment..."
                isRequired
                minRows={6}
            />

            {/* Module Selection */}
            <ControlledSelectInput
                control={control}
                name="moduleId"
                label="Select Module"
                placeholder="Choose a module for this assignment"
                options={modules}
                isRequired
            />

            {/* Assignment Type */}
            <Box>
                <Text size="sm" fw={600} mb={8} c="#bdf052">
                    Assignment Type
                </Text>
                <Radio.Group
                    value={assignmentType}
                    onChange={(value) => handleTypeChange(value as AssignmentType)}
                >
                    <Stack gap="sm">
                        <Paper
                            p="md"
                            radius="md"
                            style={{
                                background:
                                    assignmentType === "file_upload" ? "rgba(135, 206, 235, 0.1)" : "#2a2a2a",
                                border:
                                    assignmentType === "file_upload"
                                        ? "2px solid #87ceeb"
                                        : "1px solid rgba(255, 255, 255, 0.1)",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                            onClick={() => handleTypeChange("file_upload")}
                        >
                            <Group>
                                <Radio value="file_upload" color="cyan" />
                                <Box style={{ flex: 1 }}>
                                    <Group gap="xs" mb={4}>
                                        <IconUpload size={18} color="#87ceeb" />
                                        <Text fw={600} c="#87ceeb">
                                            File Upload
                                        </Text>
                                    </Group>
                                    <Text size="xs" c="dimmed">
                                        Students submit files (documents, images, PDFs, etc.)
                                    </Text>
                                </Box>
                            </Group>
                        </Paper>

                        <Paper
                            p="md"
                            radius="md"
                            style={{
                                background:
                                    assignmentType === "quiz_form" ? "rgba(255, 165, 0, 0.1)" : "#2a2a2a",
                                border:
                                    assignmentType === "quiz_form"
                                        ? "2px solid #ffa500"
                                        : "1px solid rgba(255, 255, 255, 0.1)",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                            onClick={() => handleTypeChange("quiz_form")}
                        >
                            <Group>
                                <Radio value="quiz_form" color="orange" />
                                <Box style={{ flex: 1 }}>
                                    <Group gap="xs" mb={4}>
                                        <IconHelp size={18} color="#ffa500" />
                                        <Text fw={600} c="#ffa500">
                                            Quiz Form
                                        </Text>
                                    </Group>
                                    <Text size="xs" c="dimmed">
                                        Create questions for students to answer online
                                    </Text>
                                </Box>
                            </Group>
                        </Paper>

                        <Paper
                            p="md"
                            radius="md"
                            style={{
                                background:
                                    assignmentType === "code_sandbox" ? "rgba(52, 211, 153, 0.1)" : "#2a2a2a",
                                border:
                                    assignmentType === "code_sandbox"
                                        ? "2px solid #34d399"
                                        : "1px solid rgba(255, 255, 255, 0.1)",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                            onClick={() => handleTypeChange("code_sandbox")}
                        >
                            <Group>
                                <Radio value="code_sandbox" color="green" />
                                <Box style={{ flex: 1 }}>
                                    <Group gap="xs" mb={4}>
                                        <IconCode size={18} color="#34d399" />
                                        <Text fw={600} c="#34d399">
                                            Code Sandbox
                                        </Text>
                                    </Group>
                                    <Text size="xs" c="dimmed">
                                        Students write and test code with predefined test cases
                                    </Text>
                                </Box>
                            </Group>
                        </Paper>
                    </Stack>
                </Radio.Group>
            </Box>

            {/* Points and Due Date */}
            <Group grow align="flex-start">
                <NumberInput
                    label="Points"
                    placeholder="100"
                    required
                    size="md"
                    min={0}
                    max={1000}
                    leftSection={<IconTrophy size={18} />}
                    value={watch("points")}
                    onChange={(value) => setValue("points", Number(value) || 0)}
                    styles={{
                        label: {
                            color: "#ffd700",
                            fontWeight: 600,
                            marginBottom: 8,
                        },
                        input: {
                            background: "#1a1a1a",
                            color: "#ffffff",
                            fontSize: rem(15),
                            borderColor: "#bdf052",
                            "&:focus": {
                                borderColor: "#ffd700",
                            },
                            "&::placeholder": {
                                color: "rgba(255, 255, 255, 0.4)",
                            },
                        },
                        control: {
                            color: "#fff",
                        }
                    }}
                />

                <Box>
                    <Text size="sm" fw={600} mb={8} c="#87ceeb">
                        Due Date
                    </Text>
                    <DateTimePicker
                        placeholder="Select date and time"
                        value={dueDate}
                        onChange={(value) => {
                            const date = typeof value === 'string' ? new Date(value) : value
                            setDueDate(date)
                            setValue("dueDate", date)
                        }}
                        size="md"
                        leftSection={<IconCalendar size={18} />}
                        styles={{
                            input: {
                                background: "#1a1a1a",
                                color: "#ffffff",
                                fontSize: rem(15),
                                borderColor: "#bdf052",
                                "&:focus": {
                                    borderColor: "#bdf052",
                                },
                            },
                        }}
                    />
                </Box>
            </Group>

            <Group justify="flex-end" mt="xl">
                <Button
                    onClick={handleNext}
                    size="lg"
                    radius="md"
                    styles={{
                        root: {
                            background: "linear-gradient(135deg, #9585e6 0%, #8573d9 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            padding: "0 32px",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(149, 133, 230, 0.4)",
                            },
                        },
                    }}
                >
                    Next: Configure Assignment
                </Button>
            </Group>
        </Stack>
    )
}

