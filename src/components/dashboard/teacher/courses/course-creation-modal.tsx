"use client";
import { Modal, Stack, Group, Text, Box, Image } from "@mantine/core";
import { BookOpen, FolderOpen, Type, Upload, X } from "lucide-react";
import {
  ControlledTextInput,
  ControlledTextArea,
  ControlledSelectInput,
} from "@/components/controlled-fields";
import {
  type Control,
  FormProvider,
  type UseFormHandleSubmit,
  type UseFormReturn,
} from "react-hook-form";
import type { CreateCourseSchemaType } from "@/app/dashboard/teacher/courses/create/schema/create-course-schema";
import { Button } from "@/components/ui";
import { useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

type CourseCreationModalProps = {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturn<CreateCourseSchemaType>;
  control: Control<CreateCourseSchemaType>;
  onSubmit: (data: CreateCourseSchemaType) => void;
  handleSubmit: UseFormHandleSubmit<CreateCourseSchemaType>;
  isLoading?: boolean;
};

const courseCategories = [
  { value: "programming", label: "Programming" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "marketing", label: "Marketing" },
  { value: "data-science", label: "Data Science" },
  { value: "personal-development", label: "Personal Development" },
  { value: "mathematics", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "language", label: "Language" },
  { value: "other", label: "Other" },
];

export function CourseCreationModal({
  opened,
  onClose,
  form,
  control,
  onSubmit,
  handleSubmit,
  isLoading,
}: CourseCreationModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { setValue } = form;

  const handleDrop = (files: File[]) => {
    if (files[0]) {
      setValue("thumbnail", files[0]);
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setValue("thumbnail", undefined);
    setPreviewUrl(null);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <BookOpen size={24} color="#bdf052" />
          <Text fw={600} size="xl">
            Create New Course
          </Text>
        </Group>
      }
      size="lg"
      centered
      padding="xl"
      radius="md"
      styles={{
        content: {
          background: "#222222",
        },
        header: {
          paddingBottom: 16,
          background: "#bdf052",
          borderBottom: "1px solid #444444",
        },
      }}
    >
      <FormProvider {...form}>
        <Stack gap="lg" mt="md">
          <ControlledTextInput
            control={control}
            name="title"
            type="text"
            label="Course Title"
            placeholder="e.g., Introduction to Web Development"
            isRequired
            leftSection={<Type size={18} />}
          />

          <ControlledTextArea
            control={control}
            name="description"
            label="Course Description"
            placeholder="Provide a detailed description of what students will learn..."
            isRequired
          />

          <ControlledSelectInput
            control={control}
            name="category"
            label="Course Category"
            placeholder="Select a category"
            isRequired
            options={courseCategories}
            leftSection={<FolderOpen size={18} />}
          />

          <Box>
            <Text size="sm" fw={500} mb={8} c="#bdf052">
              Course Thumbnail (Optional)
            </Text>

            {!previewUrl ? (
              <Dropzone
                onDrop={handleDrop}
                accept={IMAGE_MIME_TYPE}
                maxSize={5 * 1024 * 1024}
                multiple={false}
                styles={{
                  root: {
                    border: "2px dashed #cbd5e1",
                    borderRadius: 12,
                    padding: "32px 16px",
                    background: "#222222",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#bdf052",
                      background: "#eff6ff",
                    },
                  },
                }}
              >
                <Stack align="center" gap="sm">
                  <Box
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Upload size={28} color="white" />
                  </Box>
                  <Text size="sm" fw={500} c="gray.7" ta="center">
                    Drop your course thumbnail here or click to browse
                  </Text>
                  <Text size="xs" c="dimmed" ta="center">
                    Supported formats: JPEG, PNG, WebP • Max size: 5MB
                  </Text>
                </Stack>
              </Dropzone>
            ) : (
              <Box
                style={{
                  position: "relative",
                  border: "2px solid #bdf052",
                  borderRadius: 12,
                  padding: 16,
                  background: "#222222",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 10,
                  }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveImage}
                    style={{
                      padding: "4px 8px",
                      background: "white",
                      border: "1px solid #444444",
                    }}
                  >
                    <X size={16} />
                  </Button>
                </Box>
                <Image
                  src={previewUrl}
                  alt="Thumbnail preview"
                  radius="md"
                  fit="cover"
                  height={200}
                  style={{
                    border: "1px solid #444444",
                  }}
                />
              </Box>
            )}
          </Box>

          <Group justify="flex-end" mt="md" gap="sm">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              size="md"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              leftIcon={<BookOpen size={18} />}
              size="md"
            >
              Create Course
            </Button>
          </Group>
        </Stack>
      </FormProvider>
    </Modal>
  );
}
