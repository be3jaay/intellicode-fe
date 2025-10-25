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

  public static async getMyCertificate(courseId: string): Promise<{
    id: string;
    course_id: string;
    student_id: string;
    issued_by: string;
    issued_at: string;
    final_grade: number;
    status: string;
    revoked_at: string | null;
    revoked_by: string | null;
    revocation_reason: string | null;
    course: {
      id: string;
      title: string;
      instructor: {
        first_name: string;
        last_name: string;
      };
    };
    student: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      student_number: string;
    };
    issuer: {
      first_name: string;
      last_name: string;
    };
    revoker: {
      first_name: string;
      last_name: string;
    } | null;
  }> {
    try {
      const response = await apiClient.get<{
        data: {
          id: string;
          course_id: string;
          student_id: string;
          issued_by: string;
          issued_at: string;
          final_grade: number;
          status: string;
          revoked_at: string | null;
          revoked_by: string | null;
          revocation_reason: string | null;
          course: {
            id: string;
            title: string;
            instructor: {
              first_name: string;
              last_name: string;
            };
          };
          student: {
            id: string;
            first_name: string;
            last_name: string;
            email: string;
            student_number: string;
          };
          issuer: {
            first_name: string;
            last_name: string;
          };
          revoker: {
            first_name: string;
            last_name: string;
          } | null;
        };
      }>(`/course/${courseId}/my-certificate`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getAllMyCertificates(): Promise<
    Array<{
      id: string;
      course_id: string;
      student_id: string;
      issued_by: string;
      issued_at: string;
      final_grade: number;
      status: string;
      revoked_at: string | null;
      revoked_by: string | null;
      revocation_reason: string | null;
      course: {
        id: string;
        title: string;
        instructor: {
          first_name: string;
          last_name: string;
        };
      };
      student: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        student_number: string;
      };
      issuer: {
        first_name: string;
        last_name: string;
      };
      revoker: {
        first_name: string;
        last_name: string;
      } | null;
    }>
  > {
    try {
      const response = await apiClient.get<{
        data: Array<{
          id: string;
          course_id: string;
          student_id: string;
          issued_by: string;
          issued_at: string;
          final_grade: number;
          status: string;
          revoked_at: string | null;
          revoked_by: string | null;
          revocation_reason: string | null;
          course: {
            id: string;
            title: string;
            instructor: {
              first_name: string;
              last_name: string;
            };
          };
          student: {
            id: string;
            first_name: string;
            last_name: string;
            email: string;
            student_number: string;
          };
          issuer: {
            first_name: string;
            last_name: string;
          };
          revoker: {
            first_name: string;
            last_name: string;
          } | null;
        }>;
      }>(`/course/certificates/my-certificates`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getStudentDashboardAnalytics(): Promise<{
    student_id: string;
    total_enrolled_courses: number;
    total_certificates: number;
    pending_assignments_count: number;
    pending_activities_count: number;
    pending_exams_count: number;
    latest_certificates: Array<{
      id: string;
      course_id: string;
      course_title: string;
      instructor_name: string;
      final_grade: number;
      issued_at: string;
      status: string;
    }>;
    enrolled_courses: Array<{
      id: string;
      title: string;
      category: string;
      thumbnail: string;
      instructor_name: string;
      enrolled_at: string;
      progress_percentage: number;
      overall_grade: number;
    }>;
  }> {
    try {
      const response = await apiClient.get<{
        data: {
          student_id: string;
          total_enrolled_courses: number;
          total_certificates: number;
          pending_assignments_count: number;
          pending_activities_count: number;
          pending_exams_count: number;
          latest_certificates: Array<{
            id: string;
            course_id: string;
            course_title: string;
            instructor_name: string;
            final_grade: number;
            issued_at: string;
            status: string;
          }>;
          enrolled_courses: Array<{
            id: string;
            title: string;
            category: string;
            thumbnail: string;
            instructor_name: string;
            enrolled_at: string;
            progress_percentage: number;
            overall_grade: number;
          }>;
        };
      }>(`/course/analytics/student-dashboard`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
