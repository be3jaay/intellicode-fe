"use client"
import { GithubIcon, GoogleIcon } from "@/icons"
import { Divider, Flex, Text, Title, Box, Stack, Anchor, Grid } from "@mantine/core"
import { AtSign, LockKeyhole, Rocket, User } from "lucide-react"
import { type Control, FormProvider, type UseFormHandleSubmit, type UseFormReturn } from "react-hook-form"
import { ControlledCheckbox, ControlledPasswordInput, ControlledTextInput } from "@/components/controlled-fields"
import type { SignUpSchemaType } from "./schema/sign-up-schema"
import { Button } from "@/components/ui"

type SignUpFormProps = {
  form: UseFormReturn<SignUpSchemaType>
  control: Control<SignUpSchemaType>
  handleSubmit: UseFormHandleSubmit<SignUpSchemaType>
  onSubmit: (value: SignUpSchemaType) => void
  isLoading?: boolean
}

export const SignUpForm = ({ form, control, onSubmit, handleSubmit, isLoading }: SignUpFormProps) => {
  return (
    <FormProvider {...form}>
      <Box ta="center" mb="xl">
        <Flex align="center" justify="center" gap="sm" mb="md">
          <Rocket color="var(--mantine-color-red-6)" size={28} />
          <Title order={2} c="red.6" size="1.75rem" fw={700}>
            Inspira
          </Title>
        </Flex>
        <Text size="lg" fw={600} c="dark.7" mb="xs">
          Create your account
        </Text>
        <Text size="sm" c="dimmed">
          Start your journey with AI-powered career insights
        </Text>
      </Box>

      <Stack gap="lg">
        <Grid>
          <Grid.Col span={6}>
            <ControlledTextInput
              control={control}
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              isRequired
              leftSection={<User size={18} />}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ControlledTextInput
              control={control}
              name="middleName"
              label="Middle Name"
              placeholder="Enter your middle name"
              leftSection={<User size={18} />}
            />
          </Grid.Col>
        </Grid>

        <ControlledTextInput
          control={control}
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          isRequired
          leftSection={<User size={18} />}
        />

        <ControlledTextInput
          type="email"
          label="Email address"
          placeholder="Enter your email"
          isRequired
          leftSection={<AtSign size={18} />}
          name="email"
          control={control}
        />

        <Grid>
          <Grid.Col span={6}>
            <ControlledTextInput
              control={control}
              name="studentNumber"
              label="Student Number"
              placeholder="2021-00001"
              isRequired
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ControlledTextInput
              control={control}
              name="section"
              label="Section"
              placeholder="BSCS 3A"
              isRequired
            />
          </Grid.Col>
        </Grid>

        <ControlledPasswordInput
          label="Password"
          placeholder="Create a strong password"
          isRequired
          leftSection={<LockKeyhole size={18} />}
          control={control}
          name="password"
        />

        <ControlledPasswordInput
          label="Confirm password"
          placeholder="Confirm your password"
          isRequired
          leftSection={<LockKeyhole size={18} />}
          control={control}
          name="confirmPassword"
        />

        <ControlledCheckbox
          control={control}
          name="agreeToTerms"
          label={
            <Text size="sm">
              I agree to the{" "}
              <Anchor href="#" c="red.6" underline="hover" fw={500}>
                Terms of Service
              </Anchor>{" "}
              and{" "}
              <Anchor href="#" c="red.6" underline="hover" fw={500}>
                Privacy Policy
              </Anchor>
            </Text>
          }
          color="red.6"
          isRequired
        />

        <Button
          fullWidth
          radius="xl"
          size="lg"
          onClick={handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isLoading}
          gradient={{
            from: "red.6",
            to: "red.7",
            deg: 45,
          }}
          styles={{
            root: {
              height: "48px",
              fontWeight: 600,
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: "0 6px 16px rgba(239, 68, 68, 0.4)",
              },
              transition: "all 0.2s ease",
            },
          }}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
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
          variant="outline"
          radius="xl"
          size="md"
          leftSection={<GoogleIcon width={20} height={20} />}
          styles={{
            root: {
              borderColor: "var(--mantine-color-gray-3)",
              color: "var(--mantine-color-dark-7)",
              height: "44px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "var(--mantine-color-gray-0)",
                borderColor: "var(--mantine-color-red-6)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            },
          }}
        >
          Continue with Google
        </Button>

        <Button
          variant="outline"
          radius="xl"
          size="md"
          leftSection={<GithubIcon width={20} height={20} />}
          styles={{
            root: {
              borderColor: "var(--mantine-color-gray-3)",
              color: "var(--mantine-color-dark-7)",
              height: "44px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "var(--mantine-color-gray-0)",
                borderColor: "var(--mantine-color-red-6)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            },
          }}
        >
          Continue with GitHub
        </Button>
      </Stack>

      <Box ta="center" pt="xl">
        <Text size="sm" c="dimmed">
          Already have an account?{" "}
          <Anchor href="/sign-in" c="red.6" underline="hover" fw={600}>
            Sign in
          </Anchor>
        </Text>
      </Box>
    </FormProvider>
  )
}
