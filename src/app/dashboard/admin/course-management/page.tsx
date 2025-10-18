"use client";

import { useState } from "react";
import { useInfinitePendingCourses, useApproveCourse, useRejectCourse } from "@/hooks/query-hooks/course-approval-query";
import { CourseApprovalItem } from "@/services/course-service/course-approval-type";
import {
    CourseManagementHeader,
    SearchAndFilterControls,
    CourseApprovalsTable,
    EmptyState,
    LoadingState,
    ErrorState,
    CourseApprovalModal,
} from "@/components/dashboard/admin";

function CourseManagementPage() {
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseApprovalItem | null>(null);
    const [selectedAction, setSelectedAction] = useState<"approve" | "reject" | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch,
    } = useInfinitePendingCourses(10);

    const approveCourseMutation = useApproveCourse();
    const rejectCourseMutation = useRejectCourse();

    const handleActionClick = (course: CourseApprovalItem, action: "approve" | "reject") => {
        setSelectedCourse(course);
        setSelectedAction(action);
        setModalOpened(true);
    };

    const handleConfirmAction = async () => {
        if (!selectedCourse || !selectedAction) return;

        try {
            if (selectedAction === "approve") {
                await approveCourseMutation.mutateAsync({ courseId: selectedCourse.id, status: "approved" });
            } else {
                await approveCourseMutation.mutateAsync({ courseId: selectedCourse.id, status: "rejected" });
            }
            setModalOpened(false);
            setSelectedCourse(null);
            setSelectedAction(null);
        } catch (error) {
            console.error("Error performing action:", error);
        }
    };

    const handleCloseModal = () => {
        setModalOpened(false);
        setSelectedCourse(null);
        setSelectedAction(null);
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setCategoryFilter(null);
    };

    const allCourses = data?.pages.flatMap(page => page.data.data) || [];
    const totalCourses = data?.pages[0]?.data.total || 0;

    // Filter courses based on search and category
    const filteredCourses = allCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.last_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !categoryFilter || course.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Get unique categories for filter
    const categories = Array.from(new Set(allCourses.map(course => course.category)));

    const isLoadingAny = isLoading || approveCourseMutation.isPending || rejectCourseMutation.isPending;
    const hasActiveFilters = searchQuery || categoryFilter;

    if (isLoading) {
        return <LoadingState />;
    }

    if (isError) {
        return <ErrorState error={error} onRetry={refetch} />;
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#222222" }}>
            <main style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1rem" }}>
                <CourseManagementHeader
                    totalCourses={totalCourses}
                    filteredCourses={filteredCourses.length}
                    onRefresh={refetch}
                    isLoading={isLoadingAny}
                />

                <SearchAndFilterControls
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={setCategoryFilter}
                    categories={categories}
                    filteredCount={filteredCourses.length}
                    totalCount={totalCourses}
                    onClearFilters={handleClearFilters}
                />

                {filteredCourses.length === 0 ? (
                    <EmptyState
                        totalCourses={totalCourses}
                        hasActiveFilters={!!hasActiveFilters}
                        onClearFilters={handleClearFilters}
                    />
                ) : (
                    <CourseApprovalsTable
                        courses={filteredCourses}
                        onActionClick={handleActionClick}
                        onLoadMore={fetchNextPage}
                        hasNextPage={hasNextPage || false}
                        isFetchingNextPage={isFetchingNextPage}
                        isLoading={isLoadingAny}
                    />
                )}
            </main>

            <CourseApprovalModal
                opened={modalOpened}
                onClose={handleCloseModal}
                course={selectedCourse}
                action={selectedAction}
                onConfirm={handleConfirmAction}
                isLoading={isLoadingAny}
            />
        </div>
    );
}

export default CourseManagementPage;
