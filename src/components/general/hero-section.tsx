"use client";

import {
  Container,
  Group,
  Text,
  Stack,
  Grid,
  Badge,
  Title,
  Center,
  ThemeIcon,
  Flex,
  Box,
} from "@mantine/core";
import { Check, Brain, ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { LottieAnimation } from "../lottie/lottie";
import intellicode from "@/components/lottie/lottie-json/intellicode.json";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <Box
      py={120}
      style={{
        background: "#2a2a2a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(189, 240, 82, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(179, 161, 255, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />

      <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
        <Grid align="center" gutter={60}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Badge
                size="xl"
                variant="light"
                leftSection={<Brain size={18} />}
                style={{
                  background: "#BDF05210",
                  color: "#BDF052",
                  fontWeight: 600,
                  fontSize: "14px",
                  border: "1px solid #BDF052",
                }}
              >
                AI-Powered Learning Platform
              </Badge>

              <Title
                order={1}
                size="3.5rem"
                style={{
                  lineHeight: 1.1,
                  color: "#fff",
                }}
              >
                Personalized Coding Assessments{" "}
                <Text
                  size="3.5rem"
                  fw={800}
                  span
                  style={{
                    background:
                      "linear-gradient(135deg, #BDF052 0%, #8bc232 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Powered by AI
                </Text>
              </Title>

              <Text
                size="xl"
                style={{
                  lineHeight: 1.7,
                  color: "white",
                  opacity: 0.9,
                }}
              >
                Empower students and instructors with intelligent tools for
                coding education and evaluation.
              </Text>

              <Flex gap="md" wrap="wrap">
                <Button
                  size="lg"
                  style={{
                    background: "#BDF052",
                    color: "#222222",
                    border: "none",
                    fontWeight: 600,
                    padding: "14px 32px",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                  rightIcon={<ArrowRight size={20} />}
                  onClick={() => router.push("/sign-up")}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Text c="white">Learn More</Text>
                </Button>
              </Flex>

              <Group gap="xl" mt="md">
                <Group gap="xs">
                  <ThemeIcon
                    size="sm"
                    style={{
                      background: "#BDF052",
                      color: "#222222",
                    }}
                  >
                    <Check size={14} />
                  </ThemeIcon>
                  <Text size="sm" style={{ color: "#fff", fontWeight: 500 }}>
                    Real-time compiler
                  </Text>
                </Group>
                <Group gap="xs">
                  <ThemeIcon
                    size="sm"
                    style={{
                      background: "#BDF052",
                      color: "#222222",
                    }}
                  >
                    <Check size={14} />
                  </ThemeIcon>
                  <Text size="sm" style={{ color: "#fff", fontWeight: 500 }}>
                    AI grading
                  </Text>
                </Group>
                <Group gap="xs">
                  <ThemeIcon
                    size="sm"
                    style={{
                      background: "#BDF052",
                      color: "#222222",
                    }}
                  >
                    <Check size={14} />
                  </ThemeIcon>
                  <Text size="sm" style={{ color: "#fff", fontWeight: 500 }}>
                    Progress tracking
                  </Text>
                </Group>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Center h="100%">
              <Box style={{ position: "relative" }}>
                <LottieAnimation
                  animationData={intellicode}
                  width={500}
                  height={500}
                />
              </Box>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
