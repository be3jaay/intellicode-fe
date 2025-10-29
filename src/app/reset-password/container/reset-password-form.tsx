"use client";
import { Text, Box, Stack, Anchor, Group, Progress } from "@mantine/core";
import { LockKeyhole, Code, ArrowLeft, Check, X } from "lucide-react";
import {
    ControlledPasswordInput,
} from "@/components/controlled-fields";
import {
    type Control,
    FormProvider,
    type UseFormHandleSubmit,
    type UseFormReturn,
} from "react-hook-form";
import type { ResetPasswordSchemaType } from "./schema/reset-password-schema";
import { Button } from "@/components/ui";

type ResetPasswordFormProps = {
    form: UseFormReturn<ResetPasswordSchemaType>;
    control: Control<ResetPasswordSchemaType>;
    onSubmit: (data: ResetPasswordSchemaType) => void;
    handleSubmit: UseFormHandleSubmit<ResetPasswordSchemaType>;
    isLoading?: boolean;
    passwordValue: string;
};

export function ResetPasswordForm({
    form,
    control,
    onSubmit,
    handleSubmit,
    isLoading,
    passwordValue,
}: ResetPasswordFormProps) {
    const validatePassword = (password: string) => {
        const minLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[@$!%*?&]/.test(password);

        return {
            minLength,
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasSpecial,
            isValid:
                minLength && hasUppercase && hasLowercase && hasNumber && hasSpecial,
        };
    };

    const passwordStrength = validatePassword(passwordValue);
    const strengthScore = Object.values(passwordStrength).filter(
        (v) => v === true
    ).length - 1; // Subtract 1 for isValid
    const strengthPercentage = (strengthScore / 5) * 100;

    const getStrengthColor = () => {
        if (strengthScore <= 2) return "#ef4444";
        if (strengthScore <= 3) return "#f59e0b";
        if (strengthScore <= 4) return "#10b981";
        return "#22c55e";
    };

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
                        Create New Password
                    </Text>

                    <Text
                        size="sm"
                        c="rgba(255, 255, 255, 0.7)"
                        ta="center"
                        style={{
                            lineHeight: 1.5,
                            maxWidth: "400px",
                        }}
                    >
                        Your new password must be different from previously used passwords.
                    </Text>
                </Stack>

                {/* Form Fields */}
                <Stack gap="lg" mb="xl">
                    <ControlledPasswordInput
                        control={control}
                        name="password"
                        label="New Password"
                        placeholder="Enter your new password"
                        isRequired
                        leftSection={
                            <LockKeyhole size={18} color="rgba(255, 255, 255, 0.6)" />
                        }
                    />

                    <ControlledPasswordInput
                        control={control}
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Re-enter your new password"
                        isRequired
                        leftSection={
                            <LockKeyhole size={18} color="rgba(255, 255, 255, 0.6)" />
                        }
                    />

                    {/* Password Strength Indicator */}
                    {passwordValue && (
                        <Box>
                            <Group justify="space-between" mb="xs">
                                <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                                    Password Strength
                                </Text>
                                <Text size="sm" c={getStrengthColor()} fw={600}>
                                    {strengthScore <= 2
                                        ? "Weak"
                                        : strengthScore <= 3
                                            ? "Fair"
                                            : strengthScore <= 4
                                                ? "Good"
                                                : "Strong"}
                                </Text>
                            </Group>
                            <Progress
                                value={strengthPercentage}
                                color={getStrengthColor()}
                                size="sm"
                                radius="md"
                                mb="md"
                            />

                            {/* Password Requirements */}
                            <Stack gap="xs">
                                <Group gap="xs">
                                    {passwordStrength.minLength ? (
                                        <Check size={14} color="#22c55e" />
                                    ) : (
                                        <X size={14} color="#ef4444" />
                                    )}
                                    <Text
                                        size="xs"
                                        c={
                                            passwordStrength.minLength
                                                ? "#22c55e"
                                                : "rgba(255, 255, 255, 0.5)"
                                        }
                                    >
                                        At least 8 characters
                                    </Text>
                                </Group>
                                <Group gap="xs">
                                    {passwordStrength.hasUppercase ? (
                                        <Check size={14} color="#22c55e" />
                                    ) : (
                                        <X size={14} color="#ef4444" />
                                    )}
                                    <Text
                                        size="xs"
                                        c={
                                            passwordStrength.hasUppercase
                                                ? "#22c55e"
                                                : "rgba(255, 255, 255, 0.5)"
                                        }
                                    >
                                        One uppercase letter
                                    </Text>
                                </Group>
                                <Group gap="xs">
                                    {passwordStrength.hasLowercase ? (
                                        <Check size={14} color="#22c55e" />
                                    ) : (
                                        <X size={14} color="#ef4444" />
                                    )}
                                    <Text
                                        size="xs"
                                        c={
                                            passwordStrength.hasLowercase
                                                ? "#22c55e"
                                                : "rgba(255, 255, 255, 0.5)"
                                        }
                                    >
                                        One lowercase letter
                                    </Text>
                                </Group>
                                <Group gap="xs">
                                    {passwordStrength.hasNumber ? (
                                        <Check size={14} color="#22c55e" />
                                    ) : (
                                        <X size={14} color="#ef4444" />
                                    )}
                                    <Text
                                        size="xs"
                                        c={
                                            passwordStrength.hasNumber
                                                ? "#22c55e"
                                                : "rgba(255, 255, 255, 0.5)"
                                        }
                                    >
                                        One number
                                    </Text>
                                </Group>
                                <Group gap="xs">
                                    {passwordStrength.hasSpecial ? (
                                        <Check size={14} color="#22c55e" />
                                    ) : (
                                        <X size={14} color="#ef4444" />
                                    )}
                                    <Text
                                        size="xs"
                                        c={
                                            passwordStrength.hasSpecial
                                                ? "#22c55e"
                                                : "rgba(255, 255, 255, 0.5)"
                                        }
                                    >
                                        One special character (@$!%*?&)
                                    </Text>
                                </Group>
                            </Stack>
                        </Box>
                    )}

                    <Button
                        fullWidth
                        size="lg"
                        onClick={handleSubmit(onSubmit)}
                        loading={isLoading}
                        disabled={isLoading || !passwordStrength.isValid}
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
                        Reset Password
                    </Button>
                </Stack>

                <Stack align="center" gap="xs">
                    <Anchor
                        href="/sign-in"
                        style={{
                            color: "rgba(255, 255, 255, 0.7)",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.875rem",
                        }}
                    >
                        <ArrowLeft size={16} />
                        Back to Sign In
                    </Anchor>
                </Stack>
            </Box>
        </FormProvider>
    );
}

