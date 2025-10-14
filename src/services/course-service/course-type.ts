export type CourseValue = {
    title: string;
    description: string;
    category: string;
    thumbnail?: File | null | undefined;
}

export type Instructor = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

export type CourseValueResponse = {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string | null | undefined;
    course_invite_code: string;
    instructor_id: string;
    created_at: string;
    updated_at: string;
    instructor: Instructor;
    students: number;
    modules: number;
    status: "waiting_for_approval" | "approved" | "rejected";
}

export type CoursesResponse = {
    success: boolean;
    statusCode: number;
    data: {
        data: CourseValueResponse[];
        instructor_id: string;
        total: number;
        offset: number;
        limit: number;
        totalPages: number;
        currentPage: number;
    };
    timestamp: string;
}

export type CreateCourseResponse = {
    success: boolean;
    statusCode: number;
    data: CourseValueResponse;
    timestamp: string;
}

// Student enrollment types
export type EnrollmentCourse = {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string | null;
    instructor: Instructor;
}

export type Enrollment = {
    id: string;
    student_id: string;
    course_id: string;
    enrolled_at: string;
    status: "active" | "inactive";
    course: EnrollmentCourse;
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

export type EnrolledCourseDetail = {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string | null;
    created_at: string;
    updated_at: string;
    course_invite_code: string;
    instructor_id: string;
    status: "waiting_for_approval" | "approved" | "rejected";
    instructor: Instructor;
    lessons: any[];
}

export type EnrolledCourseDetailResponse = {
    success: boolean;
    statusCode: number;
    data: EnrolledCourseDetail;
    timestamp: string;
}