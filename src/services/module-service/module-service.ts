import { apiClient } from "../api-client";
import { GetModuleByCourseResponse, ModuleBulkCreationRequest, ModuleListResponse, ModuleListQueryParams } from "./module.type";

export class ModuleService {
    public static async getModuleByCourse(courseId: string): Promise<GetModuleByCourseResponse> {
        try {
            const response = await apiClient.get<GetModuleByCourseResponse>(`/course/${courseId}/modules`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public static async moduleBulkCreation(courseId: string, data: ModuleBulkCreationRequest[]) {
        try {
        return await apiClient.post(`/course/${courseId}/modules/bulk`, data);
        } catch (error) {
            throw error;
        }
    }

    public static async getModulesList(courseId: string, params: ModuleListQueryParams = {}): Promise<ModuleListResponse> {
        try {
            const queryParams = new URLSearchParams();
            
            if (params.offset !== undefined) queryParams.append('offset', params.offset.toString());
            if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());

            const queryString = queryParams.toString();
            const url = `/course/${courseId}/modules/list${queryString ? `?${queryString}` : ''}`;
            
            return await apiClient.get(url);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}