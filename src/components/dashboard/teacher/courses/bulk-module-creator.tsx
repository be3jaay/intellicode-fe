"use client";
import {
  Box,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
  Switch,
  ActionIcon,
  Button,
  Badge,
  Paper,
  Transition,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconPlus,
  IconEdit,
  IconTrash,
  IconX,
  IconSparkles,
  IconCheck,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useDynamicFieldArray } from "@/hooks/use-dynamic-field-array";
import type { CourseValueResponse } from "@/services/course-service/course-type";
import { useBulkModuleCreation } from "@/hooks/query-hooks/module-query";
import { notifications } from "@mantine/notifications";

interface BulkModuleCreatorProps {
  course: CourseValueResponse;
  onBack: () => void;
}

type ModuleFormData = {
  modules: {
    title: string;
    description: string;
    order_index: number;
    is_published: boolean;
  }[];
  editingIndex: number | null;
  isAddingNew: boolean;
};

export function BulkModuleCreator({ course, onBack }: BulkModuleCreatorProps) {
  const { moduleBulkCreation, isCreating, isError } = useBulkModuleCreation(
    course.id
  );
  const form = useForm<ModuleFormData>({
    defaultValues: {
      modules: [],
      editingIndex: null,
      isAddingNew: false,
    },
  });

  const { control, handleSubmit, setValue, watch, register, reset } = form;

  const {
    fields,
    watchedItems,
    editingIndex,
    isAddingNew,
    handleAddNew,
    handleEdit,
    handleSave,
    handleRemove,
    handleCancelEdit,
  } = useDynamicFieldArray<ModuleFormData>({
    control,
    setValue,
    watch,
    name: "modules",
    initialItem: {
      title: "",
      description: "",
      order_index: 0,
      is_published: false,
    },
    rules: { minLength: 0, maxLength: 20 },
  });

  async function onSubmit(data: ModuleFormData) {
    try {
      await moduleBulkCreation(
        data.modules.map((module, index) => ({
          title: module.title,
          description: module.description,
          order_index: index,
          is_published: module.is_published,
        }))
      );

      notifications.show({
        title: "Modules created successfully",
        message: "Modules created successfully",
        color: "green",
      });
      reset();
      onBack();
    } catch (error) {
      notifications.show({
        title: "Error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create modules. Please try again.",
        color: "red",
      });
    }
  }

  const isEditing = editingIndex !== null || isAddingNew;
  const canAddMore = fields.length < 20 && !isEditing;

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "#1a1a1a",
        padding: rem(24),
      }}
    >
      <Box style={{ maxWidth: rem(1200), margin: "0 auto" }}>
        {/* Header Section */}
        <Paper
          shadow="xl"
          p="xl"
          radius="lg"
          mb="xl"
          style={{
            background:
              "linear-gradient(135deg, #bdf052 0%, #a8e042 50%, #93d032 100%)",
            position: "relative",
            overflow: "hidden",
            border: "none",
          }}
        >
          {/* Decorative elements */}
          <Box
            style={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              filter: "blur(40px)",
            }}
          />
          <Box
            style={{
              position: "absolute",
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.1)",
              filter: "blur(30px)",
            }}
          />

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
                style={{
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.2s ease",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      transform: "translateX(-4px)",
                    },
                  },
                }}
              >
                <IconArrowLeft size={24} stroke={2} color="#222222" />
              </ActionIcon>

              <Box>
                <Group gap="xs" mb={4}>
                  <IconSparkles size={28} color="#222222" />
                  <Text
                    size="xl"
                    fw={700}
                    style={{
                      color: "#222222",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Bulk Module Creator
                  </Text>
                </Group>
                <Text
                  size="sm"
                  fw={500}
                  style={{
                    color: "rgba(34, 34, 34, 0.8)",
                  }}
                >
                  Adding modules to <strong>"{course.title}"</strong>
                </Text>
              </Box>
            </Group>

            <Badge
              size="lg"
              radius="md"
              variant="white"
              style={{
                color: "#222222",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {fields.length} / 20 modules
            </Badge>
          </Group>
        </Paper>

        {/* Main Content */}
        <Stack gap="lg">
          {/* Modules List Card */}
          <Paper
            shadow="md"
            p="xl"
            radius="lg"
            style={{
              background: "#222222",
              border: "1px solid rgba(189, 240, 82, 0.2)",
            }}
          >
            <Group justify="space-between" mb="xl">
              <Box>
                <Text size="lg" fw={600} c="#bdf052" mb={4}>
                  Course Modules
                </Text>
                <Text size="sm" c="dimmed">
                  Create up to 20 modules at once
                </Text>
              </Box>
              <Button
                leftSection={<IconPlus size={18} />}
                onClick={handleAddNew}
                disabled={!canAddMore}
                size="md"
                radius="md"
                styles={{
                  root: {
                    background: canAddMore
                      ? "linear-gradient(135deg, #bdf052 0%, #a8e042 100%)"
                      : undefined,
                    color: "#222222",
                    fontWeight: 600,
                    border: "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: canAddMore ? "translateY(-2px)" : undefined,
                      boxShadow: canAddMore
                        ? "0 8px 20px rgba(189, 240, 82, 0.3)"
                        : undefined,
                    },
                  },
                }}
              >
                Add Module
              </Button>
            </Group>

            {fields.length === 0 ? (
              <Paper
                p="xl"
                radius="md"
                style={{
                  background: "#1a1a1a",
                  border: "2px dashed rgba(179, 161, 255, 0.3)",
                  textAlign: "center",
                }}
              >
                <IconSparkles
                  size={48}
                  color="#b3a1ff"
                  style={{ margin: "0 auto 16px" }}
                />
                <Text c="#b3a1ff" size="md" fw={500} mb={8}>
                  No modules yet
                </Text>
                <Text c="dimmed" size="sm">
                  Click &apos;Add Module&apos; to start creating your course
                  content
                </Text>
              </Paper>
            ) : (
              <Stack gap="md">
                {fields.map((field: any, index: number) => {
                  const isCurrentlyEditing =
                    editingIndex === index ||
                    (isAddingNew && index === fields.length - 1);
                  const module = watchedItems?.[index];

                  return (
                    <Transition
                      key={field.id}
                      mounted={true}
                      transition="slide-up"
                      duration={300}
                      timingFunction="ease"
                    >
                      {(styles) => (
                        <Paper
                          style={{
                            ...styles,
                            background: isCurrentlyEditing
                              ? "linear-gradient(135deg, rgba(189, 240, 82, 0.05) 0%, rgba(179, 161, 255, 0.05) 100%)"
                              : "#2a2a2a",
                            border: isCurrentlyEditing
                              ? "2px solid #bdf052"
                              : "1px solid rgba(255, 255, 255, 0.1)",
                            transition: "all 0.3s ease",
                          }}
                          p="lg"
                          radius="md"
                        >
                          {isCurrentlyEditing ? (
                            <Stack gap="md">
                              <Group justify="space-between" align="center">
                                <Badge
                                  size="lg"
                                  radius="md"
                                  variant="light"
                                  color="lime"
                                  leftSection={<IconEdit size={14} />}
                                >
                                  {isAddingNew
                                    ? "New Module"
                                    : `Editing Module #${index + 1}`}
                                </Badge>
                                <ActionIcon
                                  variant="subtle"
                                  color="gray"
                                  size="lg"
                                  onClick={handleCancelEdit}
                                  radius="md"
                                >
                                  <IconX size={18} />
                                </ActionIcon>
                              </Group>

                              <TextInput
                                label="Module Title"
                                placeholder="e.g., Introduction to React Hooks"
                                required
                                size="md"
                                {...register(`modules.${index}.title`)}
                                styles={{
                                  label: {
                                    color: "#bdf052",
                                    fontWeight: 600,
                                    marginBottom: 8,
                                  },
                                  input: {
                                    background: "#1a1a1a",
                                    borderColor: "rgba(189, 240, 82, 0.3)",
                                    color: "#ffffff",
                                    fontSize: rem(15),
                                    "&:focus": {
                                      borderColor: "#bdf052",
                                    },
                                  },
                                }}
                              />

                              <Textarea
                                label="Description"
                                placeholder="Provide a brief overview of what students will learn..."
                                rows={4}
                                size="md"
                                {...register(`modules.${index}.description`)}
                                styles={{
                                  label: {
                                    color: "#b3a1ff",
                                    fontWeight: 600,
                                    marginBottom: 8,
                                  },
                                  input: {
                                    background: "#1a1a1a",
                                    borderColor: "rgba(179, 161, 255, 0.3)",
                                    color: "#ffffff",
                                    fontSize: rem(15),
                                    "&:focus": {
                                      borderColor: "#b3a1ff",
                                    },
                                  },
                                }}
                              />

                              <Group grow align="flex-start">
                                <TextInput
                                  label="Order Index"
                                  type="number"
                                  placeholder="0"
                                  size="md"
                                  {...register(`modules.${index}.order_index`, {
                                    valueAsNumber: true,
                                  })}
                                  styles={{
                                    label: {
                                      color: "#f6acae",
                                      fontWeight: 600,
                                      marginBottom: 8,
                                    },
                                    input: {
                                      background: "#1a1a1a",
                                      borderColor: "rgba(246, 172, 174, 0.3)",
                                      color: "#ffffff",
                                      fontSize: rem(15),
                                      "&:focus": {
                                        borderColor: "#f6acae",
                                      },
                                    },
                                  }}
                                />

                                <Box>
                                  <Text size="sm" fw={600} mb={12} c="#e9eeea">
                                    Visibility
                                  </Text>
                                  <Switch
                                    label="Publish immediately"
                                    size="md"
                                    color="lime"
                                    {...register(
                                      `modules.${index}.is_published`
                                    )}
                                    styles={{
                                      label: {
                                        color: "#e9eeea",
                                        cursor: "pointer",
                                      },
                                      track: {
                                        cursor: "pointer",
                                      },
                                    }}
                                  />
                                </Box>
                              </Group>

                              <Group justify="flex-end" gap="sm" mt="md">
                                <Button
                                  variant="default"
                                  size="md"
                                  onClick={handleCancelEdit}
                                  radius="md"
                                  styles={{
                                    root: {
                                      background: "#1a1a1a",
                                      borderColor: "rgba(255, 255, 255, 0.2)",
                                      color: "#ffffff",
                                      "&:hover": {
                                        background: "#2a2a2a",
                                      },
                                    },
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  leftSection={<IconCheck size={18} />}
                                  size="md"
                                  onClick={handleSave}
                                  radius="md"
                                  styles={{
                                    root: {
                                      background:
                                        "linear-gradient(135deg, #bdf052 0%, #a8e042 100%)",
                                      color: "#222222",
                                      fontWeight: 600,
                                      border: "none",
                                      "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow:
                                          "0 8px 20px rgba(189, 240, 82, 0.3)",
                                      },
                                    },
                                  }}
                                >
                                  Save Module
                                </Button>
                              </Group>
                            </Stack>
                          ) : (
                            <Group
                              justify="space-between"
                              wrap="nowrap"
                              align="center"
                            >
                              <Group gap="md" style={{ flex: 1 }}>
                                <Box
                                  style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: rem(12),
                                    background:
                                      "linear-gradient(135deg, #bdf052 0%, #a8e042 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#222222",
                                    fontWeight: 700,
                                    fontSize: rem(18),
                                    boxShadow:
                                      "0 4px 12px rgba(189, 240, 82, 0.2)",
                                  }}
                                >
                                  {index + 1}
                                </Box>
                                <Box style={{ flex: 1, minWidth: 0 }}>
                                  <Group gap="xs" mb={6}>
                                    <Text
                                      fw={600}
                                      size="md"
                                      c="#ffffff"
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {module?.title || "Untitled Module"}
                                    </Text>
                                    {module?.is_published && (
                                      <Badge
                                        size="sm"
                                        radius="sm"
                                        variant="light"
                                        color="lime"
                                        leftSection={<IconCheck size={12} />}
                                      >
                                        Published
                                      </Badge>
                                    )}
                                  </Group>
                                  <Text
                                    size="sm"
                                    c="dimmed"
                                    lineClamp={1}
                                    mb={4}
                                  >
                                    {module?.description ||
                                      "No description provided"}
                                  </Text>
                                  <Badge
                                    size="xs"
                                    radius="sm"
                                    variant="outline"
                                    color="gray"
                                  >
                                    Order: {module?.order_index ?? 0}
                                  </Badge>
                                </Box>
                              </Group>
                              <Group gap="xs">
                                <ActionIcon
                                  variant="light"
                                  color="violet"
                                  size="lg"
                                  radius="md"
                                  onClick={() => handleEdit(index)}
                                  disabled={isEditing}
                                  style={{
                                    transition: "all 0.2s ease",
                                  }}
                                  styles={{
                                    root: {
                                      "&:hover": {
                                        transform: !isEditing
                                          ? "translateY(-2px)"
                                          : undefined,
                                      },
                                    },
                                  }}
                                >
                                  <IconEdit size={18} />
                                </ActionIcon>
                                <ActionIcon
                                  variant="light"
                                  color="pink"
                                  size="lg"
                                  radius="md"
                                  onClick={() => handleRemove(index)}
                                  disabled={isEditing}
                                  style={{
                                    transition: "all 0.2s ease",
                                  }}
                                  styles={{
                                    root: {
                                      "&:hover": {
                                        transform: !isEditing
                                          ? "translateY(-2px)"
                                          : undefined,
                                      },
                                    },
                                  }}
                                >
                                  <IconTrash size={18} />
                                </ActionIcon>
                              </Group>
                            </Group>
                          )}
                        </Paper>
                      )}
                    </Transition>
                  );
                })}
              </Stack>
            )}
          </Paper>

          {/* Submit Section */}
          {fields.length > 0 && (
            <Transition
              mounted={fields.length > 0}
              transition="slide-up"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Paper
                  style={{
                    ...styles,
                    background:
                      "linear-gradient(135deg, rgba(189, 240, 82, 0.1) 0%, rgba(179, 161, 255, 0.1) 100%)",
                    border: "2px solid rgba(189, 240, 82, 0.3)",
                  }}
                  shadow="lg"
                  p="xl"
                  radius="lg"
                >
                  <Group justify="space-between" align="center">
                    <Box>
                      <Group gap="xs" mb={6}>
                        <IconSparkles size={20} color="#bdf052" />
                        <Text size="md" fw={600} c="#bdf052">
                          Ready to create your modules?
                        </Text>
                      </Group>
                      <Text size="sm" c="dimmed">
                        You have{" "}
                        <strong style={{ color: "#ffffff" }}>
                          {fields.length}
                        </strong>{" "}
                        module
                        {fields.length !== 1 ? "s" : ""} ready to be added to
                        your course
                      </Text>
                    </Box>
                    <Button
                      leftSection={<IconDeviceFloppy size={20} />}
                      size="lg"
                      disabled={isEditing || fields.length === 0 || isCreating}
                      loading={isCreating}
                      onClick={handleSubmit(onSubmit)}
                      radius="md"
                      styles={{
                        root: {
                          background:
                            !isEditing && fields.length > 0
                              ? "linear-gradient(135deg, #bdf052 0%, #a8e042 100%)"
                              : undefined,
                          color: "#222222",
                          fontWeight: 700,
                          fontSize: rem(16),
                          padding: "0 32px",
                          height: rem(48),
                          border: "none",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform:
                              !isEditing && fields.length > 0
                                ? "translateY(-2px)"
                                : undefined,
                            boxShadow:
                              !isEditing && fields.length > 0
                                ? "0 12px 24px rgba(189, 240, 82, 0.4)"
                                : undefined,
                          },
                        },
                      }}
                    >
                      Create {fields.length} Module
                      {fields.length !== 1 ? "s" : ""}
                    </Button>
                  </Group>
                </Paper>
              )}
            </Transition>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
