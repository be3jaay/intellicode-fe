import { apiClient } from "../api-client";

export interface LessonDetailResponse {
  success: boolean;
  statusCode: number;
  data: {
    id: string;
    module_id: string;
    title: string;
    description: string;
    content: string;
    order_index: number;
    is_published: boolean;
    difficulty: "beginner" | "intermediate" | "advanced";
    estimated_duration: number;
    tags: string[];
    created_at: string;
    updated_at: string;
  };
  timestamp: string;
}

export interface UpdateLessonRequest {
  title?: string;
  description?: string;
  content?: string;
  order_index?: number;
  is_published?: boolean;
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimated_duration?: number;
  tags?: string[];
}

export interface UpdateLessonResponse {
  success: boolean;
  statusCode: number;
  data: {
    id: string;
    module_id: string;
    title: string;
    description: string;
    content: string;
    order_index: number;
    is_published: boolean;
    difficulty: "beginner" | "intermediate" | "advanced";
    estimated_duration: number;
    tags: string[];
    created_at: string;
    updated_at: string;
  };
  message: string;
  timestamp: string;
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


  async getLessonById(lessonId: string): Promise<LessonDetailResponse> {
    const response = await apiClient.get(`/course/lessons/${lessonId}`);
    return response as LessonDetailResponse;
  },

  async updateLesson(
    lessonId: string,
    data: UpdateLessonRequest
  ): Promise<UpdateLessonResponse> {
    const response = await apiClient.patch(`/course/lessons/${lessonId}`, data);
    return response as UpdateLessonResponse;
  },

  async deleteLesson(lessonId: string) {
    // DELETE /course/lessons/{lessonId}
    return apiClient.delete(`/course/lessons/${lessonId}`);
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
};


