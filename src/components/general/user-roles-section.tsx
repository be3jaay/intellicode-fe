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
  List,
} from "@mantine/core";
import { Shield, GraduationCap, BookOpen } from "lucide-react";

export function UserRolesSection() {
  const roles = [
    {
      icon: <Shield size={40} />,
      title: "Admin / Program Head",
      description: "Complete oversight and control",
      features: [
        "Manage user roles and permissions",
        "Approve instructor applications",
        "Generate and issue certificates",
        "Monitor platform analytics",
      ],
      color: "#F6ACAE",
    },
    {
      icon: <GraduationCap size={40} />,
      title: "Instructor",
      description: "Create and manage learning content",
      features: [
        "Build courses and modules",
        "Create assignments and exams",
        "Grade student submissions",
        "Track student progress",
      ],
      color: "#B3A1FF",
    },
    {
      icon: <BookOpen size={40} />,
      title: "Student",
      description: "Learn and grow your skills",
      features: [
        "Enroll in courses",
        "Complete coding activities",
        "Receive AI-powered feedback",
        "Earn certificates",
      ],
      color: "#BDF052",
    },
  ];

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
            User Roles
          </Badge>
          <Title
            order={2}
            ta="center"
            size="3rem"
            fw={800}
            style={{ color: "#FFFFFF" }}
          >
            Tailored Experience for Everyone
          </Title>
          <Text
            ta="center"
            size="xl"
            maw={700}
            style={{ color: "#E9EEEA", opacity: 0.8 }}
          >
            Three distinct roles with specialized features and dashboards
          </Text>
        </Stack>

        <Grid gutter={40}>
          {roles.map((role, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <Card
                shadow="lg"
                padding="xl"
                radius="lg"
                h="100%"
                style={{
                  background: "#2a2a2a",
                  border: `3px solid ${role.color}60`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = `0 20px 40px ${role.color}40`;
                  e.currentTarget.style.borderColor = role.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.borderColor = `${role.color}60`;
                }}
              >
                <Stack gap="lg" align="center">
                  <Box
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${role.color} 0%, ${role.color}CC 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    {role.icon}
                  </Box>
                  <Stack gap="xs" align="center">
                    <Title
                      order={3}
                      size="h3"
                      fw={700}
                      ta="center"
                      style={{ color: "#FFFFFF" }}
                    >
                      {role.title}
                    </Title>
                    <Text
                      size="sm"
                      ta="center"
                      style={{ color: "#E9EEEA", opacity: 0.7 }}
                    >
                      {role.description}
                    </Text>
                  </Stack>
                  <List
                    spacing="sm"
                    size="sm"
                    style={{ width: "100%" }}
                    icon={
                      <ThemeIcon
                        size={20}
                        radius="xl"
                        style={{
                          background: role.color,
                          color: "#FFFFFF",
                        }}
                      >
                        •
                      </ThemeIcon>
                    }
                  >
                    {role.features.map((feature, idx) => (
                      <List.Item key={idx}>
                        <Text
                          size="sm"
                          style={{ color: "#E9EEEA", opacity: 0.9 }}
                        >
                          {feature}
                        </Text>
                      </List.Item>
                    ))}
                  </List>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
