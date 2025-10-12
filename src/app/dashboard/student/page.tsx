'use client';

import { useAuth } from '@/providers/auth-context';
import {
    Title,
    Text,
    Paper,
    Grid,
    Box,
    Stack,
    Group,
    Badge,
    ThemeIcon,
    Avatar,
    Card,
    Progress,
} from '@mantine/core';
import {
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    FileText,
    TrendingUp,
} from 'lucide-react';

function StudentDashboard() {
    const { user } = useAuth();

    const stats = [
        { label: 'Enrolled Courses', value: '5', icon: BookOpen, color: 'blue' },
        { label: 'Completed', value: '12', icon: CheckCircle, color: 'green' },
        { label: 'In Progress', value: '3', icon: Clock, color: 'orange' },
        { label: 'Assignments', value: '8', icon: FileText, color: 'red' },
    ];

    const upcomingClasses = [
        { course: 'Advanced React', time: 'Today, 2:00 PM', instructor: 'Dr. Smith' },
        { course: 'Python for Data Science', time: 'Tomorrow, 10:00 AM', instructor: 'Prof. Johnson' },
        { course: 'Web Design Fundamentals', time: 'Wed, 3:00 PM', instructor: 'Ms. Davis' },
    ];

    return (
        <Box>
            {/* Welcome Section */}
            <Box mb="xl">
                <Title order={2} mb="xs">
                    Welcome back, {user?.firstName}!
                </Title>
                <Text c="dimmed">
                    Here's what's happening with your courses today.
                </Text>
            </Box>

            {/* Stats Grid */}
            <Grid mb="xl">
                {stats.map((stat) => (
                    <Grid.Col key={stat.label} span={{ base: 12, sm: 6, md: 3 }}>
                        <Paper shadow="sm" p="md" radius="md">
                            <Group>
                                <ThemeIcon size="xl" radius="md" color={stat.color}>
                                    <stat.icon size={24} />
                                </ThemeIcon>
                                <Box>
                                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                        {stat.label}
                                    </Text>
                                    <Text size="xl" fw={700}>
                                        {stat.value}
                                    </Text>
                                </Box>
                            </Group>
                        </Paper>
                    </Grid.Col>
                ))}
            </Grid>

            {/* Main Content */}
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper shadow="sm" p="lg" radius="md">
                        <Group mb="md" justify="space-between">
                            <Group>
                                <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                                    <Calendar size={20} />
                                </ThemeIcon>
                                <Title order={4}>Upcoming Classes</Title>
                            </Group>
                        </Group>
                        <Stack gap="md">
                            {upcomingClasses.map((cls, index) => (
                                <Card key={index} padding="md" radius="sm" withBorder>
                                    <Group justify="space-between" mb="xs">
                                        <Text fw={600} size="sm">
                                            {cls.course}
                                        </Text>
                                        <Badge size="sm" variant="light" color="blue">
                                            {cls.time}
                                        </Badge>
                                    </Group>
                                    <Group gap="xs">
                                        <Avatar size="xs" radius="xl" color="blue">
                                            {cls.instructor.charAt(0)}
                                        </Avatar>
                                        <Text size="xs" c="dimmed">
                                            {cls.instructor}
                                        </Text>
                                    </Group>
                                </Card>
                            ))}
                        </Stack>
                    </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper shadow="sm" p="lg" radius="md">
                        <Group mb="md">
                            <ThemeIcon size="lg" radius="md" variant="light" color="green">
                                <TrendingUp size={20} />
                            </ThemeIcon>
                            <Title order={4}>Performance Metrics</Title>
                        </Group>
                        <Stack gap="lg">
                            <Box>
                                <Group justify="space-between" mb="xs">
                                    <Text size="sm">Overall Progress</Text>
                                    <Text size="sm" fw={600}>
                                        75%
                                    </Text>
                                </Group>
                                <Progress value={75} color="blue" size="lg" radius="xl" />
                            </Box>
                            <Box>
                                <Group justify="space-between" mb="xs">
                                    <Text size="sm">Attendance Rate</Text>
                                    <Text size="sm" fw={600}>
                                        92%
                                    </Text>
                                </Group>
                                <Progress value={92} color="green" size="lg" radius="xl" />
                            </Box>
                            <Box>
                                <Group justify="space-between" mb="xs">
                                    <Text size="sm">Assignment Completion</Text>
                                    <Text size="sm" fw={600}>
                                        88%
                                    </Text>
                                </Group>
                                <Progress value={88} color="orange" size="lg" radius="xl" />
                            </Box>
                        </Stack>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Box>
    );
}

export default StudentDashboard;
