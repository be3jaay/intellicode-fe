import { apiClient } from "../api-client";

export interface RequestOtpRequest {
  email: string;
}

export interface RequestOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp_code: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  statusCode: number;
  data: {
    reset_token: string;
    expires_in: number;
  };
  message: string;
  timestamp: string;
}

export interface ResetPasswordRequest {
  reset_token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
}

export const passwordResetService = {
  async requestOtp(data: RequestOtpRequest): Promise<RequestOtpResponse> {
    const response = await apiClient.post(
      "/auth/forgot-password/request-otp",
      data
    );
    return response as RequestOtpResponse;
  },

  async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    const response = await apiClient.post(
      "/auth/forgot-password/verify-otp",
      data
    );
    return response as VerifyOtpResponse;
  },

  async resetPassword(
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    const response = await apiClient.post(
      "/auth/forgot-password/reset-password",
      data
    );
    return response as ResetPasswordResponse;
  },
};

