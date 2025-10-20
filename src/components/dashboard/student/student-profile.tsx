"use client";

import { useState } from "react";
import {
  Stack,
  Grid,
  Box,
  Text,
  Badge,
  Group,
  Progress,
  Card,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ProfileHeader } from "@/components/dashboard/shared/profile-header";
import { ProfileForm } from "@/components/dashboard/shared/profile-form";
import { ProfilePictureUpload } from "@/components/dashboard/shared/profile-picture-upload";
import {
  ControlledTextInput,
  ControlledSelectInput,
} from "@/components/controlled-fields";
import { mockStudentProfile, type StudentProfile } from "@/types/profile.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GraduationCap,
  BookOpen,
  Award,
  BarChart3,
  Users,
  Hash,
} from "lucide-react";
import * as z from "zod";

const studentSpecificSchema = z.object({
  studentNumber: z.string().min(1, "Student number is required"),
  section: z.string().min(1, "Section is required"),
  yearLevel: z.string().min(1, "Year level is required"),
  program: z.string().min(1, "Program is required"),
  enrollmentStatus: z.enum(["active", "inactive", "suspended"]),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  emergencyContact: z.string().optional(),
});

type StudentSpecificForm = z.infer<typeof studentSpecificSchema>;

export function StudentProfile() {
  const [profile, setProfile] = useState<StudentProfile>(mockStudentProfile);
  const [uploadModalOpened, setUploadModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roleColor = "#4DABF7"; // Blue for students

  const studentForm = useForm<StudentSpecificForm>({
    mode: "onChange",
    resolver: zodResolver(studentSpecificSchema),
    defaultValues: {
      studentNumber: profile.studentNumber,
      section: profile.section,
      yearLevel: profile.yearLevel,
      program: profile.program,
      enrollmentStatus: profile.enrollmentStatus,
      guardianName: profile.guardianName,
      guardianPhone: profile.guardianPhone,
      emergencyContact: profile.emergencyContact,
    },
  });

  const handleProfileUpdate = async (data: any) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setProfile((prev) => ({ ...prev, ...data }));
      setIsLoading(false);
      notifications.show({
        title: "Profile Updated",
        message: "Your profile has been updated successfully",
        color: "green",
      });
    }, 1000);
  };

  const handleStudentInfoUpdate = async (data: StudentSpecificForm) => {
    setIsLoading(true);

    setTimeout(() => {
      setProfile((prev) => ({ ...prev, ...data }));
      setIsLoading(false);
      notifications.show({
        title: "Academic Information Updated",
        message: "Your academic details have been updated successfully",
        color: "green",
      });
    }, 1000);
  };

  const handleProfilePictureUpload = (file: File) => {
    // In a real app, you would upload to a storage service
    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, profilePicture: imageUrl }));
  };

  const enrollmentStatusColors = {
    active: "green",
    inactive: "orange",
    suspended: "red",
  };

  const yearLevelOptions = [
    { value: "1st Year", label: "1st Year" },
    { value: "2nd Year", label: "2nd Year" },
    { value: "3rd Year", label: "3rd Year" },
    { value: "4th Year", label: "4th Year" },
    { value: "5th Year", label: "5th Year" },
  ];

  const enrollmentStatusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ];

  return (
    <Stack gap="xl">
      {/* Profile Header */}
      <ProfileHeader
        profile={profile}
        roleColor={roleColor}
        onEditProfilePicture={() => setUploadModalOpened(true)}
        onEditProfile={() => {}}
      />

      <Grid>
        {/* Personal Information */}
        <Grid.Col span={8}>
          <ProfileForm
            initialData={{
              firstName: profile.firstName,
              middleName: profile.middleName,
              lastName: profile.lastName,
              email: profile.email,
              phone: profile.phone,
              dateOfBirth: profile.dateOfBirth,
              address: profile.address,
              bio: profile.bio,
            }}
            onSubmit={handleProfileUpdate}
            isLoading={isLoading}
            roleColor={roleColor}
          />
        </Grid.Col>

        {/* Academic Statistics */}
        <Grid.Col span={4}>
          <Stack gap="md">
            {/* GPA Card */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group align="center" gap="md">
                <BarChart3 size={24} color={roleColor} />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                    Current GPA
                  </Text>
                  <Text size="xl" fw={700} c="white">
                    {profile.gpa?.toFixed(2) || "N/A"}
                  </Text>
                </Box>
              </Group>
            </Card>

            {/* Credits Card */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group align="center" gap="md">
                <BookOpen size={24} color={roleColor} />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                    Total Credits
                  </Text>
                  <Text size="xl" fw={700} c="white">
                    {profile.totalCredits}
                  </Text>
                  <Progress
                    value={(profile.totalCredits / 150) * 100}
                    color={roleColor}
                    size="xs"
                    mt="xs"
                  />
                  <Text size="xs" c="rgba(255, 255, 255, 0.5)" mt="xs">
                    {profile.totalCredits}/150 units completed
                  </Text>
                </Box>
              </Group>
            </Card>

            {/* Enrollment Status */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group align="center" gap="md">
                <Award size={24} color={roleColor} />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                    Status
                  </Text>
                  <Badge
                    color={enrollmentStatusColors[profile.enrollmentStatus]}
                    size="lg"
                    style={{ textTransform: "capitalize" }}
                  >
                    {profile.enrollmentStatus}
                  </Badge>
                </Box>
              </Group>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Academic Information */}
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
          Academic Information
        </Text>

        <Stack gap="lg">
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
                  <Users size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <ControlledSelectInput
                control={studentForm.control}
                name="yearLevel"
                label="Year Level"
                placeholder="Select year level"
                options={yearLevelOptions}
                isRequired
                leftSection={
                  <GraduationCap size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <ControlledSelectInput
                control={studentForm.control}
                name="enrollmentStatus"
                label="Enrollment Status"
                placeholder="Select status"
                options={enrollmentStatusOptions}
                isRequired
                leftSection={
                  <Award size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
          </Grid>

          <ControlledTextInput
            control={studentForm.control}
            name="program"
            label="Program"
            placeholder="Enter program name"
            isRequired
            leftSection={
              <BookOpen size={18} color="rgba(255, 255, 255, 0.6)" />
            }
          />

          <Grid>
            <Grid.Col span={6}>
              <ControlledTextInput
                control={studentForm.control}
                name="guardianName"
                label="Guardian Name"
                placeholder="Enter guardian name"
                leftSection={
                  <Users size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <ControlledTextInput
                control={studentForm.control}
                name="guardianPhone"
                label="Guardian Phone"
                placeholder="+63 917 123 4567"
                leftSection={
                  <Users size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
          </Grid>

          <ControlledTextInput
            control={studentForm.control}
            name="emergencyContact"
            label="Emergency Contact"
            placeholder="Enter emergency contact number"
            leftSection={<Users size={18} color="rgba(255, 255, 255, 0.6)" />}
          />

          <Group justify="flex-end" gap="sm">
            <button
              type="button"
              onClick={studentForm.handleSubmit(handleStudentInfoUpdate)}
              disabled={isLoading || !studentForm.formState.isDirty}
              style={{
                background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}cc 100%)`,
                border: "none",
                borderRadius: "8px",
                color: "#222222",
                fontWeight: 600,
                padding: "0.75rem 1.5rem",
                cursor:
                  isLoading || !studentForm.formState.isDirty
                    ? "not-allowed"
                    : "pointer",
                opacity: isLoading || !studentForm.formState.isDirty ? 0.6 : 1,
              }}
            >
              {isLoading ? "Updating..." : "Update Academic Info"}
            </button>
          </Group>
        </Stack>
      </Box>

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
