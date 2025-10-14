'use client'

import { Card, Group, ThemeIcon, Title, Text, Box } from '@mantine/core';
import { ReactNode } from 'react';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
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
                <ThemeIcon
                    size={60}
                    color="blue"
                    variant="light"
                    style={{
                        background: 'linear-gradient(135deg, #d9f7ba 0%, #c5f09b 100%)',
                        border: '1px solid rgba(189, 240, 82, 0.3)'
                    }}
                >
                    {icon}
                </ThemeIcon>
                <Box>
                    <Title order={3} size="xl" mb="xs">{title}</Title>
                    <Text c="dimmed" size="sm">
                        {description}
                    </Text>
                </Box>
            </Group>
        </Card>
    );
}