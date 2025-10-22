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
}

export type SubmitAssignmentData = {
    answers: {
        question_id: string;
        answer_text: string;
    }[];
}

export type SubmitAssignmentResponse = {
    score: number;
    final_score: number;
    details?: {
        correct?: number;
        total?: number;
    };
}

export type AssignmentQuestionScore = {
    question_id: string;
    question_text: string;
    points_earned: number;
    max_points: number;
    is_correct: boolean;
}

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
}

export type AssignmentScoresResponse = {
    success: boolean;
    statusCode: number;
    data: AssignmentScoreItem[];
}

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
}

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
}

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
}

export type AssignmentInstructor = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar_url?: string | null;
}

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
}

export type AssignmentResponse = {
    success: boolean;
    statusCode: number;
    data: {
        data: Assignment[];
    };
}

export type AssignmentQueryParams = {
    offset?: number;
    limit?: number;
    search?: string;
    is_published?: boolean;
    assignmentType?: "quiz_form" | "code_sandbox" | "file_upload";
}