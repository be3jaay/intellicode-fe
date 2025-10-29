import { useQuery } from "@tanstack/react-query";
import {
  adminCourseService,
  AdminCourseResponse,
} from "@/services/course-service/admin-course-service";

export const useFetchAdminCourse = (courseId: string) => {
  return useQuery<AdminCourseResponse>({
    queryKey: ["admin-course", courseId],
    queryFn: () => adminCourseService.getCourseById(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

