"use client";
import {
  Stack,
  Text,
  ActionIcon,
  Button,
  Card,
  Group,
  ScrollArea,
  Loader,
  Center,
  Accordion,
} from "@mantine/core";
import {
  IconPlus,
  IconTrash,
  IconCheck,
  IconChevronDown,
} from "@tabler/icons-react";
import {
  useFieldArray,
  Control,
  useWatch,
  UseFormSetValue,
} from "react-hook-form";
import { useState } from "react";
import {
  ControlledTextInput,
  ControlledTextArea,
  ControlledNumberInput,
  ControlledPillsInput,
  ControlledSelectInput,
} from "@/components/controlled-fields";
import { CustomRichTextEditor } from "./rich-text-editor";
import { useBulkLessonCreation } from "@/hooks/query-hooks/lesson-query";

type BulkLessonFormData = {
  lessons: Array<{
    title: string;
    description: string;
    content: string;
    order: number;
    isPublished: boolean;
    estimatedDuration: number;
    difficulty: "beginner" | "intermediate" | "advanced";
    tags: string[];
  }>;
};

interface LessonFormProps {
  control: Control<BulkLessonFormData>;
  fields: Array<{
    id: string;
    title: string;
    description: string;
    content: string;
    order: number;
    isPublished: boolean;
    estimatedDuration: number;
    difficulty: "beginner" | "intermediate" | "advanced";
    tags: string[];
  }>;
  append: (value: {
    title: string;
    description: string;
    content: string;
    order: number;
    isPublished: boolean;
    estimatedDuration: number;
    difficulty: "beginner" | "intermediate" | "advanced";
    tags: string[];
  }) => void;
  remove: (index: number) => void;
  onAddLink: () => void;
  setValue: UseFormSetValue<BulkLessonFormData>;
  courseId: string;
  moduleId: string;
  onSuccess?: () => void;
}

export function LessonForm({
  control,
  fields,
  append,
  remove,
  onAddLink,
  setValue,
  courseId,
  moduleId,
  onSuccess,
}: LessonFormProps) {
  const bulkLessonMutation = useBulkLessonCreation();
  const [activeAccordion, setActiveAccordion] = useState<string | null>("0");

  const addLesson = () => {
    const newIndex = fields.length.toString();
    append({
      title: "",
      description: "",
      content: "",
      order: fields.length + 1,
      isPublished: true, // Always true now
      estimatedDuration: 15,
      difficulty: "beginner",
      tags: [],
    });
    // Open the newly added lesson accordion
    setActiveAccordion(newIndex);
  };

  const handleSubmit = async () => {
    try {
      // Transform the form data to match the API format
      const lessonsData = fields.map((lesson) => ({
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        order_index: lesson.order,
        difficulty: lesson.difficulty,
        estimated_duration: lesson.estimatedDuration,
        is_published: true, // Always true
        tags: lesson.tags,
      }));

      await bulkLessonMutation.mutateAsync({
        courseId,
        moduleId,
        lessons: { lessons: lessonsData },
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to create lessons:", error);
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <Text size="lg" fw={600} c="#4fd1c5">
          Bulk Lesson Creation
        </Text>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={addLesson}
          variant="outline"
          style={{
            borderColor: "#4fd1c5",
            color: "#4fd1c5",
          }}
          disabled={bulkLessonMutation.isPending}
        >
          Add Lesson
        </Button>
      </Group>

      <ScrollArea.Autosize mah={800}>
        <Accordion
          value={activeAccordion}
          onChange={setActiveAccordion}
          chevron={<IconChevronDown size={20} />}
          styles={{
            item: {
              background: "#1a1a1a",
              border: "1px solid #4fd1c5",
              borderRadius: "8px",
              marginBottom: "12px",
              overflow: "hidden",
            },
            control: {
              padding: "16px",
              "&:hover": {
                background: "rgba(79, 209, 197, 0.05)",
              },
            },
            label: {
              color: "#4fd1c5",
              fontWeight: 600,
              fontSize: "16px",
            },
            chevron: {
              color: "#4fd1c5",
            },
            content: {
              padding: "16px",
            },
          }}
        >
          {fields.map((field, index) => (
            <Accordion.Item key={field.id} value={index.toString()}>
              <Group
                justify="space-between"
                align="center"
                wrap="nowrap"
                pr="md"
              >
                <Accordion.Control>
                  Lesson {index + 1}{" "}
                  {field.title ? `: ${field.title}` : "(Untitled)"}
                </Accordion.Control>
                {fields.length > 1 && (
                  <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                    }}
                    disabled={bulkLessonMutation.isPending}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                )}
              </Group>
              <Accordion.Panel>
                <Stack gap="md">
                  <ControlledTextInput
                    control={control}
                    name={`lessons.${index}.title`}
                    label="Lesson Title"
                    placeholder="Enter lesson title"
                    isRequired
                    labelColor="#4fd1c5"
                    borderColor="#4fd1c5"
                  />

                  <ControlledTextArea
                    control={control}
                    name={`lessons.${index}.description`}
                    label="Description"
                    placeholder="Brief description of this lesson"
                    isRequired
                    labelColor="#4fd1c5"
                    borderColor="#4fd1c5"
                    minRows={3}
                  />

                  <ControlledNumberInput
                    control={control}
                    name={`lessons.${index}.order`}
                    label="Order"
                    placeholder="Lesson order"
                    min={1}
                    labelColor="#4fd1c5"
                    borderColor="#4fd1c5"
                  />

                  <ControlledNumberInput
                    control={control}
                    name={`lessons.${index}.estimatedDuration`}
                    label="Estimated Duration (minutes)"
                    placeholder="Estimated duration in minutes"
                    min={1}
                    labelColor="#4fd1c5"
                    borderColor="#4fd1c5"
                  />

                  <ControlledSelectInput
                    control={control}
                    name={`lessons.${index}.difficulty`}
                    label="Difficulty Level"
                    placeholder="Select difficulty level"
                    options={[
                      { value: "beginner", label: "Beginner" },
                      { value: "intermediate", label: "Intermediate" },
                      { value: "advanced", label: "Advanced" },
                    ]}
                    labelColor="#4fd1c5"
                    borderColor="#4fd1c5"
                  />

                  <ControlledPillsInput
                    control={control}
                    name={`lessons.${index}.tags`}
                    label="Tags"
                    placeholder="Type and press Enter to add tags"
                    data={[
                      "javascript",
                      "html",
                      "css",
                      "react",
                      "nodejs",
                      "typescript",
                      "fundamentals",
                      "advanced",
                      "beginner",
                      "intermediate",
                      "arrays",
                      "functions",
                      "objects",
                      "dom",
                      "async",
                      "es6",
                      "testing",
                      "debugging",
                      "performance",
                      "best-practices",
                    ]}
                    labelColor="#4fd1c5"
                    borderColor="#4fd1c5"
                  />

                  <CustomRichTextEditor
                    content={field.content}
                    onChange={(content) => {
                      setValue(`lessons.${index}.content` as any, content);
                    }}
                    onAddLink={onAddLink}
                  />
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScrollArea.Autosize>
    </Stack>
  );
}
