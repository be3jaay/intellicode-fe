'use client';

import { useAuth } from '@/providers/auth-context';
import { usePathname } from 'next/navigation';
import { HeaderMenu } from '../general';

interface ConditionalHeaderProps {
    showHeader?: boolean;
    customHeader?: React.ReactNode;
}

// Pages that should not show the app header
const NO_HEADER_PAGES = [
    '/dashboard',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/onboarding',
];

// Pages that should show header only for authenticated users
const AUTH_HEADER_PAGES = [
    '/marketplace',
    '/profile',
    '/settings',
];

export function ConditionalHeader({
    showHeader = true,
    customHeader
}: ConditionalHeaderProps) {
    const pathname = usePathname();
    let isAuthenticated = false;
    let user = null;

    try {
        const auth = useAuth();
        isAuthenticated = auth.isAuthenticated;
        user = auth.user;
    } catch (error) {
        console.warn('AuthProvider not available in ConditionalHeader');
    }

    if (NO_HEADER_PAGES.some(page => pathname.startsWith(page))) {
        return null;
    }

    if (customHeader) {
        return <>{customHeader}</>;
    }

    if (!isAuthenticated || AUTH_HEADER_PAGES.some(page => pathname.startsWith(page))) {
        return <HeaderMenu />;
    }

    // Default: show header for public pages
    return <HeaderMenu />;
}

export function useShouldShowHeader(): boolean {
    const pathname = usePathname();

    let isAuthenticated = false;
    try {
        const auth = useAuth();
        isAuthenticated = auth.isAuthenticated;
    } catch (error) {
        console.warn('AuthProvider not available in useShouldShowHeader');
        throw error;
    }

    if (NO_HEADER_PAGES.some(page => pathname.startsWith(page))) {
        return false;
    }

    return true;
}
