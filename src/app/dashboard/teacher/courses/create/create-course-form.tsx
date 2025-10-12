"use client";
import { Box, Stack, Text, Title } from "@mantine/core";
import { BookOpen, FileImage, FolderOpen, Type } from "lucide-react";
import {
    ControlledTextInput,
    ControlledTextArea,
    ControlledSelectInput,
    ControlledFileInput,
} from "@/components/controlled-fields";
import {
    type Control,
    FormProvider,
    type UseFormHandleSubmit,
    type UseFormReturn,
} from "react-hook-form";
import type { CreateCourseSchemaType } from "./schema/create-course-schema";
import { Button } from "@/components/ui";

type CreateCourseFormProps = {
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

export function CreateCourseForm({
    form,
    control,
    onSubmit,
    handleSubmit,
    isLoading,
}: CreateCourseFormProps) {
    return (
        <FormProvider {...form}>
            <Box mb="xl">
                <Title order={2} mb="xs">
                    Create New Course
                </Title>
                <Text size="sm" c="dimmed">
                    Fill in the details below to create a new course for your students
                </Text>
            </Box>

            <Stack gap="lg">
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
                    placeholder="Provide a detailed description of what students will learn in this course..."
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

                <ControlledFileInput
                    control={control}
                    name="thumbnail"
                    label="Course Thumbnail (Optional)"
                    placeholder="Upload course thumbnail"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    leftSection={<FileImage size={18} />}
                    helperText="Accepted formats: JPEG, PNG, WebP. Max size: 5MB"
                />

                <Stack gap="sm" mt="md">
                    <Button
                        fullWidth
                        size="lg"
                        variant="primary"
                        onClick={handleSubmit(onSubmit)}
                        loading={isLoading}
                        disabled={isLoading}
                        leftIcon={<BookOpen size={18} />}
                    >
                        Create Course
                    </Button>
                    <Button
                        fullWidth
                        size="md"
                        variant="outline"
                        disabled={isLoading}
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
}

