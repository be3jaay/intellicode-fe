"use client";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
  ThemeIcon,
} from "@mantine/core";
import { SignUpForm } from "./sign-up-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpSchemaType } from "./schema/sign-up-schema";
import { signUp } from "@/utils/auth";
import { SignUpFormValue } from "@/types/auth.type";
import {
  GraduationCap,
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const SignUpContainer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpSchemaType>({
    mode: "all",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: undefined,
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      studentNumber: "",
      section: "",
      agreeToTerms: false,
    },
  });

  const { control, handleSubmit, reset, setError } = form;

  async function onSubmit(values: SignUpSchemaType) {
    try {
      setIsLoading(true);

      // Filter out student-specific fields for teachers
      const submitValues: SignUpFormValue = {
        ...values,
        studentNumber:
          values.role === "student" ? values.studentNumber || "" : undefined,
        section: values.role === "student" ? values.section || "" : undefined,
      };

      const result = await signUp(submitValues);

      if (result.status === 201 && result.redirect) {
        notifications.show({
          title: "Registration Successful!",
          message: `Welcome, ${
            result.user?.firstName || "User"
          }! Redirecting to dashboard...`,
          color: "blue",
          icon: <CheckCircle size={18} />,
          autoClose: 3000,
        });
        reset();

        // Force a hard redirect to ensure clean state
        window.location.href = result.redirect;
      } else if (result.status === 429) {
        notifications.show({
          title: "Too Many Attempts",
          message: result.error || "Please try again later",
          color: "orange",
          icon: <XCircle size={18} />,
          autoClose: 5000,
        });
      } else if (result.error) {
        notifications.show({
          title: "Registration Failed",
          message: result.error || "Please try again.",
          color: "red",
          icon: <XCircle size={18} />,
          autoClose: 5000,
        });
        setError("email", { message: result.error });
      }
    } catch (error) {
      notifications.show({
        title: "Connection Error",
        message:
          "An error occurred. Please check your connection and try again.",
        color: "red",
        icon: <XCircle size={18} />,
        autoClose: 5000,
      });
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
        <SignUpForm
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          form={form}
          isLoading={isLoading}
        />
      </Container>
    </Box>
  );
};
