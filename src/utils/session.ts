import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import config from '@/config';
import { SessionPayload } from '@/types/auth.type';
import { cookies } from 'next/headers';

const { getConfigValue } = config;
const { SECRET_KEY } = getConfigValue();
const encodedKey = new TextEncoder().encode(SECRET_KEY);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('Failed to verify session', error);
  }
}

export async function createSession(payload: SessionPayload) {
  try {
    console.log('=== createSession START ===');
    console.log('Payload:', {
      userId: payload.user.id,
      email: payload.user.email,
      role: payload.user.role,
      firstName: payload.user.firstName,
      hasAccessToken: !!payload.access_token,
      hasRefreshToken: !!payload.refresh_token,
      accessTokenLength: payload.access_token?.length || 0,
      refreshTokenLength: payload.refresh_token?.length || 0,
    });

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    console.log('Session expires at:', expiresAt.toISOString());
    
    console.log('Creating JWT with payload...');
    console.log('SECRET_KEY exists:', !!SECRET_KEY);
    console.log('SECRET_KEY length:', SECRET_KEY?.length || 0);
    
    const session = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(encodedKey);

    console.log('JWT created successfully');
    console.log('JWT length:', session.length);
    console.log('JWT preview:', session.substring(0, 50) + '...');
    
    console.log('Getting cookie store...');
    const cookieStore = await cookies();
    console.log('Cookie store obtained');
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax' as const,
      path: '/',
    };
    
    console.log('Setting cookie with options:', {
      ...cookieOptions,
      secure: cookieOptions.secure,
      expiresAt: expiresAt.toISOString(),
      nodeEnv: process.env.NODE_ENV,
    });
    
    cookieStore.set('session', session, cookieOptions);
    console.log('Cookie set command executed');
    
    // Verify the cookie was set
    const verifyCookie = cookieStore.get('session');
    console.log('Cookie verification:', {
      found: !!verifyCookie,
      hasValue: !!verifyCookie?.value,
      valueLength: verifyCookie?.value?.length || 0,
    });
    
    if (!verifyCookie) {
      console.error('WARNING: Cookie was not found after setting!');
    }
    
    console.log('=== createSession END ===');
  } catch (error) {
    console.error('=== createSession ERROR ===');
    console.error('Error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    throw error;
  }
}

export async function getSession() {
  const cookie = (await cookies()).get('session')?.value;

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload as SessionPayload;
  } catch (error) {
    console.error('Failed to verify session', error);
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateToken({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const session = (await cookies()).get('session')?.value;

  if (!session) return null;

  const { payload } = await jwtVerify<SessionPayload>(session, encodedKey);

  if (!payload) throw new Error('Session not found!');

  const newPayload: SessionPayload = {
    user: {
      ...payload.user,
    },
    access_token: accessToken,
    refresh_token: refreshToken,
  };

  await createSession(newPayload);
}
