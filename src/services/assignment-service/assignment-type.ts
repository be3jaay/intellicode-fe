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