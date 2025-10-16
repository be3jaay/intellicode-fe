export type Instructor = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

export type Course = {
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
    instructor: Instructor;
}

export type LatestEnrollment = {
    id: string;
    student_id: string;
    course_id: string;
    enrolled_at: string;
    status: "active" | "inactive";
    course: Course;
}

export type LatestEnrollmentsResponse = {
    success: boolean;
    statusCode: number;
    data: LatestEnrollment[];
    timestamp: string;
}

