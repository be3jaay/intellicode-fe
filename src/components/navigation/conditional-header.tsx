"use client";

import { usePathname } from "next/navigation";
import { HeaderMenu } from "../general";

// Pages that should not show the header
const NO_HEADER_PAGES = ["/dashboard", "/sign-in", "/sign-up"];

export function ConditionalHeader() {
  const pathname = usePathname();

  // Don't show header on dashboard and auth pages
  if (NO_HEADER_PAGES.some((page) => pathname.startsWith(page))) {
    return null;
  }

  // Show header on all other pages (landing page, etc.)
  return <HeaderMenu />;
}
