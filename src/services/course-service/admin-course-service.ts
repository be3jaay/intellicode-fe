import { apiClient } from "../api-client";

export interface AdminCourseResponse {
  success: boolean;
  statusCode: number;
  data: {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    status: string;
    instructor: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
    };
    modules: Array<{
      id: string;
      title: string;
      description: string;
      order_index: number;
      is_published: boolean;
      lessons: Array<{
        id: string;
        title: string;
        description: string;
        content: string;
        order_index: number;
        is_published: boolean;
        difficulty: "beginner" | "intermediate" | "advanced";
        estimated_duration: number;
        tags: string[];
      }>;
      total_lessons: number;
      total_duration: number;
    }>;
    assignments: Array<{
      id: string;
      title: string;
      description: string;
      assignment_type: string;
      assignment_subtype: "quiz_form" | "code_sandbox" | "file_upload";
      points: number;
      due_date: string;
      is_published: boolean;
      content?: any;
    }>;
    total_modules: number;
    total_lessons: number;
    total_estimated_duration: number;
    created_at: string;
    updated_at: string;
  };
  timestamp: string;
}

export const adminCourseService = {
  async getCourseById(courseId: string): Promise<AdminCourseResponse> {
    const response = await apiClient.get(`/course/${courseId}/student-view`);
    return response as AdminCourseResponse;
  },
};

