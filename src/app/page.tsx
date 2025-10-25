"use client";

import { Box } from "@mantine/core";
import {
  HeroSection,
  HowItWorksSection,
  KeyFeaturesSection,
  UserRolesSection,
  AssessmentTypesSection,
  SocialProofSection,
  FinalCtaSection,
  FooterSection,
} from "@/components/general";
import { ConditionalHeader } from "@/components/navigation/conditional-header";

export default function HomePage() {
  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "#1a1a1a",
      }}
    >
      <ConditionalHeader />
      <HeroSection />
      <KeyFeaturesSection />
      <HowItWorksSection />
      <UserRolesSection />
      <AssessmentTypesSection />
      <SocialProofSection />
      <FinalCtaSection />
      <FooterSection />
    </Box>
  );
}
