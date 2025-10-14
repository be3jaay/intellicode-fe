"use client";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCourseSchema, type CreateCourseSchemaType } from "@/app/dashboard/teacher/courses/create/schema/create-course-schema";
import { CourseCreationModal } from "./course-creation-modal";
import { CourseGridViewer, type Course } from "./course-grid-viewer";
import { CourseContentViewer } from "./course-content-viewer";
import { notifications } from "@mantine/notifications";
import { CheckCircle, XCircle } from "lucide-react";
import { Box } from "@mantine/core";
import { useCourseCreation, useInfiniteCourses } from "@/hooks/query-hooks/course-query-hook";
import { CourseValueResponse } from "@/services/course-service/course-type";

export function TeacherCourseManager() {
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseValueResponse | null>(null);

    // Use infinite query hook
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteCourses(6);

    // Use course creation mutation
    const courseCreation = useCourseCreation();

    const form = useForm<CreateCourseSchemaType>({
        mode: "all",
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            thumbnail: undefined,
        },
    });

    const { control, handleSubmit, reset } = form;

    // Transform API data to Course format
    const courses: CourseValueResponse[] = useMemo(() => {
        if (!data?.pages) return [];

        return data.pages.flatMap(page =>
            page.data.data.map(course => ({
                id: course.id,
                title: course.title,
                description: course.description,
                category: course.category,
                thumbnail: course.thumbnail || undefined,
                students: 0, // Mock data for now
                modules: 0, // Mock data for now
                lastUpdated: new Date(course.updated_at).toLocaleDateString(),
                course_invite_code: course.course_invite_code,
                instructor_id: course.instructor_id,
                created_at: course.created_at,
                updated_at: course.updated_at,
                instructor: course.instructor,
                status: course.status,
            }))
        );
    }, [data]);

    const handleCreateCourse = () => {
        setModalOpened(true);
    };

    const handleCloseModal = () => {
        setModalOpened(false);
        reset();
    };

    const handleViewCourse = (course: CourseValueResponse) => {
        setSelectedCourse(course);
    };

    const handleBackToCourses = () => {
        setSelectedCourse(null);
    };

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    async function onSubmit(values: CreateCourseSchemaType) {
        try {
            await courseCreation.mutateAsync(values);

            notifications.show({
                title: "Course Created!",
                message: "Your course has been created successfully.",
                color: "green",
                icon: <CheckCircle size={18} />,
                autoClose: 3000,
            });

            reset();
            handleCloseModal();
        } catch (error) {
            notifications.show({
                title: "Error",
                message: error instanceof Error ? error.message : "Failed to create course. Please try again.",
                color: "red",
                icon: <XCircle size={18} />,
                autoClose: 5000,
            });
        }
    }

    return (
        <Box
            style={{
                width: "100%",
                minHeight: "100vh",
                position: "relative",
            }}
        >
            <Box style={{ position: "relative", zIndex: 1, margin: "0 auto" }}>
                {selectedCourse ? (
                    <CourseContentViewer course={selectedCourse} onBack={handleBackToCourses} />
                ) : (
                    <CourseGridViewer
                        courses={courses}
                        onViewCourse={handleViewCourse}
                        onCreateCourse={handleCreateCourse}
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        onLoadMore={handleLoadMore}
                    />
                )}
            </Box>

            {/* Course Creation Modal */}
            <CourseCreationModal
                opened={modalOpened}
                onClose={handleCloseModal}
                form={form}
                control={control}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                isLoading={courseCreation.isPending}
            />
        </Box >
    );
}

