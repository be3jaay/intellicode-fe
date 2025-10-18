import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserManagementService } from '@/services/user-service/user-management-service';
import { UserManagementQuery, SuspendUserRequest, ApproveInstructorRequest, SignupRequest } from '@/services/user-service/user-management-types';

// Query keys
export const userManagementKeys = {
  all: ['user-management'] as const,
  users: (query: UserManagementQuery) => [...userManagementKeys.all, 'users', query] as const,
  pendingApprovals: () => [...userManagementKeys.all, 'pending-approvals'] as const,
  suspendedUsers: () => [...userManagementKeys.all, 'suspended-users'] as const,
};

// Hook for fetching users with filters
export function useUsers(query: UserManagementQuery = {}) {
  return useQuery({
    queryKey: userManagementKeys.users(query),
    queryFn: () => UserManagementService.getUsers(query),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Hook for fetching pending approvals
export function usePendingApprovals() {
  return useQuery({
    queryKey: userManagementKeys.pendingApprovals(),
    queryFn: () => UserManagementService.getPendingApprovals(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Hook for fetching suspended users
export function useSuspendedUsers() {
  return useQuery({
    queryKey: userManagementKeys.suspendedUsers(),
    queryFn: () => UserManagementService.getSuspendedUsers(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Hook for suspending/unsuspending users
export function useSuspendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: SuspendUserRequest }) =>
      UserManagementService.suspendUser(userId, data),
    onSuccess: () => {
      // Invalidate all user-related queries
      queryClient.invalidateQueries({ queryKey: userManagementKeys.all });
    },
  });
}

// Hook for approving/rejecting instructors
export function useApproveInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: ApproveInstructorRequest }) =>
      UserManagementService.approveInstructor(userId, data),
    onSuccess: () => {
      // Invalidate all user-related queries
      queryClient.invalidateQueries({ queryKey: userManagementKeys.all });
    },
  });
}

// Hook for deleting users
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => UserManagementService.deleteUser(userId),
    onSuccess: () => {
      // Invalidate all user-related queries
      queryClient.invalidateQueries({ queryKey: userManagementKeys.all });
    },
  });
}

// Hook for user registration
export function useRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupRequest) => UserManagementService.registerUser(data),
    onSuccess: () => {
      // Invalidate all user-related queries
      queryClient.invalidateQueries({ queryKey: userManagementKeys.all });
    },
  });
}
