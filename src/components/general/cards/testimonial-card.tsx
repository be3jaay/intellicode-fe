'use client'

import { Card, Group, Avatar, Text, Box } from '@mantine/core';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
    avatar: string;
    name: string;
    role: string;
    testimonial: string;
    rating?: number;
}

export function TestimonialCard({
    avatar,
    name,
    role,
    testimonial,
    rating = 5
}: TestimonialCardProps) {
    return (
        <Card
            shadow="sm"
            padding="xl"
            radius="md"
            h="100%"
            style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                border: '1px solid rgba(227, 2, 66, 0.1)',
                transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(227, 2, 66, 0.12)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
        >
            <Group gap="md" mb="md">
                <Avatar size="lg" color="red">{avatar}</Avatar>
                <Box>
                    <Text fw={600}>{name}</Text>
                    <Text size="sm" c="dimmed">{role}</Text>
                </Box>
            </Group>
            <Text c="dimmed" size="sm" mb="md">
                "{testimonial}"
            </Text>
            <Group gap="xs">
                {[...Array(rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#e30242" color="#e30242" />
                ))}
            </Group>
        </Card>
    );
} 