import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/utils/session';

const publicRoutes = ['/sign-in', '/sign-up', '/'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    const session = await getSession();
    
    // Redirect authenticated users away from auth pages
    if (session && authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    return NextResponse.next();
  }

  // Check authentication for protected routes
  const session = await getSession();

  if (!session) {
    const redirectUrl = new URL('/sign-in', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Handle /dashboard root - redirect to role-specific dashboard
  if (pathname === '/dashboard') {
    const roleBasedPath = `/dashboard/${session.user.role}`;
    return NextResponse.redirect(new URL(roleBasedPath, request.url));
  }

  // Role-based access control for dashboard subroutes
  const userRole = session.user.role;

  // Admin routes
  if (pathname.startsWith('/dashboard/admin') && userRole !== 'admin') {
    const roleBasedPath = `/dashboard/${userRole}`;
    return NextResponse.redirect(new URL(roleBasedPath, request.url));
  }

  // Teacher routes
  if (pathname.startsWith('/dashboard/teacher') && userRole !== 'teacher') {
    const roleBasedPath = `/dashboard/${userRole}`;
    return NextResponse.redirect(new URL(roleBasedPath, request.url));
  }

  // Student routes
  if (pathname.startsWith('/dashboard/student') && userRole !== 'student') {
    const roleBasedPath = `/dashboard/${userRole}`;
    return NextResponse.redirect(new URL(roleBasedPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};

