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
                Pending Courses
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
            <div
              style={{
                height: 48,
                width: 48,
                borderRadius: 8,
                backgroundColor: "#fff3bf",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconEye size={24} color="#fab005" />
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
                This Week
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
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
                backgroundColor: "#d0ebff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconCheck size={24} color="#228be6" />
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
                Total Instructors
              </p>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
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
                backgroundColor: "#e7f5ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconDots size={24} color="#4c6ef5" />
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
              <Table.Th>Submitted</Table.Th>
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
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        {course.instructor}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#868e96" }}>
                        {course.instructorEmail}
                      </div>
                    </div>
                  </div>
                </Table.Td>
                <Table.Td>
                  {new Date(course.submittedDate).toLocaleDateString()}
                </Table.Td>
                <Table.Td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      size="xs"
                      color="green"
                      onClick={() => handleApprove(course.id)}
                    >
                      <IconCheck size={14} />
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => handleReject(course.id)}
                    >
                      <IconX size={14} />
                    </Button>
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <ActionIcon variant="subtle" size="sm">
                          <IconDots size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<IconEye size={14} />}
                          onClick={() => handleViewDetails(course)}
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
            style={{ textAlign: "center", padding: "2rem", color: "#868e96" }}
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
      >
        {selectedCourse && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                {selectedCourse.title}
              </h3>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#868e96",
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
                  <div style={{ fontWeight: 500 }}>
                    {selectedCourse.instructor}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#868e96" }}>
                    {selectedCourse.instructorEmail}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#868e96",
                  marginBottom: "0.25rem",
                }}
              >
                Submitted Date
              </p>
              <p style={{ fontWeight: 500 }}>
                {new Date(selectedCourse.submittedDate).toLocaleDateString()}
              </p>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#868e96",
                  marginBottom: "0.25rem",
                }}
              >
                Description
              </p>
              <p style={{ lineHeight: 1.6 }}>{selectedCourse.description}</p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="red"
                onClick={() => handleReject(selectedCourse.id)}
              >
                Reject Course
              </Button>
              <Button
                color="green"
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
