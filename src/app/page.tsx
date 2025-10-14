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
      background: '#222222'
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