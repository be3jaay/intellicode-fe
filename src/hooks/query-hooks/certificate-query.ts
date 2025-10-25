import { useQuery } from "@tanstack/react-query";
import { CourseService } from "@/services/course-service/course-service";

export const useEligibleStudentsForCertificates = (courseId: string) => {
  return useQuery({
    queryKey: ["eligible-students", courseId],
    queryFn: () => CourseService.getEligibleStudentsForCertificates(courseId),
    enabled: !!courseId,
  });
};
