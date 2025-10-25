"use client";

import { useAuth } from "@/providers/auth-context";
import { HeaderMenu } from "./general/app-header";
import { usePathname } from "next/navigation";

interface ConditionalHeaderProps {
  showHeader?: boolean;
  customHeader?: React.ReactNode;
}

// Pages that should not show the app header
const NO_HEADER_PAGES = [
  "/dashboard",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/onboarding",
];

// Pages that should show header only for authenticated users
const AUTH_HEADER_PAGES = ["/marketplace", "/profile", "/settings"];

export function ConditionalHeader({ customHeader }: ConditionalHeaderProps) {
  const pathname = usePathname();

  // Safely get auth state, default to false if not available
  let isAuthenticated = false;
  let user = null;

  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
    user = auth.user;
  } catch (error) {
    // AuthProvider not available, treat as unauthenticated
    console.warn("AuthProvider not available in ConditionalHeader");
  }

  // Don't show header on specific pages
  if (NO_HEADER_PAGES.some((page) => pathname.startsWith(page))) {
    return null;
  }

  // Show custom header if provided
  if (customHeader) {
    return <>{customHeader}</>;
  }

  // Show header for public pages or authenticated users
  if (
    !isAuthenticated ||
    AUTH_HEADER_PAGES.some((page) => pathname.startsWith(page))
  ) {
    return <HeaderMenu />;
  }

  // Default: show header for public pages
  return <HeaderMenu />;
}

// Hook to determine if header should be shown
export function useShouldShowHeader(): boolean {
  const pathname = usePathname();

  let isAuthenticated = false;
  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
  } catch (error) {
    // AuthProvider not available, treat as unauthenticated
  }

  // Never show header on these pages
  if (NO_HEADER_PAGES.some((page) => pathname.startsWith(page))) {
    return false;
  }

  // Always show header on public pages
  return true;
}
