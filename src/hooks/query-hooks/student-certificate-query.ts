import { useQuery } from "@tanstack/react-query";
import { StudentService } from "@/services/student-service/student.service";

export const useStudentCertificates = () => {
  return useQuery({
    queryKey: ["student-certificates"],
    queryFn: () => StudentService.getAllMyCertificates(),
  });
};

export const useStudentCourseCertificate = (courseId: string) => {
  return useQuery({
    queryKey: ["student-certificate", courseId],
    queryFn: () => StudentService.getMyCertificate(courseId),
    enabled: !!courseId,
  });
};
