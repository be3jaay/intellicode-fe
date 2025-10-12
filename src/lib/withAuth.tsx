'use client';

import { useAuth } from '@/providers/auth-context';
import { UserRole } from '@/types/auth.type';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType, useState } from 'react';
import { Box, Center, Loader, Text } from '@mantine/core';

type WithAuthOptions = {
    allowedRoles?: UserRole[];
    redirectTo?: string;
};

export function withAuth<P extends object>(
    Component: ComponentType<P>,
    options: WithAuthOptions = {}
) {
    return function WithAuthComponent(props: P) {
        const { user, isLoading, isAuthenticated } = useAuth();
        const router = useRouter();
        const { allowedRoles, redirectTo = '/sign-in' } = options;
        const [isChecking, setIsChecking] = useState(true);

        useEffect(() => {
            console.log('withAuth - checking auth state:', { isLoading, isAuthenticated, user: !!user });

            if (!isLoading) {
                if (!isAuthenticated) {
                    console.log('withAuth - not authenticated, redirecting to:', redirectTo);
                    router.push(redirectTo);
                } else if (allowedRoles && user) {
                    if (!allowedRoles.includes(user.role)) {
                        console.log('withAuth - wrong role, redirecting to dashboard');
                        router.push('/dashboard');
                    } else {
                        console.log('withAuth - auth check passed, rendering component');
                        setIsChecking(false);
                    }
                } else {
                    console.log('withAuth - no role restrictions, rendering component');
                    setIsChecking(false);
                }
            }
        }, [isLoading, isAuthenticated, user, router, allowedRoles, redirectTo]);

        // Show loading while auth is loading OR while we're checking permissions
        if (isLoading || isChecking) {
            console.log('withAuth - showing loading state');
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
            console.log('withAuth - not authenticated after loading, returning null');
            return null;
        }

        if (allowedRoles && user && !allowedRoles.includes(user.role)) {
            console.log('withAuth - wrong role after loading, returning null');
            return null;
        }

        console.log('withAuth - rendering component');
        return <Component {...props} />;
    };
}

