import { useQuery } from "@tanstack/react-query";
import { CourseService } from "@/services/course-service/course-service";
import type { CourseValueResponse } from "@/services/course-service/course-type";

export const useCourseDetail = (courseId: string) => {
  return useQuery<CourseValueResponse, Error>({
    queryKey: ["course-detail", courseId],
    queryFn: () => CourseService.getCourseDetails(courseId),
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};
