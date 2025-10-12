'use client';

import { useAuth } from '@/providers/auth-context';
import { Box, Burger, Flex, Group, Text, Avatar, Menu, UnstyledButton } from '@mantine/core';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';

interface NavigationHeaderProps {
    opened?: boolean;
    toggle?: () => void;
}

export function NavigationHeader({ opened, toggle }: NavigationHeaderProps) {
    const { user, signOut } = useAuth();

    return (
        <Flex
            h="100%"
            px="xl"
            align="center"
            justify="space-between"
            style={{
                borderBottom: '1px solid #e9ecef',
                backgroundColor: 'white',
            }}
        >
            <Group>
                {toggle && (
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                )}
                <Text
                    size="xl"
                    fw={700}
                    style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Intellicode
                </Text>
            </Group>

            <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                    <UnstyledButton>
                        <Group gap="sm">
                            <Avatar
                                color="blue"
                                radius="xl"
                                size="md"
                            >
                                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                            </Avatar>
                            <Box style={{ flex: 1 }} visibleFrom="sm">
                                <Text size="sm" fw={600}>
                                    {user?.firstName} {user?.lastName}
                                </Text>
                                <Text size="xs" c="dimmed" tt="capitalize">
                                    {user?.role}
                                </Text>
                            </Box>
                            <ChevronDown size={16} />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item leftSection={<User size={14} />}>
                        Profile
                    </Menu.Item>
                    <Menu.Item leftSection={<Settings size={14} />}>
                        Settings
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                        color="red"
                        leftSection={<LogOut size={14} />}
                        onClick={() => signOut()}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Flex>
    );
}

