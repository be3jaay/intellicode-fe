'use client'

import {
    Box,
    Container,
    Stack,
    Grid,
    Card,
    Badge,
    Title,
    Text,
    ThemeIcon
} from '@mantine/core';
import {
    UserCheck,
    Briefcase,
    TrendingUp,
    Handshake
} from 'lucide-react';
import { SectionHeader, StepCard } from './cards';

export function HowItWorksSection() {
    const steps = [
        {
            icon: <Briefcase size={40} />,
            title: 'Instructor Creates Course',
            description: 'Build courses with modules, lessons, and coding activities effortlessly.',
            stepNumber: 1
        },
        {
            icon: <UserCheck size={40} />,
            title: 'Students Complete Activities',
            description: 'Students work on coding challenges and quizzes in Java, Python, and C.',
            stepNumber: 2
        },
        {
            icon: <TrendingUp size={40} />,
            title: 'AI Evaluates Submissions',
            description: 'Real-time compiler and AI provide instant feedback and grading.',
            stepNumber: 3
        },
        {
            icon: <Handshake size={40} />,
            title: 'Track Progress & Certify',
            description: 'Monitor grades, progress, and automatically generate completion certificates.',
            stepNumber: 4
        }
    ];

    return (
        <Box
            py={80}
            style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fef7f7 100%)'
            }}
        >
            <Container size="xl">
                <SectionHeader
                    badge="How It Works"
                    title="Streamlined Learning Process"
                    description="Four simple steps from course creation to certification"
                />

                <Grid>
                    {steps.map((step, index) => (
                        <Grid.Col key={index} span={{ base: 12, md: 3 }}>
                            <StepCard
                                icon={step.icon}
                                title={step.title}
                                description={step.description}
                                stepNumber={step.stepNumber}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
} 