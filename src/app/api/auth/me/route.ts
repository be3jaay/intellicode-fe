import { getSession } from '@/utils/session';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    console.log('=== /api/auth/me called ===');
    
    // Check if session cookie exists
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    console.log('Session cookie exists:', !!sessionCookie);
    console.log('Session cookie value length:', sessionCookie?.value?.length || 0);
    
    const session = await getSession();
    console.log('Session retrieved:', !!session);
    
    if (!session) {
      console.log('No session found - returning 401');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('User data:', {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
      firstName: session.user.firstName,
    });

    return NextResponse.json({
      user: session.user,
      authenticated: true,
    });
  } catch (error) {
    console.error('=== Error in /api/auth/me ===');
    console.error('Error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

