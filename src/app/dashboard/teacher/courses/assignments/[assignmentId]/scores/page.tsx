"use client"
import { useParams } from "next/navigation"
import { useGetAssignmentScores, useFetchAssignment } from "@/hooks/query-hooks/assignment-query"
import { Box, Card, Center, Group, Loader, Stack, Table, Text, Badge, Paper, Progress } from "@mantine/core"
import { format } from "date-fns"

export default function AssignmentScoresPage() {
    const params = useParams()
    const assignmentId = params.assignmentId as string

    const { data: assignmentResp } = useFetchAssignment(assignmentId)
    const assignment = assignmentResp?.data
    const { data, isLoading, error } = useGetAssignmentScores(assignmentId)

    if (isLoading) {
        return (
            <Center h="100vh">
                <Stack align="center" gap="md">
                    <Loader size="lg" />
                    <Text>Loading scores...</Text>
                </Stack>
            </Center>
        )
    }

    if (error) {
        return (
            <Center h="100vh">
                <Text c="red">Failed to load scores</Text>
            </Center>
        )
    }

    const rows = (data?.data ?? []).map((row) => (
        <Table.Tr key={row.student_id}>
            <Table.Td>
                <Stack gap={2}>
                    <Text fw={600} c="#e9eeea">{row.student_name}</Text>
                    <Text size="xs" c="dimmed">{row.student_email} · {row.student_number}</Text>
                </Stack>
            </Table.Td>
            <Table.Td>
                <Group gap={8}>
                    <Text>{row.score} / {row.max_score}</Text>
                    <Badge variant="light" color={row.percentage >= 75 ? "green" : row.percentage >= 50 ? "yellow" : "red"}>{Math.round(row.percentage)}%</Badge>
                </Group>
                <Progress value={row.percentage} color="violet" size="sm" mt={6} style={{ maxWidth: 160 }} />
            </Table.Td>
            <Table.Td>
                <Badge variant="light" color="blue">{row.status}</Badge>
            </Table.Td>
            <Table.Td>
                <Text size="sm">{format(new Date(row.submitted_at), "PPpp")}</Text>
            </Table.Td>
        </Table.Tr>
    ))

    return (
        <Box p="lg">
            <Stack gap="md">
                <Paper p="md" radius="md" style={{ background: "rgba(34,34,34,0.6)", border: "1px solid rgba(189, 240, 82, 0.1)" }}>
                    <Group justify="space-between">
                        <Stack gap={2}>
                            <Text fw={700} size="lg" c="#bdf052">{assignment?.title ?? "Assignment Scores"}</Text>
                            <Text size="sm" c="dimmed">Scores and submissions</Text>
                        </Stack>
                    </Group>
                </Paper>

                <Card padding="md" radius="md" style={{ background: "rgba(34,34,34,0.6)", border: "1px solid rgba(189, 240, 82, 0.1)" }}>
                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Student</Table.Th>
                                <Table.Th>Score</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Submitted At</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows}
                        </Table.Tbody>
                    </Table>
                </Card>
            </Stack>
        </Box>
    )
}


