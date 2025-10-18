"use client";

import { Center, Stack, Text, Loader } from "@mantine/core";

export function LoadingState() {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#222222" }}>
            <main style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1rem" }}>
                <Center style={{ height: "60vh" }}>
                    <Stack align="center" gap="xl">
                        <div style={{ position: "relative" }}>
                            <Loader size="xl" color="#BDF052" />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: "#0F0F0F",
                                    borderRadius: "50%",
                                }}
                            />
                        </div>
                        <Stack align="center" gap="sm">
                            <Text style={{ color: "#FFFFFF", fontSize: "1.125rem", fontWeight: 600 }}>
                                Loading Course Approvals
                            </Text>
                            <Text style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>
                                Fetching pending courses from the database...
                            </Text>
                        </Stack>
                    </Stack>
                </Center>
            </main>
        </div>
    );
}
