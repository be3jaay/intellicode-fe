"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Badge,
  TextInput,
  Avatar,
  Menu,
  ActionIcon,
} from "@mantine/core";
import {
  IconSearch,
  IconDots,
  IconEdit,
  IconArchive,
  IconEye,
  IconUsers,
  IconCheck,
} from "@tabler/icons-react";
import { Course, mockCourses } from "../mock-data";

export function ActiveCoursesSection() {
  const [courses] = useState<Course[]>(mockCourses);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "active" ? "#BDF052" : "#999999";
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          style={{
            backgroundColor: "#2a2a2a",
            borderColor: "#444444",
            borderWidth: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "0.875rem", color: "#E9EEEA", margin: 0 }}>
                Total Courses
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  color: "#FFFFFF",
                }}
              >
                {courses.length}
              </h3>
            </div>
            <div
              style={{
                height: 48,
                width: 48,
                borderRadius: 8,
                backgroundColor: "#BDF052",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconEye size={24} color="#222222" />
            </div>
          </div>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          style={{
            backgroundColor: "#2a2a2a",
            borderColor: "#444444",
            borderWidth: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "0.875rem", color: "#E9EEEA", margin: 0 }}>
                Active
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  color: "#FFFFFF",
                }}
              >
                {courses.filter((c) => c.status === "active").length}
              </h3>
            </div>
            <div
              style={{
                height: 48,
                width: 48,
                borderRadius: 8,
                backgroundColor: "#B3A1FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconCheck size={24} color="#222222" />
            </div>
          </div>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          style={{
            backgroundColor: "#2a2a2a",
            borderColor: "#444444",
            borderWidth: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "0.875rem", color: "#E9EEEA", margin: 0 }}>
                Total Enrolled
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  color: "#FFFFFF",
                }}
              >
                {courses.reduce((sum, c) => sum + c.enrolled, 0)}
              </h3>
            </div>
            <div
              style={{
                height: 48,
                width: 48,
                borderRadius: 8,
                backgroundColor: "#F6ACAE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconUsers size={24} color="#222222" />
            </div>
          </div>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          style={{
            backgroundColor: "#2a2a2a",
            borderColor: "#444444",
            borderWidth: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "0.875rem", color: "#E9EEEA", margin: 0 }}>
                Archived
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  color: "#FFFFFF",
                }}
              >
                {courses.filter((c) => c.status === "archived").length}
              </h3>
            </div>
            <div
              style={{
                height: 48,
                width: 48,
                borderRadius: 8,
                backgroundColor: "#E9EEEA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconArchive size={24} color="#222222" />
            </div>
          </div>
        </Card>
      </div>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{
          backgroundColor: "#2a2a2a",
          borderColor: "#444444",
          borderWidth: 1,
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <TextInput
            placeholder="Search by course title or instructor..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            style={{
              input: {
                backgroundColor: "#1a1a1a",
                borderColor: "#444444",
                color: "#FFFFFF",
              },
            }}
          />
        </div>

        <Table highlightOnHover striped style={{ borderCollapse: "collapse" }}>
          <Table.Thead>
            <Table.Tr
              style={{ borderBottomColor: "#444444", borderBottomWidth: 1 }}
            >
              <Table.Th
                style={{ color: "#BDF052", borderBottomColor: "#444444" }}
              >
                Course
              </Table.Th>
              <Table.Th
                style={{ color: "#BDF052", borderBottomColor: "#444444" }}
              >
                Instructor
              </Table.Th>
              <Table.Th
                style={{ color: "#BDF052", borderBottomColor: "#444444" }}
              >
                Enrolled
              </Table.Th>
              <Table.Th
                style={{ color: "#BDF052", borderBottomColor: "#444444" }}
              >
                Status
              </Table.Th>
              <Table.Th
                style={{ color: "#BDF052", borderBottomColor: "#444444" }}
              >
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredCourses.map((course, index) => (
              <Table.Tr
                key={course.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#323232",
                  borderBottomColor: "#3a3a3a",
                  borderBottomWidth: 1,
                }}
              >
                <Table.Td
                  style={{ color: "#FFFFFF", borderBottomColor: "#3a3a3a" }}
                >
                  <div style={{ fontWeight: 500 }}>{course.title}</div>
                </Table.Td>
                <Table.Td
                  style={{ color: "#E9EEEA", borderBottomColor: "#3a3a3a" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Avatar size="sm" radius="xl" color="blue">
                      {course.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#FFFFFF",
                      }}
                    >
                      {course.instructor}
                    </div>
                  </div>
                </Table.Td>
                <Table.Td
                  style={{ color: "#E9EEEA", borderBottomColor: "#3a3a3a" }}
                >
                  {course.enrolled}
                </Table.Td>
                <Table.Td style={{ borderBottomColor: "#3a3a3a" }}>
                  <Badge
                    style={{
                      backgroundColor: getStatusColor(course.status),
                      color: "#222222",
                    }}
                    variant="filled"
                  >
                    {course.status}
                  </Badge>
                </Table.Td>
                <Table.Td style={{ borderBottomColor: "#3a3a3a" }}>
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <ActionIcon
                        variant="subtle"
                        size="sm"
                        style={{ color: "#B3A1FF" }}
                      >
                        <IconDots size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown
                      style={{
                        backgroundColor: "#2a2a2a",
                        borderColor: "#444444",
                      }}
                    >
                      <Menu.Item
                        leftSection={<IconEye size={14} />}
                        style={{ color: "#FFFFFF" }}
                      >
                        View Details
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconEdit size={14} />}
                        style={{ color: "#FFFFFF" }}
                      >
                        Edit Course
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconArchive size={14} />}
                        style={{ color: "#F6ACAE" }}
                      >
                        Archive Course
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {filteredCourses.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "2rem", color: "#999999" }}
          >
            No courses found matching your search.
          </div>
        )}
      </Card>
    </div>
  );
}
