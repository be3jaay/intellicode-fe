"use client"
import { Stack, Text, Group, Button, Textarea } from "@mantine/core"
import { IconDeviceFloppy } from "@tabler/icons-react"
import { type UseFormRegister } from "react-hook-form"
import type { ActivityFormData } from "./types"

interface CodeSandboxStepProps {
    register: UseFormRegister<ActivityFormData>
    onBack: () => void
    onSubmit: () => void
}

export function CodeSandboxStep({ register, onBack, onSubmit }: CodeSandboxStepProps) {
    return (
        <Stack gap="lg" mt="xl">
            <Text size="lg" fw={600} c="#34d399">
                Code Sandbox Configuration
            </Text>

            <Textarea
                label="Starter Code"
                placeholder="def main():\n    # Write your code here\n    pass"
                rows={10}
                {...register("starterCode")}
                styles={{
                    label: { color: "#34d399", fontWeight: 600, marginBottom: 8 },
                    input: {
                        background: "#1a1a1a",
                        borderColor: "#34d399",
                        color: "#ffffff",
                        fontFamily: "monospace",
                    },
                }}
            />

            <Textarea
                label="Test Cases"
                placeholder="Input: [1, 2, 3]\nExpected Output: 6"
                rows={6}
                {...register("testCases")}
                styles={{
                    label: { color: "#34d399", fontWeight: 600, marginBottom: 8 },
                    input: {
                        background: "#1a1a1a",
                        borderColor: "#34d399",
                        color: "#ffffff",
                        fontFamily: "monospace",
                    },
                }}
            />

            <Group justify="space-between" mt="xl">
                <Button variant="default" onClick={onBack}>
                    Back
                </Button>
                <Button
                    leftSection={<IconDeviceFloppy size={20} />}
                    onClick={onSubmit}
                    styles={{
                        root: {
                            background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
                            color: "#222222",
                            fontWeight: 600,
                        },
                    }}
                >
                    Create Code Activity
                </Button>
            </Group>
        </Stack>
    )
}

