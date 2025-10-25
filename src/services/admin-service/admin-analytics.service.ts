import { apiClient } from "../api-client";

export interface AdminAnalyticsResponse {
  success: boolean;
  statusCode: number;
  data: {
    system_analytics: {
      total_users: number;
      total_students: number;
      total_instructors: number;
      total_admins: number;
      total_courses: number;
      active_courses: number;
      pending_courses: number;
      rejected_courses: number;
      total_enrollments: number;
      active_enrollments: number;
      total_certificates: number;
      total_assignments: number;
      total_activities: number;
      total_exams: number;
      total_submissions: number;
    };
    growth_trends: {
      monthly_data: Array<{
        month: string;
        new_users: number;
        new_courses: number;
        new_enrollments: number;
        certificates_issued: number;
      }>;
      total_new_users: number;
      total_new_courses: number;
      total_new_enrollments: number;
      total_certificates_issued: number;
      user_growth_rate: number;
      course_growth_rate: number;
      enrollment_growth_rate: number;
      certificate_growth_rate?: number;
    };
    student_performance: Array<{
      student_id: string;
      student_number: string;
      first_name: string;
      last_name: string;
      email: string;
      total_enrolled: number;
      completed_courses: number;
      certificates_earned: number;
      average_grade: number | null;
      total_submissions: number;
      last_activity: string | null;
    }>;
    instructor_performance: Array<{
      instructor_id: string;
      first_name: string;
      last_name: string;
      email: string;
      total_courses: number;
      active_courses: number;
      total_students_enrolled: number;
      certificates_issued: number;
      average_course_rating: number | null;
      total_assignments: number;
      pending_grades: number;
      last_course_created: string | null;
    }>;
    course_progress: Array<{
      course_id: string;
      course_title: string;
      instructor_name: string;
      total_enrolled: number;
      average_completion: number;
      average_grade: number | null;
      certificates_issued: number;
      course_status: string;
    }>;
  };
  timestamp: string;
}

export const adminAnalyticsService = {
  getAnalytics: async (): Promise<AdminAnalyticsResponse> => {
    return apiClient.get<AdminAnalyticsResponse>(
      "/course/analytics/admin-dashboard"
    );
  },
};
