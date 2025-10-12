'use client'

import {
    Box,
    Container,
    Grid,
} from '@mantine/core';
import {
    Building2,
    Award,
    Users,
    Target
} from 'lucide-react';
import { SectionHeader, FeatureCard } from './cards';

export function KeyFeaturesSection() {
    const features = [
        {
            icon: <Building2 size={30} />,
            title: 'Intelligent Course Creation',
            description: 'Build comprehensive courses with modules, lessons, and coding activities in an intuitive interface.'
        },
        {
            icon: <Award size={30} />,
            title: 'Personalized Coding Assessment',
            description: 'Real-time compiler and AI grading for Java, Python, and C with instant feedback.'
        },
        {
            icon: <Users size={30} />,
            title: 'Role-based Learning',
            description: 'Tailored dashboards for Admin, Teacher, and Student with specific features for each role.'
        },
        {
            icon: <Target size={30} />,
            title: 'Progress Tracking & Certificates',
            description: 'Monitor grades, course progress, and automatically generate completion certificates.'
        }
    ];

    return (
        <Box
            py={80}
            style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #fef7f7 50%, #f1f3f4 100%)'
            }}
        >
            <Container size="xl">
                <SectionHeader
                    badge="Key Features"
                    title="Everything you need to teach and learn"
                    description="Powerful tools for instructors and students to create and master programming skills"
                />

                <Grid>
                    {features.map((feature, index) => (
                        <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
} 