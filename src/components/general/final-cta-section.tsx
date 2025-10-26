"use client";

import { Container, Stack, Title, Text, Box, Group, Flex } from "@mantine/core";
import { ArrowRight, Award } from "lucide-react";
import { Button } from "../ui";
import { useRouter } from "next/navigation";

export function FinalCtaSection() {
  const router = useRouter();

  return (
    <Box
      py={100}
      style={{
        background: "linear-gradient(135deg, #B3A1FF 0%, #BDF052 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <Box
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34, 34, 34, 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
        <Stack align="center" gap="xl">
          <Box
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Award size={50} color="#222222" />
          </Box>

          <Title
            order={2}
            ta="center"
            size="3rem"
            fw={800}
            style={{ color: "#222222", maxWidth: 800 }}
          >
            Recognize Achievement with Verified Certificates
          </Title>

          <Text
            size="xl"
            ta="center"
            maw={700}
            style={{ color: "#222222", opacity: 0.8, lineHeight: 1.7 }}
          >
            Track student progress with AI-driven insights and automatically
            generate completion certificates. Transform your coding education
            today.
          </Text>

          <Flex gap="md" wrap="wrap" justify="center" mt="md">
            <Button
              size="xl"
              style={{
                background: "#222222",
                color: "#FFFFFF",
                border: "none",
                fontWeight: 700,
                padding: "18px 40px",
                fontSize: "18px",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 20px rgba(34, 34, 34, 0.3)",
              }}
              rightIcon={<ArrowRight size={24} />}
              onClick={() => router.push("/sign-up")}
            >
              Get Started Free
            </Button>
          </Flex>

          <Text
            size="sm"
            ta="center"
            fw={500}
            style={{ color: "#222222", opacity: 0.7 }}
          >
            🎓 Free for students • 💼 Affordable for institutions
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
