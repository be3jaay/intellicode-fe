'use client'

import { Stack, Badge, Title, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface SectionHeaderProps {
    badge: string;
    title: string;
    description?: string;
    maxWidth?: number;
}

export function SectionHeader({ badge, title, description, maxWidth = 600 }: SectionHeaderProps) {
    return (
        <Stack align="center" gap="xl" mb={60}>
            <Badge
                size="lg"
                variant="light"
                color="blue"
                style={{
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                    color: '#2563eb'
                }}
            >
                {badge}
            </Badge>
            <Title order={2} ta="center" size="2.5rem" fw={700} c="dark">
                {title}
            </Title>
            {description && (
                <Text size="lg" ta="center" c="dimmed" maw={maxWidth}>
                    {description}
                </Text>
            )}
        </Stack>
    );
} 