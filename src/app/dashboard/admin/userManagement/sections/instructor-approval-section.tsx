"use client";

import { useState } from "react";
import { Card, Button, Badge, Avatar, Modal, Text, Grid } from "@mantine/core";
import {
  IconCheck,
  IconX,
  IconEye,
  IconClock,
  IconAlertCircle,
} from "@tabler/icons-react";
import { mockPendingInstructors } from "./mock-data";

export function InstructorApprovalSection() {
  const [selectedInstructor, setSelectedInstructor] = useState<
    (typeof mockPendingInstructors)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (
    instructor: (typeof mockPendingInstructors)[0]
  ) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="flex items-center gap-2 mb-6">
          <IconClock size={20} color="#868e96" />
          <div>
            <Text size="xl" fw={700}>
              Pending Instructor Approvals
            </Text>
            <Text size="sm" c="dimmed">
              Review and approve instructor applications
            </Text>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {mockPendingInstructors.length === 0 ? (
            <div className="text-center py-12">
              <IconAlertCircle
                size={48}
                color="#868e96"
                className="mx-auto mb-4"
              />
              <Text c="dimmed">No pending approvals</Text>
            </div>
          ) : (
            mockPendingInstructors.map((instructor) => (
              <Card
                key={instructor.id}
                shadow="xs"
                padding="lg"
                radius="md"
                withBorder
              >
                <div className="flex flex-col gap-4">
                  {/* Header with Avatar and Basic Info */}
                  <div className="flex items-start gap-4">
                    <Avatar
                      size="lg"
                      radius="xl"
                      color="violet"
                      className="shrink-0"
                    >
                      {instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <Text
                          fw={600}
                          size="lg"
                          className="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {instructor.name}
                        </Text>
                        <Badge
                          variant="light"
                          size="sm"
                          className="self-start sm:self-center"
                        >
                          {instructor.specialization}
                        </Badge>
                      </div>
                      <Text
                        size="sm"
                        c="dimmed"
                        className="overflow-hidden text-ellipsis whitespace-nowrap mb-3"
                      >
                        {instructor.email}
                      </Text>

                      {/* Additional Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>
                          <span className="font-medium">Applied:</span>{" "}
                          {instructor.appliedDate}
                        </div>
                        <div>
                          <span className="font-medium">Experience:</span>{" "}
                          {instructor.experience}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap sm:justify-end justify-stretch">
                    <Button
                      variant="default"
                      size="sm"
                      leftSection={<IconEye size={16} />}
                      onClick={() => handleViewDetails(instructor)}
                      className="flex-1 sm:flex-initial min-w-0"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="filled"
                      size="sm"
                      leftSection={<IconCheck size={16} />}
                      className="flex-1 sm:flex-initial min-w-0"
                      color="green"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="filled"
                      color="red"
                      size="sm"
                      leftSection={<IconX size={16} />}
                      className="flex-1 sm:flex-initial min-w-0"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>

      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              Pending Approvals
            </Text>
            <Text size="2rem" fw={700}>
              {mockPendingInstructors.length}
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              Requires immediate attention
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              Approved This Month
            </Text>
            <Text size="2rem" fw={700}>
              12
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              +3 from last month
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              Rejection Rate
            </Text>
            <Text size="2rem" fw={700}>
              8%
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              -2% from last month
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Instructor Application Details"
        size="lg"
      >
        {selectedInstructor && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Avatar size="xl" radius="xl" color="violet">
                {selectedInstructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <div>
                <Text size="lg" fw={600}>
                  {selectedInstructor.name}
                </Text>
                <Text size="sm" c="dimmed">
                  {selectedInstructor.email}
                </Text>
              </div>
            </div>

            <Grid>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb={4}>
                  Specialization
                </Text>
                <Text size="sm" c="dimmed">
                  {selectedInstructor.specialization}
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb={4}>
                  Experience
                </Text>
                <Text size="sm" c="dimmed">
                  {selectedInstructor.experience}
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text size="sm" fw={500} mb={4}>
                  Qualifications
                </Text>
                <Text size="sm" c="dimmed">
                  {selectedInstructor.qualifications}
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb={4}>
                  Applied Date
                </Text>
                <Text size="sm" c="dimmed">
                  {selectedInstructor.appliedDate}
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb={4}>
                  Status
                </Text>
                <Badge variant="light">{selectedInstructor.status}</Badge>
              </Grid.Col>
            </Grid>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Button variant="default" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button color="red" leftSection={<IconX size={16} />}>
                Reject
              </Button>
              <Button leftSection={<IconCheck size={16} />}>Approve</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
