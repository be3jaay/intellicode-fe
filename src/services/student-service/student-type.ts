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
}

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
}

export type StudentQueryParams = {
    offset?: number;
    limit?: number;
    search?: string;
    section?: string;
    enrollment_status?: "active" | "inactive";
}
