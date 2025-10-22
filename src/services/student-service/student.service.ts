import { apiClient } from "../api-client";
import {
  EnrolledStudentsResponse,
  StudentQueryParams,
  GradebookResponse,
  GradebookQueryParams,
  StudentGradebookDetailResponse,
  MyGradeSummaryResponse,
  MyGradebookResponse,
} from "./student-type";

export class StudentService {
  public static async getEnrolledStudents(
    courseId: string,
    params: StudentQueryParams = {}
  ): Promise<EnrolledStudentsResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params.offset !== undefined)
        queryParams.append("offset", params.offset.toString());
      if (params.limit !== undefined)
        queryParams.append("limit", params.limit.toString());
      if (params.search) queryParams.append("search", params.search);
      if (params.section) queryParams.append("section", params.section);
      if (params.enrollment_status)
        queryParams.append("enrollment_status", params.enrollment_status);

      const queryString = queryParams.toString();
      const url = `/course/${courseId}/students${
        queryString ? `?${queryString}` : ""
      }`;

      return await apiClient.get(url);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getGradebook(
    courseId: string,
    params: GradebookQueryParams = {}
  ): Promise<GradebookResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params.offset !== undefined)
        queryParams.append("offset", params.offset.toString());
      if (params.limit !== undefined)
        queryParams.append("limit", params.limit.toString());
      if (params.sort_by) queryParams.append("sort_by", params.sort_by);
      if (params.sort_order)
        queryParams.append("sort_order", params.sort_order);
      if (params.section) queryParams.append("section", params.section);
      if (params.search) queryParams.append("search", params.search);
      if (params.assignment_type)
        queryParams.append("assignment_type", params.assignment_type);

      const queryString = queryParams.toString();
      const url = `/course/${courseId}/gradebook${
        queryString ? `?${queryString}` : ""
      }`;

      return await apiClient.get(url);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getStudentGradebookDetail(
    courseId: string,
    studentId: string
  ): Promise<StudentGradebookDetailResponse> {
    try {
      const url = `/course/${courseId}/gradebook/student/${studentId}`;
      return await apiClient.get(url);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Student's own gradebook endpoints
  public static async getMyGradeSummary(
    courseId: string
  ): Promise<MyGradeSummaryResponse> {
    try {
      const url = `/course/${courseId}/my-grade-summary`;
      return await apiClient.get(url);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getMyGradebook(
    courseId: string
  ): Promise<MyGradebookResponse> {
    try {
      const url = `/course/${courseId}/my-gradebook`;
      return await apiClient.get(url);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
