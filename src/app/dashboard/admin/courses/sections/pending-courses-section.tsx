"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  TextInput,
  Avatar,
  Menu,
  ActionIcon,
} from "@mantine/core";
import {
  IconSearch,
  IconCheck,
  IconX,
  IconDots,
  IconEye,
} from "@tabler/icons-react";
import { mockPendingCourses, PendingCourse } from "../mock-data";

export function PendingCoursesSection() {
  const [courses, setCourses] = useState<PendingCourse[]>(mockPendingCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<PendingCourse | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (courseId: number) => {
    setCourses(courses.filter((course) => course.id !== courseId));
    setIsModalOpen(false);
  };

  const handleReject = (courseId: number) => {
    setCourses(courses.filter((course) => course.id !== courseId));
    setIsModalOpen(false);
  };

  const handleViewDetails = (course: PendingCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                Pending Courses
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
                This Week
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  color: "#FFFFFF",
                }}
              >
                {
                  courses.filter(
                    (c) =>
                      new Date(c.submittedDate) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length
                }
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
                Total Instructors
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  color: "#FFFFFF",
                }}
              >
                {new Set(courses.map((c) => c.instructor)).size}
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
              <IconDots size={24} color="#222222" />
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
                Submitted
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
                    <div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "#FFFFFF",
                        }}
                      >
                        {course.instructor}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#999999" }}>
                        {course.instructorEmail}
                      </div>
                    </div>
                  </div>
                </Table.Td>
                <Table.Td
                  style={{ color: "#E9EEEA", borderBottomColor: "#3a3a3a" }}
                >
                  {new Date(course.submittedDate).toLocaleDateString()}
                </Table.Td>
                <Table.Td style={{ borderBottomColor: "#3a3a3a" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      size="xs"
                      style={{ backgroundColor: "#BDF052", color: "#222222" }}
                      onClick={() => handleApprove(course.id)}
                    >
                      <IconCheck size={14} />
                    </Button>
                    <Button
                      size="xs"
                      style={{ backgroundColor: "#F6ACAE", color: "#222222" }}
                      onClick={() => handleReject(course.id)}
                    >
                      <IconX size={14} />
                    </Button>
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
                          onClick={() => handleViewDetails(course)}
                          style={{ color: "#FFFFFF" }}
                        >
                          View Details
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {filteredCourses.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "2rem", color: "#999999" }}
          >
            {searchQuery
              ? "No courses found matching your search."
              : "No pending courses at this time."}
          </div>
        )}
      </Card>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Course Details"
        size="lg"
        styles={{
          content: { backgroundColor: "#2a2a2a" },
          header: { backgroundColor: "#2a2a2a", borderBottomColor: "#444444" },
          title: { color: "#FFFFFF" },
        }}
      >
        {selectedCourse && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  color: "#FFFFFF",
                }}
              >
                {selectedCourse.title}
              </h3>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#E9EEEA",
                  marginBottom: "0.25rem",
                }}
              >
                Instructor
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Avatar size="md" radius="xl" color="blue">
                  {selectedCourse.instructor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <div>
                  <div style={{ fontWeight: 500, color: "#FFFFFF" }}>
                    {selectedCourse.instructor}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#999999" }}>
                    {selectedCourse.instructorEmail}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#E9EEEA",
                  marginBottom: "0.25rem",
                }}
              >
                Submitted Date
              </p>
              <p style={{ fontWeight: 500, color: "#FFFFFF" }}>
                {new Date(selectedCourse.submittedDate).toLocaleDateString()}
              </p>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#E9EEEA",
                  marginBottom: "0.25rem",
                }}
              >
                Description
              </p>
              <p style={{ lineHeight: 1.6, color: "#E9EEEA" }}>
                {selectedCourse.description}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{ backgroundColor: "#F6ACAE", color: "#222222" }}
                onClick={() => handleReject(selectedCourse.id)}
              >
                Reject Course
              </Button>
              <Button
                style={{ backgroundColor: "#BDF052", color: "#222222" }}
                onClick={() => handleApprove(selectedCourse.id)}
              >
                Approve Course
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
