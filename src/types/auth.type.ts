export type UserRole = 'student' | 'admin' | 'teacher';

export type SessionPayload = {
  user: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    middleName?: string;
    lastName: string;
    studentNumber?: string;
    section?: string;
  };
  access_token: string;
  refresh_token: string;
};

export type SignUpFormValue = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  studentNumber: string;
  section: string;
  agreeToTerms: boolean;
};

export type AuthResponse = {
  success: boolean;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      role: UserRole;
      firstName: string;
      middleName?: string;
      lastName: string;
    };
  };
  timestamp: string;
};
