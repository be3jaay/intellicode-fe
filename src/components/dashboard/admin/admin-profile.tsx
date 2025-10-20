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
  List,
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
import { mockAdminProfile, type AdminProfile } from "@/types/profile.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Shield,
  Users,
  Settings,
  Globe,
  Lock,
  Hash,
  Building,
} from "lucide-react";
import * as z from "zod";

const adminSpecificSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
  accessLevel: z.enum(["super-admin", "admin", "moderator"]),
  permissions: z
    .array(z.string())
    .min(1, "At least one permission is required"),
  securityClearance: z.string().min(1, "Security clearance is required"),
  managedDepartments: z.array(z.string()).optional(),
});

type AdminSpecificForm = z.infer<typeof adminSpecificSchema>;

export function AdminProfile() {
  const [profile, setProfile] = useState<AdminProfile>(mockAdminProfile);
  const [uploadModalOpened, setUploadModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roleColor = "#FF6B6B"; // Red for admins

  const adminForm = useForm<AdminSpecificForm>({
    mode: "onChange",
    resolver: zodResolver(adminSpecificSchema),
    defaultValues: {
      employeeId: profile.employeeId,
      department: profile.department,
      position: profile.position,
      accessLevel: profile.accessLevel,
      permissions: profile.permissions,
      securityClearance: profile.securityClearance,
      managedDepartments: profile.managedDepartments,
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

  const handleAdminInfoUpdate = async (data: AdminSpecificForm) => {
    setIsLoading(true);

    setTimeout(() => {
      setProfile((prev) => ({ ...prev, ...data }));
      setIsLoading(false);
      notifications.show({
        title: "Administrative Information Updated",
        message: "Your administrative details have been updated successfully",
        color: "green",
      });
    }, 1000);
  };

  const handleProfilePictureUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, profilePicture: imageUrl }));
  };

  const accessLevelColors = {
    "super-admin": "red",
    admin: "orange",
    moderator: "blue",
  };

  const accessLevelOptions = [
    { value: "super-admin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
    { value: "moderator", label: "Moderator" },
  ];

  const departmentOptions = [
    {
      value: "Information Technology Services",
      label: "Information Technology Services",
    },
    { value: "Student Services", label: "Student Services" },
    { value: "Academic Affairs", label: "Academic Affairs" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Finance", label: "Finance" },
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

        {/* Administrative Statistics */}
        <Grid.Col span={4}>
          <Stack gap="md">
            {/* Access Level Card */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group align="center" gap="md">
                <Shield size={24} color={roleColor} />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                    Access Level
                  </Text>
                  <Badge
                    color={accessLevelColors[profile.accessLevel]}
                    size="lg"
                    style={{ textTransform: "capitalize" }}
                  >
                    {profile.accessLevel.replace("-", " ")}
                  </Badge>
                </Box>
              </Group>
            </Card>

            {/* Security Clearance Card */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group align="center" gap="md">
                <Lock size={24} color={roleColor} />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                    Security Clearance
                  </Text>
                  <Text size="lg" fw={700} c="white">
                    {profile.securityClearance}
                  </Text>
                </Box>
              </Group>
            </Card>

            {/* Managed Departments */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group align="center" gap="md">
                <Building size={24} color={roleColor} />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                    Managed Departments
                  </Text>
                  <Text size="lg" fw={700} c="white">
                    {profile.managedDepartments.length}
                  </Text>
                </Box>
              </Group>
            </Card>

            {/* Last Login Info */}
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
            >
              <Group align="center" gap="md">
                <Globe size={24} color={roleColor} />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                    Last Login IP
                  </Text>
                  <Text
                    size="sm"
                    fw={600}
                    c="white"
                    style={{ fontFamily: "monospace" }}
                  >
                    {profile.lastLoginIP || "N/A"}
                  </Text>
                </Box>
              </Group>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Administrative Information */}
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
          Administrative Information
        </Text>

        <Stack gap="lg">
          <Grid>
            <Grid.Col span={6}>
              <ControlledTextInput
                control={adminForm.control}
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
                control={adminForm.control}
                name="department"
                label="Department"
                placeholder="Select department"
                options={departmentOptions}
                isRequired
                leftSection={
                  <Building size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <ControlledTextInput
                control={adminForm.control}
                name="position"
                label="Position"
                placeholder="Enter position title"
                isRequired
                leftSection={
                  <Users size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <ControlledSelectInput
                control={adminForm.control}
                name="accessLevel"
                label="Access Level"
                placeholder="Select access level"
                options={accessLevelOptions}
                isRequired
                leftSection={
                  <Shield size={18} color="rgba(255, 255, 255, 0.6)" />
                }
              />
            </Grid.Col>
          </Grid>

          <ControlledTextInput
            control={adminForm.control}
            name="securityClearance"
            label="Security Clearance"
            placeholder="Enter security clearance level"
            isRequired
            leftSection={<Lock size={18} color="rgba(255, 255, 255, 0.6)" />}
          />

          <ControlledPillsInput
            control={adminForm.control}
            name="permissions"
            label="System Permissions"
            placeholder="Add permissions (press Enter to add)"
            description="Add system permissions assigned to this admin"
          />

          <ControlledPillsInput
            control={adminForm.control}
            name="managedDepartments"
            label="Managed Departments"
            placeholder="Add departments (press Enter to add)"
            description="Add departments under this admin's management"
          />

          <Group justify="flex-end" gap="sm">
            <button
              type="button"
              onClick={adminForm.handleSubmit(handleAdminInfoUpdate)}
              disabled={isLoading || !adminForm.formState.isDirty}
              style={{
                background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}cc 100%)`,
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontWeight: 600,
                padding: "0.75rem 1.5rem",
                cursor:
                  isLoading || !adminForm.formState.isDirty
                    ? "not-allowed"
                    : "pointer",
                opacity: isLoading || !adminForm.formState.isDirty ? 0.6 : 1,
              }}
            >
              {isLoading ? "Updating..." : "Update Administrative Info"}
            </button>
          </Group>
        </Stack>
      </Box>

      {/* Current Permissions & Departments */}
      <Grid>
        <Grid.Col span={6}>
          <Box
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "1.5rem",
            }}
          >
            <Text
              size="md"
              fw={600}
              c="white"
              mb="md"
              style={{
                borderBottom: `1px solid ${roleColor}20`,
                paddingBottom: "0.5rem",
              }}
            >
              Current Permissions
            </Text>
            <Group gap="xs">
              {profile.permissions.map((permission, index) => (
                <Pill
                  key={index}
                  style={{
                    background: `${roleColor}20`,
                    color: roleColor,
                    border: `1px solid ${roleColor}40`,
                  }}
                >
                  {permission
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </Pill>
              ))}
            </Group>
          </Box>
        </Grid.Col>

        <Grid.Col span={6}>
          <Box
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "1.5rem",
            }}
          >
            <Text
              size="md"
              fw={600}
              c="white"
              mb="md"
              style={{
                borderBottom: `1px solid ${roleColor}20`,
                paddingBottom: "0.5rem",
              }}
            >
              Managed Departments
            </Text>
            <List
              spacing="xs"
              size="sm"
              styles={{
                item: {
                  color: "rgba(255, 255, 255, 0.8)",
                },
                itemWrapper: {
                  color: roleColor,
                },
              }}
            >
              {profile.managedDepartments.map((dept, index) => (
                <List.Item key={index}>{dept}</List.Item>
              ))}
            </List>
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
