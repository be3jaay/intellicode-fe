"use client";
import { useState, useMemo } from "react";
import { StudentCourseGridViewer } from "./student-course-grid-viewer";
import { StudentCourseContentViewer } from "./student-course-content-viewer";
import { Box } from "@mantine/core";
import { useEnrolledCourses, useEnrolledCourseDetail } from "@/hooks/query-hooks/course-query-hook";
import { Enrollment, EnrolledCourseDetail } from "@/services/course-service/course-type";

export function StudentCourseManager() {
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState<string | null>(null);

    // Use infinite query hook for enrolled courses
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useEnrolledCourses(10);

    // Fetch selected course details
    const {
        data: courseDetailData,
        isLoading: isLoadingCourseDetail,
    } = useEnrolledCourseDetail(selectedEnrollmentId || "");

    // Transform API data to Enrollment format
    const enrollments: Enrollment[] = useMemo(() => {
        if (!data?.pages) return [];

        return data.pages.flatMap(page =>
            page.data.data.map(enrollment => ({
                id: enrollment.id,
                student_id: enrollment.student_id,
                course_id: enrollment.course_id,
                enrolled_at: enrollment.enrolled_at,
                status: enrollment.status,
                course: {
                    id: enrollment.course.id,
                    title: enrollment.course.title,
                    description: enrollment.course.description,
                    category: enrollment.course.category,
                    thumbnail: enrollment.course.thumbnail,
                    instructor: enrollment.course.instructor,
                }
            }))
        );
    }, [data]);

    const handleViewCourse = (enrollment: Enrollment) => {
        setSelectedEnrollmentId(enrollment.course_id); // Using course_id as the API endpoint expects
    };

    const handleBackToCourses = () => {
        setSelectedEnrollmentId(null);
    };

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return (
        <Box
            style={{
                width: "100%",
                minHeight: "100vh",
                background: "linear-gradient(to bottom right, #f8fafc 0%, #e5e7eb 100%)",
                padding: "32px",
                position: "relative",
            }}
        >
            {/* Background decorative elements */}
            <Box
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 300,
                    background: "linear-gradient(135deg, rgba(189, 240, 82, 0.05) 0%, rgba(163, 215, 66, 0.05) 100%)",
                    borderRadius: "0 0 50% 50%",
                    zIndex: 0,
                }}
            />

            {/* Main Content */}
            <Box style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>
                {selectedEnrollmentId && courseDetailData ? (
                    <StudentCourseContentViewer
                        course={courseDetailData.data}
                        onBack={handleBackToCourses}
                    />
                ) : (
                    <StudentCourseGridViewer
                        enrollments={enrollments}
                        onViewCourse={handleViewCourse}
                        isLoading={isLoading}
                        isError={isError}
                        error={error as Error}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        onLoadMore={handleLoadMore}
                    />
                )}
            </Box>
        </Box>
    );
}

