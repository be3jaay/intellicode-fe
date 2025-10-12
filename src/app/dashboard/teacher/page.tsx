'use client';

import { TeacherCourseManager } from '@/components/dashboard/teacher/courses/teacher-course-manager';
import { useAuth } from '@/providers/auth-context';

function InstructorDashboard() {
    const { user } = useAuth();

    return <TeacherCourseManager />;
}

export default InstructorDashboard;
