'use client'

import { Box } from '@mantine/core';
import {
  HeroSection,
  HowItWorksSection,
  KeyFeaturesSection,
  SocialProofSection,
  FinalCtaSection,
  FooterSection,
} from '@/components/general';
import { ConditionalHeader } from '@/components/navigation/conditional-header';

export default function HomePage() {
  return (
    <Box style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)'
    }}>
      <ConditionalHeader />
      <HeroSection />
      <HowItWorksSection />
      <KeyFeaturesSection />
      <SocialProofSection />
      <FinalCtaSection />
      <FooterSection />
    </Box>
  );
}