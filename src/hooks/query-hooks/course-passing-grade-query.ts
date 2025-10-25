import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseService } from "@/services/course-service/course-service";

export const useSetPassingGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      passingGrade,
    }: {
      courseId: string;
      passingGrade: number;
    }) => CourseService.setPassingGrade(courseId, passingGrade),
    onSuccess: () => {
      // Invalidate courses to refresh the data
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
