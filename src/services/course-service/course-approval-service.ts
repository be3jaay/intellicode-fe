import { apiClient } from "../api-client";
import { CourseApprovalResponse, CourseApprovalAction, CourseApprovalActionResponse } from "./course-approval-type";

export class CourseApprovalService {
    public static async getPendingCourses(offset: number = 0, limit: number = 10): Promise<CourseApprovalResponse> {
        try {
            const response = await apiClient.get<CourseApprovalResponse>(
                `/course/admin/pending?offset=${offset}&limit=${limit}`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    public static async approveCourse(courseId: string): Promise<CourseApprovalActionResponse> {
        try {
            const response = await apiClient.patch<CourseApprovalActionResponse>(
                `/course/admin/${courseId}/approve`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    public static async rejectCourse(courseId: string): Promise<CourseApprovalActionResponse> {
        try {
            const response = await apiClient.patch<CourseApprovalActionResponse>(
                `/course/admin/${courseId}/reject`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}
