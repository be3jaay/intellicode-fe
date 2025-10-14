'use client'

import {
    Container,
    Stack,
    Title,
    Text,
    Box,
    Group,
    Flex
} from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { BannerIcon } from '@/icons/banner-icon';

export function FinalCtaSection() {
    return (
        <Container
            size="xl"
            py={80}
            style={{
                background: 'linear-gradient(135deg, #222222 0%, #2a2a2a 100%)',
                color: '#e9eeea',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: 120,
                borderRadius: 24,
            }}
        >
            {/* Background Banner Icon */}
            <Box
                style={{
                    position: 'absolute',
                    bottom: '0%',
                    left: '0%',
                    transform: 'translateY(0%)',
                    opacity: 0.3,
                    zIndex: 1,
                }}
            >
                <BannerIcon
                    width={600}
                    height={200}
                />
            </Box>


            <Stack align="center" gap="xl" style={{ position: 'relative', zIndex: 2 }}>
                <Title order={2} ta="center" size="2.5rem" fw={700}>
                    Ready to transform your coding education?
                </Title>
                <Text size="lg" ta="center" maw={600}>
                    Join instructors and students using AI-powered assessments to master programming skills.
                </Text>

                <Flex align="center" gap="md">
                    <Button
                        size="xl"
                        variant="primary"
                        rightIcon={<ArrowRight size={24} />}
                        style={{
                            background: 'linear-gradient(135deg, #bdf052 0%, #a3d742 100%)',
                            color: '#222222',
                            fontWeight: 600,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #d0f777 0%, #bdf052 100%)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #bdf052 0%, #a3d742 100%)';
                        }}
                    >
                        Start Free Today
                    </Button>

                </Flex>

                <Text size="sm" ta="center">
                    Free for students • Affordable for institutions
                </Text>
            </Stack>
        </Container>
    );
}