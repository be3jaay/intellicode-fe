import { apiClient } from "../api-client";

export interface InstructorAnalyticsResponse {
  success: boolean;
  statusCode: number;
  data: {
    instructor_id: string;
    total_courses: number;
    total_students_enrolled: number;
    pending_grades_count: number;
    courses: Array<{
      id: string;
      title: string;
      category: string;
      thumbnail: string;
      status: string;
      students_count: number;
      modules_count: number;
    }>;
    top_popular_courses: Array<{
      id: string;
      title: string;
      description: string;
      category: string;
      thumbnail: string;
      students_count: number;
      status: string;
      created_at: string;
    }>;
  };
  timestamp: string;
}

export const instructorAnalyticsService = {
  getAnalytics: async (): Promise<InstructorAnalyticsResponse> => {
    return apiClient.get<InstructorAnalyticsResponse>(
      "/course/instructor-analytics"
    );
  },
};
