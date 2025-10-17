// API Types for Bulk Lesson Creation

export interface BulkLessonCreationRequest {
  courseId: string;
  moduleId: string;
  lessons: LessonCreationData[];
}

export interface LessonCreationData {
  title: string;
  description: string;
  content: string;
  order: number;
  isPublished?: boolean;
  estimatedDuration?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}

export interface BulkLessonCreationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    createdLessons: CreatedLesson[];
    totalCreated: number;
    moduleId: string;
    courseId: string;
  };
  timestamp: string;
}

export interface CreatedLesson {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  isPublished: boolean;
  estimatedDuration: number;
  difficulty: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors: ApiError[];
  timestamp: string;
}

export interface ApiError {
  field: string;
  message: string;
}

// Test data interfaces
export interface TestDataSets {
  standard: BulkLessonCreationRequest;
  minimal: BulkLessonCreationRequest;
  extensive: BulkLessonCreationRequest;
  edgeCases: BulkLessonCreationRequest;
}

// API endpoint configuration
export interface ApiEndpoint {
  method: 'POST' | 'PUT' | 'GET' | 'DELETE';
  url: string;
  headers: Record<string, string>;
  example: BulkLessonCreationRequest;
}
