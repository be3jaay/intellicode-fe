"use client";

import { useState } from "react";
import { Tabs } from "@mantine/core";
import { SystemAnalyticsSection } from "./sections/system-analytics-section";
import { StudentPerformanceSection } from "./sections/student-performance-section";
import { InstructorPerformanceSection } from "./sections/instructor-performance-section";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<string | null>("system");

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
            System Analytics & Reports
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#222222" }}>
            Comprehensive insights into system performance, student analytics,
            and instructor metrics
          </p>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List
            style={{ backgroundColor: "#333333", borderColor: "#BDF052" }}
          >
            <Tabs.Tab value="system" style={{ color: "#FFFFFF" }}>
              System Overview
            </Tabs.Tab>
            <Tabs.Tab value="students" style={{ color: "#FFFFFF" }}>
              Student Performance
            </Tabs.Tab>
            <Tabs.Tab value="instructors" style={{ color: "#FFFFFF" }}>
              Instructor Performance
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="system" pt="xl">
            <SystemAnalyticsSection />
          </Tabs.Panel>

          <Tabs.Panel value="students" pt="xl">
            <StudentPerformanceSection />
          </Tabs.Panel>

          <Tabs.Panel value="instructors" pt="xl">
            <InstructorPerformanceSection />
          </Tabs.Panel>
        </Tabs>
      </main>
    </div>
  );
}
