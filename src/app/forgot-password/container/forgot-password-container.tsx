"use client";
import { useForm } from "react-hook-form";
import {
    forgotPasswordSchema,
    type ForgotPasswordSchemaType,
} from "./schema/forgot-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordForm } from "./forgot-password-form";
import { Box, Container } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRequestOtp } from "@/hooks/query-hooks/password-reset-query";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordContainer() {
    const router = useRouter();
    const requestOtpMutation = useRequestOtp();

    const form = useForm<ForgotPasswordSchemaType>({
        mode: "all",
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const { control, handleSubmit, reset, setError } = form;

    async function onSubmit(values: ForgotPasswordSchemaType) {
        try {
            const result = await requestOtpMutation.mutateAsync({
                email: values.email,
            });

            if (result.success) {
                notifications.show({
                    title: "OTP Sent!",
                    message:
                        result.message ||
                        "If the email exists in our system, you will receive an OTP code shortly.",
                    color: "green",
                    icon: <CheckCircle size={18} />,
                    autoClose: 3000,
                });

                // Store email and timestamp in sessionStorage
                sessionStorage.setItem("forgot-password-email", values.email);
                sessionStorage.setItem(
                    "forgot-password-otp-sent-at",
                    Date.now().toString()
                );

                reset();
                router.push("/verify-otp");
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to send OTP. Please try again.";

            notifications.show({
                title: "Error",
                message: errorMessage,
                color: "red",
                icon: <XCircle size={18} />,
                autoClose: 5000,
            });
            setError("email", { message: errorMessage });
        }
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
                <ForgotPasswordForm
                    form={form}
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    isLoading={requestOtpMutation.isPending}
                />
            </Container>
        </Box>
    );
}

