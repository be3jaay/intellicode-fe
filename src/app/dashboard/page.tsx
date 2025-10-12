import { getSession } from '@/utils/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect('/sign-in');
    }

    // Redirect to role-specific dashboard
    switch (session.user.role) {
        case 'student':
            redirect('/dashboard/student');
        case 'admin':
            redirect('/dashboard/admin');
        case 'teacher':
            redirect('/dashboard/teacher');
        default:
            redirect('/sign-in');
    }
}

