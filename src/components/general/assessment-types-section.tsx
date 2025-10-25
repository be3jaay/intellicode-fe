"use client";

import {
  Box,
  Container,
  Stack,
  Grid,
  Card,
  Badge,
  Title,
  Text,
  Tabs,
  List,
  ThemeIcon,
} from "@mantine/core";
import { Code2, FileText, ClipboardCheck, CheckCircle } from "lucide-react";
import { useState } from "react";

export function AssessmentTypesSection() {
  const [activeTab, setActiveTab] = useState<string | null>("activities");

  const assessmentTypes = [
    {
      value: "activities",
      label: "Activities",
      icon: <Code2 size={24} />,
      title: "Interactive Coding Activities",
      description: "Hands-on practice with immediate feedback",
      features: [
        "Code Sandbox with syntax highlighting",
        "Real-time code execution",
        "Multiple choice and true/false quizzes",
        "Instant AI-powered feedback",
      ],
      color: "#BDF052",
    },
    {
      value: "assignments",
      label: "Assignments",
      icon: <FileText size={24} />,
      title: "Comprehensive Assignments",
      description: "Deeper learning through structured tasks",
      features: [
        "File upload support",
        "Complex coding challenges",
        "Manual and automated grading",
        "Detailed rubric-based evaluation",
      ],
      color: "#B3A1FF",
    },
    {
      value: "exams",
      label: "Exams",
      icon: <ClipboardCheck size={24} />,
      title: "Secure Examinations",
      description: "Comprehensive assessments with mixed question types",
      features: [
        "Secure browser environment",
        "Time-limited testing",
        "Multiple question formats",
        "Anti-cheating measures",
      ],
      color: "#F6ACAE",
    },
  ];

  const activeAssessment =
    assessmentTypes.find((type) => type.value === activeTab) ||
    assessmentTypes[0];

  return (
    <Box
      py={100}
      style={{
        background: "#1a1a1a",
      }}
    >
      <Container size="xl">
        <Stack align="center" gap="lg" mb={70}>
          <Badge
            size="xl"
            variant="light"
            style={{
              background: "#BDF05210",
              color: "#BDF052",
              border: "1px solid #BDF052",
              fontWeight: 600,
              padding: "12px 20px",
              fontSize: "14px",
            }}
          >
            Assessment Types
          </Badge>
          <Title
            order={2}
            ta="center"
            size="3rem"
            fw={800}
            style={{ color: "#FFFFFF" }}
          >
            Flexible Evaluation Methods
          </Title>
          <Text
            ta="center"
            size="xl"
            maw={700}
            style={{ color: "#E9EEEA", opacity: 0.8 }}
          >
            Multiple assessment formats to match your teaching style
          </Text>
        </Stack>

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          variant="pills"
          radius="md"
        >
          <Tabs.List
            grow
            style={{
              marginBottom: 40,
              background: "#2a2a2a",
              padding: 8,
              borderRadius: 12,
            }}
          >
            {assessmentTypes.map((type) => (
              <Tabs.Tab
                key={type.value}
                value={type.value}
                leftSection={type.icon}
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  padding: "14px 24px",
                  color: activeTab === type.value ? "#222222" : "#E9EEEA",
                  background:
                    activeTab === type.value ? type.color : "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                {type.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {assessmentTypes.map((type) => (
            <Tabs.Panel key={type.value} value={type.value}>
              <Card
                shadow="lg"
                padding="xl"
                radius="lg"
                style={{
                  background: "#2a2a2a",
                  border: `2px solid ${type.color}`,
                }}
              >
                <Grid align="center" gutter={60}>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap="lg">
                      <ThemeIcon
                        size={80}
                        radius="lg"
                        style={{
                          background: type.color,
                          color: "#FFFFFF",
                        }}
                      >
                        {type.icon}
                      </ThemeIcon>
                      <Title
                        order={3}
                        size="h2"
                        fw={700}
                        style={{ color: "#FFFFFF" }}
                      >
                        {type.title}
                      </Title>
                      <Text
                        size="lg"
                        style={{ color: "#E9EEEA", opacity: 0.8 }}
                      >
                        {type.description}
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <List
                      spacing="lg"
                      size="md"
                      icon={
                        <ThemeIcon
                          size={28}
                          radius="xl"
                          style={{
                            background: type.color,
                            color: "#FFFFFF",
                          }}
                        >
                          <CheckCircle size={16} />
                        </ThemeIcon>
                      }
                    >
                      {type.features.map((feature, idx) => (
                        <List.Item key={idx}>
                          <Text size="md" fw={500} style={{ color: "#E9EEEA" }}>
                            {feature}
                          </Text>
                        </List.Item>
                      ))}
                    </List>
                  </Grid.Col>
                </Grid>
              </Card>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Container>
    </Box>
  );
}
