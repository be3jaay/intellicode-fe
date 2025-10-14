"use client"
import { Group, Box, Badge, Text, ActionIcon, rem } from "@mantine/core"
import {
    IconEdit,
    IconTrash,
    IconCheckbox,
    IconListNumbers,
    IconAbc,
    IconCheck,
} from "@tabler/icons-react"
import type { QuizQuestion, QuestionType } from "./types"

interface QuestionCardProps {
    question: QuizQuestion
    index: number
    onEdit: () => void
    onRemove: () => void
    isEditing: boolean
}

export function QuestionCard({ question, index, onEdit, onRemove, isEditing }: QuestionCardProps) {
    const getQuestionTypeIcon = (type: QuestionType) => {
        switch (type) {
            case "multiple_choice":
                return <IconCheckbox size={16} />
            case "enumeration":
                return <IconListNumbers size={16} />
            case "identification":
                return <IconAbc size={16} />
            case "true_false":
                return <IconCheck size={16} />
        }
    }

    const getQuestionTypeLabel = (type: QuestionType) => {
        switch (type) {
            case "multiple_choice":
                return "Multiple Choice"
            case "enumeration":
                return "Enumeration"
            case "identification":
                return "Identification"
            case "true_false":
                return "True/False"
        }
    }

    const getQuestionTypeColor = (type: QuestionType) => {
        switch (type) {
            case "multiple_choice":
                return "#ffa500"
            case "enumeration":
                return "#ff6b6b"
            case "identification":
                return "#4ecdc4"
            case "true_false":
                return "#95e1d3"
        }
    }

    return (
        <Group justify="space-between" wrap="nowrap" align="flex-start">
            <Group gap="md" style={{ flex: 1 }} align="flex-start">
                <Box
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: rem(8),
                        background: getQuestionTypeColor(question?.type || "multiple_choice"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#222222",
                        fontWeight: 700,
                        flexShrink: 0,
                    }}
                >
                    {index + 1}
                </Box>
                <Box style={{ flex: 1, minWidth: 0 }}>
                    <Group gap="xs" mb={4}>
                        <Badge
                            size="sm"
                            variant="light"
                            leftSection={getQuestionTypeIcon(question?.type || "multiple_choice")}
                            style={{
                                background: `${getQuestionTypeColor(question?.type || "multiple_choice")}22`,
                                color: getQuestionTypeColor(question?.type || "multiple_choice"),
                            }}
                        >
                            {getQuestionTypeLabel(question?.type || "multiple_choice")}
                        </Badge>
                        <Badge size="xs" color="yellow">
                            {question?.points || 10} pts
                        </Badge>
                    </Group>
                    <Text size="sm" c="white" lineClamp={2} mb={4}>
                        {question?.question || "No question"}
                    </Text>
                    {question?.explanation && (
                        <Text size="xs" c="dimmed" lineClamp={1}>
                            💡 {question.explanation}
                        </Text>
                    )}
                </Box>
            </Group>
            <Group gap="xs">
                <ActionIcon
                    color="violet"
                    variant="light"
                    size="lg"
                    onClick={onEdit}
                    disabled={isEditing}
                    style={{ transition: "all 0.2s ease" }}
                    styles={{
                        root: {
                            "&:hover": {
                                transform: !isEditing ? "translateY(-2px)" : undefined,
                            },
                        },
                    }}
                >
                    <IconEdit size={18} />
                </ActionIcon>
                <ActionIcon
                    color="pink"
                    variant="light"
                    size="lg"
                    onClick={onRemove}
                    disabled={isEditing}
                    style={{ transition: "all 0.2s ease" }}
                    styles={{
                        root: {
                            "&:hover": {
                                transform: !isEditing ? "translateY(-2px)" : undefined,
                            },
                        },
                    }}
                >
                    <IconTrash size={18} />
                </ActionIcon>
            </Group>
        </Group>
    )
}

