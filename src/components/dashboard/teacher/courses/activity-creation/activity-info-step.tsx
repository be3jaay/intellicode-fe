"use client"
import { Box, Group, Stack, Text, Select, Radio, Paper, Button, rem } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { IconSparkles, IconTrophy, IconCalendar, IconHelp, IconCode } from "@tabler/icons-react"
import { type Control, type UseFormSetValue, type UseFormWatch } from "react-hook-form"
import {
    ControlledTextInput,
    ControlledTextArea,
    ControlledSelectInput,
    ControlledNumberInput,
} from "@/components/controlled-fields"
import type { ActivityFormData, ActivityType, Difficulty } from "./types"
import { useState } from "react"

interface ActivityInfoStepProps {
    control: Control<ActivityFormData>
    setValue: UseFormSetValue<ActivityFormData>
    watch: UseFormWatch<ActivityFormData>
    onNext: () => void
}

const modules = [
    { value: "1", label: "Module 1: Introduction to Programming" },
    { value: "2", label: "Module 2: Variables and Data Types" },
    { value: "3", label: "Module 3: Control Flow" },
]

export function ActivityInfoStep({ control, setValue, watch, onNext }: ActivityInfoStepProps) {
    const [dueDate, setDueDate] = useState<Date | null>(null)
    const activityType = watch("activityType")
    const difficulty = watch("difficulty")

    const handleNext = () => {
        const title = watch("title")
        const instructions = watch("instructions")
        const moduleId = watch("moduleId")

        if (!title?.trim()) {
            alert("Please enter an activity title")
            return
        }
        if (!instructions?.trim()) {
            alert("Please enter instructions")
            return
        }
        if (!moduleId) {
            alert("Please select a module")
            return
        }
        onNext()
    }

    return (
        <Stack gap="lg" mt="xl">
            {/* Title */}
            <ControlledTextInput
                control={control}
                name="title"
                label="Activity Title"
                placeholder="e.g., Python Basics Quiz"
                leftSection={<IconSparkles size={18} />}
                isRequired
            />

            {/* Instructions */}
            <ControlledTextArea
                control={control}
                name="instructions"
                label="Instructions"
                placeholder="Provide clear instructions for students..."
                isRequired
                minRows={4}
            />

            {/* Module Selection */}
            <ControlledSelectInput
                control={control}
                name="moduleId"
                label="Select Module"
                placeholder="Choose a module for this activity"
                options={modules}
                isRequired
            />

            <Group grow align="flex-start">
                {/* Difficulty */}
                <Box>
                    <Text size="sm" fw={600} mb={8} c="#bdf052">
                        Difficulty Level
                    </Text>
                    <Select
                        placeholder="Select difficulty"
                        data={[
                            { value: "easy", label: "Easy" },
                            { value: "medium", label: "Medium" },
                            { value: "hard", label: "Hard" },
                        ]}
                        value={difficulty}
                        onChange={(value) => setValue("difficulty", value as Difficulty)}
                        size="md"
                        styles={{
                            input: {
                                background: "#1a1a1a",
                                color: "#ffffff",
                                fontSize: rem(15),
                            },
                        }}
                    />
                </Box>

                {/* Total Score */}
                <ControlledNumberInput
                    control={control}
                    name="totalScore"
                    label="Total Score"
                    placeholder="100"
                    isRequired
                    leftSection={<IconTrophy size={18} />}
                    min={1}
                    max={1000}
                />
            </Group>

            {/* Due Date */}
            <Box>
                <Text size="sm" fw={600} mb={8} c="#bdf052">
                    Due Date
                </Text>
                <DateTimePicker
                    placeholder="Select date and time"
                    value={dueDate}
                    onChange={(value) => {
                        const date = typeof value === "string" ? new Date(value) : value
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
                            "&:focus": {
                                borderColor: "#bdf052",
                            },
                        },
                    }}
                />
            </Box>

            {/* Activity Type */}
            <Box>
                <Text size="sm" fw={600} mb={8} c="#bdf052">
                    Activity Type
                </Text>
                <Radio.Group
                    value={activityType}
                    onChange={(value) => setValue("activityType", value as ActivityType)}
                >
                    <Stack gap="sm">
                        <Paper
                            p="md"
                            radius="md"
                            style={{
                                background:
                                    activityType === "quiz_form" ? "rgba(255, 165, 0, 0.1)" : "#2a2a2a",
                                border:
                                    activityType === "quiz_form"
                                        ? "2px solid #ffa500"
                                        : "1px solid rgba(255, 255, 255, 0.1)",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                            onClick={() => setValue("activityType", "quiz_form")}
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
                                        Create multiple choice, enumeration, identification, or true/false
                                        questions
                                    </Text>
                                </Box>
                            </Group>
                        </Paper>

                        <Paper
                            p="md"
                            radius="md"
                            style={{
                                background:
                                    activityType === "code_sandbox" ? "rgba(52, 211, 153, 0.1)" : "#2a2a2a",
                                border:
                                    activityType === "code_sandbox"
                                        ? "2px solid #34d399"
                                        : "1px solid rgba(255, 255, 255, 0.1)",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                            onClick={() => setValue("activityType", "code_sandbox")}
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
                                        Students write and test code with starter code and test cases
                                    </Text>
                                </Box>
                            </Group>
                        </Paper>
                    </Stack>
                </Radio.Group>
            </Box>

            <Group justify="flex-end" mt="xl">
                <Button
                    onClick={handleNext}
                    size="lg"
                    radius="md"
                    styles={{
                        root: {
                            background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            padding: "0 32px",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(167, 139, 250, 0.4)",
                            },
                        },
                    }}
                >
                    Next: Configure Activity
                </Button>
            </Group>
        </Stack>
    )
}

