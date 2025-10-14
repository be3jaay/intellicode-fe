'use client'

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
    Avatar
} from '@mantine/core';
import { Star } from 'lucide-react';

export function SocialProofSection() {
    return (
        <Box
            py={80}
            style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fef7f7 100%)'
            }}
        >
            <Container size="xl">
                <Stack align="center" gap="xl" mb={60}>
                    <Badge
                        size="lg"
                        variant="light"
                        color="blue"
                        style={{
                            background: 'linear-gradient(135deg, #d9f7ba 0%, #c5f09b 100%)',
                            border: '1px solid rgba(189, 240, 82, 0.3)',
                            color: '#8bc232'
                        }}
                    >
                        Testimonials
                    </Badge>
                    <Title order={2} ta="center" size="2.5rem" fw={700} c="dark">
                        What instructors and students say
                    </Title>
                </Stack>

                <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card
                            shadow="sm"
                            padding="xl"
                            radius="md"
                            h="100%"
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                                border: '1px solid rgba(189, 240, 82, 0.2)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(189, 240, 82, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0px)';
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Group gap="md" mb="md">
                                <Avatar size="lg" color="blue">AR</Avatar>
                                <Box>
                                    <Text fw={600}>Prof. Ana Reyes</Text>
                                    <Text size="sm" c="dimmed">Computer Science Instructor</Text>
                                </Box>
                            </Group>
                            <Text c="dimmed" size="sm" mb="md">
                                "Intellicode made grading easier and more accurate — our students love the instant feedback and progress tracking!"
                            </Text>
                            <Group gap="xs">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="#bdf052" color="#bdf052" />
                                ))}
                            </Group>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card
                            shadow="sm"
                            padding="xl"
                            radius="md"
                            h="100%"
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                                border: '1px solid rgba(189, 240, 82, 0.2)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(189, 240, 82, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0px)';
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Group gap="md" mb="md">
                                <Avatar size="lg" color="blue">MJ</Avatar>
                                <Box>
                                    <Text fw={600}>Maria Johnson</Text>
                                    <Text size="sm" c="dimmed">CS Student</Text>
                                </Box>
                            </Group>
                            <Text c="dimmed" size="sm" mb="md">
                                "The AI grading system helped me understand my mistakes instantly. My coding skills improved dramatically!"
                            </Text>
                            <Group gap="xs">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="#bdf052" color="#bdf052" />
                                ))}
                            </Group>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card
                            shadow="sm"
                            padding="xl"
                            radius="md"
                            h="100%"
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                                border: '1px solid rgba(189, 240, 82, 0.2)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(189, 240, 82, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0px)';
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Group gap="md" mb="md">
                                <Avatar size="lg" color="blue">DL</Avatar>
                                <Box>
                                    <Text fw={600}>Dr. David Lee</Text>
                                    <Text size="sm" c="dimmed">Programming Instructor</Text>
                                </Box>
                            </Group>
                            <Text c="dimmed" size="sm" mb="md">
                                "Creating courses is now effortless. The real-time compiler and AI assessment save me hours of grading!"
                            </Text>
                            <Group gap="xs">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="#bdf052" color="#bdf052" />
                                ))}
                            </Group>
                        </Card>
                    </Grid.Col>
                </Grid>

                {/* Partner Logos */}
                <Box mt={60}>
                    <Text ta="center" c="dimmed" mb="md">Trusted by universities and coding bootcamps</Text>
                    <Group justify="center" gap="xl">
                        <Text fw={600} c="dimmed">UP Diliman</Text>
                        <Text fw={600} c="dimmed">Ateneo</Text>
                        <Text fw={600} c="dimmed">UST</Text>
                        <Text fw={600} c="dimmed">De La Salle</Text>
                        <Text fw={600} c="dimmed">FEU Tech</Text>
                    </Group>
                </Box>
            </Container>
        </Box>
    );
} 