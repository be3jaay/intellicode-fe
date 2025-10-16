"use client";

import { useState } from "react";
import { Tabs } from "@mantine/core";
import { SystemAnalyticsSection } from "./sections/system-analytics-section";
import { StudentPerformanceSection } from "./sections/student-performance-section";
import { InstructorPerformanceSection } from "./sections/instructor-performance-section";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<string | null>("system");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            System Analytics & Reports
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive insights into system performance, student analytics,
            and instructor metrics
          </p>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="system">System Overview</Tabs.Tab>
            <Tabs.Tab value="students">Student Performance</Tabs.Tab>
            <Tabs.Tab value="instructors">Instructor Performance</Tabs.Tab>
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
