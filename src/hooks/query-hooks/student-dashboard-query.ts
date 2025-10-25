import { useQuery } from "@tanstack/react-query";
import { StudentService } from "@/services/student-service/student.service";

export const useStudentDashboardAnalytics = () => {
  return useQuery({
    queryKey: ["student-dashboard-analytics"],
    queryFn: () => StudentService.getStudentDashboardAnalytics(),
  });
};
