import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/utils/session";

const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/",
  "/code-sandbox",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];
const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.includes(pathname)) {
    const session = await getSession();

    if (session && authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  const session = await getSession();

  if (!session) {
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === "/dashboard") {
    const roleBasedPath = `/dashboard/${session.user.role}`;
    return NextResponse.redirect(new URL(roleBasedPath, request.url));
  }

  const userRole = session.user.role;

  if (pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
    const roleBasedPath = `/dashboard/${userRole}`;
    return NextResponse.redirect(new URL(roleBasedPath, request.url));
  }

  if (pathname.startsWith("/dashboard/teacher") && userRole !== "teacher") {
    const roleBasedPath = `/dashboard/${userRole}`;
    return NextResponse.redirect(new URL(roleBasedPath, request.url));
  }

  if (pathname.startsWith("/dashboard/student") && userRole !== "student") {
    const roleBasedPath = `/dashboard/${userRole}`;
    return NextResponse.redirect(new URL(roleBasedPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
