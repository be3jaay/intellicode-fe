
import { apiClient } from "../api-client";
import { CreateQuizForm, AssignmentResponse, AssignmentQueryParams } from "./assignment-type";

export class AssignmentService {
    public static async createAssignment(value: CreateQuizForm, moduleId: string){
        try {
            return await apiClient.post(`/course/modules/${moduleId}/assignments`, value)
        } catch (error) {
            console.error(error)
            throw error
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
}