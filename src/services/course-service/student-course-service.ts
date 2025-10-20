import { apiClient } from "../api-client"

export interface StudentCourseResponse {
  success: boolean
  statusCode: number
  data: {
    id: string
    title: string
    description: string
    category: string
    thumbnail: string
    status: string
    instructor: {
      id: string
      first_name: string
      last_name: string
      email: string
    }
    modules: Array<{
      id: string
      title: string
      description: string
      order_index: number
      is_published: boolean
      lessons: Array<{
        id: string
        title: string
        description: string
        content: string
        order_index: number
        is_published: boolean
        difficulty: "beginner" | "intermediate" | "advanced"
        estimated_duration: number
        tags: string[]
        is_completed: boolean
        is_unlocked: boolean
        completion_percentage: number
      }>
      total_lessons: number
      completed_lessons: number
      completion_percentage: number
      total_duration: number
    }>
    assignments: Array<{
      id: string
      title: string
      description: string
      assignment_type: string
      assignment_subtype: "quiz_form" | "code_sandbox" | "file_upload"
      points: number
      due_date: string
      is_published: boolean
      is_submitted: boolean
    }>
    total_modules: number
    completed_modules: number
    total_lessons: number
    completed_lessons: number
    course_completion_percentage: number
    total_estimated_duration: number
    enrolled_at: string
    last_accessed: string
    created_at: string
    updated_at: string
  }
  timestamp: string
}

export const studentCourseService = {
  async getCourseById(courseId: string): Promise<StudentCourseResponse> {
    const response = await apiClient.get(`/course/${courseId}/student-view`)
    return response as StudentCourseResponse
  }
}
