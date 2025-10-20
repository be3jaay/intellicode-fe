"use client";

import { useState } from "react";
import {
  Stack,
  Grid,
  Box,
  Text,
  Badge,
  Group,
  Card,
  Pill,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ProfileHeader } from "@/components/dashboard/shared/profile-header";
import { ProfileForm } from "@/components/dashboard/shared/profile-form";
import { ProfilePictureUpload } from "@/components/dashboard/shared/profile-picture-upload";
import {
  ControlledTextInput,
  ControlledSelectInput,
  ControlledPillsInput,
} from "@/components/controlled-fields";
import { mockTeacherProfile, type TeacherProfile } from "@/types/profile.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  BookOpen,
  Award,
  GraduationCap,
  MapPin,
  Clock,
  Users,
  Hash,
} from "lucide-react";
import * as z from "zod";

const teacherSpecificSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  department: z.string().min(1, "Department is required"),
  specialization: z
    .array(z.string())
    .min(1, "At least one specialization is required"),
  degree: z.string().min(1, "Degree is required"),
  yearsOfExperience: z.number().min(0, "Years of experience must be positive"),
  employmentStatus: z.enum(["full-time", "part-time", "contract"]),
  officeLocation: z.string().optional(),
  officeHours: z.string().optional(),
  researchInterests: z.array(z.string()).optional(),
});

type TeacherSpecificForm = z.infer<typeof teacherSpecificSchema>;

export function TeacherProfile() {
  const [profile, setProfile] = useState<TeacherProfile>(mockTeacherProfile);
  const [uploadModalOpened, setUploadModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roleColor = "#9775FA"; // Purple for teachers

  const teacherForm = useForm<TeacherSpecificForm>({
    mode: "onChange",
    resolver: zodResolver(teacherSpecificSchema),
    defaultValues: {
      employeeId: profile.employeeId,
      department: profile.department,
      specialization: profile.specialization,
      degree: profile.degree,
      yearsOfExperience: profile.yearsOfExperience,
      employmentStatus: profile.employmentStatus,
      officeLocation: profile.officeLocation,
      officeHours: profile.officeHours,
      researchInterests: profile.researchInterests || [],
    },
  });

  const handleProfileUpdate = async (data: any) => {
    setIsLoading(true);

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

  const handleTeacherInfoUpdate = async (data: TeacherSpecificForm) => {
    setIsLoading(true);

    setTimeout(() => {
      setProfile((prev) => ({ ...prev, ...data }));
      setIsLoading(false);
      notifications.show({
        title: "Professional Information Updated",
        message: "Your professional details have been updated successfully",
        color: "green",
      });
    }, 1000);
  };

  const handleProfilePictureUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, profilePicture: imageUrl }));
  };

  const employmentStatusColors = {
    "full-time": "green",
    "part-time": "blue",
    contract: "orange",
  };

  const employmentStatusOptions = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
  ];

  const departmentOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Engineering", label: "Engineering" },
    { value: "Business", label: "Business" },
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

        {/* Professional Statistics */}
        <Grid.Col span={4}>
          <Stack gap="md">
            {/* Experience Card */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group align="center" gap="md">
                <Briefcase size={24} color={roleColor} />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                    Experience
                  </Text>
                  <Text size="xl" fw={700} c="white">
                    {profile.yearsOfExperience} years
                  </Text>
                </Box>
              </Group>
            </Card>

            {/* Publications Card */}
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
                    Publications
                  </Text>
                  <Text size="xl" fw={700} c="white">
                    {profile.publications || 0}
                  </Text>
                </Box>
              </Group>
            </Card>

            {/* Employment Status */}
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
                    color={employmentStatusColors[profile.employmentStatus]}
                    size="lg"
                    style={{ textTransform: "capitalize" }}
                  >
                    {profile.employmentStatus.replace("-", " ")}
                  </Badge>
                </Box>
              </Group>
            </Card>

            {/* Specializations */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Text size="sm" c="rgba(255, 255, 255, 0.7)" mb="sm">
                Specializations
              </Text>
              <Group gap="xs">
                {profile.specialization.map((spec, index) => (
                  <Pill
                    key={index}
                    style={{
                      background: `${roleColor}20`,
                      color: roleColor,
                      border: `1px solid ${roleColor}40`,
                    }}
                  >
                    {spec}
                  </Pill>
                ))}
              </Group>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Professional Information */}
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
          Professional Information
        </Text>

        <Stack gap="lg">
          <Grid>
            <Grid.Col span={6}>
              <ControlledTextInput
                control={teacherForm.control}
                name="employeeId"
                label="Employee ID"
                placeholder="Enter employee ID"
                isRequired
                leftSection={
                  <Hash size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <ControlledSelectInput
                control={teacherForm.control}
                name="department"
                label="Department"
                placeholder="Select department"
                options={departmentOptions}
                isRequired
                leftSection={
                  <Users size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <ControlledTextInput
                control={teacherForm.control}
                name="degree"
                label="Highest Degree"
                placeholder="e.g., Ph.D. in Computer Science"
                isRequired
                leftSection={
                  <GraduationCap size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <ControlledSelectInput
                control={teacherForm.control}
                name="employmentStatus"
                label="Employment Status"
                placeholder="Select status"
                options={employmentStatusOptions}
                isRequired
                leftSection={
                  <Briefcase size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <ControlledTextInput
                control={teacherForm.control}
                name="officeLocation"
                label="Office Location"
                placeholder="e.g., CS Building, Room 304"
                leftSection={
                  <MapPin size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <ControlledTextInput
                control={teacherForm.control}
                name="officeHours"
                label="Office Hours"
                placeholder="e.g., MWF 2:00-4:00 PM"
                leftSection={
                  <Clock size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
          </Grid>

          <ControlledPillsInput
            control={teacherForm.control}
            name="specialization"
            label="Areas of Specialization"
            placeholder="Add specializations (press Enter to add)"
            description="Add your areas of expertise"
          />

          <ControlledPillsInput
            control={teacherForm.control}
            name="researchInterests"
            label="Research Interests"
            placeholder="Add research interests (press Enter to add)"
            description="Add your current research areas of interest"
          />

          <Group justify="flex-end" gap="sm">
            <button
              type="button"
              onClick={teacherForm.handleSubmit(handleTeacherInfoUpdate)}
              disabled={isLoading || !teacherForm.formState.isDirty}
              style={{
                background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}cc 100%)`,
                border: "none",
                borderRadius: "8px",
                color: "#222222",
                fontWeight: 600,
                padding: "0.75rem 1.5rem",
                cursor:
                  isLoading || !teacherForm.formState.isDirty
                    ? "not-allowed"
                    : "pointer",
                opacity: isLoading || !teacherForm.formState.isDirty ? 0.6 : 1,
              }}
            >
              {isLoading ? "Updating..." : "Update Professional Info"}
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
