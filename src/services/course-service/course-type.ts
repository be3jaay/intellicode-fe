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