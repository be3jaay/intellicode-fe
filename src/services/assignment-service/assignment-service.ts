import { apiClient } from "../api-client";
import {
  CreateQuizForm,
  AssignmentResponse,
  AssignmentQueryParams,
  CreateAssignmentData,
  Assignment,
  SubmitAssignmentData,
  SubmitAssignmentResponse,
  AssignmentScoresResponse,
  GradeSubmissionData,
  SubmissionResponse,
  SubmissionsForGradingResponse,
  SubmissionsListResponse,
  SubmitAssignmentJsonPayload,
} from "./assignment-type";

export class AssignmentService {
  public static async createAssignment(
    value: CreateQuizForm,
    moduleId: string,
    file?: File
  ) {
    try {
      const { assignmentSubtype } = value;

      // Determine endpoint based on assignment type
      if (assignmentSubtype === "file_upload") {
        return await this.createAssignmentWithFile(value, moduleId, file);
      } else {
        return await this.createRegularAssignment(value, moduleId);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async createRegularAssignment(
    data: CreateQuizForm,
    moduleId: string
  ) {
    try {
      // Transform data to match API requirements
      const apiData: CreateAssignmentData = {
        title: data.title,
        description: data.description,
        assignmentType: data.assignmentType,
        assignmentSubtype: data.assignmentSubtype,
        difficulty: data.difficulty,
        points: data.points,
        dueDate: data.dueDate?.toISOString() || null,
        secured_browser: data.secured_browser,
        starterCode:
          data.assignmentSubtype === "code_sandbox"
            ? data.starterCode || null
            : null,
        questions: data.questions || [],
      };

      return await apiClient.post(
        `/course/modules/${moduleId}/assignments`,
        apiData
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async createAssignmentWithFile(
    data: CreateQuizForm,
    moduleId: string,
    file?: File
  ) {
    try {
      const formData = new FormData();

      // Append all form fields
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("assignmentType", data.assignmentType);
      formData.append("assignmentSubtype", data.assignmentSubtype);
      formData.append("difficulty", data.difficulty);
      formData.append("points", data.points.toString());
      formData.append("dueDate", data.dueDate?.toISOString() || "");
      formData.append("moduleId", moduleId);

      if (file) {
        formData.append("attachment", file);
      }

      return await apiClient.post(
        `/course/modules/${moduleId}/assignments/with-file`,
        formData
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getAssignments(
    moduleId: string,
    params: AssignmentQueryParams = {}
  ): Promise<AssignmentResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params.offset !== undefined)
        queryParams.append("offset", params.offset.toString());
      if (params.limit !== undefined)
        queryParams.append("limit", params.limit.toString());
      if (params.search) queryParams.append("search", params.search);
      if (params.is_published !== undefined)
        queryParams.append("is_published", params.is_published.toString());
      if (params.assignmentType)
        queryParams.append("assignmentType", params.assignmentType);

      const queryString = queryParams.toString();
      const url = `/course/modules/${moduleId}/assignments${
        queryString ? `?${queryString}` : ""
      }`;

      return await apiClient.get(url);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getAssignment(
    assignmentId: string
  ): Promise<{ data: Assignment }> {
    try {
      return await apiClient.get(`/course/assignments/${assignmentId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async submitAssignment(
    assignmentId: string,
    data: SubmitAssignmentData
  ): Promise<{ data: SubmitAssignmentResponse }> {
    try {
      return await apiClient.post(
        `/course/assignments/${assignmentId}/submit`,
        data
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getAssignmentScores(
    assignmentId: string
  ): Promise<AssignmentScoresResponse> {
    try {
      return await apiClient.get(`/course/assignments/${assignmentId}/scores`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getSubmissionsForGrading(
    assignmentId: string
  ): Promise<SubmissionsForGradingResponse> {
    try {
      return await apiClient.get(
        `/course/assignments/${assignmentId}/submissions-for-grading`
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async gradeSubmission(data: GradeSubmissionData): Promise<any> {
    try {
      return await apiClient.patch(
        `/course/assignments/submissions/grade`,
        data
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  /**
   * Submit assignment with JSON payload (for quiz/code assignments)
   * @param assignmentId - The assignment ID
   * @param payload - JSON payload with answers
   * @returns Submission response
   */
  public static async submitAssignmentJson(
    assignmentId: string,
    payload: SubmitAssignmentJsonPayload
  ): Promise<SubmissionResponse> {
    try {
      return await apiClient.post(
        `/course/assignments/${assignmentId}/submit`,
        payload
      );
    } catch (error) {
      console.error("Error submitting assignment (JSON):", error);
      throw error;
    }
  }

  /**
   * Submit code assignment (for code_sandbox assignments)
   * @param assignmentId - The assignment ID
   * @param code - The code string to submit
   * @param language - The programming language
   * @returns Submission response
   */
  public static async submitCodeAssignment(
    assignmentId: string,
    code: string,
    language: string
  ): Promise<SubmissionResponse> {
    try {
      return await apiClient.post(
        `/course/assignments/${assignmentId}/submit-code`,
        { code, language }
      );
    } catch (error) {
      console.error("Error submitting code assignment:", error);
      throw error;
    }
  }

  /**
   * Submit assignment with file uploads (for file_upload assignments)
   * Maximum 10 files allowed per submission
   * @param assignmentId - The assignment ID
   * @param files - Array of files to upload
   * @returns Submission response
   * @throws Error if more than 10 files provided
   */
  public static async submitAssignmentWithFiles(
    assignmentId: string,
    files: File[]
  ): Promise<SubmissionResponse> {
    try {
      // Enforce max 10 files
      if (files.length > 10) {
        throw new Error("Maximum 10 files allowed per submission");
      }

      if (files.length === 0) {
        throw new Error("At least one file is required");
      }

      const formData = new FormData();

      // Append each file with the field name "files"
      files.forEach((file) => {
        formData.append("files", file);
      });

      // Let the browser set Content-Type with boundary for multipart/form-data
      return await apiClient.post(
        `/course/assignments/${assignmentId}/submit-with-files`,
        formData
      );
    } catch (error) {
      console.error("Error submitting assignment (files):", error);
      throw error;
    }
  }

  /**
   * Get student submissions for an assignment
   * @param assignmentId - The assignment ID
   * @returns List of submissions
   */
  public static async getStudentSubmissions(
    assignmentId: string
  ): Promise<SubmissionsListResponse> {
    try {
      return await apiClient.get(
        `/course/assignments/${assignmentId}/submissions`
      );
    } catch (error) {
      console.error("Error fetching submissions:", error);
      throw error;
    }
  }
}
