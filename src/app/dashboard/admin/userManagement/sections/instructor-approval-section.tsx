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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Card
        shadow="md"
        padding="lg"
        radius="md"
        withBorder
        style={{ backgroundColor: "#2a2a2a", borderColor: "#BDF052" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <IconClock size={20} color="#BDF052" />
          <div>
            <Text size="xl" fw={700} style={{ color: "#FFFFFF" }}>
              Pending Instructor Approvals
            </Text>
            <Text size="sm" style={{ color: "#E9EEEA" }}>
              Review and approve instructor applications
            </Text>
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {mockPendingInstructors.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <IconAlertCircle
                size={48}
                color="#BDF052"
                style={{ margin: "0 auto 1rem" }}
              />
              <Text style={{ color: "#E9EEEA" }}>No pending approvals</Text>
            </div>
          ) : (
            mockPendingInstructors.map((instructor) => (
              <Card
                key={instructor.id}
                shadow="xs"
                padding="lg"
                radius="md"
                withBorder
                style={{ backgroundColor: "#333333", borderColor: "#B3A1FF" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <Avatar
                    size="lg"
                    radius="xl"
                    style={{ backgroundColor: "#B3A1FF" }}
                  >
                    {instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>

                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <Text fw={600} style={{ color: "#FFFFFF" }}>
                        {instructor.name}
                      </Text>
                      <Badge
                        style={{ backgroundColor: "#B3A1FF", color: "#222222" }}
                      >
                        {instructor.specialization}
                      </Badge>
                    </div>
                    <Text size="sm" style={{ color: "#E9EEEA" }}>
                      {instructor.email}
                    </Text>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      <Text size="xs" style={{ color: "#E9EEEA" }}>
                        Applied: {instructor.appliedDate}
                      </Text>
                      <Text size="xs" style={{ color: "#E9EEEA" }}>
                        Experience: {instructor.experience}
                      </Text>
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                  >
                    <Button
                      variant="default"
                      size="sm"
                      leftSection={<IconEye size={16} />}
                      onClick={() => handleViewDetails(instructor)}
                      style={{ backgroundColor: "#444444", color: "#FFFFFF" }}
                    >
                      View
                    </Button>
                    <Button
                      variant="filled"
                      size="sm"
                      leftSection={<IconCheck size={16} />}
                      style={{ backgroundColor: "#BDF052", color: "#222222" }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="filled"
                      size="sm"
                      leftSection={<IconX size={16} />}
                      style={{ backgroundColor: "#F6ACAE", color: "#222222" }}
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
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: "#2a2a2a", borderColor: "#BDF052" }}
          >
            <Text size="sm" style={{ color: "#E9EEEA" }} mb="xs">
              Pending Approvals
            </Text>
            <Text size="2rem" fw={700} style={{ color: "#BDF052" }}>
              {mockPendingInstructors.length}
            </Text>
            <Text size="xs" style={{ color: "#E9EEEA" }} mt="xs">
              Requires immediate attention
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
              Approved This Month
            </Text>
            <Text size="2rem" fw={700} style={{ color: "#B3A1FF" }}>
              12
            </Text>
            <Text size="xs" style={{ color: "#E9EEEA" }} mt="xs">
              +3 from last month
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
              Rejection Rate
            </Text>
            <Text size="2rem" fw={700} style={{ color: "#F6ACAE" }}>
              8%
            </Text>
            <Text size="xs" style={{ color: "#E9EEEA" }} mt="xs">
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
        styles={{
          content: { backgroundColor: "#2a2a2a" },
          header: { backgroundColor: "#2a2a2a", borderColor: "#BDF052" },
          title: { color: "#FFFFFF" },
        }}
      >
        {selectedInstructor && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Avatar
                size="xl"
                radius="xl"
                style={{ backgroundColor: "#B3A1FF" }}
              >
                {selectedInstructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <div>
                <Text size="lg" fw={600} style={{ color: "#FFFFFF" }}>
                  {selectedInstructor.name}
                </Text>
                <Text size="sm" style={{ color: "#E9EEEA" }}>
                  {selectedInstructor.email}
                </Text>
              </div>
            </div>

            <Grid>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb={4} style={{ color: "#BDF052" }}>
                  Specialization
                </Text>
                <Text size="sm" style={{ color: "#E9EEEA" }}>
                  {selectedInstructor.specialization}
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb={4} style={{ color: "#BDF052" }}>
                  Experience
                </Text>
                <Text size="sm" style={{ color: "#E9EEEA" }}>
                  {selectedInstructor.experience}
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text size="sm" fw={500} mb={4} style={{ color: "#BDF052" }}>
                  Qualifications
                </Text>
                <Text size="sm" style={{ color: "#E9EEEA" }}>
                  {selectedInstructor.qualifications}
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb={4} style={{ color: "#BDF052" }}>
                  Applied Date
                </Text>
                <Text size="sm" style={{ color: "#E9EEEA" }}>
                  {selectedInstructor.appliedDate}
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb={4} style={{ color: "#BDF052" }}>
                  Status
                </Text>
                <Badge style={{ backgroundColor: "#B3A1FF", color: "#222222" }}>
                  {selectedInstructor.status}
                </Badge>
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
              <Button
                variant="default"
                onClick={() => setIsModalOpen(false)}
                style={{ backgroundColor: "#444444", color: "#FFFFFF" }}
              >
                Close
              </Button>
              <Button
                leftSection={<IconX size={16} />}
                style={{ backgroundColor: "#F6ACAE", color: "#222222" }}
              >
                Reject
              </Button>
              <Button
                leftSection={<IconCheck size={16} />}
                style={{ backgroundColor: "#BDF052", color: "#222222" }}
              >
                Approve
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
