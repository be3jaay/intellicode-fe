export type ActivityType = "code_sandbox" | "quiz_form"
export type Difficulty = "easy" | "medium" | "hard"
export type QuestionType = "multiple_choice" | "enumeration" | "identification" | "true_false"

export type QuizQuestion = {
    question: string
    type: QuestionType
    points: number
    explanation?: string
    options?: string[]
    correct_answer?: string
    correct_answers?: string[]
    case_sensitive?: boolean
    is_true?: boolean
}

export type ActivityFormData = {
    // Activity Info
    title: string
    instructions: string
    dueDate: Date | null
    totalScore: number
    difficulty: Difficulty
    activityType: ActivityType
    moduleId: string
    
    // For Code Sandbox
    starterCode?: string
    testCases?: string
    
    // For Quiz Form
    questions: QuizQuestion[]
    editingIndex: number | null
    isAddingNew: boolean
}

