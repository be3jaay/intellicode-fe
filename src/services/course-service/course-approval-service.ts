import { apiClient } from "../api-client";
import {
  CourseApprovalResponse,
  CourseApprovalActionResponse,
  CourseResubmitResponse,
} from "./course-approval-type";

export class CourseApprovalService {
  public static async getPendingCourses(
    offset: number = 0,
    limit: number = 10
  ): Promise<CourseApprovalResponse> {
    try {
      const response = await apiClient.get<CourseApprovalResponse>(
        `/course/admin/pending?offset=${offset}&limit=${limit}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public static async approveCourse(
    courseId: string,
    status: "approved" | "rejected",
    admin_notes?: string
  ): Promise<CourseApprovalActionResponse> {
    try {
      const payload: { status: "approved" | "rejected"; admin_notes?: string } =
        { status };
      if (admin_notes) {
        payload.admin_notes = admin_notes;
      }

      const response = await apiClient.patch<CourseApprovalActionResponse>(
        `/course/admin/${courseId}/approve`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public static async rejectCourse(
    courseId: string
  ): Promise<CourseApprovalActionResponse> {
    try {
      const response = await apiClient.patch<CourseApprovalActionResponse>(
        `/course/admin/${courseId}/reject`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public static async resubmitCourse(
    courseId: string
  ): Promise<CourseResubmitResponse> {
    try {
      const response = await apiClient.patch<CourseResubmitResponse>(
        `/course/${courseId}/resubmit`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
