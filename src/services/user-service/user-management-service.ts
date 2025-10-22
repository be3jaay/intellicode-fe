import { apiClient } from "../api-client";
import {
  UsersResponse,
  UserManagementQuery,
  SuspendUserRequest,
  ApproveInstructorRequest,
  UserProfile,
  SignupRequest,
  SignupResponse,
} from "./user-management-types";

export class UserManagementService {
  public static async getUsers(
    query: UserManagementQuery = {}
  ): Promise<UsersResponse> {
    try {
      const queryParams = new URLSearchParams();

      // Always include page and limit with defaults
      const page = query.page || 1;
      const limit = query.limit || 10;

      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());

      if (query.role) queryParams.append("role", query.role);
      if (query.search) queryParams.append("search", query.search);
      if (query.isSuspended !== undefined)
        queryParams.append("isSuspended", query.isSuspended.toString());

      const queryString = queryParams.toString();
      const url = `/users?${queryString}`;

      const response = await apiClient.get<{
        success: boolean;
        data: UsersResponse;
      }>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async suspendUser(
    userId: string,
    data: SuspendUserRequest
  ): Promise<void> {
    try {
      await apiClient.put(`/users/${userId}/suspend`, data);
    } catch (error) {
      throw error;
    }
  }

  public static async approveInstructor(
    userId: string,
    data: ApproveInstructorRequest
  ): Promise<void> {
    try {
      await apiClient.put(`/users/${userId}/approve`, data);
    } catch (error) {
      throw error;
    }
  }

  public static async getPendingApprovals(): Promise<UserProfile[]> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: UserProfile[];
      }>("/users/pending-approval");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async getSuspendedUsers(): Promise<UserProfile[]> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: UserProfile[];
      }>("/users/suspended");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteUser(userId: string): Promise<void> {
    try {
      await apiClient.delete(`/users/${userId}`);
    } catch (error) {
      throw error;
    }
  }

  public static async registerUser(
    data: SignupRequest
  ): Promise<SignupResponse> {
    try {
      return await apiClient.post<SignupResponse>("/auth/register", data);
    } catch (error) {
      throw error;
    }
  }

  public static async getCurrentUser(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: UserProfile;
      }>("/auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async updateUserProfile(
    userId: string,
    data: FormData
  ): Promise<UserProfile> {
    try {
      const response = await apiClient.put<{
        success: boolean;
        data: UserProfile;
      }>(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
