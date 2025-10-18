import { apiClient } from "../api-client";
import { CourseValue, CreateCourseResponse, CoursesResponse, EnrollmentsResponse, EnrolledCourseDetailResponse, CourseValueResponse } from "./course-type";

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

    // Student methods
    public static async joinCourseByInviteCode(inviteCode: string): Promise<any> {
        try {
            return await apiClient.post<any>('/course/enroll', {
                course_invite_code: inviteCode
            });
        } catch (error) {
            throw error;
        }
    }

    public static async getEnrolledCourses(offset: number = 0, limit: number = 10): Promise<EnrollmentsResponse> {
        try {
            const response = await apiClient.get<EnrollmentsResponse>(
                `/course/my-enrollments?offset=${offset}&limit=${limit}`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    public static async approveCourse(courseId: string, status: "approved" | "rejected"): Promise<void> {
        try {
            await apiClient.patch<void>(`/course/admin/${courseId}/approve`, { status: status });
        } catch (error) {
            throw error;
        }
    }

    public static async getCourseByInviteCode(inviteCode: string): Promise<CourseValueResponse> {
        try {
            const response = await apiClient.get<{
                success: boolean;
                data: CourseValueResponse;
            }>(`/course/invite/${inviteCode}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public static async getCourseDetails(courseId: string): Promise<CourseValueResponse> {
        try {
            const response = await apiClient.get<{
                success: boolean;
                data: CourseValueResponse;
            }>(`/course/${courseId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public static async getEnrolledCourseById(enrollmentId: string): Promise<EnrolledCourseDetailResponse> {
        try {
            const response = await apiClient.get<EnrolledCourseDetailResponse>(
                `/course/enrolled/${enrollmentId}`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}