"use client";

import { useState } from "react";
import {
  Box,
  Tabs,
  Container,
  Group,
  Avatar,
  Title,
  Text,
  Button,
} from "@mantine/core";
import { StudentAccountsSection } from "./sections/student-accounts-section";
import { InstructorApprovalSection } from "./sections/instructor-approval-section";
import { InstructorAccountsSection } from "./sections/instructor-accounts-section";
import { LogOut, UserPlus } from "lucide-react";
import { useAuth } from "@/providers/auth-context";
import { IconUserPlus } from "@tabler/icons-react";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<string | null>("students");
  const { user, signOut } = useAuth();

  return (
    <Box style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <Box
        style={{
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          padding: "2rem",
          color: "white",
        }}
      >
        <Container size="xl">
          <Group justify="space-between" align="center">
            <Group>
              <Avatar size="lg" radius="xl" color="red">
                <IconUserPlus size={24} />
              </Avatar>
              <Box>
                <Title order={2}>User Management</Title>
                <Text size="sm" opacity={0.9}>
                  {user?.firstName} {user?.lastName} • Administrator
                </Text>
              </Box>
            </Group>
            <Group>
              <Button variant="white" leftSection={<UserPlus size={18} />}>
                Add User
              </Button>
              <Button
                variant="subtle"
                color="white"
                leftSection={<LogOut size={18} />}
                onClick={signOut}
              >
                Sign Out
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>

      <Container
        size="xl"
        component="main"
        className="p-3 sm:p-4 lg:py-8 lg:px-4"
      >
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          orientation="horizontal"
        >
          <Tabs.List className="flex-wrap" grow>
            <Tabs.Tab value="students" className="text-sm py-3 px-4">
              Students
            </Tabs.Tab>
            <Tabs.Tab value="approval" className="text-sm py-3 px-4">
              Approvals
            </Tabs.Tab>
            <Tabs.Tab value="instructors" className="text-sm py-3 px-4">
              Instructors
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="students" pt="xl">
            <StudentAccountsSection />
          </Tabs.Panel>

          <Tabs.Panel value="approval" pt="xl">
            <InstructorApprovalSection />
          </Tabs.Panel>

          <Tabs.Panel value="instructors" pt="xl">
            <InstructorAccountsSection />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Box>
  );
}
