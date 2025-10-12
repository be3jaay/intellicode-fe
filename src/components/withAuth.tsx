'use client';

import { useAuth } from '@/providers/auth-context';
import { UserRole } from '@/types/auth.type';
import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import { Box, Center, Loader, Text } from '@mantine/core';

interface WithAuthProps {
    children: ReactNode;
    allowedRoles?: UserRole[];
    redirectTo?: string;
}

export function WithAuth({ children, allowedRoles, redirectTo = '/sign-in' }: WithAuthProps) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        console.log('WithAuth - checking auth state:', { isLoading, isAuthenticated, user: !!user });

        if (!isLoading) {
            if (!isAuthenticated) {
                console.log('WithAuth - not authenticated, redirecting to:', redirectTo);
                router.push(redirectTo);
            } else if (allowedRoles && user) {
                if (!allowedRoles.includes(user.role)) {
                    console.log('WithAuth - wrong role, redirecting to dashboard');
                    router.push('/dashboard');
                } else {
                    console.log('WithAuth - auth check passed, rendering children');
                    setIsChecking(false);
                }
            } else {
                console.log('WithAuth - no role restrictions, rendering children');
                setIsChecking(false);
            }
        }
    }, [isLoading, isAuthenticated, user, router, allowedRoles, redirectTo]);

    // Show loading while auth is loading OR while we're checking permissions
    if (isLoading || isChecking) {
        console.log('WithAuth - showing loading state');
        return (
            <Center h="100vh" style={{ backgroundColor: '#f8f9fa' }}>
                <Box ta="center">
                    <Loader size="xl" color="blue.6" />
                    <Text mt="xl" size="lg" fw={500} c="dimmed">
                        Loading your dashboard...
                    </Text>
                    <Text mt="xs" size="sm" c="dimmed">
                        Please wait while we verify your session
                    </Text>
                </Box>
            </Center>
        );
    }

    if (!isAuthenticated) {
        console.log('WithAuth - not authenticated after loading, returning null');
        return null;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        console.log('WithAuth - wrong role after loading, returning null');
        return null;
    }

    console.log('WithAuth - rendering children');
    return <>{children}</>;
}

