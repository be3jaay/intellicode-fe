'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { SessionPayload } from '@/types/auth.type';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/services/api-client';

interface AuthState {
    user: SessionPayload['user'] | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthContextType extends AuthState {
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
    verifySession: () => Promise<boolean>;
    updateUser: (userData: Partial<SessionPayload['user']>) => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    signOut: async () => { },
    refreshUser: async () => { },
    verifySession: async () => false,
    updateUser: () => { },
    clearError: () => { },
});

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
    initialUser?: SessionPayload['user'] | null;
}

export function AuthProvider({ children, initialUser = null }: AuthProviderProps) {
    const [authState, setAuthState] = useState<AuthState>({
        user: initialUser,
        isAuthenticated: !!initialUser,
        isLoading: !initialUser,
        error: null,
    });

    const router = useRouter();

    // Fetch user from API
    const fetchUser = useCallback(async (): Promise<boolean> => {
        try {
            console.log('Fetching user from /api/auth/me...');
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('User data received:', data);

                if (data.user) {
                    setAuthState(prev => ({
                        ...prev,
                        user: data.user,
                        isAuthenticated: true,
                        error: null,
                        isLoading: false,
                    }));
                    return true;
                }
            }

            console.log('No user found or response not ok');
            setAuthState(prev => ({
                ...prev,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }));
            return false;
        } catch (error) {
            console.error('Failed to fetch user:', error);
            setAuthState(prev => ({
                ...prev,
                user: null,
                isAuthenticated: false,
                error: 'Failed to load user session',
                isLoading: false,
            }));
            return false;
        }
    }, []);

    // Verify session
    const verifySession = useCallback(async (): Promise<boolean> => {
        console.log('Verifying session...');
        return await fetchUser();
    }, [fetchUser]);

    // Update user
    const updateUser = useCallback((userData: Partial<SessionPayload['user']>) => {
        setAuthState(prev => ({
            ...prev,
            user: prev.user ? { ...prev.user, ...userData } : null,
        }));
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setAuthState(prev => ({ ...prev, error: null }));
    }, []);

    // Sign out
    const signOut = useCallback(async (): Promise<void> => {
        try {
            console.log('Signing out...');
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            // Clear the cached token in API client
            apiClient.clearToken();

            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });

            router.push('/sign-in');
        } catch (error) {
            console.error('Sign out failed:', error);
            setAuthState(prev => ({
                ...prev,
                error: 'Failed to sign out',
            }));
        }
    }, [router]);

    // Refresh user
    const refreshUser = useCallback(async (): Promise<void> => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        await fetchUser();
    }, [fetchUser]);

    // Initialize - fetch user on mount if no initial user
    useEffect(() => {
        if (!initialUser) {
            console.log('Initializing auth context - fetching user...');
            fetchUser();
        } else {
            console.log('Auth context initialized with initial user:', initialUser);
        }
    }, [initialUser, fetchUser]);

    // Periodic session verification (every 5 minutes)
    useEffect(() => {
        if (!authState.isAuthenticated) return;

        console.log('Setting up periodic session verification...');
        const interval = setInterval(() => {
            console.log('Periodic session check...');
            verifySession();
        }, 5 * 60 * 1000); // 5 minutes

        return () => {
            console.log('Cleaning up periodic session verification');
            clearInterval(interval);
        };
    }, [authState.isAuthenticated, verifySession]);

    // Handle tab visibility - refresh when tab becomes active
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden && authState.isAuthenticated) {
                console.log('Tab became visible - verifying session...');
                verifySession();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [authState.isAuthenticated, verifySession]);

    const contextValue: AuthContextType = {
        ...authState,
        signOut,
        refreshUser,
        verifySession,
        updateUser,
        clearError,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

