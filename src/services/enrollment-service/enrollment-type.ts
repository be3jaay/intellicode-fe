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
    instructor: Instructor;
}

export type Enrollment = {
    id: string;
    student_id: string;
    course_id: string;
    enrolled_at: string;
    status: "active" | "inactive";
    course: Course;
}

export type EnrollmentsResponse = {
    success: boolean;
    statusCode: number;
    data: {
        data: Enrollment[];
        total: number;
        offset: number;
        limit: number;
        totalPages: number;
        currentPage: number;
    };
    timestamp: string;
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

