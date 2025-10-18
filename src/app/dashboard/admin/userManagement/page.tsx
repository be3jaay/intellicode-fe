"use client";

import { useState } from "react";
import { Tabs } from "@mantine/core";
import { StudentAccountsSection } from "./sections/student-accounts-section";
import { InstructorAccountsSection } from "./sections/instructor-accounts-section";
import { InstructorApprovalSection } from "./sections/instructor-approval-section";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<string | null>("students");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#222222" }}>
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1rem" }}>
        <div
          style={{
            marginBottom: "2rem",
            backgroundColor: "#BDF052",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
              color: "#222222",
            }}
          >
            User Management
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#222222" }}>
            Manage student accounts, approve instructor applications, and
            oversee instructor profiles
          </p>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List
            style={{ backgroundColor: "#333333", borderColor: "#BDF052" }}
          >
            <Tabs.Tab value="students" style={{ color: "#FFFFFF" }}>
              Manage Students
            </Tabs.Tab>
            <Tabs.Tab value="approval" style={{ color: "#FFFFFF" }}>
              Instructor Approvals
            </Tabs.Tab>
            <Tabs.Tab value="instructors" style={{ color: "#FFFFFF" }}>
              Manage Instructors
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
      </main>
    </div>
  );
}
