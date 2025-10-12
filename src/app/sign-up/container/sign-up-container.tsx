"use client"
import { Box, Container, Grid, Paper, Stack, Text, Title, ThemeIcon } from "@mantine/core"
import { SignUpForm } from "./sign-up-form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, type SignUpSchemaType } from "./schema/sign-up-schema"
import { signUp } from "@/utils/auth"
import { GraduationCap, Briefcase, Users, TrendingUp, CheckCircle, XCircle } from "lucide-react"
import { notifications } from '@mantine/notifications'
import { useState } from "react"

export const SignUpContainer = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignUpSchemaType>({
    mode: "all",
    resolver: zodResolver(signUpSchema),
  })

  const { control, handleSubmit, reset, setError } = form

  async function onSubmit(values: SignUpSchemaType) {
    try {
      setIsLoading(true)
      const result = await signUp({ ...values })

      if (result.status === 201 && result.redirect) {
        notifications.show({
          title: 'Registration Successful!',
          message: `Welcome, ${result.user?.firstName || 'User'}! Redirecting to dashboard...`,
          color: 'blue',
          icon: <CheckCircle size={18} />,
          autoClose: 3000,
        })
        reset()

        // Force a hard redirect to ensure clean state
        window.location.href = result.redirect
      } else if (result.status === 429) {
        notifications.show({
          title: 'Too Many Attempts',
          message: result.error || 'Please try again later',
          color: 'orange',
          icon: <XCircle size={18} />,
          autoClose: 5000,
        })
      } else if (result.error) {
        notifications.show({
          title: 'Registration Failed',
          message: result.error || 'Please try again.',
          color: 'red',
          icon: <XCircle size={18} />,
          autoClose: 5000,
        })
        setError('email', { message: result.error })
      }
    } catch (error) {
      notifications.show({
        title: 'Connection Error',
        message: 'An error occurred. Please check your connection and try again.',
        color: 'red',
        icon: <XCircle size={18} />,
        autoClose: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fef7f7 0%, #fff5f5 25%, #fdf2f2 50%, #fef7f7 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: "180px",
          height: "180px",
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.06))",
          borderRadius: "50%",
          filter: "blur(35px)",
          zIndex: 0,
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: "25%",
          left: "5%",
          width: "120px",
          height: "120px",
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.04))",
          borderRadius: "50%",
          filter: "blur(25px)",
          zIndex: 0,
        }}
      />

      <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
        <Grid align="center" style={{ minHeight: "100vh" }}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack align="center" gap="xl" p="xl">
              <Box ta="center">
                <ThemeIcon
                  size={80}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "red.6", to: "red.8", deg: 45 }}
                  mb="xl"
                >
                  <GraduationCap size={40} />
                </ThemeIcon>
                <Title order={1} size="3rem" fw={700} c="red.6" mb="md">
                  Launch Your Career
                </Title>
                <Text size="xl" c="dimmed" mb="xl" maw={400} mx="auto">
                  Join our career launchpad platform and gain real experience through internships, projects, and expert mentorship
                </Text>
              </Box>

              {/* Feature highlights */}
              <Stack gap="lg" maw={400}>
                <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <ThemeIcon size={40} radius="md" variant="light" color="red.6">
                    <Briefcase size={20} />
                  </ThemeIcon>
                  <Box>
                    <Text fw={600} size="sm">
                      Real Internships & Projects
                    </Text>
                    <Text size="xs" c="dimmed">
                      Find hands-on opportunities that build the skills employers want
                    </Text>
                  </Box>
                </Box>
                <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <ThemeIcon size={40} radius="md" variant="light" color="red.6">
                    <Users size={20} />
                  </ThemeIcon>
                  <Box>
                    <Text fw={600} size="sm">
                      Expert Mentors
                    </Text>
                    <Text size="xs" c="dimmed">
                      Connect with industry professionals who guide your career growth
                    </Text>
                  </Box>
                </Box>
                <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <ThemeIcon size={40} radius="md" variant="light" color="red.6">
                    <TrendingUp size={20} />
                  </ThemeIcon>
                  <Box>
                    <Text fw={600} size="sm">
                      Career Growth Tracking
                    </Text>
                    <Text size="xs" c="dimmed">
                      Monitor your progress and achieve your professional goals
                    </Text>
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Right side - Form */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper
              shadow="xl"
              radius="xl"
              p="xl"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(239, 68, 68, 0.1)",
                maxWidth: "450px",
                margin: "0 auto",
              }}
            >
              <SignUpForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} form={form} isLoading={isLoading} />
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  )
}
