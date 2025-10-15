"use client";

import { useState } from "react";
import {
  Card,
  TextInput,
  Badge,
  Avatar,
  Table,
  Menu,
  ActionIcon,
  Grid,
  Text,
} from "@mantine/core";
import {
  IconSearch,
  IconDots,
  IconMail,
  IconBan,
  IconCircleCheck,
} from "@tabler/icons-react";
import { mockInstructors } from "./mock-data";

export function InstructorAccountsSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInstructors = mockInstructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.specialization
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="mb-6">
          <Text size="xl" fw={700}>
            Instructor Accounts
          </Text>
          <Text size="sm" c="dimmed">
            Manage approved instructor accounts and performance
          </Text>
        </div>

        <div className="flex flex-col gap-4">
          <TextInput
            placeholder="Search instructors by name, email, or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
          />

          <div className="overflow-auto border border-gray-300 rounded-lg">
            <Table striped highlightOnHover className="min-w-[800px]">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="min-w-[250px]">Instructor</Table.Th>
                  <Table.Th className="min-w-[140px]">Specialization</Table.Th>
                  <Table.Th className="min-w-[80px]">Courses</Table.Th>
                  <Table.Th className="min-w-[80px]">Students</Table.Th>
                  <Table.Th className="min-w-[80px]">Status</Table.Th>
                  <Table.Th className="min-w-[60px] text-center">
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredInstructors.map((instructor) => (
                  <Table.Tr key={instructor.id}>
                    <Table.Td>
                      <div className="flex items-center gap-3 min-w-[250px]">
                        <Avatar size="sm" radius="xl" color="violet">
                          {instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <Text
                            fw={500}
                            size="sm"
                            className="whitespace-nowrap overflow-hidden text-ellipsis"
                          >
                            {instructor.name}
                          </Text>
                          <Text
                            size="xs"
                            c="dimmed"
                            className="whitespace-nowrap overflow-hidden text-ellipsis"
                          >
                            {instructor.email}
                          </Text>
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="outline" size="sm">
                        {instructor.specialization}
                      </Badge>
                    </Table.Td>
                    <Table.Td className="text-center">
                      {instructor.courses}
                    </Table.Td>
                    <Table.Td className="text-center">
                      {instructor.students}
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={instructor.status === "active" ? "blue" : "gray"}
                        variant="light"
                        size="sm"
                      >
                        {instructor.status}
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
                          <Menu.Item
                            leftSection={<IconCircleCheck size={14} />}
                          >
                            View Profile
                          </Menu.Item>
                          <Menu.Item leftSection={<IconMail size={14} />}>
                            Send Email
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
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              Total Instructors
            </Text>
            <Text size="2rem" fw={700}>
              87
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              +5 from last month
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              Active Instructors
            </Text>
            <Text size="2rem" fw={700}>
              82
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              94.3% active rate
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              Total Courses
            </Text>
            <Text size="2rem" fw={700}>
              342
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              +18 from last month
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
