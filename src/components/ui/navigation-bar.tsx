'use client';

import { useAuth } from '@/providers/auth-context';
import { Stack, NavLink, Box, Text } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    FileText,
    Settings,
    BarChart,
    Calendar,
    Award,
    Shield,
    GraduationCap,
} from 'lucide-react';

export function NavigationBar() {
    const { user } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    // Navigation items based on user role
    const getNavigationItems = () => {
        const role = user?.role;

        const commonItems = [
            {
                icon: LayoutDashboard,
                label: 'Dashboard',
                href: `/dashboard/${role}`,
            },
        ];

        const studentItems = [
            ...commonItems,
            {
                icon: BookOpen,
                label: 'My Courses',
                href: `/dashboard/${role}/courses`,
            },
            {
                icon: FileText,
                label: 'Assignments',
                href: `/dashboard/${role}/assignments`,
            },
            {
                icon: Award,
                label: 'Certificates',
                href: `/dashboard/${role}/certificates`,
            },
            {
                icon: BarChart,
                label: 'Progress',
                href: `/dashboard/${role}/progress`,
            },
        ];

        const teacherItems = [
            ...commonItems,
            {
                icon: BookOpen,
                label: 'My Courses',
                href: `/dashboard/${role}/courses`,
            },
            {
                icon: Users,
                label: 'Students',
                href: `/dashboard/${role}/students`,
            },
            {
                icon: FileText,
                label: 'Assignments',
                href: `/dashboard/${role}/assignments`,
            },
            {
                icon: BarChart,
                label: 'Analytics',
                href: `/dashboard/${role}/analytics`,
            },
            {
                icon: Calendar,
                label: 'Schedule',
                href: `/dashboard/${role}/schedule`,
            },
        ];

        const adminItems = [
            ...commonItems,
            {
                icon: Users,
                label: 'Users',
                href: `/dashboard/${role}/users`,
            },
            {
                icon: BookOpen,
                label: 'Courses',
                href: `/dashboard/${role}/courses`,
            },
            {
                icon: GraduationCap,
                label: 'Instructors',
                href: `/dashboard/${role}/instructors`,
            },
            {
                icon: Shield,
                label: 'Permissions',
                href: `/dashboard/${role}/permissions`,
            },
            {
                icon: BarChart,
                label: 'Analytics',
                href: `/dashboard/${role}/analytics`,
            },
            {
                icon: Settings,
                label: 'Settings',
                href: `/dashboard/${role}/settings`,
            },
        ];

        switch (role) {
            case 'student':
                return studentItems;
            case 'teacher':
                return teacherItems;
            case 'admin':
                return adminItems;
            default:
                return commonItems;
        }
    };

    const navigationItems = getNavigationItems();

    return (
        <Stack gap="xs">
            <Box mb="md">
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                    Navigation
                </Text>
            </Box>

            {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <NavLink
                        key={item.href}
                        active={isActive}
                        label={item.label}
                        leftSection={<Icon size={20} />}
                        onClick={() => router.push(item.href)}
                        style={{
                            borderRadius: '8px',
                            fontWeight: isActive ? 600 : 400,
                        }}
                        styles={{
                            root: {
                                '&[dataActive]': {
                                    backgroundColor: '#eff6ff',
                                    color: '#2563eb',
                                    '&:hover': {
                                        backgroundColor: '#dbeafe',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: '#f8f9fa',
                                },
                            },
                        }}
                    />
                );
            })}
        </Stack>
    );
}

