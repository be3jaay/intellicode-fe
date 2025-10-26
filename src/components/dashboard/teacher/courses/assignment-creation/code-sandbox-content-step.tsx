"use client";
import {
  Box,
  Group,
  Stack,
  Text,
  Paper,
  Button,
  rem,
  Textarea,
} from "@mantine/core";
import { IconDeviceFloppy, IconArrowLeft, IconCode } from "@tabler/icons-react";
import { type UseFormRegister } from "react-hook-form";
import type { AssignmentFormData } from "./types";

interface CodeSandboxContentStepProps {
  register: UseFormRegister<AssignmentFormData>;
  onBack: () => void;
  onSubmit: () => void;
}

export function CodeSandboxContentStep({
  register,
  onBack,
  onSubmit,
}: CodeSandboxContentStepProps) {
  return (
    <Stack gap="lg" mt="xl">
      <Paper
        p="lg"
        radius="md"
        style={{
          background: "rgba(52, 211, 153, 0.1)",
          border: "2px solid #34d399",
        }}
      >
        <Group gap="md" mb="md">
          <IconCode size={32} color="#34d399" />
          <Box>
            <Text size="md" fw={600} c="#34d399" mb={4}>
              Code Sandbox Assignment
            </Text>
            <Text size="sm" c="dimmed">
              Configure starter code and test cases for students
            </Text>
          </Box>
        </Group>
      </Paper>

      {/* Starter Code */}
      <Box>
        <Text size="sm" fw={600} mb={8} c="#34d399">
          Starter Code (Optional)
        </Text>
        <Textarea
          {...register("starterCode")}
          placeholder="// Add starter code for students..."
          minRows={8}
          styles={{
            input: {
              background: "#1a1a1a",
              color: "#ffffff",
              fontSize: rem(14),
              fontFamily: "monospace",
              borderColor: "#34d399",
              "&:focus": {
                borderColor: "#34d399",
              },
            },
          }}
        />
      </Box>

      <Group justify="space-between" mt="xl">
        <Button
          leftSection={<IconArrowLeft size={18} />}
          onClick={onBack}
          variant="subtle"
          size="lg"
          styles={{
            root: {
              color: "#bdf052",
            },
          }}
        >
          Back
        </Button>
        <Button
          leftSection={<IconDeviceFloppy size={20} />}
          onClick={onSubmit}
          size="lg"
          radius="md"
          styles={{
            root: {
              background: "linear-gradient(135deg, #9585e6 0%, #8573d9 100%)",
              color: "#fff",
              fontWeight: 600,
              padding: "0 32px",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(149, 133, 230, 0.4)",
              },
            },
          }}
        >
          Create Assignment
        </Button>
      </Group>
    </Stack>
  );
}
