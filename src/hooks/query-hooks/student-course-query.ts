import { useQuery } from "@tanstack/react-query"
import { studentCourseService, StudentCourseResponse } from "@/services/course-service/student-course-service"

export const useFetchStudentCourse = (courseId: string) => {
  return useQuery<StudentCourseResponse>({
    queryKey: ["student-course", courseId],
    queryFn: () => studentCourseService.getCourseById(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })
}
