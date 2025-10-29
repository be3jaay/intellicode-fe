"use client";
import { useForm } from "react-hook-form";
import {
    resetPasswordSchema,
    type ResetPasswordSchemaType,
} from "./schema/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordForm } from "./reset-password-form";
import { Box, Container } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useResetPassword } from "@/hooks/query-hooks/password-reset-query";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResetPasswordContainer() {
    const router = useRouter();
    const resetPasswordMutation = useResetPassword();

    const [resetToken, setResetToken] = useState<string>("");

    const form = useForm<ResetPasswordSchemaType>({
        mode: "all",
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const { control, handleSubmit, reset, setError, watch } = form;
    const passwordValue = watch("password");

    // Check if user has verified OTP
    useEffect(() => {
        const token = sessionStorage.getItem("forgot-password-reset-token");
        const verified = sessionStorage.getItem("forgot-password-verified");

        if (!token || verified !== "true") {
            notifications.show({
                title: "Unauthorized Access",
                message: "Please verify your OTP first.",
                color: "orange",
                icon: <XCircle size={18} />,
            });
            router.push("/forgot-password");
            return;
        }

        setResetToken(token);
    }, [router]);

    async function onSubmit(values: ResetPasswordSchemaType) {
        try {
            const result = await resetPasswordMutation.mutateAsync({
                reset_token: resetToken,
                new_password: values.password,
            });

            if (result.success) {
                notifications.show({
                    title: "Password Reset Successful!",
                    message:
                        result.message ||
                        "Your password has been reset. You can now log in with your new password.",
                    color: "green",
                    icon: <CheckCircle size={18} />,
                    autoClose: 5000,
                });

                // Clear session storage
                sessionStorage.removeItem("forgot-password-email");
                sessionStorage.removeItem("forgot-password-otp-sent-at");
                sessionStorage.removeItem("forgot-password-reset-token");
                sessionStorage.removeItem("forgot-password-verified");

                reset();

                // Redirect to sign-in after 2 seconds
                setTimeout(() => {
                    router.push("/sign-in");
                }, 2000);
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to reset password. Please try again.";

            notifications.show({
                title: "Reset Failed",
                message: errorMessage,
                color: "red",
                icon: <XCircle size={18} />,
                autoClose: 5000,
            });
            setError("password", { message: errorMessage });
        }
    }

    if (!resetToken) {
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
                <ResetPasswordForm
                    form={form}
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    isLoading={resetPasswordMutation.isPending}
                    passwordValue={passwordValue}
                />
            </Container>
        </Box>
    );
}

