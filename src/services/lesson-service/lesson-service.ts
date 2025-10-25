import { apiClient } from "../api-client";

export interface LessonData {
  title: string;
  description: string;
  content: string;
  order_index: number;
  is_published: boolean;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_duration: number;
  tags: string[];
}

export interface BulkLessonRequest {
  lessons: LessonData[];
}

export interface BulkLessonResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface CompleteLessonResponse {
  success: boolean;
  statusCode: number;
  data: {
    message: string;
    lesson_id: string;
    is_completed: boolean;
    completion_percentage: number;
    next_lesson_id: string | null;
    next_lesson_unlocked: boolean;
  };
  timestamp: string;
}

export const lessonService = {
  async createBulkLessons(
    courseId: string,
    moduleId: string,
    lessons: BulkLessonRequest
  ): Promise<BulkLessonResponse> {
    const response = await apiClient.post(
      `/course/${courseId}/modules/${moduleId}/lessons/bulk-object`,
      lessons
    );
    return response as BulkLessonResponse;
  },

  async completeLesson(
    courseId: string,
    lessonId: string
  ): Promise<CompleteLessonResponse> {
    const response = await apiClient.post<CompleteLessonResponse>(
      `/course/${courseId}/lessons/${lessonId}/complete`,
      {}
    );
    return response;
  },
  async patchLesson(lessonId: string, data: Partial<LessonData>) {
    // PATCH /course/lessons/{lessonId}
    return apiClient.patch(`/course/lessons/${lessonId}`, data);
  },

  async deleteLesson(lessonId: string) {
    // DELETE /course/lessons/{lessonId}
    return apiClient.delete(`/course/lessons/${lessonId}`);
  },
};
