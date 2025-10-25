"use client";

import {
  Box,
  Container,
  Grid,
  Group,
  Text,
  Stack,
  Anchor,
  Divider,
} from "@mantine/core";
import { Brain } from "lucide-react";

export function FooterSection() {
  return (
    <Box
      py={80}
      style={{
        background: "#222222",
      }}
    >
      <Container size="xl">
        <Grid gutter={60}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Group mb="lg" gap="xs">
              <Brain size={32} color="#BDF052" />
              <Text size="xl" fw={800} style={{ color: "#FFFFFF" }}>
                Intellicode
              </Text>
            </Group>
            <Text
              size="sm"
              mb="xl"
              style={{ color: "#E9EEEA", opacity: 0.7, lineHeight: 1.7 }}
            >
              AI-powered learning platform for personalized coding assessment
              and education. Master programming through intelligent evaluation.
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Text fw={700} mb="md" style={{ color: "#FFFFFF" }}>
                  Navigation
                </Text>
                <Stack gap="xs">
                  <Anchor
                    href="#features"
                    size="sm"
                    style={{ color: "#E9EEEA", opacity: 0.7 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#BDF052";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#E9EEEA";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                  >
                    Features
                  </Anchor>
                  <Anchor
                    href="#workflow"
                    size="sm"
                    style={{ color: "#E9EEEA", opacity: 0.7 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#BDF052";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#E9EEEA";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                  >
                    Course Workflow
                  </Anchor>
                  <Anchor
                    href="#testimonials"
                    size="sm"
                    style={{ color: "#E9EEEA", opacity: 0.7 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#BDF052";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#E9EEEA";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                  >
                    Testimonials
                  </Anchor>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Text fw={700} mb="md" style={{ color: "#FFFFFF" }}>
                  Platform
                </Text>
                <Stack gap="xs">
                  <Anchor
                    href="/sign-in"
                    size="sm"
                    style={{ color: "#E9EEEA", opacity: 0.7 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#BDF052";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#E9EEEA";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                  >
                    Login
                  </Anchor>
                  <Anchor
                    href="/sign-up"
                    size="sm"
                    style={{ color: "#E9EEEA", opacity: 0.7 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#BDF052";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#E9EEEA";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                  >
                    Sign Up
                  </Anchor>
                  <Anchor
                    href="/dashboard"
                    size="sm"
                    style={{ color: "#E9EEEA", opacity: 0.7 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#BDF052";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#E9EEEA";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                  >
                    Dashboard
                  </Anchor>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Text fw={700} mb="md" style={{ color: "#FFFFFF" }}>
                  Connect
                </Text>
                <Stack gap="xs">
                  <Text size="sm" style={{ color: "#E9EEEA", opacity: 0.7 }}>
                    Follow us on social media for updates and coding tips.
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <Divider my="xl" style={{ borderColor: "#E9EEEA", opacity: 0.2 }} />

        <Text size="sm" ta="center" style={{ color: "#E9EEEA", opacity: 0.6 }}>
          © 2025 Intellicode. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
