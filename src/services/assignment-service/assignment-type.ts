export type CreateQuizForm = {
    title: string;
    description: string;
    assignmentType: "quiz_form" | "code_sandbox" | "file_upload";
    points: number;
    dueDate: Date | null;
    questions: QuestionArrayForms[];
}

export type QuestionArrayForms = {
    question: string;
    type: "multiple_choice" | "enumeration" | "identification" | "true_false";
    points: number;
    correct_answer: string;
    options: string[];
    explanation: string;
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
    assignmentType: "quiz_form" | "code_sandbox" | "file_upload";
    points: number;
    dueDate: string;
    is_published: boolean;
    module_id: string;
    created_at: string;
    updated_at: string;
    questions: AssignmentQuestion[];
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