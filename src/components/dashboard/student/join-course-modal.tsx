"use client"
import { Modal, Box, Stack, Text, TextInput, Button, Group, Paper, rem } from "@mantine/core"
import { IconLink, IconCheck, IconSparkles, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { useJoinCourse } from "@/hooks/query-hooks/course-query-hook"
import { notifications } from '@mantine/notifications'

interface JoinCourseModalProps {
    opened: boolean
    onClose: () => void
}

export function JoinCourseModal({ opened, onClose }: JoinCourseModalProps) {
    const [inviteCode, setInviteCode] = useState("")

    const { joinCourse, isJoining, isError } = useJoinCourse()

    const handleJoinCourse = async () => {
        if (!inviteCode.trim()) {
            notifications.show({
                title: 'Invalid Input',
                message: 'Please enter an invitation code',
                color: 'yellow',
                icon: <IconX size={18} />,
                autoClose: 4000,
            })
            return
        }

        try {
            await joinCourse(inviteCode)
            notifications.show({
                title: 'Success!',
                message: 'You have successfully joined the course',
                color: 'green',
                icon: <IconCheck size={18} />,
                autoClose: 3000,
            })
            handleClose()
        } catch (error: any) {
            const errorMessage = error?.message || 'Course not found or not approved'
            notifications.show({
                title: 'Failed to Join Course',
                message: errorMessage,
                color: 'red',
                icon: <IconX size={18} />,
                autoClose: 5000,
            })
        }
    }

    const handleClose = () => {
        setInviteCode("")
        onClose()
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            centered
            size="lg"
            radius="lg"
            withCloseButton={false}
            styles={{
                content: {
                    background: "#222222",
                    border: "1px solid rgba(189, 240, 82, 0.2)",
                },
                header: {
                    background: "transparent",
                },
                body: {
                    padding: 0,
                },
            }}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Box>
                <Paper
                    p="xl"
                    radius={0}
                    style={{
                        background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                        position: "relative",
                        overflow: "hidden",
                        border: "none",
                        borderTopLeftRadius: rem(12),
                        borderTopRightRadius: rem(12),
                    }}
                >
                    <Box
                        style={{
                            position: "absolute",
                            top: -30,
                            right: -30,
                            width: 150,
                            height: 150,
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.15)",
                            filter: "blur(30px)",
                        }}
                    />
                    <Box
                        style={{
                            position: "absolute",
                            bottom: -20,
                            left: -20,
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            background: "rgba(0, 0, 0, 0.1)",
                            filter: "blur(20px)",
                        }}
                    />

                    <Group justify="space-between" align="flex-start" style={{ position: "relative", zIndex: 1 }}>
                        <Box>
                            <Group gap="xs" mb={8}>
                                <IconSparkles size={28} color="#222222" />
                                <Text
                                    size="xl"
                                    fw={700}
                                    style={{
                                        color: "#222222",
                                        letterSpacing: "-0.5px",
                                    }}
                                >
                                    Join Course
                                </Text>
                            </Group>
                            <Text
                                size="sm"
                                fw={500}
                                style={{
                                    color: "rgba(34, 34, 34, 0.8)",
                                }}
                            >
                                Enter your invitation code to enroll
                            </Text>
                        </Box>
                        <Button
                            variant="subtle"
                            color="dark"
                            size="sm"
                            radius="md"
                            onClick={handleClose}
                            styles={{
                                root: {
                                    color: "#222222",
                                    "&:hover": {
                                        background: "rgba(0, 0, 0, 0.1)",
                                    },
                                },
                            }}
                        >
                            <IconX size={20} />
                        </Button>
                    </Group>
                </Paper>
                <Box p="xl">
                    <Stack gap="lg">
                        <Paper
                            p="md"
                            radius="md"
                            style={{
                                background: "rgba(189, 240, 82, 0.05)",
                                border: "1px solid rgba(189, 240, 82, 0.2)",
                            }}
                        >
                            <Group gap="md">
                                <Box
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: rem(12),
                                        background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <IconLink size={24} color="#222222" />
                                </Box>
                                <Box style={{ flex: 1 }}>
                                    <Text size="sm" fw={600} c="#e9eeea" mb={4}>
                                        How to join a course?
                                    </Text>
                                    <Text size="xs" c="dimmed" style={{ lineHeight: 1.6 }}>
                                        Your instructor will provide you with a unique invitation code or link.
                                        Enter it below to join the course and start learning.
                                    </Text>
                                </Box>
                            </Group>
                        </Paper>

                        {/* Input Field */}
                        <Box>
                            <Text size="sm" fw={600} mb={8} c="#bdf052">
                                Invitation Code or Link
                            </Text>
                            <TextInput
                                placeholder="e.g., COURSE-ABC123 or https://..."
                                size="lg"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                leftSection={<IconLink size={20} />}
                                styles={{
                                    input: {
                                        background: "#1a1a1a",
                                        color: "#ffffff",
                                        fontSize: rem(15),
                                        borderColor: "rgba(189, 240, 82, 0.3)",
                                        "&:focus": {
                                            borderColor: "#bdf052",
                                        },
                                        "&::placeholder": {
                                            color: "rgba(255, 255, 255, 0.4)",
                                        },
                                    },
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleJoinCourse()
                                    }
                                }}
                            />
                            <Text size="xs" c="dimmed" mt={8}>
                                The code is case-sensitive and typically 8-12 characters long
                            </Text>
                        </Box>

                        <Paper
                            p="md"
                            radius="md"
                            style={{
                                background: "#1a1a1a",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            <Text size="xs" fw={600} c="dimmed" mb={8}>
                                EXAMPLE FORMATS:
                            </Text>
                            <Stack gap={6}>
                                <Text size="xs" c="dimmed" style={{ fontFamily: "monospace" }}>
                                    • hq4ta8npMkz7ixu1Ybv2
                                </Text>
                                <Text size="xs" c="dimmed" style={{ fontFamily: "monospace" }}>
                                    • 8afpCq3WkZ5vnbuLRjq7
                                </Text>
                                <Text size="xs" c="dimmed" style={{ fontFamily: "monospace" }}>
                                    • d43d11Wk25vabcRjq7a3
                                </Text>
                            </Stack>
                        </Paper>

                        {/* Action Buttons */}
                        <Group justify="flex-end" gap="sm" mt="md">
                            <Button
                                variant="subtle"
                                size="lg"
                                radius="md"
                                onClick={handleClose}
                                color="#e9eeea"
                            >
                                Cancel
                            </Button>
                            <Button
                                leftSection={<IconCheck size={20} />}
                                size="lg"
                                radius="md"
                                loading={isJoining}
                                onClick={handleJoinCourse}
                                styles={{
                                    root: {
                                        background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                                        color: "#222222",
                                        fontWeight: 700,
                                        fontSize: rem(15),
                                        padding: "0 28px",
                                        border: "none",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 8px 20px rgba(189, 240, 82, 0.4)",
                                        },
                                    },
                                }}
                            >
                                Join Course
                            </Button>
                        </Group>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

