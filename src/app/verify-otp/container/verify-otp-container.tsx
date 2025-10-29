"use client";
import { useForm } from "react-hook-form";
import {
    verifyOtpSchema,
    type VerifyOtpSchemaType,
} from "./schema/verify-otp-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyOtpForm } from "./verify-otp-form";
import { Box, Container } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
    useVerifyOtp,
    useRequestOtp,
} from "@/hooks/query-hooks/password-reset-query";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function VerifyOtpContainer() {
    const router = useRouter();
    const verifyOtpMutation = useVerifyOtp();
    const requestOtpMutation = useRequestOtp();

    const [email, setEmail] = useState<string>("");
    const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
    const [resendCooldown, setResendCooldown] = useState(0);

    const form = useForm<VerifyOtpSchemaType>({
        mode: "all",
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const { control, handleSubmit, reset, setError } = form;

    // Initialize email and countdown from sessionStorage
    useEffect(() => {
        const storedEmail = sessionStorage.getItem("forgot-password-email");
        const otpSentAt = sessionStorage.getItem("forgot-password-otp-sent-at");

        if (!storedEmail || !otpSentAt) {
            notifications.show({
                title: "Session Expired",
                message: "Please request a new OTP code.",
                color: "orange",
                icon: <XCircle size={18} />,
            });
            router.push("/forgot-password");
            return;
        }

        setEmail(storedEmail);

        const elapsed = Math.floor((Date.now() - parseInt(otpSentAt)) / 1000);
        const remaining = Math.max(0, 600 - elapsed);
        setCountdown(remaining);

        if (remaining === 0) {
            notifications.show({
                title: "OTP Expired",
                message: "Please request a new OTP code.",
                color: "orange",
                icon: <XCircle size={18} />,
            });
        }
    }, [router]);

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    // Resend cooldown timer
    useEffect(() => {
        if (resendCooldown <= 0) return;

        const timer = setInterval(() => {
            setResendCooldown((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [resendCooldown]);

    async function onSubmit(values: VerifyOtpSchemaType) {
        if (countdown === 0) {
            notifications.show({
                title: "OTP Expired",
                message: "Please request a new OTP code.",
                color: "orange",
                icon: <XCircle size={18} />,
            });
            return;
        }

        try {
            const result = await verifyOtpMutation.mutateAsync({
                email,
                otp_code: values.otp,
            });

            if (result.success) {
                notifications.show({
                    title: "OTP Verified!",
                    message: result.message || "OTP verified successfully.",
                    color: "green",
                    icon: <CheckCircle size={18} />,
                    autoClose: 2000,
                });

                // Store reset token
                sessionStorage.setItem(
                    "forgot-password-reset-token",
                    result.data.reset_token
                );
                sessionStorage.setItem("forgot-password-verified", "true");

                reset();
                router.push("/reset-password");
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Invalid or expired OTP code.";

            notifications.show({
                title: "Verification Failed",
                message: errorMessage,
                color: "red",
                icon: <XCircle size={18} />,
                autoClose: 5000,
            });
            setError("otp", { message: errorMessage });
        }
    }

    async function handleResend() {
        if (resendCooldown > 0) return;

        try {
            await requestOtpMutation.mutateAsync({ email });

            notifications.show({
                title: "OTP Resent!",
                message: "A new OTP code has been sent to your email.",
                color: "green",
                icon: <CheckCircle size={18} />,
                autoClose: 3000,
            });

            // Reset countdown and start cooldown
            setCountdown(600);
            setResendCooldown(60);
            sessionStorage.setItem(
                "forgot-password-otp-sent-at",
                Date.now().toString()
            );

            // Clear OTP input
            reset();
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to resend OTP.";

            notifications.show({
                title: "Resend Failed",
                message: errorMessage,
                color: "red",
                icon: <XCircle size={18} />,
                autoClose: 5000,
            });
        }
    }

    if (!email) {
        return null; // Will redirect in useEffect
    }

    return (
        <Box
            style={{
                minHeight: "100vh",
                background: "#222222",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
            }}
        >
            <Container size="lg" w="100%" maw={600}>
                <VerifyOtpForm
                    form={form}
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    isLoading={verifyOtpMutation.isPending}
                    email={email}
                    countdown={countdown}
                    canResend={resendCooldown === 0}
                    onResend={handleResend}
                    isResending={requestOtpMutation.isPending}
                />
            </Container>
        </Box>
    );
}

