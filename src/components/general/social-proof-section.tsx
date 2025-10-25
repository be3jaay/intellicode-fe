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
  Group,
  Avatar,
} from "@mantine/core";
import { Star, Quote } from "lucide-react";

export function SocialProofSection() {
  const testimonials = [
    {
      name: "Prof. Ana Reyes",
      role: "Computer Science Instructor",
      avatar: "AR",
      content:
        "Intellicode made grading easier and more accurate  our students love the instant feedback and progress tracking!",
      rating: 5,
    },
    {
      name: "Maria Johnson",
      role: "CS Student",
      avatar: "MJ",
      content:
        "The AI grading system helped me understand my mistakes instantly. My coding skills improved dramatically!",
      rating: 5,
    },
    {
      name: "Dr. David Lee",
      role: "Programming Instructor",
      avatar: "DL",
      content:
        "Creating courses is now effortless. The real-time compiler and AI assessment save me hours of grading!",
      rating: 5,
    },
  ];

  return (
    <Box
      id="testimonials"
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
            Testimonials
          </Badge>
          <Title
            order={2}
            ta="center"
            size="3rem"
            fw={800}
            style={{ color: "#FFFFFF" }}
          >
            Loved by Instructors and Students
          </Title>
          <Text
            ta="center"
            size="xl"
            maw={700}
            style={{ color: "#E9EEEA", opacity: 0.8 }}
          >
            Join thousands of educators and learners transforming their coding
            journey
          </Text>
        </Stack>

        <Grid gutter={30}>
          {testimonials.map((testimonial, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <Card
                shadow="md"
                padding="xl"
                radius="lg"
                h="100%"
                style={{
                  background: "#2a2a2a",
                  border: "2px solid #3a3a3a",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 35px rgba(189, 240, 82, 0.2)";
                  e.currentTarget.style.borderColor = "#BDF052";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.borderColor = "#3a3a3a";
                }}
              >
                <Stack gap="md">
                  <Box
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      opacity: 0.1,
                    }}
                  >
                    <Quote size={50} color="#BDF052" />
                  </Box>

                  <Group gap="md" style={{ position: "relative", zIndex: 1 }}>
                    <Avatar
                      size={60}
                      radius="xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #BDF052 0%, #8bc232 100%)",
                        color: "#222222",
                        fontWeight: 700,
                        fontSize: "20px",
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Text fw={700} size="lg" style={{ color: "#FFFFFF" }}>
                        {testimonial.name}
                      </Text>
                      <Text
                        size="sm"
                        style={{ color: "#E9EEEA", opacity: 0.7 }}
                      >
                        {testimonial.role}
                      </Text>
                    </Box>
                  </Group>

                  <Text
                    size="md"
                    style={{
                      color: "#E9EEEA",
                      opacity: 0.9,
                      lineHeight: 1.7,
                      fontStyle: "italic",
                    }}
                  >
                    "{testimonial.content}"
                  </Text>

                  <Group gap={4}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#BDF052" color="#BDF052" />
                    ))}
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        <Box mt={80}>
          <Text
            ta="center"
            size="sm"
            fw={600}
            mb={30}
            style={{
              color: "#E9EEEA",
              opacity: 0.7,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Trusted by Leading Institutions
          </Text>
          <Group justify="center" gap={50} style={{ flexWrap: "wrap" }}>
            {["UP Diliman", "Ateneo", "UST", "De La Salle", "FEU Tech"].map(
              (institution, idx) => (
                <Text
                  key={idx}
                  fw={700}
                  size="lg"
                  style={{
                    color: "#E9EEEA",
                    opacity: 0.4,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.color = "#BDF052";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.4";
                    e.currentTarget.style.color = "#E9EEEA";
                  }}
                >
                  {institution}
                </Text>
              )
            )}
          </Group>
        </Box>
      </Container>
    </Box>
  );
}
