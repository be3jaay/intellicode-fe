"use client";

import { useState } from "react";
import { Group, Text, Button, Card, Tabs, Badge, Stack } from "@mantine/core";
import { BookOpen, TrendingUp, Clock, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useInfinitePendingCourses,
  useApproveCourse,
  useRejectCourse,
} from "@/hooks/query-hooks/course-approval-query";
import { CourseApprovalItem } from "@/services/course-service/course-approval-type";
import {
  SearchAndFilterControls,
  CourseApprovalsTable,
  EmptyState,
  LoadingState,
  ErrorState,
  CourseApprovalModal,
} from "@/components/dashboard/admin";

function CourseManagementPage() {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedCourse, setSelectedCourse] =
    useState<CourseApprovalItem | null>(null);
  const [selectedAction, setSelectedAction] = useState<
    "approve" | "reject" | null
  >(null);
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
    isRefetching,
  } = useInfinitePendingCourses(10);

  const approveCourseMutation = useApproveCourse();
  const rejectCourseMutation = useRejectCourse();

  const handleActionClick = (
    course: CourseApprovalItem,
    action: "approve" | "reject"
  ) => {
    setSelectedCourse(course);
    setSelectedAction(action);
    setModalOpened(true);
  };

  const handleConfirmAction = async (adminNotes?: string) => {
    if (!selectedCourse || !selectedAction) return;

    try {
      if (selectedAction === "approve") {
        await approveCourseMutation.mutateAsync({
          courseId: selectedCourse.id,
          status: "approved",
        });
      } else {
        await approveCourseMutation.mutateAsync({
          courseId: selectedCourse.id,
          status: "rejected",
          admin_notes: adminNotes,
        });
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

  const handleViewCourse = (courseId: string) => {
    router.push(`/dashboard/admin/course-management/${courseId}`);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter(null);
  };

  const allCourses = data?.pages.flatMap((page) => page.data.data) || [];
  const totalCourses = data?.pages[0]?.data.total || 0;

  // Filter courses based on search and category
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.first_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      course.instructor.last_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !categoryFilter || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(
    new Set(allCourses.map((course) => course.category))
  );

  const isLoadingAny =
    isLoading ||
    approveCourseMutation.isPending ||
    rejectCourseMutation.isPending;
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
        {/* Header Section */}
        <Card
          style={{
            background: "linear-gradient(135deg, #BDF052 0%, #A8D944 100%)",
            border: "none",
            borderRadius: "16px",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
          padding="xl"
        >
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "150px",
              height: "150px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "50%",
            }}
          />
          <Group
            justify="space-between"
            align="center"
            style={{ position: "relative", zIndex: 1 }}
          >
            <Group>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  backgroundColor: "#0F0F0F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
              >
                <BookOpen size={28} color="#BDF052" />
              </div>
              <div>
                <Text
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    marginBottom: "0.5rem",
                    color: "#0F0F0F",
                    lineHeight: 1.2,
                  }}
                >
                  Course Management
                </Text>
                <Group gap="lg">
                  <Group gap="xs">
                    <BookOpen size={16} color="#0F0F0F" />
                    <Text
                      style={{
                        fontSize: "1rem",
                        color: "#0F0F0F",
                        fontWeight: 500,
                      }}
                    >
                      {totalCourses} Pending Reviews
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <TrendingUp size={16} color="#0F0F0F" />
                    <Text
                      style={{
                        fontSize: "1rem",
                        color: "#0F0F0F",
                        fontWeight: 500,
                      }}
                    >
                      {filteredCourses.length} Showing
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <Clock size={16} color="#0F0F0F" />
                    <Text
                      style={{
                        fontSize: "1rem",
                        color: "#0F0F0F",
                        fontWeight: 500,
                      }}
                    >
                      Awaiting Review
                    </Text>
                  </Group>
                </Group>
              </div>
            </Group>
            <Group gap="sm">
              <Button
                leftSection={<RefreshCw size={16} />}
                onClick={() => refetch()}
                loading={isRefetching || isLoadingAny}
                disabled={isRefetching || isLoadingAny}
                style={{
                  backgroundColor: "#0F0F0F",
                  color: "#BDF052",
                  border: "2px solid #0F0F0F",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor: "#1A1A1A",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  },
                }}
              >
                Refresh
              </Button>
            </Group>
          </Group>
        </Card>

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
            onViewCourse={handleViewCourse}
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage || false}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoadingAny}
            isRefetching={isRefetching}
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
