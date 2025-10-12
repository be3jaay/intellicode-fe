'use client';

import { useAuth } from '@/providers/auth-context';
import {
    Container,
    Title,
    Text,
    Paper,
    Grid,
    Box,
    Stack,
    Group,
    Button,
    Badge,
    ThemeIcon,
    Avatar,
    Table,
} from '@mantine/core';
import {
    Users,
    BookOpen,
    FileText,
    Settings,
    LogOut,
    TrendingUp,
    UserPlus,
    Shield,
} from 'lucide-react';

function AdminDashboard() {
    const { user, signOut } = useAuth();

    const stats = [
        { label: 'Total Students', value: '1,234', icon: Users, color: 'blue' },
        { label: 'Total Courses', value: '45', icon: BookOpen, color: 'green' },
        { label: 'Instructors', value: '28', icon: Shield, color: 'orange' },
        { label: 'Enrollments', value: '3,456', icon: TrendingUp, color: 'red' },
    ];

    const recentActivities = [
        { action: 'New student enrolled', user: 'John Doe', time: '5 minutes ago' },
        { action: 'Course created', user: 'Dr. Smith', time: '1 hour ago' },
        { action: 'Assignment submitted', user: 'Jane Smith', time: '2 hours ago' },
        { action: 'Grade updated', user: 'Prof. Johnson', time: '3 hours ago' },
    ];

    return (
        <Box style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Header */}
            <Box
                style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    padding: '2rem',
                    color: 'white',
                }}
            >
                <Container size="xl">
                    <Group justify="space-between" align="center">
                        <Group>
                            <Avatar size="lg" radius="xl" color="red">
                                <Shield size={24} />
                            </Avatar>
                            <Box>
                                <Title order={2}>
                                    Admin Dashboard
                                </Title>
                                <Text size="sm" opacity={0.9}>
                                    {user?.firstName} {user?.lastName} • Administrator
                                </Text>
                            </Box>
                        </Group>
                        <Group>
                            <Button
                                variant="white"
                                leftSection={<UserPlus size={18} />}
                            >
                                Add User
                            </Button>
                            <Button
                                variant="subtle"
                                color="white"
                                leftSection={<LogOut size={18} />}
                                onClick={signOut}
                            >
                                Sign Out
                            </Button>
                        </Group>
                    </Group>
                </Container>
            </Box>

            <Container size="xl" py="xl">
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
                                        <Text size="xl" fw={700}>
                                            {stat.value}
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            {stat.label}
                                        </Text>
                                    </Box>
                                </Group>
                            </Paper>
                        </Grid.Col>
                    ))}
                </Grid>

                {/* Main Content */}
                <Grid>
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Paper shadow="sm" p="xl" radius="md">
                            <Group justify="space-between" mb="lg">
                                <Title order={3}>Recent Activities</Title>
                                <Badge color="red" variant="light">
                                    Live
                                </Badge>
                            </Group>

                            <Table striped highlightOnHover>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Action</Table.Th>
                                        <Table.Th>User</Table.Th>
                                        <Table.Th>Time</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {recentActivities.map((activity, index) => (
                                        <Table.Tr key={index}>
                                            <Table.Td>{activity.action}</Table.Td>
                                            <Table.Td>{activity.user}</Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="dimmed">
                                                    {activity.time}
                                                </Text>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Stack gap="md">
                            {/* Quick Actions */}
                            <Paper shadow="sm" p="xl" radius="md">
                                <Title order={4} mb="md">
                                    Quick Actions
                                </Title>
                                <Stack gap="sm">
                                    <Button
                                        variant="light"
                                        fullWidth
                                        leftSection={<UserPlus size={18} />}
                                    >
                                        Add Student
                                    </Button>
                                    <Button
                                        variant="light"
                                        fullWidth
                                        leftSection={<BookOpen size={18} />}
                                    >
                                        Create Course
                                    </Button>
                                    <Button
                                        variant="light"
                                        fullWidth
                                        leftSection={<FileText size={18} />}
                                    >
                                        Generate Report
                                    </Button>
                                    <Button
                                        variant="light"
                                        fullWidth
                                        leftSection={<Settings size={18} />}
                                    >
                                        System Settings
                                    </Button>
                                </Stack>
                            </Paper>

                            {/* System Status */}
                            <Paper shadow="sm" p="xl" radius="md">
                                <Title order={4} mb="md">
                                    System Status
                                </Title>
                                <Stack gap="sm">
                                    <Group justify="space-between">
                                        <Text size="sm">Server Status</Text>
                                        <Badge color="green">Online</Badge>
                                    </Group>
                                    <Group justify="space-between">
                                        <Text size="sm">Database</Text>
                                        <Badge color="green">Healthy</Badge>
                                    </Group>
                                    <Group justify="space-between">
                                        <Text size="sm">API Status</Text>
                                        <Badge color="green">Active</Badge>
                                    </Group>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    );
}

export default AdminDashboard;

