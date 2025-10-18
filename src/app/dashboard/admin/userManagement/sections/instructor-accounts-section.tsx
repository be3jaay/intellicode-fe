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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Card
        shadow="md"
        padding="lg"
        radius="md"
        withBorder
        style={{ backgroundColor: "#2a2a2a", borderColor: "#444444" }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <Text size="xl" fw={700} style={{ color: "#FFFFFF" }}>
            Instructor Accounts
          </Text>
          <Text size="sm" style={{ color: "#E9EEEA" }}>
            Manage approved instructor accounts and performance
          </Text>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextInput
            placeholder="Search instructors by name, email, or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            styles={{
              input: {
                backgroundColor: "#333333",
                borderColor: "#444444",
                color: "#FFFFFF",
              },
            }}
          />

          <Table striped highlightOnHover>
            <Table.Thead
              style={{
                backgroundColor: "#1a1a1a",
                borderBottom: "1px solid #444444",
              }}
            >
              <Table.Tr>
                <Table.Th
                  style={{
                    color: "#BDF052",
                    borderBottom: "1px solid #444444",
                  }}
                >
                  Instructor
                </Table.Th>
                <Table.Th
                  style={{
                    color: "#BDF052",
                    borderBottom: "1px solid #444444",
                  }}
                >
                  Specialization
                </Table.Th>
                <Table.Th
                  style={{
                    color: "#BDF052",
                    borderBottom: "1px solid #444444",
                  }}
                >
                  Courses
                </Table.Th>
                <Table.Th
                  style={{
                    color: "#BDF052",
                    borderBottom: "1px solid #444444",
                  }}
                >
                  Students
                </Table.Th>
                <Table.Th
                  style={{
                    color: "#BDF052",
                    borderBottom: "1px solid #444444",
                  }}
                >
                  Status
                </Table.Th>
                <Table.Th
                  style={{
                    color: "#BDF052",
                    borderBottom: "1px solid #444444",
                  }}
                ></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredInstructors.map((instructor, index) => (
                <Table.Tr
                  key={instructor.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#333333",
                    borderBottom: "1px solid #3a3a3a",
                  }}
                >
                  <Table.Td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <Avatar
                        size="sm"
                        radius="xl"
                        style={{ backgroundColor: "#B3A1FF" }}
                      >
                        {instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <div>
                        <Text fw={500} size="sm" style={{ color: "#FFFFFF" }}>
                          {instructor.name}
                        </Text>
                        <Text size="xs" style={{ color: "#E9EEEA" }}>
                          {instructor.email}
                        </Text>
                      </div>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      style={{ backgroundColor: "#B3A1FF", color: "#222222" }}
                    >
                      {instructor.specialization}
                    </Badge>
                  </Table.Td>
                  <Table.Td style={{ color: "#FFFFFF" }}>
                    {instructor.courses}
                  </Table.Td>
                  <Table.Td style={{ color: "#FFFFFF" }}>
                    {instructor.students}
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      style={{
                        backgroundColor:
                          instructor.status === "active"
                            ? "#BDF052"
                            : "#E9EEEA",
                        color: "#222222",
                      }}
                    >
                      {instructor.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <ActionIcon
                          variant="subtle"
                          style={{ color: "#BDF052" }}
                        >
                          <IconDots size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown style={{ backgroundColor: "#333333" }}>
                        <Menu.Label style={{ color: "#BDF052" }}>
                          Actions
                        </Menu.Label>
                        <Menu.Item
                          leftSection={<IconCircleCheck size={14} />}
                          style={{ color: "#FFFFFF" }}
                        >
                          View Profile
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<IconMail size={14} />}
                          style={{ color: "#FFFFFF" }}
                        >
                          Send Email
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          color="red"
                          leftSection={<IconBan size={14} />}
                          style={{ color: "#F6ACAE" }}
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
      </Card>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: "#2a2a2a", borderColor: "#BDF052" }}
          >
            <Text size="sm" style={{ color: "#E9EEEA" }} mb="xs">
              Total Instructors
            </Text>
            <Text size="2rem" fw={700} style={{ color: "#BDF052" }}>
              87
            </Text>
            <Text size="xs" style={{ color: "#E9EEEA" }} mt="xs">
              +5 from last month
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: "#2a2a2a", borderColor: "#B3A1FF" }}
          >
            <Text size="sm" style={{ color: "#E9EEEA" }} mb="xs">
              Active Instructors
            </Text>
            <Text size="2rem" fw={700} style={{ color: "#B3A1FF" }}>
              82
            </Text>
            <Text size="xs" style={{ color: "#E9EEEA" }} mt="xs">
              94.3% active rate
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: "#2a2a2a", borderColor: "#F6ACAE" }}
          >
            <Text size="sm" style={{ color: "#E9EEEA" }} mb="xs">
              Total Courses
            </Text>
            <Text size="2rem" fw={700} style={{ color: "#F6ACAE" }}>
              342
            </Text>
            <Text size="xs" style={{ color: "#E9EEEA" }} mt="xs">
              +18 from last month
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
