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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Card
        shadow="md"
        padding="lg"
        radius="md"
        withBorder
        style={{ backgroundColor: "#2a2a2a", borderColor: "#444444" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <Text size="xl" fw={700} style={{ color: "#FFFFFF" }}>
                Student Accounts
              </Text>
              <Text size="sm" style={{ color: "#E9EEEA" }}>
                Manage and monitor all student accounts
              </Text>
            </div>
            <Button
              leftSection={<IconUserPlus size={16} />}
              style={{ backgroundColor: "#BDF052", color: "#222222" }}
            >
              Add Student
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextInput
            placeholder="Search students by name or email..."
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

          <Table
            striped
            highlightOnHover
            styles={{ tr: { backgroundColor: "#2a2a2a" } }}
          >
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
                  Student
                </Table.Th>
                <Table.Th
                  style={{
                    color: "#BDF052",
                    borderBottom: "1px solid #444444",
                  }}
                >
                  Email
                </Table.Th>
                <Table.Th
                  style={{
                    color: "#BDF052",
                    borderBottom: "1px solid #444444",
                  }}
                >
                  Enrolled Date
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
              {filteredStudents.map((student, index) => (
                <Table.Tr
                  key={student.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#333333",
                    borderBottom: "1px solid #3a3a3a",
                  }}
                >
                  <Table.Td fw={500} style={{ color: "#FFFFFF" }}>
                    {student.name}
                  </Table.Td>
                  <Table.Td style={{ color: "#E9EEEA" }}>
                    {student.email}
                  </Table.Td>
                  <Table.Td style={{ color: "#E9EEEA" }}>
                    {student.enrolledDate}
                  </Table.Td>
                  <Table.Td style={{ color: "#FFFFFF" }}>
                    {student.courses}
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={
                        student.status === "active" ? "#BDF052" : "#F6ACAE"
                      }
                      variant="light"
                      style={{
                        backgroundColor:
                          student.status === "active" ? "#BDF052" : "#F6ACAE",
                        color: "#222222",
                      }}
                    >
                      {student.status}
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
                          leftSection={<IconMail size={14} />}
                          style={{ color: "#FFFFFF" }}
                        >
                          Send Email
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<IconCircleCheck size={14} />}
                          style={{ color: "#FFFFFF" }}
                        >
                          View Details
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
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: "#2a2a2a", borderColor: "#BDF052" }}
          >
            <Text size="sm" style={{ color: "#E9EEEA" }} mb="xs">
              Total Students
            </Text>
            <Text size="2rem" fw={700} style={{ color: "#BDF052" }}>
              1,247
            </Text>
            <Text size="xs" style={{ color: "#E9EEEA" }} mt="xs">
              +12% from last month
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: "#2a2a2a", borderColor: "#B3A1FF" }}
          >
            <Text size="sm" style={{ color: "#E9EEEA" }} mb="xs">
              Active Students
            </Text>
            <Text size="2rem" fw={700} style={{ color: "#B3A1FF" }}>
              1,189
            </Text>
            <Text size="xs" style={{ color: "#E9EEEA" }} mt="xs">
              95.3% activity rate
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: "#2a2a2a", borderColor: "#F6ACAE" }}
          >
            <Text size="sm" style={{ color: "#E9EEEA" }} mb="xs">
              New This Month
            </Text>
            <Text size="2rem" fw={700} style={{ color: "#F6ACAE" }}>
              58
            </Text>
            <Text size="xs" style={{ color: "#E9EEEA" }} mt="xs">
              +8% from last month
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
