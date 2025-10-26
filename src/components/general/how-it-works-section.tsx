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
  ThemeIcon,
} from "@mantine/core";
import { BookOpen, UserCheck, Sparkles, Award } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: <BookOpen size={32} />,
      title: "Course Creation",
      description:
        "Build courses with modules, lessons, and coding activities effortlessly.",
      stepNumber: 1,
      color: "#BDF052",
    },
    {
      icon: <UserCheck size={32} />,
      title: "Student Activities",
      description:
        "Students work on coding challenges and quizzes in Java, Python, and C.",
      stepNumber: 2,
      color: "#B3A1FF",
    },
    {
      icon: <Sparkles size={32} />,
      title: "AI Evaluation",
      description:
        "Real-time compiler and AI provide instant feedback and grading.",
      stepNumber: 3,
      color: "#F6ACAE",
    },
    {
      icon: <Award size={32} />,
      title: "Certification",
      description:
        "Monitor grades, progress, and automatically generate completion certificates.",
      stepNumber: 4,
      color: "#B3A1FF",
    },
  ];

  return (
    <Box
      id="workflow"
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
            Course Workflow
          </Badge>
          <Title
            order={2}
            ta="center"
            size="3rem"
            fw={800}
            style={{ color: "#FFFFFF" }}
          >
            Streamlined Learning Process
          </Title>
          <Text
            ta="center"
            size="xl"
            maw={700}
            style={{ color: "#E9EEEA", opacity: 0.8 }}
          >
            Four simple steps from course creation to certification
          </Text>
        </Stack>

        <Grid gutter={40}>
          {steps.map((step, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                h="100%"
                style={{
                  background: "#2a2a2a",
                  border: `2px solid ${step.color}40`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 12px 30px ${step.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0, 0, 0, 0.1)";
                }}
              >
                <Stack gap="md" align="center">
                  <Box
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "18px",
                      color: "#222222",
                    }}
                  >
                    {step.stepNumber}
                  </Box>
                  <ThemeIcon
                    size={70}
                    radius="lg"
                    style={{
                      background: `${step.color}20`,
                      color: step.color,
                    }}
                  >
                    {step.icon}
                  </ThemeIcon>
                  <Title
                    order={4}
                    size="h4"
                    fw={700}
                    ta="center"
                    style={{ color: "#FFFFFF" }}
                  >
                    {step.title}
                  </Title>
                  <Text
                    size="sm"
                    ta="center"
                    style={{ color: "#E9EEEA", opacity: 0.8, lineHeight: 1.6 }}
                  >
                    {step.description}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
