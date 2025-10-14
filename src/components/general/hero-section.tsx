'use client'

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
    Box
} from '@mantine/core';
import {
    Check,
    Brain,
    ArrowRight
} from 'lucide-react';
import { Button } from '../ui';
import { LottieAnimation } from '../lottie/lottie';
import intellicode from '@/components/lottie/lottie-json/intellicode.json';
import { useRouter } from 'next/navigation';

export function HeroSection() {
    const router = useRouter();
    return (
        <Container size="xl" py={100}>
            <Grid align="center" gutter="xl">
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap="xl">
                        <Badge
                            size="lg"
                            variant="light"
                            color="blue"
                            leftSection={<Brain size={16} />}
                            style={{
                                background: 'linear-gradient(135deg, #d9f7ba 0%, #c5f09b 100%)',
                                border: '1px solid rgba(189, 240, 82, 0.3)',
                                color: '#8bc232'
                            }}
                        >
                            AI-Powered Learning Platform
                        </Badge>

                        <Title
                            order={1}
                            size="3.5rem"
                            fw={800}
                            c="dark"
                            style={{ lineHeight: 1.1 }}
                        >
                            Master Coding with{' '}
                            <Text
                                size="3.5rem"
                                fw={800}
                                span
                                style={{
                                    background: 'linear-gradient(135deg, #bdf052 0%, #8bc232 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                AI-Powered Learning
                            </Text>
                        </Title>

                        <Text size="xl" c="dimmed" style={{ lineHeight: 1.6 }}>
                            Intellicode helps students and instructors create, learn, and assess programming courses in real time.
                        </Text>

                        <Flex gap="md" wrap="wrap">
                            <Button
                                size="lg"
                                variant="primary"
                                rightIcon={<ArrowRight size={20} />}
                                onClick={() => router.push('/sign-up')}
                            >
                                Get Started
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => router.push('#features')}
                            >
                                Learn More
                            </Button>
                        </Flex>

                        <Group gap="xl" mt="md">
                            <Group gap="xs">
                                <ThemeIcon
                                    color="blue"
                                    variant="light"
                                    size="sm"
                                    style={{
                                        background: 'linear-gradient(135deg, #d9f7ba 0%, #c5f09b 100%)',
                                        border: '1px solid rgba(189, 240, 82, 0.3)'
                                    }}
                                >
                                    <Check size={14} />
                                </ThemeIcon>
                                <Text size="sm" c="dimmed">Real-time compiler</Text>
                            </Group>
                            <Group gap="xs">
                                <ThemeIcon
                                    color="blue"
                                    variant="light"
                                    size="sm"
                                    style={{
                                        background: 'linear-gradient(135deg, #d9f7ba 0%, #c5f09b 100%)',
                                        border: '1px solid rgba(189, 240, 82, 0.3)'
                                    }}
                                >
                                    <Check size={14} />
                                </ThemeIcon>
                                <Text size="sm" c="dimmed">AI grading</Text>
                            </Group>
                            <Group gap="xs">
                                <ThemeIcon
                                    color="blue"
                                    variant="light"
                                    size="sm"
                                    style={{
                                        background: 'linear-gradient(135deg, #d9f7ba 0%, #c5f09b 100%)',
                                        border: '1px solid rgba(189, 240, 82, 0.3)'
                                    }}
                                >
                                    <Check size={14} />
                                </ThemeIcon>
                                <Text size="sm" c="dimmed">Progress tracking</Text>
                            </Group>
                        </Group>
                    </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }} style={{
                    borderRadius: "100%"
                }}>
                    <Center h="100%">
                        <LottieAnimation animationData={intellicode} width={400} height={400} />
                        <Box pos="absolute" style={{ zIndex: 1 }}>
                            <Box
                                style={{
                                    width: 180,
                                    height: 30,
                                    background: "rgba(189, 240, 82, 0.15)",
                                    filter: "blur(6px)",
                                    borderRadius: "50%",
                                    position: "absolute",
                                    left: "50%",
                                    bottom: -200,
                                    transform: "translateX(-50%)",
                                    zIndex: 0,
                                }}
                            />
                        </Box>
                    </Center>
                </Grid.Col>
            </Grid>
        </Container>
    );
} 