// Assignment submission types
export interface Answer {
  question_id: string;
  answer_text: string;
  is_correct?: boolean;
  points_earned?: number;
}

export interface SubmissionFile {
  id?: string;
  filename?: string;
  original_name?: string;
  name?: string;
  file_type?: string;
  mime_type?: string;
  size?: number;
  public_url?: string;
  url?: string;
}

export interface SubmissionStudent {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  student_number?: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  score?: number;
  max_score?: number;
  submitted_at: string;
  status: "submitted" | "graded" | "pending";
  answers?: Answer[];
  files?: SubmissionFile[];
  student?: SubmissionStudent;
}

export interface SubmissionResponse {
  success: boolean;
  statusCode: number;
  data: Submission;
}

export interface SubmissionsListResponse {
  success: boolean;
  statusCode: number;
  data: Submission[];
}

export interface SubmitAssignmentJsonPayload {
  answers: Answer[];
  files?: any[];
}
