import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonService } from "@/services/lesson-service/lesson-service";

export const useCompleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      lessonId,
    }: {
      courseId: string;
      lessonId: string;
    }) => lessonService.completeLesson(courseId, lessonId),
    onSuccess: (_, variables) => {
      // Invalidate relevant queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["enrolled-course"] });
      queryClient.invalidateQueries({ queryKey: ["course-progress"] });
      queryClient.invalidateQueries({
        queryKey: ["student-course", variables.courseId],
      });
    },
  });
};
