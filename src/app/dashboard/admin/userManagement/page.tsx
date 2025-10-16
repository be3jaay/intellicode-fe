"use client";

import { useState } from "react";
import { Box, Tabs } from "@mantine/core";
import { StudentAccountsSection } from "./sections/student-accounts-section";
import { InstructorApprovalSection } from "./sections/instructor-approval-section";
import { InstructorAccountsSection } from "./sections/instructor-accounts-section";
import { useAuth } from "@/providers/auth-context";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<string | null>("students");
  const { user, signOut } = useAuth();

  return (
    <Box style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            User Management
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#868e96" }}>
            Manage student accounts, approve instructor applications, and
            oversee instructor profiles
          </p>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="students">Manage Students</Tabs.Tab>
            <Tabs.Tab value="approval">Instructor Approvals</Tabs.Tab>
            <Tabs.Tab value="instructors">Manage Instructors</Tabs.Tab>
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
      </main>
    </Box>
  );
}
