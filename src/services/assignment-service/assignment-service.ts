
import { apiClient } from "../api-client";
import { CreateQuizForm, AssignmentResponse, AssignmentQueryParams, CreateAssignmentData, Assignment, SubmitAssignmentData, SubmitAssignmentResponse } from "./assignment-type";

export class AssignmentService {
    public static async createAssignment(value: CreateQuizForm, moduleId: string, file?: File){
        try {
            const { assignmentSubtype } = value;
            
            // Determine endpoint based on assignment type
            if (assignmentSubtype === "file_upload") {
                return await this.createAssignmentWithFile(value, moduleId, file);
            } else {
                return await this.createRegularAssignment(value, moduleId);
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    public static async createRegularAssignment(data: CreateQuizForm, moduleId: string) {
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
                starterCode: data.assignmentSubtype === "code_sandbox" ? data.starterCode || null : null,
                questions: data.questions || []
            };

            return await apiClient.post(`/course/modules/${moduleId}/assignments`, apiData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public static async createAssignmentWithFile(data: CreateQuizForm, moduleId: string, file?: File) {
        try {
            const formData = new FormData();
            
            // Append all form fields
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('assignmentType', data.assignmentType);
            formData.append('assignmentSubtype', data.assignmentSubtype);
            formData.append('difficulty', data.difficulty);
            formData.append('points', data.points.toString());
            formData.append('dueDate', data.dueDate?.toISOString() || '');
            formData.append('moduleId', moduleId);
            
            if (file) {
                formData.append('attachment', file);
            }

            return await apiClient.post(`/course/modules/${moduleId}/assignments/with-file`, formData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public static async getAssignments(moduleId: string, params: AssignmentQueryParams = {}): Promise<AssignmentResponse> {
        try {
            const queryParams = new URLSearchParams();
            
            if (params.offset !== undefined) queryParams.append('offset', params.offset.toString());
            if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
            if (params.search) queryParams.append('search', params.search);
            if (params.is_published !== undefined) queryParams.append('is_published', params.is_published.toString());
            if (params.assignmentType) queryParams.append('assignmentType', params.assignmentType);

            const queryString = queryParams.toString();
            const url = `/course/modules/${moduleId}/assignments${queryString ? `?${queryString}` : ''}`;
            
            return await apiClient.get(url);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public static async getAssignment(assignmentId: string): Promise<{ data: Assignment }> {
        try {
            return await apiClient.get(`/course/assignments/${assignmentId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public static async submitAssignment(assignmentId: string, data: SubmitAssignmentData): Promise<{ data: SubmitAssignmentResponse }> {
        try {
            return await apiClient.post(`/course/assignments/${assignmentId}/submit`, data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}