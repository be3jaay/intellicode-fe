"use client";

import { useState } from "react";
import {
  Card,
  Button,
  TextInput,
  Badge,
  Table,
  Menu,
  ActionIcon,
  Grid,
  Text,
} from "@mantine/core";
import {
  IconSearch,
  IconDots,
  IconUserPlus,
  IconMail,
  IconBan,
  IconCircleCheck,
} from "@tabler/icons-react";
import { mockStudents } from "./mock-data";

export function StudentAccountsSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex-1 min-w-0">
              <Text size="xl" fw={700} className="md:text-xl text-xl">
                Student Accounts
              </Text>
              <Text size="sm" c="dimmed" className="md:text-sm text-xs">
                Manage and monitor all student accounts
              </Text>
            </div>
            <Button
              leftSection={<IconUserPlus size={16} />}
              size="sm"
              className="shrink-0 sm:w-auto w-full"
            >
              Add Student
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <TextInput
            placeholder="Search students by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
          />

          <div className="overflow-auto border border-gray-300 rounded-lg">
            <Table striped highlightOnHover className="min-w-[700px]">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="min-w-[180px]">Student</Table.Th>
                  <Table.Th className="min-w-[200px]">Email</Table.Th>
                  <Table.Th className="min-w-[120px]">Enrolled Date</Table.Th>
                  <Table.Th className="min-w-[80px]">Courses</Table.Th>
                  <Table.Th className="min-w-[80px]">Status</Table.Th>
                  <Table.Th className="min-w-[60px] text-center">
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredStudents.map((student) => (
                  <Table.Tr key={student.id}>
                    <Table.Td fw={500} className="whitespace-nowrap">
                      {student.name}
                    </Table.Td>
                    <Table.Td
                      c="dimmed"
                      className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {student.email}
                    </Table.Td>
                    <Table.Td c="dimmed" className="whitespace-nowrap">
                      {student.enrolledDate}
                    </Table.Td>
                    <Table.Td className="text-center">
                      {student.courses}
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={student.status === "active" ? "blue" : "red"}
                        variant="light"
                        size="sm"
                      >
                        {student.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td className="text-center">
                      <Menu shadow="md" width={200} position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="subtle" size="sm">
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Label>Actions</Menu.Label>
                          <Menu.Item leftSection={<IconMail size={14} />}>
                            Send Email
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconCircleCheck size={14} />}
                          >
                            View Details
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item
                            color="red"
                            leftSection={<IconBan size={14} />}
                          >
                            Suspend Account
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </div>
      </Card>

      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              Total Students
            </Text>
            <Text size="2rem" fw={700}>
              1,247
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              +12% from last month
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              Active Students
            </Text>
            <Text size="2rem" fw={700}>
              1,189
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              95.3% activity rate
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              New This Month
            </Text>
            <Text size="2rem" fw={700}>
              58
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              +8% from last month
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
