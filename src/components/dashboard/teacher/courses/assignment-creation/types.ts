export type AssignmentType = "file_upload" | "quiz_form" | "code_sandbox"

export type QuestionType = "multiple_choice" | "enumeration" | "identification" | "true_false"

export type QuizQuestion = {
    question: string
    type: QuestionType
    points: number
    explanation?: string
    // For multiple choice
    options?: string[]
    correct_answer?: string
    // For enumeration
    correct_answers?: string[]
    // For identification
    case_sensitive?: boolean
    // For true/false
    is_true?: boolean
}

export type AssignmentFormData = {
    // Assignment Info
    title: string
    description: string
    assignmentType: AssignmentType
    points: number
    dueDate: Date | null
    moduleId: string
    
    // For File Upload
    attachment: File | null
    
    // For Quiz Form
    questions: QuizQuestion[]
    editingIndex: number | null
    isAddingNew: boolean
    
    // For Code Sandbox
    starterCode?: string
    testCases?: string
}

