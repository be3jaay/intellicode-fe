"use client";

import React from "react";
import { Paper, Table, Text, Avatar } from "@mantine/core";

type Student = {
  student_id: string;
  student_number: string;
  first_name: string;
  last_name: string;
  email: string;
  total_enrolled: number;
  completed_courses: number;
  certificates_earned: number;
  average_grade: number | null;
  total_submissions: number;
  last_activity: string | null;
};

type Props = { students: Student[] };

export default function StudentPerformanceTable({ students = [] }: Props) {
  return (
    <Paper
      style={{
        backgroundColor: "#333333",
        padding: 12,
        borderRadius: 8,
        border: "1px solid #444444",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#FFFFFF",
          marginBottom: 8,
        }}
      >
        Student Performance
      </Text>
      <div style={{ overflowX: "auto" }}>
        <Table verticalSpacing="sm" highlightOnHover>
          <thead style={{ backgroundColor: "#1F1F1F" }}>
            <tr>
              <th style={{ color: "#BDF052", padding: 12 }}>Student</th>
              <th style={{ color: "#BDF052", padding: 12 }}>Enrolled</th>
              <th style={{ color: "#BDF052", padding: 12 }}>Completed</th>
              <th style={{ color: "#BDF052", padding: 12 }}>Avg Grade</th>
              <th style={{ color: "#BDF052", padding: 12 }}>Submissions</th>
              <th style={{ color: "#BDF052", padding: 12 }}>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.student_id}>
                <td style={{ padding: 12, color: "#E9EEEA" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Avatar size={34} radius="xl" color="gray">
                      {s.first_name?.[0] || "S"}
                    </Avatar>
                    <div>
                      <div style={{ fontWeight: 700 }}>
                        {s.first_name} {s.last_name}
                      </div>
                      <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                        {s.student_number}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: 12, color: "#E9EEEA" }}>
                  {s.total_enrolled}
                </td>
                <td style={{ padding: 12, color: "#E9EEEA" }}>
                  {s.completed_courses}
                </td>
                <td style={{ padding: 12, color: "#E9EEEA" }}>
                  {s.average_grade ?? "—"}
                </td>
                <td style={{ padding: 12, color: "#E9EEEA" }}>
                  {s.total_submissions}
                </td>
                <td style={{ padding: 12, color: "#9CA3AF" }}>
                  {s.last_activity
                    ? new Date(s.last_activity).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Paper>
  );
}
