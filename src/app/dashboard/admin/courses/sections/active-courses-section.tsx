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
    return status === "active" ? "green" : "gray";
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card shadow="sm" padding="lg" radius="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "0.875rem", color: "#868e96", margin: 0 }}>
                Total Courses
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                }}
              >
                {courses.length}
              </h3>
            </div>
          </div>
        </Card>

        <Card shadow="sm" padding="lg" radius="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "0.875rem", color: "#868e96", margin: 0 }}>
                Active
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                }}
              >
                {courses.filter((c) => c.status === "active").length}
              </h3>
            </div>
          </div>
        </Card>

        <Card shadow="sm" padding="lg" radius="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "0.875rem", color: "#868e96", margin: 0 }}>
                Total Enrolled
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                }}
              >
                {courses.reduce((sum, c) => sum + c.enrolled, 0)}
              </h3>
            </div>
          </div>
        </Card>

        <Card shadow="sm" padding="lg" radius="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "0.875rem", color: "#868e96", margin: 0 }}>
                Archived
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                }}
              >
                {courses.filter((c) => c.status === "archived").length}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      <Card shadow="sm" padding="lg" radius="md">
        <div style={{ marginBottom: "1rem" }}>
          <TextInput
            placeholder="Search by course title or instructor..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
        </div>

        <Table highlightOnHover striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Course</Table.Th>
              <Table.Th>Instructor</Table.Th>
              <Table.Th>Enrolled</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredCourses.map((course) => (
              <Table.Tr key={course.id}>
                <Table.Td>
                  <div style={{ fontWeight: 500 }}>{course.title}</div>
                </Table.Td>
                <Table.Td>
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
                    <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      {course.instructor}
                    </div>
                  </div>
                </Table.Td>
                <Table.Td>{course.enrolled}</Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(course.status)} variant="light">
                    {course.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <ActionIcon variant="subtle" size="sm">
                        <IconDots size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item leftSection={<IconEye size={14} />}>
                        View Details
                      </Menu.Item>
                      <Menu.Item leftSection={<IconEdit size={14} />}>
                        Edit Course
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconArchive size={14} />}
                        color="orange"
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
            style={{ textAlign: "center", padding: "2rem", color: "#868e96" }}
          >
            No courses found matching your search.
          </div>
        )}
      </Card>
    </div>
  );
}
