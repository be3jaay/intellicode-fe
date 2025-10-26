"use client";
import {
  Box,
  Group,
  Stack,
  Text,
  ActionIcon,
  Button,
  Paper,
  Alert,
  Grid,
  Card,
  Center,
  Loader,
} from "@mantine/core";
import { IconArrowLeft, IconPlus, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import type { CourseValueResponse } from "@/services/course-service/course-type";
import { useFetchModuleByCourse } from "@/hooks/query-hooks/module-query";

interface ModuleSelectorProps {
  course: CourseValueResponse;
  onModuleSelect: (moduleId: string) => void;
  onBack: () => void;
}

export function ModuleSelector({
  course,
  onModuleSelect,
  onBack,
}: ModuleSelectorProps) {
  const { modulesData, isLoading, isError } = useFetchModuleByCourse(course.id);
  const [selectedModule, setSelectedModule] = useState<string>("");

  if (isLoading) {
    return (
      <Box style={{ minHeight: "100vh" }}>
        <Paper
          shadow="xl"
          p="xl"
          radius="lg"
          mb="xl"
          style={{
            background:
              "linear-gradient(135deg, #4fd1c5 0%, #38b2ac 50%, #319795 100%)",
            position: "relative",
            overflow: "hidden",
            border: "none",
          }}
        >
          <Group
            justify="space-between"
            align="flex-start"
            style={{ position: "relative", zIndex: 1 }}
          >
            <Group align="center" gap="md">
              <ActionIcon
                variant="white"
                size="xl"
                radius="md"
                onClick={onBack}
              >
                <IconArrowLeft size={24} stroke={2} color="#222222" />
              </ActionIcon>
              <Box>
                <Text size="xl" fw={700} style={{ color: "#fff" }}>
                  Select Module
                </Text>
                <Text size="sm" fw={500} style={{ color: "#f3f3f3" }}>
                  Choose where to add lessons for &apos;{course.title}&apos;
                </Text>
              </Box>
            </Group>
          </Group>
        </Paper>
        <Center p="xl">
          <Loader size="lg" color="#4fd1c5" />
        </Center>
      </Box>
    );
  }

  if (isError || !modulesData) {
    return (
      <Box style={{ minHeight: "100vh" }}>
        <Paper
          shadow="xl"
          p="xl"
          radius="lg"
          mb="xl"
          style={{
            background:
              "linear-gradient(135deg, #4fd1c5 0%, #38b2ac 50%, #319795 100%)",
            position: "relative",
            overflow: "hidden",
            border: "none",
          }}
        >
          <Group
            justify="space-between"
            align="flex-start"
            style={{ position: "relative", zIndex: 1 }}
          >
            <Group align="center" gap="md">
              <ActionIcon
                variant="white"
                size="xl"
                radius="md"
                onClick={onBack}
              >
                <IconArrowLeft size={24} stroke={2} color="#222222" />
              </ActionIcon>
              <Box>
                <Text size="xl" fw={700} style={{ color: "#fff" }}>
                  Select Module
                </Text>
                <Text size="sm" fw={500} style={{ color: "#f3f3f3" }}>
                  Choose where to add lessons for &apos;{course.title}&apos;
                </Text>
              </Box>
            </Group>
          </Group>
        </Paper>
        <Alert color="red" title="Error" p="xl">
          Failed to load modules. Please try again.
        </Alert>
      </Box>
    );
  }

  return (
    <Box style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Paper
        shadow="xl"
        p="xl"
        radius="lg"
        mb="xl"
        style={{
          background:
            "linear-gradient(135deg, #4fd1c5 0%, #38b2ac 50%, #319795 100%)",
          position: "relative",
          overflow: "hidden",
          border: "none",
        }}
      >
        <Group
          justify="space-between"
          align="flex-start"
          style={{ position: "relative", zIndex: 1 }}
        >
          <Group align="center" gap="md">
            <ActionIcon variant="white" size="xl" radius="md" onClick={onBack}>
              <IconArrowLeft size={24} stroke={2} color="#222222" />
            </ActionIcon>
            <Box>
              <Text size="xl" fw={700} style={{ color: "#fff" }}>
                Select Module
              </Text>
              <Text size="sm" fw={500} style={{ color: "#f3f3f3" }}>
                Choose where to add lessons for &apos;{course.title}&apos;
              </Text>
            </Box>
          </Group>
        </Group>
      </Paper>

      {/* Module Selection */}
      <Paper
        shadow="md"
        p="xl"
        radius="lg"
        mb="xl"
        style={{
          background: "#222222",
          border: "1px solid rgba(79, 209, 197, 0.2)",
        }}
      >
        <Stack gap="lg">
          <Text size="lg" fw={600} c="#4fd1c5">
            Available Modules
          </Text>

          {modulesData.length === 0 ? (
            <Alert color="yellow" title="No Modules Found">
              This course doesn&apos;t have any modules yet. Please create
              modules first.
            </Alert>
          ) : (
            <Grid>
              {modulesData.map((module) => (
                <Grid.Col key={module.module_id} span={{ base: 12, md: 6 }}>
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    style={{
                      background:
                        selectedModule === module.module_id
                          ? "rgba(79, 209, 197, 0.1)"
                          : "#1a1a1a",
                      border:
                        selectedModule === module.module_id
                          ? "2px solid #4fd1c5"
                          : "1px solid #333",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setSelectedModule(module.module_id)}
                  >
                    <Group justify="space-between" mb="xs">
                      <Text
                        fw={500}
                        c={
                          selectedModule === module.module_id
                            ? "#4fd1c5"
                            : "#fff"
                        }
                      >
                        {module.module_title}
                      </Text>
                      {selectedModule === module.module_id && (
                        <IconCheck size={20} color="#4fd1c5" />
                      )}
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}

          {selectedModule && (
            <Button
              size="lg"
              onClick={() => onModuleSelect(selectedModule)}
              style={{
                background: "linear-gradient(135deg, #4fd1c5 0%, #38b2ac 100%)",
                color: "#222222",
                fontWeight: 700,
              }}
              leftSection={<IconPlus size={20} />}
            >
              Create Lessons
            </Button>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
