import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseService } from "@/services/course-service/course-service";

export const useIssueCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      studentId,
    }: {
      courseId: string;
      studentId: string;
    }) => CourseService.issueCertificate(courseId, studentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["eligible-students", variables.courseId],
      });
    },
  });
};

export const useRevokeCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      studentId,
      revocationReason,
    }: {
      courseId: string;
      studentId: string;
      revocationReason: string;
    }) =>
      CourseService.revokeCertificate(courseId, studentId, revocationReason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["eligible-students", variables.courseId],
      });
    },
  });
};
