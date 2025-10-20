"use client"
import { useMemo, useState } from "react"
import { Card, Stack, Group, Text, TextInput, Select, Table, Badge, ScrollArea, ActionIcon, Button, Avatar } from "@mantine/core"
import { ArrowUpDown, Search, Filter, Download } from "lucide-react"
import { useGetEnrolledStudents } from "@/hooks/query-hooks/student-query"
import type { EnrolledStudent, StudentQueryParams } from "@/services/student-service/student-type"

interface GradebookProps {
    courseId: string
}

type SortKey = "name" | "email" | "section" | "progress" | "assignments"

export function Gradebook({ courseId }: GradebookProps) {
    const [search, setSearch] = useState("")
    const [section, setSection] = useState<string | null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<SortKey>("name")
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

    const params: StudentQueryParams = {
        search: search || undefined,
        section: section || undefined,
        enrollment_status: (status as any) || undefined,
        limit: 10,
        offset: 0,
    }

    const { data, isLoading } = useGetEnrolledStudents(courseId, params)
    const mock: EnrolledStudent[] = [
        { id: "1", first_name: "Alex", last_name: "Rivera", email: "alex.rivera@example.com", student_number: "2023-001", section: "BSCS 3A", profile_picture: null, enrollment_status: "active", enrolled_at: new Date().toISOString(), progress_percentage: 86, assignments_completed: 8, assignments_total: 10, last_activity: new Date().toISOString() },
        { id: "2", first_name: "Jamie", last_name: "Cruz", email: "jamie.cruz@example.com", student_number: "2023-002", section: "BSCS 3A", profile_picture: null, enrollment_status: "active", enrolled_at: new Date().toISOString(), progress_percentage: 72, assignments_completed: 6, assignments_total: 10, last_activity: new Date().toISOString() },
        { id: "3", first_name: "Taylor", last_name: "Nguyen", email: "taylor.nguyen@example.com", student_number: "2023-003", section: "BSCS 3B", profile_picture: null, enrollment_status: "inactive", enrolled_at: new Date().toISOString(), progress_percentage: 41, assignments_completed: 3, assignments_total: 10, last_activity: new Date().toISOString() },
    ]
    const students: EnrolledStudent[] = (data?.data?.data && data.data.data.length > 0) ? data.data.data : mock

    const sorted = useMemo(() => {
        const items = [...students]
        items.sort((a, b) => {
            let av = ""
            let bv = ""
            switch (sortBy) {
                case "name":
                    av = `${a.last_name} ${a.first_name}`.toLowerCase()
                    bv = `${b.last_name} ${b.first_name}`.toLowerCase()
                    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av)
                case "email":
                    av = a.email.toLowerCase()
                    bv = b.email.toLowerCase()
                    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av)
                case "section":
                    av = (a.section || "").toLowerCase()
                    bv = (b.section || "").toLowerCase()
                    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av)
                case "progress": {
                    const ap = a.progress_percentage || 0
                    const bp = b.progress_percentage || 0
                    return sortDir === "asc" ? ap - bp : bp - ap
                }
                case "assignments": {
                    const ar = (a.assignments_total || 0) === 0 ? 0 : a.assignments_completed / a.assignments_total
                    const br = (b.assignments_total || 0) === 0 ? 0 : b.assignments_completed / b.assignments_total
                    return sortDir === "asc" ? ar - br : br - ar
                }
            }
        })
        return items
    }, [students, sortBy, sortDir])

    const toggleSort = (key: SortKey) => {
        if (sortBy === key) {
            setSortDir(prev => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortBy(key)
            setSortDir("asc")
        }
    }

    return (
        <Stack gap="md">
            <Card
                padding="md"
                radius="md"
                style={{ background: "rgba(34, 34, 34, 0.6)", border: "1px solid rgba(189, 240, 82, 0.1)" }}
            >
                <Group justify="space-between">
                    <Group gap="md" grow>
                        <TextInput
                            placeholder="Search students"
                            value={search}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                            leftSection={<Search size={16} color="#9ca3af" />}
                            styles={{ input: { background: "rgba(26,26,26,0.8)", border: "1px solid rgba(189, 240, 82, 0.2)", color: "#e9eeea" } }}
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
                            styles={{ input: { background: "rgba(26,26,26,0.8)", border: "1px solid rgba(189, 240, 82, 0.2)", color: "#e9eeea" } }}
                        />
                        <Select
                            placeholder="Status"
                            value={status}
                            onChange={setStatus}
                            data={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
                            leftSection={<Filter size={16} color="#9ca3af" />}
                            styles={{ input: { background: "rgba(26,26,26,0.8)", border: "1px solid rgba(189, 240, 82, 0.2)", color: "#e9eeea" } }}
                        />
                    </Group>
                    <Button size="sm" variant="outline" leftSection={<Download size={16} />} style={{ borderColor: "rgba(189,240,82,0.3)", color: "#bdf052" }}>Export</Button>
                </Group>
            </Card>

            <Card padding="md" radius="md" style={{ background: "rgba(34, 34, 34, 0.6)", border: "1px solid rgba(189, 240, 82, 0.1)" }}>
                <ScrollArea>
                    <Table striped highlightOnHover withTableBorder withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>
                                    <Group gap={6} onClick={() => toggleSort("name")} style={{ cursor: "pointer" }}>
                                        <Text size="sm" c="#e9eeea">Student</Text>
                                        <ActionIcon size="sm" variant="subtle"><ArrowUpDown size={14} /></ActionIcon>
                                    </Group>
                                </Table.Th>
                                <Table.Th>
                                    <Group gap={6} onClick={() => toggleSort("email")} style={{ cursor: "pointer" }}>
                                        <Text size="sm" c="#e9eeea">Email</Text>
                                        <ActionIcon size="sm" variant="subtle"><ArrowUpDown size={14} /></ActionIcon>
                                    </Group>
                                </Table.Th>
                                <Table.Th>
                                    <Group gap={6} onClick={() => toggleSort("section")} style={{ cursor: "pointer" }}>
                                        <Text size="sm" c="#e9eeea">Section</Text>
                                        <ActionIcon size="sm" variant="subtle"><ArrowUpDown size={14} /></ActionIcon>
                                    </Group>
                                </Table.Th>
                                <Table.Th>
                                    <Group gap={6} onClick={() => toggleSort("progress")} style={{ cursor: "pointer" }}>
                                        <Text size="sm" c="#e9eeea">Progress</Text>
                                        <ActionIcon size="sm" variant="subtle"><ArrowUpDown size={14} /></ActionIcon>
                                    </Group>
                                </Table.Th>
                                <Table.Th>
                                    <Group gap={6} onClick={() => toggleSort("assignments")} style={{ cursor: "pointer" }}>
                                        <Text size="sm" c="#e9eeea">Assignments</Text>
                                        <ActionIcon size="sm" variant="subtle"><ArrowUpDown size={14} /></ActionIcon>
                                    </Group>
                                </Table.Th>
                                <Table.Th>
                                    <Text size="sm" c="#e9eeea">Activities</Text>
                                </Table.Th>
                                <Table.Th>
                                    <Text size="sm" c="#e9eeea">Quizzes</Text>
                                </Table.Th>
                                <Table.Th>
                                    <Text size="sm" c="#e9eeea">Exams</Text>
                                </Table.Th>
                                <Table.Th>
                                    <Text size="sm" c="#e9eeea">Grade</Text>
                                </Table.Th>
                                <Table.Th>
                                    <Text size="sm" c="#e9eeea">Status</Text>
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {isLoading ? (
                                <Table.Tr><Table.Td colSpan={7}><Text c="dimmed">Loading...</Text></Table.Td></Table.Tr>
                            ) : sorted.length === 0 ? (
                                <Table.Tr><Table.Td colSpan={7}><Text c="dimmed">No students found.</Text></Table.Td></Table.Tr>
                            ) : (
                                sorted.map((s) => {
                                    const completionRatio = (s.assignments_total || 0) === 0 ? 0 : s.assignments_completed / s.assignments_total
                                    const gradePercent = Math.round(completionRatio * 100)
                                    const statusColor = s.enrollment_status === "active" ? "#bdf052" : "#f6acae"
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
                                            <Table.Td>
                                                <Text size="sm" c="dimmed">{s.email}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="#e9eeea">{s.section}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="#e9eeea">{s.progress_percentage}%</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="#e9eeea">{s.assignments_completed}/{s.assignments_total}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="#e9eeea">—</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="#e9eeea">—</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="#e9eeea">—</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="#e9eeea">{gradePercent}%</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge size="sm" style={{ background: s.enrollment_status === "active" ? "rgba(189, 240, 82, 0.2)" : "rgba(246, 172, 174, 0.2)", color: s.enrollment_status === "active" ? "#bdf052" : "#f6acae", border: `1px solid ${s.enrollment_status === "active" ? "rgba(189, 240, 82, 0.3)" : "rgba(246, 172, 174, 0.3)"}` }}>{s.enrollment_status === "active" ? "Active" : "Inactive"}</Badge>
                                            </Table.Td>
                                        </Table.Tr>
                                    )
                                })
                            )}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Card>
        </Stack>
    )
}

export default Gradebook


