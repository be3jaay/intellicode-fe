import { StudentService } from "@/services/student-service/student.service";
import { StudentQueryParams } from "@/services/student-service/student-type";
import { useQuery } from "@tanstack/react-query";

export function useGetEnrolledStudents(courseId: string, params: StudentQueryParams = {}) {
    return useQuery({
        queryKey: ['enrolledStudents', courseId, params],
        queryFn: () => StudentService.getEnrolledStudents(courseId, params),
        enabled: !!courseId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}