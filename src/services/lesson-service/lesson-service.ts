import { apiClient } from "../api-client"

export interface LessonData {
  title: string
  description: string
  content: string
  order_index: number
  is_published: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimated_duration: number
  tags: string[]
}

export interface BulkLessonRequest {
  lessons: LessonData[]
}

export interface BulkLessonResponse {
  success: boolean
  message: string
  data?: any
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
    )
    return response as BulkLessonResponse
  }
}
