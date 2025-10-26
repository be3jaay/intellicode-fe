"use client";
import { useForm } from "react-hook-form";
import { signInSchema, type SignInSchemaType } from "./schema/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInForm } from "./sign-in-form";
import { Box, Container } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { signIn } from "@/utils/auth";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInContainer() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInSchemaType>({
    mode: "all",
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { control, handleSubmit, reset, setError } = form;

  async function onSubmit(values: SignInSchemaType) {
    try {
      setIsLoading(true);
      const result = await signIn(values.email, values.password);

      if (result.status === 200 && result.redirect) {
        notifications.show({
          title: "Login Successful!",
          message: `Welcome back, ${
            result.user?.firstName || "User"
          }! Redirecting to dashboard...`,
          color: "green",
          icon: <CheckCircle size={18} />,
          autoClose: 3000,
        });
        reset();
        window.location.href = result.redirect!;
      } else if (result.status === 401) {
        notifications.show({
          title: "Login Failed",
          message: result.message || "Invalid email or password",
          color: "red",
          icon: <XCircle size={18} />,
          autoClose: 5000,
        });
        setError("email", { message: result.message });
        setError("password", { message: result.message });
      } else if (result.status === 429) {
        notifications.show({
          title: "Too Many Attempts",
          message: result.message || "Please try again later",
          color: "orange",
          icon: <XCircle size={18} />,
          autoClose: 5000,
        });
      } else {
        notifications.show({
          title: "Error",
          message: result.message || "Login failed. Please try again.",
          color: "red",
          icon: <XCircle size={18} />,
          autoClose: 5000,
        });
        setError("email", { message: result.message || "Login failed" });
      }
    } catch (error) {
      notifications.show({
        title: "Connection Error",
        message: `An error occurred. Please check your connection and try again. ${error}`,
        color: "red",
        icon: <XCircle size={18} />,
        autoClose: 5000,
      });
      setError("email", { message: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
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
        <SignInForm
          form={form}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Container>
    </Box>
  );
}
