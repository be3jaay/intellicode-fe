"use client";
import { GoogleIcon, HiredUpLogo } from "@/icons";
import { Divider, Flex, Text, Box, Stack, Anchor } from "@mantine/core";
import { AtSign, LockKeyhole, Brain, Code } from "lucide-react";
import {
  ControlledTextInput,
  ControlledPasswordInput,
  ControlledCheckbox,
} from "@/components/controlled-fields";
import {
  type Control,
  FormProvider,
  type UseFormHandleSubmit,
  type UseFormReturn,
} from "react-hook-form";
import type { SignInSchemaType } from "./schema/sign-in-schema";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui";

type SignInFormProps = {
  form: UseFormReturn<SignInSchemaType>;
  control: Control<SignInSchemaType>;
  onSubmit: (data: SignInSchemaType) => void;
  handleSubmit: UseFormHandleSubmit<SignInSchemaType>;
  isLoading?: boolean;
};

export function SignInForm({
  form,
  control,
  onSubmit,
  handleSubmit,
  isLoading,
}: SignInFormProps) {
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
            <Code size={28} color="#222222" />
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
            Welcome back
          </Text>

          <Text
            size="sm"
            c="rgba(255, 255, 255, 0.7)"
            ta="center"
            style={{
              lineHeight: 1.5,
            }}
          >
            Enter your credentials to continue your coding journey
          </Text>
        </Stack>

        {/* Form Fields */}
        <Stack gap="lg" mb="xl">
          <ControlledTextInput
            control={control}
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter your email"
            isRequired
            leftSection={<AtSign size={18} color="rgba(255, 255, 255, 0.6)" />}
          />

          <ControlledPasswordInput
            control={control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            isRequired
            leftSection={
              <LockKeyhole size={18} color="rgba(255, 255, 255, 0.6)" />
            }
          />

          <Flex justify="space-between" align="center">
            <ControlledCheckbox
              name="rememberMe"
              control={control}
              label="Remember me"
              size="sm"
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
            <Anchor
              size="sm"
              href="#"
              underline="hover"
              fw={500}
              style={{
                color: "#bdf052",
                textDecoration: "none",
              }}
            >
              Forgot password?
            </Anchor>
          </Flex>

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
            Sign In
          </Button>
        </Stack>

        <Stack align="center" gap="xs">
          <Text size="sm" c="rgba(255, 255, 255, 0.7)" ta="center">
            Don't have an account?{" "}
            <Anchor
              href="/sign-up"
              style={{ color: "#bdf052", textDecoration: "none" }}
              fw={600}
            >
              Sign up
            </Anchor>
          </Text>
          <Text
            size="xs"
            c="rgba(255, 255, 255, 0.5)"
            ta="center"
            style={{ lineHeight: 1.4 }}
          >
            By signing in, you agree to our{" "}
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
}
