"use client"
import { useMemo, useState } from "react"
import { Card, Stack, Group, Text, TextInput, Select, Table, Badge, ActionIcon, Button, Tooltip, Avatar } from "@mantine/core"
import { Search, Filter, CheckCircle2, CircleX, ShieldCheck } from "lucide-react"
import { useGetEnrolledStudents } from "@/hooks/query-hooks/student-query"
import type { EnrolledStudent, StudentQueryParams } from "@/services/student-service/student-type"

interface CourseCompletionProps {
    courseId: string
}

// Placeholder actions - wire to API once available
async function approveCertificate(studentId: string) {
    console.log("approve certificate", studentId)
}

async function withdrawCertificate(studentId: string) {
    console.log("withdraw certificate", studentId)
}

export function CourseCompletion({ courseId }: CourseCompletionProps) {
    const [search, setSearch] = useState("")
    const [section, setSection] = useState<string | null>(null)
    const [status, setStatus] = useState<string | null>(null)

    const params: StudentQueryParams = {
        search: search || undefined,
        section: section || undefined,
        enrollment_status: (status as any) || undefined,
        limit: 10,
        offset: 0,
    }

    const { data, isLoading } = useGetEnrolledStudents(courseId, params)

    const students: EnrolledStudent[] = (data?.data?.data && data.data.data.length > 0) ? data.data.data : [] as EnrolledStudent[]

    const eligible = useMemo(() => students, [students])

    const meetsRequirements = (s: EnrolledStudent) => {
        const progressOk = (s.progress_percentage || 0) >= 80
        const assignmentsOk = (s.assignments_total || 0) === 0 ? false : (s.assignments_completed / s.assignments_total) >= 0.8
        return progressOk && assignmentsOk
    }

    return (
        <Stack gap="md">
            <Card padding="md" radius="md" style={{ background: "rgba(34,34,34,0.6)", border: "1px solid rgba(189,240,82,0.1)" }}>
                <Group gap="md" grow>
                    <TextInput
                        placeholder="Search students"
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        leftSection={<Search size={16} color="#9ca3af" />}
                        styles={{ input: { background: "rgba(26,26,26,0.8)", border: "1px solid rgba(189,240,82,0.2)", color: "#e9eeea" } }}
                    />
                    <Select
                        placeholder="Section"
                        value={section}
                        onChange={setSection}
                        data={[
                            { value: "BSCS 3A", label: "BSCS 3A" },
                            { value: "BSCS 3B", label: "BSCS 3B" },
                            { value: "BSCS 4A", label: "BSCS 4A" },
                            { value: "BSCS 4B", label: "BSCS 4B" },
                        ]}
                        leftSection={<Filter size={16} color="#9ca3af" />}
                        styles={{ input: { background: "rgba(26,26,26,0.8)", border: "1px solid rgba(189,240,82,0.2)", color: "#e9eeea" } }}
                    />
                    <Select
                        placeholder="Status"
                        value={status}
                        onChange={setStatus}
                        data={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
                        leftSection={<Filter size={16} color="#9ca3af" />}
                        styles={{ input: { background: "rgba(26,26,26,0.8)", border: "1px solid rgba(189,240,82,0.2)", color: "#e9eeea" } }}
                    />
                </Group>
            </Card>

            <Card padding="md" radius="md" style={{ background: "rgba(34,34,34,0.6)", border: "1px solid rgba(189,240,82,0.1)" }}>
                <Table striped style={{ borderCollapse: "collapse" }}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th><Text size="sm" c="#e9eeea">Student</Text></Table.Th>
                            <Table.Th><Text size="sm" c="#e9eeea">Progress</Text></Table.Th>
                            <Table.Th><Text size="sm" c="#e9eeea">Assignments</Text></Table.Th>
                            <Table.Th><Text size="sm" c="#e9eeea">Eligibility</Text></Table.Th>
                            <Table.Th><Text size="sm" c="#e9eeea">Certificate</Text></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {isLoading ? (
                            <Table.Tr><Table.Td colSpan={5}><Text c="dimmed">Loading...</Text></Table.Td></Table.Tr>
                        ) : eligible.length === 0 ? (
                            <Table.Tr><Table.Td colSpan={5}><Text c="dimmed">No students.</Text></Table.Td></Table.Tr>
                        ) : (
                            eligible.map((s) => {
                                const ok = meetsRequirements(s)
                                return (
                                    <Table.Tr key={s.id}>
                                        <Table.Td>
                                            <Group gap="sm">
                                                <Avatar size={28} radius="sm" src={s.profile_picture} style={{ background: "linear-gradient(135deg, #b3a1ff 0%, #9b89e6 100%)", color: "#1a1a1a", fontWeight: 700 }}>
                                                    {s.first_name[0]}{s.last_name[0]}
                                                </Avatar>
                                                <Text size="sm" c="#e9eeea">{s.last_name}, {s.first_name}</Text>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td><Text size="sm" c="#e9eeea">{s.progress_percentage}%</Text></Table.Td>
                                        <Table.Td><Text size="sm" c="#e9eeea">{s.assignments_completed}/{s.assignments_total}</Text></Table.Td>
                                        <Table.Td>
                                            <Badge size="sm" style={{ background: ok ? "rgba(189,240,82,0.15)" : "rgba(246,172,174,0.15)", color: ok ? "#bdf052" : "#f6acae", border: `1px solid ${ok ? "rgba(189,240,82,0.35)" : "rgba(246,172,174,0.35)"}` }}>{ok ? "Meets requirements" : "Requirements not met"}</Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <Group gap="xs">
                                                <Tooltip label="Approve Certificate">
                                                    <ActionIcon variant="light" disabled={!ok} onClick={() => approveCertificate(s.id)} style={{ background: "rgba(189, 240, 82, 0.15)", color: "#bdf052", border: "1px solid rgba(189,240,82,0.3)" }}>
                                                        <ShieldCheck size={16} />
                                                    </ActionIcon>
                                                </Tooltip>
                                                <Tooltip label="Withdraw Certificate">
                                                    <ActionIcon variant="light" onClick={() => withdrawCertificate(s.id)} style={{ background: "rgba(246, 172, 174, 0.15)", color: "#f6acae", border: "1px solid rgba(246,172,174,0.3)" }}>
                                                        <CircleX size={16} />
                                                    </ActionIcon>
                                                </Tooltip>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                )
                            })
                        )}
                    </Table.Tbody>
                </Table>
            </Card>
        </Stack>
    )
}

export default CourseCompletion


