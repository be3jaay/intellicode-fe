"use client"
import { useForm } from "react-hook-form"
import { signInSchema, type SignInSchemaType } from "./schema/sign-in-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInForm } from "./sign-in-form"
import { Box, Container, Grid, Paper, Stack, Text, ThemeIcon } from "@mantine/core"
import { notifications } from '@mantine/notifications'
import { signIn } from "@/utils/auth"
import { Briefcase, Users, Target, Code, Brain, BookOpen, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInContainer() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignInSchemaType>({
    mode: "all",
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const { control, handleSubmit, reset, setError } = form

  async function onSubmit(values: SignInSchemaType) {
    try {
      setIsLoading(true)
      const result = await signIn(values.email, values.password)

      if (result.status === 200 && result.redirect) {
        notifications.show({
          title: 'Login Successful!',
          message: `Welcome back, ${result.user?.firstName || 'User'}! Redirecting to dashboard...`,
          color: 'blue',
          icon: <CheckCircle size={18} />,
          autoClose: 3000,
        })
        reset()

        // Force a hard redirect to ensure clean state
        // This ensures the page fully reloads with the new session
        window.location.href = result.redirect!
      } else if (result.status === 401) {
        notifications.show({
          title: 'Login Failed',
          message: result.message || 'Invalid email or password',
          color: 'red',
          icon: <XCircle size={18} />,
          autoClose: 5000,
        })
        setError('email', { message: result.message })
        setError('password', { message: result.message })
      } else if (result.status === 429) {
        notifications.show({
          title: 'Too Many Attempts',
          message: result.message || 'Please try again later',
          color: 'orange',
          icon: <XCircle size={18} />,
          autoClose: 5000,
        })
      } else {
        notifications.show({
          title: 'Error',
          message: result.message || 'Login failed. Please try again.',
          color: 'red',
          icon: <XCircle size={18} />,
          autoClose: 5000,
        })
        setError('email', { message: result.message || 'Login failed' })
      }
    } catch (error) {
      notifications.show({
        title: 'Connection Error',
        message: 'An error occurred. Please check your connection and try again.',
        color: 'red',
        icon: <XCircle size={18} />,
        autoClose: 5000,
      })
      setError('email', { message: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container fluid style={{ position: "relative", zIndex: 1 }}>
      <Grid align="center" >
        <Grid.Col span={{ base: 12, md: 6 }} style={{ background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)", minHeight: "100vh" }}>
          <Stack align="center" p="xl" >
            <Box ta="center">
              <Box
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  marginBottom: "1rem",
                }}
              >
                <Brain size={40} color="white" />
              </Box>
              <Text size="md" c="dimmed" mb="md" maw={400} mx="auto">
                Welcome back to Intellicode - Master coding with AI-powered learning
              </Text>
            </Box>
            <Stack gap="md" maw={400}>
              <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <ThemeIcon size={40} radius="md" variant="light" color="blue">
                  <Code size={20} />
                </ThemeIcon>
                <Box>
                  <Text fw={600} size="sm">
                    Real-time Compiler
                  </Text>
                  <Text size="xs" c="dimmed">
                    Practice Java, Python, and C with instant feedback
                  </Text>
                </Box>
              </Box>
              <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <ThemeIcon size={40} radius="md" variant="light" color="blue">
                  <Brain size={20} />
                </ThemeIcon>
                <Box>
                  <Text fw={600} size="sm">
                    AI-Powered Grading
                  </Text>
                  <Text size="xs" c="dimmed">
                    Get intelligent assessments and personalized feedback
                  </Text>
                </Box>
              </Box>
              <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <ThemeIcon size={40} radius="md" variant="light" color="blue">
                  <BookOpen size={20} />
                </ThemeIcon>
                <Box>
                  <Text fw={600} size="sm">
                    Progress Tracking
                  </Text>
                  <Text size="xs" c="dimmed">
                    Monitor your learning journey and earn certificates
                  </Text>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }} style={{ minHeight: "100vh" }}>
          <Paper
            radius="md"
            px="6rem"
            py="xl"
          >
            <SignInForm form={form} control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} isLoading={isLoading} />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container >
  )
}
