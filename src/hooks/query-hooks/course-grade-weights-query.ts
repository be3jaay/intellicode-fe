import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseService } from "@/services/course-service/course-service";

interface GradeWeightsParams {
  courseId: string;
  weights: {
    assignment_weight: number;
    activity_weight: number;
    exam_weight: number;
  };
}

export const useSetGradeWeights = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, weights }: GradeWeightsParams) => {
      return await CourseService.setGradeWeights(courseId, weights);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
