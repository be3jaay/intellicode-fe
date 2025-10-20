"use client"
import { Paper, Stack, Text, Box, Button, Group } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons-react"

export function AlreadySubmitted() {
    return (
        <Paper
            shadow="xl"
            p="xl"
            radius="lg"
            style={{
                maxWidth: "520px",
                background: "rgba(234, 179, 8, 0.1)",
                border: "1px solid rgba(234, 179, 8, 0.6)",
            }}
        >
            <Stack align="center" gap="md">
                <Box
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <IconAlertTriangle size={40} color="#ffffff" />
                </Box>
                <Text size="xl" fw={700} c="#f59e0b">
                    Already Submitted
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                    You already submitted this quiz. You can review your courses for other activities.
                </Text>
                <Group justify="center">
                    <Button component="a" href="/dashboard/student/courses" variant="light" color="yellow">
                        Back to courses
                    </Button>
                </Group>
            </Stack>
        </Paper>
    )
}


