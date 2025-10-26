export type EnrolledStudent = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  student_number: string;
  section: string;
  profile_picture: string | null;
  enrollment_status: "active" | "inactive";
  enrolled_at: string;
  progress_percentage: number;
  assignments_completed: number;
  assignments_total: number;
  last_activity: string;
};

export type EnrolledStudentsResponse = {
  success: boolean;
  statusCode: number;
  data: {
    data: EnrolledStudent[];
    total: number;
    offset: number;
    limit: number;
    totalPages: number;
    currentPage: number;
  };
  timestamp: string;
};

export type StudentQueryParams = {
  offset?: number;
  limit?: number;
  search?: string;
  section?: string;
  enrollment_status?: "active" | "inactive";
};

// Gradebook types
export type GradebookStudent = {
  student_id: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  email: string;
  student_number: string;
  section: string;
  overall_grade: number;
  assignment_average: number;
  activity_average: number;
  exam_average: number;
  total_submissions: number;
  total_assignments: number;
  has_missing: boolean;
  last_submission: string | null;
};

export type GradebookQueryParams = {
  offset?: number;
  limit?: number;
  sort_by?:
    | "name"
    | "student_number"
    | "email"
    | "overall_grade"
    | "assignment_grade"
    | "activity_grade"
    | "exam_grade";
  sort_order?: "asc" | "desc";
  section?: string;
  search?: string;
  assignment_type?: string;
};

export type GradebookResponse = {
  success: boolean;
  statusCode: number;
  data: {
    data: GradebookStudent[];
    total: number;
    offset: number;
    limit: number;
    totalPages: number;
    currentPage: number;
    class_average: number;
    total_assignments: number;
  };
  timestamp: string;
};

// Student detail gradebook types
export type StudentAssignmentDetail = {
  id: string;
  title: string;
  type: "assignment" | "activity" | "exam";
  module_title: string;
  max_score: number;
  score?: number;
  percentage?: number;
  due_date: string | null;
  submitted_at?: string;
  status: "submitted" | "not_submitted" | "graded";
  is_late: boolean;
  is_published: boolean;
};

export type StudentGradebookDetail = {
  student_id: string;
  student: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    student_number: string;
    section: string;
  };
  grade_summary: {
    overall_grade: number;
    category_grades: {
      assignment_average: number;
      assignment_submitted: number;
      assignment_total: number;
      activity_average: number;
      activity_submitted: number;
      activity_total: number;
      exam_average: number;
      exam_submitted: number;
      exam_total: number;
    };
    grade_weights: {
      assignment_weight: number;
      activity_weight: number;
      exam_weight: number;
    };
    letter_grade: string;
  };
  assignments: StudentAssignmentDetail[];
};

export type StudentGradebookDetailResponse = {
  success: boolean;
  statusCode: number;
  data: StudentGradebookDetail;
  timestamp: string;
};

// Student's own gradebook types
export type MyGradeSummary = {
  overall_grade: number;
  category_grades: {
    assignment_average: number;
    assignment_submitted: number;
    assignment_total: number;
    activity_average: number;
    activity_submitted: number;
    activity_total: number;
    exam_average: number;
    exam_submitted: number;
    exam_total: number;
  };
  grade_weights: {
    assignment_weight: number;
    activity_weight: number;
    exam_weight: number;
  };
  letter_grade: string;
};

export type MyGradeSummaryResponse = {
  success: boolean;
  statusCode: number;
  data: MyGradeSummary;
  timestamp: string;
};

export type MyGradebook = {
  student_id: string;
  student: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    student_number: string;
    section: string;
  };
  grade_summary: MyGradeSummary;
  assignments: StudentAssignmentDetail[];
};

export type MyGradebookResponse = {
  success: boolean;
  statusCode: number;
  data: MyGradebook;
  timestamp: string;
};
