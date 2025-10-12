'use client'

import {
    Box,
    Container,
    Grid,
    Group,
    Text,
    Stack,
    Anchor,
    Divider
} from '@mantine/core';
import { GraduationCap } from 'lucide-react';

export function FooterSection() {
    return (
        <Box
            bg="dark"
            py={60}
            style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            }}
        >
            <Container size="xl">
                <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Group mb="md">
                            <Text size="xl" fw={700} c="white">
                                Intellicode
                            </Text>
                            <GraduationCap size={28} color="white" />
                        </Group>
                        <Text c="dimmed" size="sm" mb="md">
                            AI-powered learning platform for programming students and instructors.
                            Master coding through personalized assessments.
                        </Text>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Grid>
                            <Grid.Col span={4}>
                                <Text fw={600} c="white" mb="sm">For Students</Text>
                                <Stack gap="xs">
                                    <Anchor href="#" c="dimmed" size="sm">Browse Courses</Anchor>
                                    <Anchor href="#" c="dimmed" size="sm">Coding Challenges</Anchor>
                                    <Anchor href="#" c="dimmed" size="sm">Progress Tracking</Anchor>
                                </Stack>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Text fw={600} c="white" mb="sm">For Instructors</Text>
                                <Stack gap="xs">
                                    <Anchor href="#" c="dimmed" size="sm">Create Courses</Anchor>
                                    <Anchor href="#" c="dimmed" size="sm">AI Grading</Anchor>
                                    <Anchor href="#" c="dimmed" size="sm">Analytics</Anchor>
                                </Stack>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Text fw={600} c="white" mb="sm">Company</Text>
                                <Stack gap="xs">
                                    <Anchor href="#" c="dimmed" size="sm">About</Anchor>
                                    <Anchor href="#" c="dimmed" size="sm">Contact</Anchor>
                                    <Anchor href="/sign-in" c="dimmed" size="sm">Login</Anchor>
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                </Grid>

                <Divider my="xl" color="dark.4" />

                <Group justify="space-between">
                    <Text c="dimmed" size="sm">
                        © 2025 Intellicode. All rights reserved.
                    </Text>
                    <Group gap="md">
                        <Anchor href="#" c="dimmed" size="sm">Privacy</Anchor>
                        <Anchor href="#" c="dimmed" size="sm">Terms</Anchor>
                    </Group>
                </Group>
            </Container>
        </Box>
    );
} 