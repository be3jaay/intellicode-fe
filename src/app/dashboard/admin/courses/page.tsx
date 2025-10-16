"use client";

import { Tabs } from "@mantine/core";
import { useState } from "react";
import { PendingCoursesSection } from "./sections/pending-courses-section";
import { ActiveCoursesSection } from "./sections/active-courses-section";

export default function CourseManagementPage() {
  const [activeTab, setActiveTab] = useState<string | null>("pending");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Course Management
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#868e96" }}>
            Review and approve pending course submissions and manage active
            courses
          </p>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="pending">Approve Pending Courses</Tabs.Tab>
            <Tabs.Tab value="active">Active Courses</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="pending" pt="xl">
            <PendingCoursesSection />
          </Tabs.Panel>

          <Tabs.Panel value="active" pt="xl">
            <ActiveCoursesSection />
          </Tabs.Panel>
        </Tabs>
      </main>
    </div>
  );
}
