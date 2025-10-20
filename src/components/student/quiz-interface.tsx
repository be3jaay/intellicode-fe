"use client"
import { useState, useEffect } from "react"
import {
    Box,
    Text,
    Stack,
    Button,
    Paper,
    Group,
    Radio,
    Checkbox,
    TextInput,
    Textarea,
    Progress,
    Alert,
    Divider,
    Badge,
    Center,
} from "@mantine/core"
import {
    IconBrain,
    IconClock,
    IconTrophy,
    IconAlertTriangle,
    IconCheck,
    IconArrowRight,
} from "@tabler/icons-react"
import { useLeaveDetection } from 'react-haiku'

interface Question {
    id: string
    question: string
    type: "multiple_choice" | "enumeration" | "identification" | "true_false"
    points: number
    correct_answer: string
    correct_answers: string[]
    options: string[]
    explanation: string
    case_sensitive: boolean
    is_true: boolean
}

interface Assignment {
    id: string
    title: string
    description: string
    assignmentType: string
    assignmentSubtype: string
    difficulty: string
    points: number
    dueDate: string
    is_published: boolean
    secured_browser: boolean
    module_id: string
    created_at: string
    updated_at: string
    questions: Question[]
    starterCode: string | null
}

interface QuizInterfaceProps {
    assignment: Assignment
    isSecured: boolean
}

interface Answer {
    questionId: string
    answer: string | string[]
    type: string
}

export function QuizInterface({ assignment, isSecured }: QuizInterfaceProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<Answer[]>([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Leave detection for secured browser
    useLeaveDetection(() => {
        if (isSecured) {
            console.log("failed, user leave page")
            // In a real implementation, this would submit the quiz with a grade of 0
            alert("You have left the secured browser. Your quiz will be automatically submitted with a grade of 0.")
        }
    })
    const currentQuestion = assignment.questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / assignment.questions.length) * 100

    const handleAnswerChange = (questionId: string, answer: string | string[], type: string) => {
        setAnswers(prev => {
            const existingIndex = prev.findIndex(a => a.questionId === questionId)
            if (existingIndex >= 0) {
                const updated = [...prev]
                updated[existingIndex] = { questionId, answer, type }
                return updated
            } else {
                return [...prev, { questionId, answer, type }]
            }
        })
    }

    const getCurrentAnswer = (questionId: string) => {
        return answers.find(a => a.questionId === questionId)?.answer || ""
    }

    const handleNext = () => {
        if (currentQuestionIndex < assignment.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1)
        }
    }

    const handleSubmit = () => {
        setIsSubmitted(true)
        // In a real implementation, this would submit the answers to the backend
        console.log("Submitting quiz with answers:", answers)
    }

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    if (isSubmitted) {
        return (
            <Center h="100vh">
                <Paper
                    shadow="xl"
                    p="xl"
                    radius="lg"
                    style={{
                        maxWidth: "500px",
                        background: "rgba(34, 197, 94, 0.1)",
                        border: "1px solid #22c55e",
                    }}
                >
                    <Stack align="center" gap="md">
                        <Box
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <IconCheck size={40} color="#ffffff" />
                        </Box>
                        <Text size="xl" fw={700} c="green">
                            Quiz Submitted Successfully!
                        </Text>
                        <Text size="sm" c="dimmed" ta="center">
                            Your answers have been submitted. Results will be available after review.
                        </Text>
                    </Stack>
                </Paper>
            </Center>
        )
    }

    return (
        <Box style={{ maxWidth: "800px", margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
            {/* Header */}
            <Paper
                shadow="md"
                p="lg"
                radius="md"
                mb="lg"
                w="100%"
                style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
            >
                <Stack gap="md">
                    <Group justify="space-between" align="flex-start">
                        <Box>
                            <Text size="xl" fw={700} c="#bdf052" mb="xs">
                                {assignment.title}
                            </Text>
                            <Text size="sm" c="white">
                                {assignment.description}
                            </Text>
                        </Box>
                        <Group gap="sm">
                            <Badge size="lg" variant="light" color="blue" leftSection={<IconBrain size={14} />}>
                                {assignment.difficulty}
                            </Badge>
                            <Badge size="lg" variant="light" color="green" leftSection={<IconTrophy size={14} />}>
                                {assignment.points} points
                            </Badge>
                        </Group>
                    </Group>

                    <Group justify="space-between" align="center">
                        <Group gap="md">
                            <Text size="sm" c="dimmed">
                                Question {currentQuestionIndex + 1} of {assignment.questions.length}
                            </Text>
                            <Progress
                                value={progress}
                                size="sm"
                                style={{ width: "200px" }}
                                color="violet"
                            />
                        </Group>
                    </Group>
                </Stack>
            </Paper>

            {/* Question */}
            <Paper
                w="100%"
                shadow="md"
                p="xl"
                radius="md"
                mb="lg"
                style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
            >
                <Stack gap="lg">
                    <Group justify="space-between" align="flex-start">
                        <Text size="lg" fw={600} c="#4fd1c5">
                            {currentQuestion.question}
                        </Text>
                        <Badge size="sm" variant="light" color="green">
                            {currentQuestion.points} pts
                        </Badge>
                    </Group>

                    {/* Question Type Rendering */}
                    {currentQuestion.type === "multiple_choice" && (
                        <Radio.Group
                            value={getCurrentAnswer(currentQuestion.id) as string}
                            onChange={(value) => handleAnswerChange(currentQuestion.id, value, "multiple_choice")}
                        >
                            <Stack gap="sm">
                                {currentQuestion.options.map((option, index) => (
                                    <Radio
                                        key={index}
                                        value={index.toString()}
                                        label={option}
                                        size="md"
                                        styles={{
                                            label: { color: "#ffffff" },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Radio.Group>
                    )}

                    {currentQuestion.type === "true_false" && (
                        <Radio.Group
                            value={getCurrentAnswer(currentQuestion.id) as string}
                            onChange={(value) => handleAnswerChange(currentQuestion.id, value, "true_false")}
                        >
                            <Stack gap="sm">
                                <Radio value="true" label="True" size="md" c="white" />
                                <Radio value="false" label="False" size="md" c="white" />
                            </Stack>
                        </Radio.Group>
                    )}

                    {currentQuestion.type === "identification" && (
                        <TextInput
                            placeholder="Enter your answer"
                            value={getCurrentAnswer(currentQuestion.id) as string}
                            onChange={(event) => handleAnswerChange(currentQuestion.id, event.currentTarget.value, "identification")}
                            size="md"
                        />
                    )}

                    {currentQuestion.type === "enumeration" && (
                        <Textarea
                            placeholder="Enter your answers (one per line)"
                            value={Array.isArray(getCurrentAnswer(currentQuestion.id))
                                ? (getCurrentAnswer(currentQuestion.id) as string[]).join('\n')
                                : getCurrentAnswer(currentQuestion.id) as string
                            }
                            onChange={(event) => {
                                const lines = event.currentTarget.value.split('\n').filter(line => line.trim())
                                handleAnswerChange(currentQuestion.id, lines, "enumeration")
                            }}
                            minRows={3}
                            size="md"
                        />
                    )}
                </Stack>
            </Paper>

            {/* Navigation */}
            <Group justify="flex-end" w="100%">
                <Group gap="sm">
                    {currentQuestionIndex === assignment.questions.length - 1 ? (
                        <Button
                            size="lg"
                            onClick={handleSubmit}
                            leftSection={<IconCheck size={16} />}
                            style={{
                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                color: "#ffffff",
                                fontWeight: 600,
                            }}
                        >
                            Submit Quiz
                        </Button>
                    ) : (
                        <Button
                            size="lg"
                            onClick={handleNext}
                            rightSection={<IconArrowRight size={16} />}
                            style={{
                                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                                color: "#ffffff",
                                fontWeight: 600,
                            }}
                        >
                            Next Question
                        </Button>
                    )}
                </Group>
            </Group>

            {/* Secured Browser Warning */}
            {isSecured && (
                <Alert
                    w="100%"
                    icon={<IconAlertTriangle size={20} />}
                    title="Secured Browser Active"
                    color="red"
                    mt="lg"
                    style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                    }}
                >
                    <Text size="sm" c="white">
                        You are in secured browser mode. Do not attempt to leave this page or switch tabs.
                    </Text>
                </Alert>
            )}
        </Box>
    )
}
