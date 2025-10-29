"use client";
import { Flex, Text, Box, Stack, Anchor } from "@mantine/core";
import { AtSign, Code, ArrowLeft } from "lucide-react";
import { ControlledTextInput } from "@/components/controlled-fields";
import {
    type Control,
    FormProvider,
    type UseFormHandleSubmit,
    type UseFormReturn,
} from "react-hook-form";
import type { ForgotPasswordSchemaType } from "./schema/forgot-password-schema";
import { Button } from "@/components/ui";

type ForgotPasswordFormProps = {
    form: UseFormReturn<ForgotPasswordSchemaType>;
    control: Control<ForgotPasswordSchemaType>;
    onSubmit: (data: ForgotPasswordSchemaType) => void;
    handleSubmit: UseFormHandleSubmit<ForgotPasswordSchemaType>;
    isLoading?: boolean;
};

export function ForgotPasswordForm({
    form,
    control,
    onSubmit,
    handleSubmit,
    isLoading,
}: ForgotPasswordFormProps) {
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
                        Forgot Password?
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
                        No worries! Enter your email address and we&apos;ll send you a code
                        to reset your password.
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
                        Send OTP
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

