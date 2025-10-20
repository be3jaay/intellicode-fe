"use client";

import {
  Box,
  Avatar,
  Group,
  Text,
  Badge,
  Stack,
  ActionIcon,
} from "@mantine/core";
import { Camera, Edit } from "lucide-react";
import { BaseProfile, UserProfile } from "@/types/profile.types";

interface ProfileHeaderProps {
  profile: UserProfile;
  roleColor: string;
  onEditProfilePicture: () => void;
  onEditProfile: () => void;
}

export function ProfileHeader({
  profile,
  roleColor,
  onEditProfilePicture,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <Box
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* Gradient overlay */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${roleColor}, transparent)`,
          borderRadius: "16px 16px 0 0",
        }}
      />

      <Group align="flex-start" gap="xl">
        <Box style={{ position: "relative" }}>
          <Avatar
            src={profile.profilePicture}
            size={120}
            radius="xl"
            style={{
              border: `3px solid ${roleColor}`,
              boxShadow: `0 8px 32px ${roleColor}30`,
            }}
          />
          <ActionIcon
            size="sm"
            radius="xl"
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              background: roleColor,
              color: "#222222",
              border: "2px solid #222222",
            }}
            onClick={onEditProfilePicture}
          >
            <Camera size={14} />
          </ActionIcon>
        </Box>

        <Stack gap="xs" style={{ flex: 1 }}>
          <Group align="center" gap="md">
            <Text
              size="xl"
              fw={700}
              c="white"
              style={{
                fontSize: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              {profile.firstName}{" "}
              {profile.middleName && `${profile.middleName} `}
              {profile.lastName}
            </Text>
            <ActionIcon
              size="sm"
              variant="subtle"
              style={{ color: roleColor }}
              onClick={onEditProfile}
            >
              <Edit size={16} />
            </ActionIcon>
          </Group>

          <Text size="sm" c="rgba(255, 255, 255, 0.8)">
            {profile.email}
          </Text>

          <Badge
            size="lg"
            radius="md"
            style={{
              background: `${roleColor}20`,
              color: roleColor,
              border: `1px solid ${roleColor}40`,
              textTransform: "capitalize",
              width: "fit-content",
            }}
          >
            {profile.role}
          </Badge>

          {profile.bio && (
            <Text
              size="sm"
              c="rgba(255, 255, 255, 0.7)"
              style={{
                lineHeight: 1.6,
                maxWidth: "600px",
                marginTop: "0.5rem",
              }}
            >
              {profile.bio}
            </Text>
          )}
        </Stack>
      </Group>
    </Box>
  );
}
