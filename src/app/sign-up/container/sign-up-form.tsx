"use client";
import { Text, Box, Stack, Anchor, Grid } from "@mantine/core";
import {
  AtSign,
  LockKeyhole,
  Brain,
  User,
  Users,
  GraduationCap,
} from "lucide-react";
import {
  type Control,
  FormProvider,
  type UseFormHandleSubmit,
  type UseFormReturn,
  useWatch,
} from "react-hook-form";
import {
  ControlledCheckbox,
  ControlledPasswordInput,
  ControlledTextInput,
  ControlledSelectInput,
} from "@/components/controlled-fields";
import type { SignUpSchemaType } from "./schema/sign-up-schema";
import { Button } from "@/components/ui";

type SignUpFormProps = {
  form: UseFormReturn<SignUpSchemaType>;
  control: Control<SignUpSchemaType>;
  handleSubmit: UseFormHandleSubmit<SignUpSchemaType>;
  onSubmit: (value: SignUpSchemaType) => void;
  isLoading?: boolean;
};

export const SignUpForm = ({
  form,
  control,
  onSubmit,
  handleSubmit,
  isLoading,
}: SignUpFormProps) => {
  // Watch the role field to conditionally show student-specific fields
  const selectedRole = useWatch({
    control,
    name: "role",
  });

  const roleOptions = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
  ];

  return (
    <FormProvider {...form}>
      <Box
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: "3rem 2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient overlay */}
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #bdf052, transparent)",
            opacity: 0.6,
          }}
        />

        {/* Header */}
        <Stack align="center" gap="xs" mb="xl">
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #bdf052 0%, #9ed943 100%)",
              marginBottom: "0.5rem",
              boxShadow: "0 8px 32px rgba(189, 240, 82, 0.3)",
            }}
          >
            <Brain size={28} color="#222222" />
          </Box>

          <Text
            size="xl"
            fw={700}
            c="white"
            style={{
              fontSize: "1.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Join Inspira
          </Text>

          <Text
            size="sm"
            c="rgba(255, 255, 255, 0.7)"
            ta="center"
            style={{
              lineHeight: 1.5,
            }}
          >
            Create your account to start your AI-powered career journey
          </Text>
        </Stack>

        {/* Form Fields */}
        <Stack gap="lg" mb="xl">
          <ControlledSelectInput
            control={control}
            name="role"
            label="I am a"
            placeholder="Select your role"
            options={roleOptions}
            isRequired
            leftSection={<Users size={18} color="rgba(255, 255, 255, 0.6)" />}
          />

          <Grid>
            <Grid.Col span={6}>
              <ControlledTextInput
                control={control}
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                isRequired
                leftSection={
                  <User size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <ControlledTextInput
                control={control}
                name="middleName"
                label="Middle Name"
                placeholder="Enter your middle name"
                leftSection={
                  <User size={18} color="rgba(255, 255, 255, 0.6)" />
                }
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
            type="email"
            label="Email address"
            placeholder="Enter your email"
            isRequired
            leftSection={<AtSign size={18} color="rgba(255, 255, 255, 0.6)" />}
            name="email"
            control={control}
          />

          {selectedRole === "student" && (
            <Grid>
              <Grid.Col span={6}>
                <ControlledTextInput
                  control={control}
                  name="studentNumber"
                  label="Student Number"
                  placeholder="2021-00001"
                  isRequired
                  leftSection={
                    <GraduationCap size={18} color="rgba(255, 255, 255, 0.6)" />
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <ControlledTextInput
                  control={control}
                  name="section"
                  label="Section"
                  placeholder="BSCS 3A"
                  isRequired
                  leftSection={
                    <Users size={18} color="rgba(255, 255, 255, 0.6)" />
                  }
                />
              </Grid.Col>
            </Grid>
          )}

          <ControlledPasswordInput
            label="Password"
            placeholder="Create a strong password"
            isRequired
            leftSection={
              <LockKeyhole size={18} color="rgba(255, 255, 255, 0.6)" />
            }
            control={control}
            name="password"
          />

          <ControlledPasswordInput
            label="Confirm password"
            placeholder="Confirm your password"
            isRequired
            leftSection={
              <LockKeyhole size={18} color="rgba(255, 255, 255, 0.6)" />
            }
            control={control}
            name="confirmPassword"
          />

          <ControlledCheckbox
            control={control}
            name="agreeToTerms"
            label={
              <Text size="sm">
                I agree to the{" "}
                <Anchor
                  href="#"
                  style={{ color: "#bdf052", textDecoration: "none" }}
                  fw={500}
                >
                  Terms of Service
                </Anchor>{" "}
                and{" "}
                <Anchor
                  href="#"
                  style={{ color: "#bdf052", textDecoration: "none" }}
                  fw={500}
                >
                  Privacy Policy
                </Anchor>
              </Text>
            }
            isRequired
            styles={{
              label: {
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.875rem",
              },
              input: {
                "&:checked": {
                  backgroundColor: "#bdf052",
                  borderColor: "#bdf052",
                },
              },
            }}
          />

          <Button
            fullWidth
            size="lg"
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
            style={{
              background: "linear-gradient(135deg, #bdf052 0%, #9ed943 100%)",
              border: "none",
              borderRadius: "12px",
              color: "#222222",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "0.875rem",
              marginTop: "0.5rem",
              boxShadow: "0 4px 16px rgba(189, 240, 82, 0.3)",
              transition: "all 0.2s ease",
            }}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </Stack>

        <Stack align="center" gap="xs">
          <Text size="sm" c="rgba(255, 255, 255, 0.7)" ta="center">
            Already have an account?{" "}
            <Anchor
              href="/sign-in"
              style={{ color: "#bdf052", textDecoration: "none" }}
              fw={600}
            >
              Sign in
            </Anchor>
          </Text>
          <Text
            size="xs"
            c="rgba(255, 255, 255, 0.5)"
            ta="center"
            style={{ lineHeight: 1.4 }}
          >
            By signing up, you agree to our{" "}
            <Anchor
              href="#"
              style={{ color: "#bdf052", textDecoration: "none" }}
            >
              Terms
            </Anchor>{" "}
            and{" "}
            <Anchor
              href="#"
              style={{ color: "#bdf052", textDecoration: "none" }}
            >
              Privacy Policy
            </Anchor>
          </Text>
        </Stack>
      </Box>
    </FormProvider>
  );
};
