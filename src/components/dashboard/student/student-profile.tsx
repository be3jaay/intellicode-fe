"use client";

import { useState, useEffect } from "react";
import { Stack, Grid, Box, Text, Group, LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ProfileHeader } from "@/components/dashboard/shared/profile-header";
import { ProfilePictureUpload } from "@/components/dashboard/shared/profile-picture-upload";
import { ControlledTextInput } from "@/components/controlled-fields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Users, Hash } from "lucide-react";
import * as z from "zod";
import {
  useCurrentUser,
  useUpdateUserProfile,
} from "@/hooks/query-hooks/user-management-query";

const studentSpecificSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  studentNumber: z.string().min(1, "Student number is required"),
  section: z.string().min(1, "Section is required"),
});

type StudentSpecificForm = z.infer<typeof studentSpecificSchema>;

export function StudentProfile() {
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useCurrentUser();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateUserProfile();
  const [uploadModalOpened, setUploadModalOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const roleColor = "#4DABF7"; // Blue for students

  const studentForm = useForm<StudentSpecificForm>({
    mode: "onChange",
    resolver: zodResolver(studentSpecificSchema),
  });

  // Update form when user data is loaded
  useEffect(() => {
    if (userData) {
      studentForm.reset({
        firstName: userData.first_name || "",
        middleName: userData.middle_name || "",
        lastName: userData.last_name || "",
        studentNumber: userData.student_number || "",
        section: userData.section || "",
      });
    }
  }, [userData]);

  const handleProfileUpdate = async (data: StudentSpecificForm) => {
    if (!userData?.id) return;

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      if (data.middleName) formData.append("middleName", data.middleName);
      formData.append("lastName", data.lastName);
      formData.append("studentNumber", data.studentNumber);
      formData.append("section", data.section);

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
    studentNumber: userData.student_number || "",
    section: userData.section || "",
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
                    control={studentForm.control}
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
                    control={studentForm.control}
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
                control={studentForm.control}
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                isRequired
                leftSection={
                  <Users size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />

              <Grid>
                <Grid.Col span={6}>
                  <ControlledTextInput
                    control={studentForm.control}
                    name="studentNumber"
                    label="Student Number"
                    placeholder="Enter student number"
                    isRequired
                    leftSection={
                      <Hash size={18} color="rgba(255, 255, 255, 0.6)" />
                    }
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <ControlledTextInput
                    control={studentForm.control}
                    name="section"
                    label="Section"
                    placeholder="Enter section"
                    isRequired
                    leftSection={
                      <BookOpen size={18} color="rgba(255, 255, 255, 0.6)" />
                    }
                  />
                </Grid.Col>
              </Grid>

              <Group justify="flex-end" gap="sm">
                <button
                  type="button"
                  onClick={studentForm.handleSubmit(handleProfileUpdate)}
                  disabled={
                    isUpdating ||
                    (!studentForm.formState.isDirty && !selectedFile)
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
                      (!studentForm.formState.isDirty && !selectedFile)
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      isUpdating ||
                      (!studentForm.formState.isDirty && !selectedFile)
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
