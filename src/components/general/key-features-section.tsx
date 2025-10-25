"use client";

import {
  Box,
  Container,
  Grid,
  Card,
  Title,
  Text,
  ThemeIcon,
  Stack,
  Badge,
} from "@mantine/core";
import { Brain, Code2, Users, Trophy } from "lucide-react";

export function KeyFeaturesSection() {
  const features = [
    {
      icon: <Brain size={32} />,
      title: "AI-Powered Code Checker",
      description:
        "Automatically grades coding activities with system case and manual override options.",
      color: "#B3A1FF",
    },
    {
      icon: <Code2 size={32} />,
      title: "Real-Time Compiler",
      description:
        "Test code directly in-browser with support for Java, Python, and C.",
      color: "#BDF052",
    },
    {
      icon: <Users size={32} />,
      title: "Course & Assignment Management",
      description: "Organize modules, lessons, and assignments seamlessly.",
      color: "#F6ACAE",
    },
    {
      icon: <Trophy size={32} />,
      title: "Certificates & Progress Tracking",
      description:
        "Auto-approved certificates based on progress with detailed analytics.",
      color: "#B3A1FF",
    },
  ];

  return (
    <Box
      id="features"
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
              fontWeight: 600,
              fontSize: "14px",
              border: "1px solid #BDF052",
            }}
          >
            Key Features
          </Badge>
          <Title
            order={2}
            ta="center"
            size="3rem"
            fw={800}
            style={{ color: "#FFFFFF" }}
          >
            Everything you need to teach and learn
          </Title>
          <Text
            ta="center"
            size="xl"
            maw={700}
            style={{ color: "#E9EEEA", opacity: 0.8 }}
          >
            Powerful tools for instructors and students to create and master
            programming skills
          </Text>
        </Stack>

        <Grid>
          {features.map((feature, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 6 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                h="100%"
                style={{
                  background: "#2a2a2a",
                  border: `2px solid ${feature.color}40`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 12px 30px ${feature.color}30`;
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.borderColor = `${feature.color}40`;
                }}
              >
                <Stack gap="md">
                  <ThemeIcon
                    size={60}
                    radius="md"
                    style={{
                      background: `${feature.color}20`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </ThemeIcon>
                  <Title
                    order={3}
                    size="h3"
                    fw={700}
                    style={{ color: "#FFFFFF" }}
                  >
                    {feature.title}
                  </Title>
                  <Text
                    size="md"
                    style={{ color: "#E9EEEA", opacity: 0.8, lineHeight: 1.6 }}
                  >
                    {feature.description}
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
