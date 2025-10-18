import { apiClient } from "../api-client";
import { LatestEnrollmentsResponse, EnrollmentsResponse } from "./enrollment-type";

export class EnrollmentService {
    public static async getLatestEnrollments(): Promise<LatestEnrollmentsResponse> {
        try {
            return await apiClient.get("/course/latest-enrollments");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public static async getMyEnrollments(offset: number = 0, limit: number = 6): Promise<EnrollmentsResponse> {
        try {
            return await apiClient.get(`/course/my-enrollments?offset=${offset}&limit=${limit}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

