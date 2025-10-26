"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { SessionPayload } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import { apiClient } from "@/services/api-client";

interface AuthState {
  user: SessionPayload["user"] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  verifySession: () => Promise<boolean>;
  updateUser: (userData: Partial<SessionPayload["user"]>) => void;
  clearError: () => void;
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/", "/code-sandbox"];

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  signOut: async () => {},
  refreshUser: async () => {},
  verifySession: async () => false,
  updateUser: () => {},
  clearError: () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: SessionPayload["user"] | null;
}

export function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: initialUser,
    isAuthenticated: !!initialUser,
    isLoading: !initialUser,
    error: null,
  });

  const router = useRouter();

  // Helper to check if current path is a public route
  const isPublicRoute = useCallback(() => {
    if (typeof window === "undefined") return false;
    const pathname = window.location.pathname;
    return PUBLIC_ROUTES.includes(pathname);
  }, []);

  // Fetch user from API
  const fetchUser = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setAuthState((prev) => ({
            ...prev,
            user: data.user,
            isAuthenticated: true,
            error: null,
            isLoading: false,
          }));
          return true;
        }
      }

      setAuthState((prev) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }));
      return false;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setAuthState((prev) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        error: "Failed to load user session",
        isLoading: false,
      }));
      return false;
    }
  }, []);

  // Verify session
  const verifySession = useCallback(async (): Promise<boolean> => {
    return await fetchUser();
  }, [fetchUser]);

  // Update user
  const updateUser = useCallback(
    (userData: Partial<SessionPayload["user"]>) => {
      setAuthState((prev) => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...userData } : null,
      }));
    },
    []
  );

  // Clear error
  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, []);

  // Sign out
  const signOut = useCallback(async (): Promise<void> => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear the cached token in API client
      apiClient.clearToken();

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      router.push("/sign-in");
    } catch (error) {
      console.error("Sign out failed:", error);
      setAuthState((prev) => ({
        ...prev,
        error: "Failed to sign out",
      }));
    }
  }, [router]);

  // Refresh user
  const refreshUser = useCallback(async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    await fetchUser();
  }, [fetchUser]);

  // Initialize - fetch user on mount if no initial user
  useEffect(() => {
    if (!initialUser) {
      // Always fetch user to check session, even on public routes
      fetchUser();
    } else {
      // If we have initial user, just mark as not loading
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, [initialUser, fetchUser]);

  // Periodic session verification (every 5 minutes)
  useEffect(() => {
    // Skip session verification on public routes
    if (isPublicRoute() || !authState.isAuthenticated) return;

    const interval = setInterval(() => {
      verifySession();
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      clearInterval(interval);
    };
  }, [authState.isAuthenticated, verifySession, isPublicRoute]);

  // Handle tab visibility - refresh when tab becomes active
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Skip session verification on public routes
      if (!document.hidden && authState.isAuthenticated && !isPublicRoute()) {
        verifySession();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [authState.isAuthenticated, verifySession, isPublicRoute]);

  const contextValue: AuthContextType = {
    ...authState,
    signOut,
    refreshUser,
    verifySession,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
