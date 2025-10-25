import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseService } from "@/services/course-service/course-service";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => CourseService.deleteCourse(courseId),
    onSuccess: () => {
      // Invalidate courses list to refresh the data
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
