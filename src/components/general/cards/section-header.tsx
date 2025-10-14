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
                    background: 'linear-gradient(135deg, #d9f7ba 0%, #c5f09b 100%)',
                    border: '1px solid rgba(189, 240, 82, 0.3)',
                    color: '#8bc232'
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