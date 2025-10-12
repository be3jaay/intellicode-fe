'use client'

import { Card, ThemeIcon, Title, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface StepCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    stepNumber?: number;
}

export function StepCard({ icon, title, description, stepNumber }: StepCardProps) {
    return (
        <Card
            shadow="sm"
            padding="xl"
            radius="md"
            h="100%"
            style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                border: '1px solid rgba(37, 99, 235, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
        >
            <ThemeIcon
                size={80}
                color="blue"
                variant="light"
                mb="md"
                mx="auto"
                style={{
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    border: '1px solid rgba(37, 99, 235, 0.2)'
                }}
            >
                {icon}
            </ThemeIcon>
            <Title order={3} size="lg" mb="sm">
                {stepNumber && `${stepNumber}. `}{title}
            </Title>
            <Text c="dimmed" size="sm">
                {description}
            </Text>
        </Card>
    );
}