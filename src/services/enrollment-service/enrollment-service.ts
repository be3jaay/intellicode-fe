import { apiClient } from "../api-client";
import { LatestEnrollmentsResponse } from "./enrollment-type";

export class EnrollmentService {
    public static async getLatestEnrollments(): Promise<LatestEnrollmentsResponse> {
        try {
            return await apiClient.get("/course/latest-enrollments");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

