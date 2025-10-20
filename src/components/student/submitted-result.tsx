"use client"
import { Box, Paper, Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"

type SubmittedResultProps = {
    score: number
    finalScore: number
}

export function SubmittedResult({ score, finalScore }: SubmittedResultProps) {
    return (
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
                    Your score: {score} / {finalScore}
                </Text>
            </Stack>
        </Paper>
    )
}


