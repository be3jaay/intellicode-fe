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

const AUTH_HEADER_PAGES = ["/marketplace", "/profile", "/settings"];

export function ConditionalHeader({ customHeader }: ConditionalHeaderProps) {
  const pathname = usePathname();

  let isAuthenticated = false;
  let user: any = null;

  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
    user = auth.user;
  } catch (error) {
    console.warn("AuthProvider not available in ConditionalHeader");
  }

  if (NO_HEADER_PAGES.some((page) => pathname.startsWith(page))) {
    return null;
  }

  if (customHeader) {
    return <>{customHeader}</>;
  }

  if (
    !isAuthenticated ||
    AUTH_HEADER_PAGES.some((page) => pathname.startsWith(page))
  ) {
    return <HeaderMenu />;
  }

  return <HeaderMenu />;
}

export function useShouldShowHeader(): boolean {
  const pathname = usePathname();

  let isAuthenticated = false;
  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
  } catch (error) {
    console.error(error);
  }

  if (NO_HEADER_PAGES.some((page) => pathname.startsWith(page))) {
    return false;
  }

  return true;
}
