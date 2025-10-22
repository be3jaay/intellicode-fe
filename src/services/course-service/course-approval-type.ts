export type CourseApprovalResponse = {
  success: boolean;
  statusCode: number;
  data: {
    data: CourseApprovalItem[];
    total: number;
    offset: number;
    limit: number;
    totalPages: number;
    currentPage: number;
  };
  timestamp: string;
};

export type CourseApprovalItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  course_invite_code: string;
  instructor_id: string;
  status: "waiting_for_approval" | "approved" | "rejected";
  admin_notes?: string;
  instructor: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

export type CourseApprovalAction = {
  courseId: string;
  action: "approve" | "reject";
  admin_notes?: string;
};

export type CourseApprovalActionResponse = {
  success: boolean;
  statusCode: number;
  data: {
    id: string;
    status: "approved" | "rejected";
    admin_notes?: string;
  };
  timestamp: string;
};

export type CourseResubmitResponse = {
  success: boolean;
  statusCode: number;
  data: {
    message: string;
    status: "waiting_for_approval";
    course_id: string;
    course_title: string;
  };
  timestamp: string;
};
