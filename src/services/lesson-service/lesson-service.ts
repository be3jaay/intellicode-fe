import { apiClient } from "../api-client"

export interface BulkLessonRequest {
  lessons: {
    [key: string]: {
      title: string
      description: string
      content: string
      order: number
      difficulty: 'beginner' | 'intermediate' | 'advanced'
      estimatedDuration: number
      isPublished: boolean
      tags: string[]
    }
  }
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
