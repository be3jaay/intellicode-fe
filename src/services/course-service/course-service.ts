import { apiClient } from "../api-client";
import { CourseValue, CreateCourseResponse, CoursesResponse } from "./course-type";

export class CourseService {
    public static async createCourse(course: CourseValue): Promise<CreateCourseResponse> {
        try {
            const formData = new FormData();
            
            formData.append("title", course.title.trim());
            formData.append("description", course.description.trim());
            formData.append("category", course.category.trim());
            
            if (course.thumbnail) {
                formData.append("thumbnail", course.thumbnail, course.thumbnail.name);
            }

            const response = await apiClient.post<CreateCourseResponse>('/course/with-thumbnail', formData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public static async fetchMyCourses(offset: number = 0, limit: number = 6): Promise<CoursesResponse> {
        try {
            const response = await apiClient.get<CoursesResponse>(
                `/course/my-courses?offset=${offset}&limit=${limit}`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}