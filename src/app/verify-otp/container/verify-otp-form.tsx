"use client";
import { Text, Box, Stack, Anchor, Group, Button as MantineButton } from "@mantine/core";
import { Code, ArrowLeft, Clock, RefreshCw } from "lucide-react";
import { ControlledPinInput } from "@/components/controlled-fields";
import {
    type Control,
    FormProvider,
    type UseFormHandleSubmit,
    type UseFormReturn,
} from "react-hook-form";
import type { VerifyOtpSchemaType } from "./schema/verify-otp-schema";
import { Button } from "@/components/ui";

type VerifyOtpFormProps = {
    form: UseFormReturn<VerifyOtpSchemaType>;
    control: Control<VerifyOtpSchemaType>;
    onSubmit: (data: VerifyOtpSchemaType) => void;
    handleSubmit: UseFormHandleSubmit<VerifyOtpSchemaType>;
    isLoading?: boolean;
    email: string;
    countdown: number;
    canResend: boolean;
    onResend: () => void;
    isResending: boolean;
};

export function VerifyOtpForm({
    form,
    control,
    onSubmit,
    handleSubmit,
    isLoading,
    email,
    countdown,
    canResend,
    onResend,
    isResending,
}: VerifyOtpFormProps) {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const maskEmail = (email: string) => {
        const [name, domain] = email.split("@");
        const maskedName = name[0] + "***" + (name.length > 1 ? name[name.length - 1] : "");
        return `${maskedName}@${domain}`;
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
                        Enter OTP Code
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
                        We sent a 6-digit code to <strong>{maskEmail(email)}</strong>
                    </Text>
                </Stack>

                {/* Form Fields */}
                <Stack gap="lg" mb="xl">
                    <Box>
                        <ControlledPinInput
                            control={control}
                            name="otp"
                            length={6}
                            type="number"
                            placeholder=""
                            disabled={isLoading}
                            maxAttempts={5}
                            showRemainingTime={false}
                            remainingTime={0}
                        />
                    </Box>

                    {/* Countdown Timer */}
                    <Group justify="center" gap="xs">
                        <Clock size={16} color={countdown > 0 ? "#bdf052" : "#ef4444"} />
                        <Text
                            size="sm"
                            c={countdown > 0 ? "#bdf052" : "#ef4444"}
                            fw={500}
                        >
                            {countdown > 0
                                ? `Code expires in ${formatTime(countdown)}`
                                : "Code expired"}
                        </Text>
                    </Group>

                    <Button
                        fullWidth
                        size="lg"
                        onClick={handleSubmit(onSubmit)}
                        loading={isLoading}
                        disabled={isLoading || countdown === 0}
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
                        Verify OTP
                    </Button>

                    {/* Resend Button */}
                    <MantineButton
                        fullWidth
                        variant="subtle"
                        size="md"
                        onClick={onResend}
                        disabled={!canResend || isResending}
                        loading={isResending}
                        leftSection={<RefreshCw size={16} />}
                        style={{
                            color: canResend ? "#bdf052" : "rgba(255, 255, 255, 0.4)",
                        }}
                    >
                        {canResend
                            ? "Resend OTP"
                            : "Resend available in 60 seconds"}
                    </MantineButton>
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

