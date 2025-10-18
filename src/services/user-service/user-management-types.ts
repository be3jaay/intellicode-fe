export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  role: 'student' | 'teacher' | 'admin';
  student_number: string | null;
  section: string | null;
  profile_picture: string | null;
  is_suspended: boolean;
  suspension_reason: string | null;
  is_approved: boolean;
  approval_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface UsersResponse {
  users: UserProfile[];
  total: number;
  page: number;
  limit: number;
}

export interface UserManagementQuery {
  role?: 'student' | 'teacher' | 'admin';
  search?: string;
  isSuspended?: boolean;
  page?: number;
  limit?: number;
}

export interface SuspendUserRequest {
  isSuspended: boolean;
  reason?: string;
}

export interface ApproveInstructorRequest {
  isApproved: boolean;
  reason?: string;
}

export interface UserManagementState {
  users: {
    list: UserProfile[];
    total: number;
    page: number;
    limit: number;
    loading: boolean;
    error: string | null;
  };
  filters: {
    role: string | null;
    search: string;
    isSuspended: boolean | null;
  };
  pendingApprovals: UserProfile[];
  suspendedUsers: UserProfile[];
  selectedUsers: string[];
}

export interface SignupRequest {
  email: string;
  password: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  role: 'student' | 'teacher';
  student_number?: string;
  section?: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: UserProfile;
}

export type UserStatus = 'active' | 'suspended' | 'pending_approval' | 'rejected';

export interface StatusBadgeProps {
  status: UserStatus;
  size?: 'sm' | 'md' | 'lg';
}

export interface UserProfileCardProps {
  user: UserProfile;
  showActions?: boolean;
  onAction?: (action: string, user: UserProfile) => void;
  compact?: boolean;
}
