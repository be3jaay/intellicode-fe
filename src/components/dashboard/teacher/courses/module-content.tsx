"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Button,
  Loader,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useGetModulesList } from "@/hooks/query-hooks/module-query";
import { useDeleteModule } from "@/hooks/query-hooks/module-query";
import { useDeleteLesson } from "@/hooks/query-hooks/lesson-query";
import {
  Module,
  ModuleListQueryParams,
  Lesson,
} from "@/services/module-service/module.type";
import { notifications } from "@mantine/notifications";
import { ModuleItem } from "./module-item";
import { DeleteConfirmationModal } from "./delete-confirmation-modal";
import { EditModuleDrawer } from "./edit-module-drawer";
import { EditLessonDrawer } from "./edit-lesson-drawer";

interface ModuleContentProps {
  courseId: string;
}

export function ModuleContent({ courseId }: ModuleContentProps) {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  // Module states
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);

  // Lesson states
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);

  // Drawers and modals
  const [editModuleOpened, { open: openEditModule, close: closeEditModule }] =
    useDisclosure(false);
  const [editLessonOpened, { open: openEditLesson, close: closeEditLesson }] =
    useDisclosure(false);
  const [
    deleteModuleOpened,
    { open: openDeleteModule, close: closeDeleteModule },
  ] = useDisclosure(false);
  const [
    deleteLessonOpened,
    { open: openDeleteLesson, close: closeDeleteLesson },
  ] = useDisclosure(false);

  const queryParams: ModuleListQueryParams = {
    offset,
    limit,
  };

  const { data, isLoading, error, refetch } = useGetModulesList(
    courseId,
    queryParams
  );
  const { deleteModule, isDeleting: isDeletingModule } = useDeleteModule();
  const { mutate: deleteLesson, isPending: isDeletingLesson } =
    useDeleteLesson();

  useEffect(() => {
    if (data?.data) {
      setHasMore(data.data.hasNext);
    }
  }, [data]);

  const handleViewMore = () => {
    setOffset((prev) => prev + limit);
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  // Module handlers
  const handleEditModule = (module: Module) => {
    setSelectedModule(module);
    openEditModule();
  };

  const handleDeleteModuleClick = (module: Module) => {
    setModuleToDelete(module);
    openDeleteModule();
  };

  const handleConfirmDeleteModule = async () => {
    if (!moduleToDelete) return;

    try {
      await deleteModule(moduleToDelete.id);
      notifications.show({
        title: "Success!",
        message: "Module deleted successfully",
        color: "green",
        autoClose: 3000,
      });
      closeDeleteModule();
      setModuleToDelete(null);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to delete module. Please try again.",
        color: "red",
        autoClose: 5000,
      });
    }
  };

  // Lesson handlers
  const handleEditLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    openEditLesson();
  };

  const handleDeleteLessonClick = (lesson: Lesson) => {
    setLessonToDelete(lesson);
    openDeleteLesson();
  };

  const handleConfirmDeleteLesson = () => {
    if (!lessonToDelete) return;

    deleteLesson(lessonToDelete.id, {
      onSuccess: () => {
        closeDeleteLesson();
        setLessonToDelete(null);
      },
    });
  };

  if (isLoading && offset === 0) {
    return (
      <Center py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" color="#bdf052" />
          <Text c="dimmed">Loading modules...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Card
        padding="xl"
        radius="md"
        style={{
          background: "rgba(246, 172, 174, 0.1)",
          border: "1px solid rgba(246, 172, 174, 0.3)",
          textAlign: "center",
        }}
      >
        <Text c="#f6acae">Failed to load modules. Please try again.</Text>
        <Button
          mt="md"
          size="sm"
          onClick={() => refetch()}
          style={{
            background: "rgba(246, 172, 174, 0.2)",
            color: "#f6acae",
            border: "1px solid rgba(246, 172, 174, 0.3)",
          }}
        >
          Retry
        </Button>
      </Card>
    );
  }

  const modules = data?.data?.modules || [];
  const totalModules = data?.data?.total || 0;

  return (
    <>
      <Stack gap="md">
        {/* Modules Header */}
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            {totalModules} modules total
          </Text>
        </Group>

        {/* Modules List */}
        {modules.length === 0 ? (
          <Card
            padding="xl"
            radius="md"
            style={{
              background: "rgba(34, 34, 34, 0.4)",
              border: "1px solid rgba(189, 240, 82, 0.1)",
              textAlign: "center",
            }}
          >
            <Text c="dimmed">
              No modules found. Create your first module to get started.
            </Text>
          </Card>
        ) : (
          <Stack gap="sm">
            {modules.map((module: Module, index: number) => (
              <ModuleItem
                key={module.id}
                module={module}
                index={index}
                isExpanded={expandedModules.has(module.id)}
                onToggleExpand={() => toggleModuleExpansion(module.id)}
                onEdit={() => handleEditModule(module)}
                onDelete={() => handleDeleteModuleClick(module)}
                onEditLesson={handleEditLesson}
                onDeleteLesson={handleDeleteLessonClick}
              />
            ))}

            {/* View More Button */}
            {hasMore && (
              <Center mt="md">
                <Button
                  variant="outline"
                  onClick={handleViewMore}
                  loading={isLoading}
                  style={{
                    borderColor: "rgba(189, 240, 82, 0.3)",
                    color: "#bdf052",
                    "&:hover": {
                      background: "rgba(189, 240, 82, 0.1)",
                    },
                  }}
                >
                  View More Modules
                </Button>
              </Center>
            )}
          </Stack>
        )}
      </Stack>

      {/* Edit Module Drawer */}
      <EditModuleDrawer
        opened={editModuleOpened}
        onClose={closeEditModule}
        module={selectedModule}
      />

      {/* Edit Lesson Drawer */}
      <EditLessonDrawer
        opened={editLessonOpened}
        onClose={closeEditLesson}
        lesson={selectedLesson}
      />

      {/* Delete Module Modal */}
      <DeleteConfirmationModal
        opened={deleteModuleOpened}
        onClose={closeDeleteModule}
        onConfirm={handleConfirmDeleteModule}
        title="Delete Module"
        message={`Are you sure you want to delete "${moduleToDelete?.title}"? This will also delete all lessons in this module.`}
        isDeleting={isDeletingModule}
      />

      {/* Delete Lesson Modal */}
      <DeleteConfirmationModal
        opened={deleteLessonOpened}
        onClose={closeDeleteLesson}
        onConfirm={handleConfirmDeleteLesson}
        title="Delete Lesson"
        message={`Are you sure you want to delete "${lessonToDelete?.title}"?`}
        isDeleting={isDeletingLesson}
      />
    </>
  );
}
