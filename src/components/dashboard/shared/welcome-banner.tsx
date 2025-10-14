"use client"
import { Paper, Group, Stack, Text, Box, rem } from "@mantine/core"
import { Sparkles } from "lucide-react"

interface WelcomeBannerProps {
    userName: string
    greeting?: string
    subtitle?: string
    gradient?: string
}

export function WelcomeBanner({
    userName,
    greeting = "Welcome back",
    subtitle = "Here's what's happening with your courses today",
    gradient = "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
}: WelcomeBannerProps) {
    return (
        <Paper
            shadow="xl"
            p="xl"
            radius="lg"
            style={{
                background: gradient,
                position: "relative",
                overflow: "hidden",
                border: "none",
            }}
        >
            {/* Decorative elements */}
            <Box
                style={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.15)",
                    filter: "blur(40px)",
                }}
            />
            <Box
                style={{
                    position: "absolute",
                    bottom: -30,
                    left: -30,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: "rgba(0, 0, 0, 0.1)",
                    filter: "blur(30px)",
                }}
            />

            <Group align="center" gap="md" style={{ position: "relative", zIndex: 1 }}>
                <Box
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: rem(16),
                        background: "rgba(34, 34, 34, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Sparkles size={32} color="#222222" strokeWidth={2} />
                </Box>
                <Stack gap={4}>
                    <Text
                        size="sm"
                        fw={600}
                        style={{
                            color: "rgba(34, 34, 34, 0.8)",
                            letterSpacing: "0.5px",
                        }}
                    >
                        {greeting.toUpperCase()}
                    </Text>
                    <Text
                        size="xl"
                        fw={700}
                        style={{
                            color: "#222222",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        {userName}
                    </Text>
                    <Text
                        size="sm"
                        fw={500}
                        style={{
                            color: "rgba(34, 34, 34, 0.7)",
                        }}
                    >
                        {subtitle}
                    </Text>
                </Stack>
            </Group>
        </Paper>
    )
}

