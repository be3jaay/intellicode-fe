import { apiClient } from "../api-client";
import { GetModuleByCourseResponse } from "./module.type";

export class ModuleService {
    public static async getModuleByCourse(courseId: string): Promise<GetModuleByCourseResponse> {
        try {
            const response = await apiClient.get<GetModuleByCourseResponse>(`/course/${courseId}/modules`);
            return response;
        } catch (error) {
            throw error;
        }
    }
}