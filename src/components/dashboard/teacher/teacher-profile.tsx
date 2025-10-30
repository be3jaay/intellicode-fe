"use client";

import { useState, useEffect } from "react";
import {
  Stack,
  Grid,
  Box,
  Text,
  Group,
  LoadingOverlay,
  Card,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ProfileHeader } from "@/components/dashboard/shared/profile-header";
import { ProfilePictureUpload } from "@/components/dashboard/shared/profile-picture-upload";
import { ControlledTextInput } from "@/components/controlled-fields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "lucide-react";
import * as z from "zod";
import { signUpSchema } from "@/app/sign-up/container/schema/sign-up-schema";
import { useAuth } from "@/providers/auth-context";
import { apiClient } from "@/services/api-client";
import {
  useCurrentUser,
  useUpdateUserProfile,
  useChangePassword,
} from "@/hooks/query-hooks/user-management-query";
import { ControlledPasswordInput } from "@/components/controlled-fields";

const teacherSpecificSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
});

type TeacherSpecificForm = z.infer<typeof teacherSpecificSchema>;

export function TeacherProfile() {
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useCurrentUser();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateUserProfile();
  const changePasswordMutation = useChangePassword();
  const isChangingPassword = (changePasswordMutation as any).isPending;
  const { signOut } = useAuth();
  const [uploadModalOpened, setUploadModalOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const roleColor = "#9775FA"; // Purple for teachers

  const teacherForm = useForm<TeacherSpecificForm>({
    mode: "onChange",
    resolver: zodResolver(teacherSpecificSchema),
  });

  // Update form when user data is loaded
  useEffect(() => {
    if (userData) {
      teacherForm.reset({
        firstName: userData.first_name || "",
        middleName: userData.middle_name || "",
        lastName: userData.last_name || "",
      });
    }
  }, [userData]);

  const handleProfileUpdate = async (data: TeacherSpecificForm) => {
    if (!userData?.id) return;

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      if (data.middleName) formData.append("middleName", data.middleName);
      formData.append("lastName", data.lastName);

      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      }

      await updateProfile({ userId: userData.id, data: formData });

      notifications.show({
        title: "Success",
        message: "Profile updated successfully",
        color: "green",
      });

      setSelectedFile(null);
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error?.message || "Failed to update profile",
        color: "red",
      });
    }
  };

  const handleProfilePictureUpload = (file: File) => {
    setSelectedFile(file);
    setUploadModalOpened(false);
  };

  // Password change form - reuse password validation from sign-up schema
  const passwordSchema = z
    .object({
      oldPassword: z.string().min(1, "Old password is required"),
      newPassword: (signUpSchema.shape as any).password as z.ZodTypeAny,
      confirmNewPassword: z.string().min(1, "Please confirm new password"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
    });

  type PasswordForm = z.infer<typeof passwordSchema>;

  const passwordForm = useForm<PasswordForm>({
    mode: "onChange",
    resolver: zodResolver(passwordSchema),
  });

  const handleChangePassword = async (data: PasswordForm) => {
    try {
      await changePasswordMutation.mutateAsync({
        old_password: data.oldPassword,
        new_password: String(data.newPassword),
      });
      notifications.show({
        title: "Success",
        message: "Password changed successfully",
        color: "green",
      });
      passwordForm.reset();
      // Clear session and redirect to sign-in
      try {
        await signOut();
      } catch (err) {
        // fallback: clear token and redirect
        apiClient.clearToken();
        window.location.href = "/sign-in";
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error?.message || "Failed to change password",
        color: "red",
      });
    }
  };

  if (isLoadingUser) {
    return (
      <Box pos="relative" mih={400}>
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      </Box>
    );
  }

  if (userError || !userData) {
    return (
      <Box>
        <Text c="red">Failed to load user profile. Please try again.</Text>
      </Box>
    );
  }

  // Transform API data to match profile structure
  const profile = {
    id: userData.id,
    role: userData.role,
    firstName: userData.first_name,
    middleName: userData.middle_name || undefined,
    lastName: userData.last_name,
    email: userData.email,
    profilePicture: selectedFile
      ? URL.createObjectURL(selectedFile)
      : userData.profile_picture || undefined,
    joinedDate: userData.created_at,
    lastActive: userData.updated_at,
  };

  return (
    <Stack gap="xl">
      <LoadingOverlay
        visible={isUpdating}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      {/* Profile Header */}
      <ProfileHeader
        profile={profile as any}
        roleColor={roleColor}
        onEditProfilePicture={() => setUploadModalOpened(true)}
        onEditProfile={() => {}}
      />

      <Grid>
        {/* Personal Information */}
        <Grid.Col span={12}>
          <Box
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
            <Text
              size="lg"
              fw={600}
              c="white"
              mb="xl"
              style={{
                borderBottom: `2px solid ${roleColor}20`,
                paddingBottom: "0.75rem",
              }}
            >
              Profile Information
            </Text>

            <Stack gap="lg">
              <Grid>
                <Grid.Col span={6}>
                  <ControlledTextInput
                    control={teacherForm.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    isRequired
                    leftSection={
                      <Users size={18} color="rgba(255, 255, 255, 0.6)" />
                    }
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <ControlledTextInput
                    control={teacherForm.control}
                    name="middleName"
                    label="Middle Name"
                    placeholder="Enter your middle name"
                    leftSection={
                      <Users size={18} color="rgba(255, 255, 255, 0.6)" />
                    }
                  />
                </Grid.Col>
              </Grid>

              <ControlledTextInput
                control={teacherForm.control}
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                isRequired
                leftSection={
                  <Users size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />

              <Group justify="flex-end" gap="sm">
                <button
                  type="button"
                  onClick={teacherForm.handleSubmit(handleProfileUpdate)}
                  disabled={
                    isUpdating ||
                    (!teacherForm.formState.isDirty && !selectedFile)
                  }
                  style={{
                    background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}cc 100%)`,
                    border: "none",
                    borderRadius: "8px",
                    color: "#222222",
                    fontWeight: 600,
                    padding: "0.75rem 1.5rem",
                    cursor:
                      isUpdating ||
                      (!teacherForm.formState.isDirty && !selectedFile)
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      isUpdating ||
                      (!teacherForm.formState.isDirty && !selectedFile)
                        ? 0.6
                        : 1,
                  }}
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </Group>
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>

      {/* Password Change */}
      <Grid>
        <Grid.Col span={12}>
          <Card
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              padding: 16,
            }}
          >
            <Text size="lg" fw={600} c="white" mb="md">
              Change Password
            </Text>
            <form onSubmit={passwordForm.handleSubmit(handleChangePassword)}>
              <Stack>
                <ControlledPasswordInput
                  control={passwordForm.control}
                  name="oldPassword"
                  label="Old Password"
                  placeholder="Enter current password"
                  isRequired
                />

                <ControlledPasswordInput
                  control={passwordForm.control}
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter new password"
                  isRequired
                />

                <ControlledPasswordInput
                  control={passwordForm.control}
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  isRequired
                />

                <Group style={{ justifyContent: "flex-end" }}>
                  <Button type="submit" loading={isChangingPassword}>
                    {isChangingPassword ? "Changing..." : "Change Password"}
                  </Button>
                </Group>
              </Stack>
            </form>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Profile Picture Upload Modal */}
      <ProfilePictureUpload
        opened={uploadModalOpened}
        onClose={() => setUploadModalOpened(false)}
        onUpload={handleProfilePictureUpload}
        currentImage={profile.profilePicture}
      />
    </Stack>
  );
}
