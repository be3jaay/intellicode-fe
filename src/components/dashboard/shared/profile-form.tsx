"use client";

import { Box, Grid, Stack, Button, Group, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ControlledTextInput,
  ControlledTextArea,
} from "@/components/controlled-fields";
import { User, Mail, Phone, MapPin, Calendar, FileText } from "lucide-react";
import * as z from "zod";

const baseProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Valid email is required"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
});

type BaseProfileForm = z.infer<typeof baseProfileSchema>;

interface ProfileFormProps {
  initialData: BaseProfileForm;
  onSubmit: (data: BaseProfileForm) => void;
  isLoading?: boolean;
  roleColor: string;
}

export function ProfileForm({
  initialData,
  onSubmit,
  isLoading = false,
  roleColor,
}: ProfileFormProps) {
  const form = useForm<BaseProfileForm>({
    mode: "onChange",
    resolver: zodResolver(baseProfileSchema),
    defaultValues: initialData,
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = form;

  return (
    <Box
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "2rem",
      }}
    >
      <Text
        size="lg"
        fw={600}
        c="white"
        mb="xl"
        style={{
          borderBottom: `2px solid ${roleColor}20`,
          paddingBottom: "0.75rem",
        }}
      >
        Personal Information
      </Text>

      <Stack gap="lg">
        <Grid>
          <Grid.Col span={6}>
            <ControlledTextInput
              control={control}
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              isRequired
              leftSection={<User size={18} color="rgba(255, 255, 255, 0.6)" />}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ControlledTextInput
              control={control}
              name="middleName"
              label="Middle Name"
              placeholder="Enter your middle name"
              leftSection={<User size={18} color="rgba(255, 255, 255, 0.6)" />}
            />
          </Grid.Col>
        </Grid>

        <ControlledTextInput
          control={control}
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          isRequired
          leftSection={<User size={18} color="rgba(255, 255, 255, 0.6)" />}
        />

        <ControlledTextInput
          control={control}
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          isRequired
          leftSection={<Mail size={18} color="rgba(255, 255, 255, 0.6)" />}
        />

        <Grid>
          <Grid.Col span={6}>
            <ControlledTextInput
              control={control}
              name="phone"
              label="Phone Number"
              placeholder="+63 917 123 4567"
              leftSection={<Phone size={18} color="rgba(255, 255, 255, 0.6)" />}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ControlledTextInput
              control={control}
              name="dateOfBirth"
              type="date"
              label="Date of Birth"
              leftSection={
                <Calendar size={18} color="rgba(255, 255, 255, 0.6)" />
              }
            />
          </Grid.Col>
        </Grid>

        <ControlledTextInput
          control={control}
          name="address"
          label="Address"
          placeholder="Enter your complete address"
          leftSection={<MapPin size={18} color="rgba(255, 255, 255, 0.6)" />}
        />

        <ControlledTextArea
          control={control}
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          minRows={4}
          leftSection={<FileText size={18} color="rgba(255, 255, 255, 0.6)" />}
        />

        <Group justify="flex-end" gap="sm">
          <Button
            variant="subtle"
            color="gray"
            disabled={isLoading || !isDirty}
            onClick={() => form.reset()}
          >
            Reset Changes
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={!isDirty}
            style={{
              background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}cc 100%)`,
              border: "none",
              borderRadius: "8px",
              color: "#222222",
              fontWeight: 600,
            }}
          >
            Save Changes
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
