"use client"
import { GoogleIcon, HiredUpLogo } from "@/icons"
import { Divider, Flex, Text, Title, Box, Stack, Anchor } from "@mantine/core"
import { AtSign, LockKeyhole, Rocket } from "lucide-react"
import { ControlledTextInput, ControlledPasswordInput, ControlledCheckbox } from "@/components/controlled-fields"
import { type Control, FormProvider, type UseFormHandleSubmit, type UseFormReturn } from "react-hook-form"
import type { SignInSchemaType } from "./schema/sign-in-schema"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui"

type SignInFormProps = {
  form: UseFormReturn<SignInSchemaType>
  control: Control<SignInSchemaType>
  onSubmit: (data: SignInSchemaType) => void
  handleSubmit: UseFormHandleSubmit<SignInSchemaType>
  isLoading?: boolean
}

export function SignInForm({ form, control, onSubmit, handleSubmit, isLoading }: SignInFormProps) {
  return (
    <FormProvider {...form}>
      <Box ta="center">
        <HiredUpLogo />
        <Text size="xl" fw={600} c="dark.7" mb="xs">
          Sign in to your account
        </Text>
        <Text size="sm" c="dimmed">
          Enter your credentials to access your dashboard
        </Text>
      </Box>

      <Stack gap="lg" my="lg">
        <ControlledTextInput
          control={control}
          name="email"
          type="email"
          label="Email address"
          placeholder="Enter your email"
          isRequired
          leftSection={<AtSign size={18} />}
        />
        <ControlledPasswordInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          isRequired
          leftSection={<LockKeyhole size={18} />}
        />
        <Flex justify="space-between" align="center">
          <ControlledCheckbox name="rememberMe" control={control} label="Remember me" size="sm" color="blue" />
          <Anchor size="sm" c="blue" href="#" underline="hover" fw={500}>
            Forgot password?
          </Anchor>
        </Flex>
        <Button
          fullWidth
          size="lg"
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isLoading}
          style={{
            position: 'relative',
          }}
        >
          Sign In
        </Button>
      </Stack>
      <Divider
        label="Or continue with"
        labelPosition="center"
        my="xl"
        styles={{
          label: {
            color: "var(--mantine-color-dimmed)",
            fontSize: "14px",
          },
        }}
      />
      <Stack gap="md">
        <Button
          onClick={() => {
            redirect("http://localhost:8000/v1/auth/google/sso/login")
          }}
          variant="outline"
          radius="xl"
          size="md"
          leftSection={<GoogleIcon width={20} height={20} />}
        >
          Continue with Google
        </Button>
      </Stack>
      <Box ta="center" pt="lg">
        <Text size="sm" c="dimmed">
          Don&apos;t have an account?{" "}
          <Anchor href="/sign-up" c="blue" underline="hover" fw={600}>
            Sign up
          </Anchor>
        </Text>
        <Text size="xs" mt="md" c="dimmed">
          By signing in, you agree to our{" "}
          <Anchor href="#" c="blue" underline="hover">
            Terms
          </Anchor>{" "}
          and{" "}
          <Anchor href="#" c="blue" underline="hover">
            Privacy Policy
          </Anchor>
        </Text>
      </Box>
    </FormProvider>
  )
}
