import { apiClient } from "../api-client";
import {
  CourseValue,
  CreateCourseResponse,
  CoursesResponse,
  EnrollmentsResponse,
  EnrolledCourseDetailResponse,
  CourseValueResponse,
} from "./course-type";

export class CourseService {
  public static async createCourse(
    course: CourseValue
  ): Promise<CreateCourseResponse> {
    try {
      const formData = new FormData();

      formData.append("title", course.title.trim());
      formData.append("description", course.description.trim());
      formData.append("category", course.category.trim());

      if (course.thumbnail) {
        formData.append("thumbnail", course.thumbnail, course.thumbnail.name);
      }

      const response = await apiClient.post<CreateCourseResponse>(
        "/course/with-thumbnail",
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public static async fetchMyCourses(
    offset: number = 0,
    limit: number = 6
  ): Promise<CoursesResponse> {
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
      return await apiClient.post<any>("/course/enroll", {
        course_invite_code: inviteCode,
      });
    } catch (error) {
      throw error;
    }
  }

  public static async getEnrolledCourses(
    offset: number = 0,
    limit: number = 10
  ): Promise<EnrollmentsResponse> {
    try {
      const response = await apiClient.get<EnrollmentsResponse>(
        `/course/my-enrollments?offset=${offset}&limit=${limit}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public static async approveCourse(
    courseId: string,
    status: "approved" | "rejected"
  ): Promise<void> {
    try {
      await apiClient.patch<void>(`/course/admin/${courseId}/approve`, {
        status: status,
      });
    } catch (error) {
      throw error;
    }
  }

  public static async getCourseByInviteCode(
    inviteCode: string
  ): Promise<CourseValueResponse> {
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

  public static async getCourseDetails(
    courseId: string
  ): Promise<CourseValueResponse> {
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

  public static async getEnrolledCourseById(
    enrollmentId: string
  ): Promise<EnrolledCourseDetailResponse> {
    try {
      const response = await apiClient.get<EnrolledCourseDetailResponse>(
        `/course/enrolled/${enrollmentId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteCourse(
    courseId: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.delete<{
        success: boolean;
        message: string;
      }>(`/course/${courseId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public static async setPassingGrade(
    courseId: string,
    passingGrade: number
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
      }>(`/course/${courseId}/passing-grade`, { passing_grade: passingGrade });
      return response;
    } catch (error) {
      throw error;
    }
  }

  public static async getEligibleStudentsForCertificates(
    courseId: string
  ): Promise<{
    eligible_students: Array<{
      student_id: string;
      first_name: string;
      last_name: string;
      email: string;
      student_number: string;
      overall_grade: number;
      course_progress: number;
      has_certificate: boolean;
      certificate_id: string | null;
      certificate_issued_at: string | null;
    }>;
    total_eligible: number;
    total_enrolled: number;
    passing_grade: number;
    has_passing_grade: boolean;
  }> {
    try {
      const response = await apiClient.get<{
        data: {
          eligible_students: Array<{
            student_id: string;
            first_name: string;
            last_name: string;
            email: string;
            student_number: string;
            overall_grade: number;
            course_progress: number;
            has_certificate: boolean;
            certificate_id: string | null;
            certificate_issued_at: string | null;
          }>;
          total_eligible: number;
          total_enrolled: number;
          passing_grade: number;
          has_passing_grade: boolean;
        };
      }>(`/course/${courseId}/certificates/eligible-students`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async issueCertificate(
    courseId: string,
    studentId: string
  ): Promise<{
    message: string;
    certificate_id: string;
    certificate_url: string;
  }> {
    try {
      const response = await apiClient.post<{
        data: {
          message: string;
          certificate_id: string;
          certificate_url: string;
        };
      }>(`/course/${courseId}/certificates/issue/${studentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async revokeCertificate(
    courseId: string,
    studentId: string,
    revocationReason: string
  ): Promise<{
    message: string;
  }> {
    try {
      const response = await apiClient.post<{
        data: {
          message: string;
        };
      }>(`/course/${courseId}/certificates/${studentId}/revoke`, {
        revocation_reason: revocationReason,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
