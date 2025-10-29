import { useMutation } from "@tanstack/react-query";
import {
  passwordResetService,
  type RequestOtpRequest,
  type RequestOtpResponse,
  type VerifyOtpRequest,
  type VerifyOtpResponse,
  type ResetPasswordRequest,
  type ResetPasswordResponse,
} from "@/services/password-reset-service";

export function useRequestOtp() {
  return useMutation<RequestOtpResponse, Error, RequestOtpRequest>({
    mutationFn: (data) => passwordResetService.requestOtp(data),
    retry: false, // Disable automatic retries
  });
}

export function useVerifyOtp() {
  return useMutation<VerifyOtpResponse, Error, VerifyOtpRequest>({
    mutationFn: (data) => passwordResetService.verifyOtp(data),
    retry: false, // Disable automatic retries
  });
}

export function useResetPassword() {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: (data) => passwordResetService.resetPassword(data),
    retry: false, // Disable automatic retries
  });
}

