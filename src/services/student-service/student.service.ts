import { apiClient } from "../api-client";
import { EnrolledStudentsResponse, StudentQueryParams } from "./student-type";

export class StudentService {
    public static async getEnrolledStudents(courseId: string, params: StudentQueryParams = {}): Promise<EnrolledStudentsResponse> {
        try {
            const queryParams = new URLSearchParams();
            
            if (params.offset !== undefined) queryParams.append('offset', params.offset.toString());
            if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
            if (params.search) queryParams.append('search', params.search);
            if (params.section) queryParams.append('section', params.section);
            if (params.enrollment_status) queryParams.append('enrollment_status', params.enrollment_status);

            const queryString = queryParams.toString();
            const url = `/course/${courseId}/students${queryString ? `?${queryString}` : ''}`;
            
            return await apiClient.get(url);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}