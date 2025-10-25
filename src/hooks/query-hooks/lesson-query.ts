import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  lessonService,
  BulkLessonRequest,
  LessonData,
} from "@/services/lesson-service/lesson-service";
import { notifications } from "@mantine/notifications";

export const useBulkLessonCreation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      moduleId,
      lessons,
    }: {
      courseId: string;
      moduleId: string;
      lessons: BulkLessonRequest;
    }) => lessonService.createBulkLessons(courseId, moduleId, lessons),

    onSuccess: (data) => {
      notifications.show({
        title: "Success!",
        message: "Lessons created successfully",
        color: "green",
        autoClose: 3000,
      });

      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ["student-course"] });
    },

    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message:
          error?.message || "Failed to create lessons. Please try again.",
        color: "red",
        autoClose: 5000,
      });
    },
  });
};

export const usePatchLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonId,
      data,
    }: {
      lessonId: string;
      data: Partial<LessonData>;
    }) => lessonService.patchLesson(lessonId, data),

    onSuccess: () => {
      notifications.show({
        title: "Success!",
        message: "Lesson updated successfully",
        color: "green",
        autoClose: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ["modulesList"] });
    },

    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message: error?.message || "Failed to update lesson. Please try again.",
        color: "red",
        autoClose: 5000,
      });
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: string) => lessonService.deleteLesson(lessonId),

    onSuccess: () => {
      notifications.show({
        title: "Success!",
        message: "Lesson deleted successfully",
        color: "green",
        autoClose: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ["modulesList"] });
    },

    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message: error?.message || "Failed to delete lesson. Please try again.",
        color: "red",
        autoClose: 5000,
      });
    },
  });
};
