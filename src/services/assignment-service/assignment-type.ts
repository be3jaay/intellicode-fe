export type CreateQuizForm = {
  title: string;
  description: string;
  assignmentType: "assignment" | "activity" | "exam";
  assignmentSubtype: "quiz_form" | "code_sandbox" | "file_upload";
  difficulty: "easy" | "medium" | "hard";
  points: number;
  isPublished: boolean;
  dueDate: Date | null;
  secured_browser: boolean;
  questions: QuestionArrayForms[];
  starterCode?: string;
  attachment?: File | null;
};

export type UpdateAssignmentData = {
  title: string;
  description: string;
  assignmentType: "assignment" | "activity" | "exam";
  assignmentSubtype: "quiz_form" | "code_sandbox" | "file_upload";
  difficulty: "easy" | "medium" | "hard";
  points: number;
  dueDate: string;
  is_published: boolean;
  secured_browser: boolean;
  questions?: AssignmentQuestion[];
  starterCode?: string | null;
};

export type SubmitAssignmentData = {
  answers: {
    question_id: string;
    answer_text: string;
  }[];
};

export type SubmitAssignmentResponse = {
  score: number;
  final_score: number;
  details?: {
    correct?: number;
    total?: number;
  };
};

export type AssignmentQuestionScore = {
  question_id: string;
  question_text: string;
  points_earned: number;
  max_points: number;
  is_correct: boolean;
};

export type AssignmentScoreItem = {
  student_id: string;
  student_name: string;
  student_email: string;
  student_number: string;
  score: number;
  max_score: number;
  percentage: number;
  status: string;
  submitted_at: string;
  question_scores: AssignmentQuestionScore[];
};

export type AssignmentScoresResponse = {
  success: boolean;
  statusCode: number;
  data: AssignmentScoreItem[];
};

export type CreateAssignmentData = {
  title: string;
  description: string;
  assignmentType: "assignment" | "activity" | "exam";
  assignmentSubtype: "code_sandbox" | "quiz_form" | "file_upload";
  difficulty: "easy" | "medium" | "hard";
  points: number;
  dueDate: string | null;
  secured_browser: boolean;
  starterCode: string | null;
  questions: QuestionArrayForms[];
};

export type QuestionArrayForms = {
  question: string;
  type: "multiple_choice" | "enumeration" | "identification" | "true_false";
  points: number;
  correct_answer?: string;
  options?: string[];
  explanation?: string;
  correct_answers?: string[];
  case_sensitive?: boolean;
  is_true?: boolean;
};

export type AssignmentQuestion = {
  id: string;
  question: string;
  type: "multiple_choice" | "enumeration" | "identification" | "true_false";
  points: number;
  correct_answer: string | null;
  correct_answers: string[];
  options: string[];
  explanation: string;
  case_sensitive: boolean;
  is_true: boolean | null;
};

export type AssignmentInstructor = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string | null;
};

export type AssignmentAttachment = {
  id: string;
  filename: string;
  original_name: string;
  file_type: string;
  category?: string;
  mime_type?: string;
  size: number;
  public_url: string;
  storage_path?: string;
  course_id?: string;
  module_id?: string;
  lesson_id?: string | null;
  assignment_id?: string | null;
  submission_id?: string | null;
  description?: string | null;
  uploaded_at?: string;
  updated_at?: string;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  assignmentType: "assignment" | "activity" | "exam";
  assignmentSubtype: "quiz_form" | "code_sandbox" | "file_upload";
  difficulty: "easy" | "medium" | "hard";
  points: number;
  dueDate: string;
  is_published: boolean;
  secured_browser: boolean;
  module_id: string;
  created_at: string;
  updated_at: string;
  questions: AssignmentQuestion[];
  starterCode: string | null;
  already_submitted?: boolean;
  instructor?: AssignmentInstructor;
  attachments?: AssignmentAttachment[];
};

export type AssignmentResponse = {
  success: boolean;
  statusCode: number;
  data: {
    data: Assignment[];
  };
};

export type AssignmentQueryParams = {
  offset?: number;
  limit?: number;
  search?: string;
  is_published?: boolean;
  assignmentType?: "quiz_form" | "code_sandbox" | "file_upload";
};

export type SubmissionFile = {
  id: string;
  filename: string;
  original_name: string;
  file_type: string;
  category: string;
  mime_type: string;
  size: number;
  public_url: string;
  storage_path: string;
  course_id: string;
  module_id: string;
  lesson_id: string | null;
  assignment_id: string;
  submission_id: string;
  description: string | null;
  uploaded_at: string;
  updated_at: string;
};

export type SubmissionStudent = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  student_number: string;
  profile_picture: string | null;
};

export type SubmissionForGrading = {
  id: string;
  assignment_id: string;
  student_id: string;
  score: number;
  max_score: number;
  status: "submitted" | "graded" | "pending";
  submitted_at: string;
  graded_at: string | null;
  files: SubmissionFile[];
  student: SubmissionStudent;
  submitted_code?: string;
  code_language?: string;
  assignment_title?: string;
  assignment_description?: string;
  assignment_difficulty?: "easy" | "medium" | "hard";
  assignment_due_date?: string | null;
};

export type SubmissionsForGradingResponse = {
  success: boolean;
  statusCode: number;
  data: SubmissionForGrading[];
  timestamp: string;
};

export type GradeSubmissionData = {
  submission_id: string;
  score: number;
  feedback?: string;
  mark_as_graded: boolean;
};
// Import submission types
export type {
  Submission,
  SubmissionResponse,
  SubmissionsListResponse,
  SubmitAssignmentJsonPayload,
  Answer,
} from "@/types/assignment";
