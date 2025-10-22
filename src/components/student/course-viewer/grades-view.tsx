"use client";
import { Stack } from "@mantine/core";
import { MyGradeSummaryComponent } from "./my-grade-summary";
import { MyGradebookComponent } from "./my-gradebook";

interface GradesViewProps {
  courseId: string;
}

export function GradesView({ courseId }: GradesViewProps) {
  return (
    <Stack gap="xl">
      <MyGradeSummaryComponent courseId={courseId} />
      <MyGradebookComponent courseId={courseId} />
    </Stack>
  );
}
