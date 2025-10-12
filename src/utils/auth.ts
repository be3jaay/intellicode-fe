'use server';

import { signInSchema } from '@/app/sign-in/container/schema/sign-in-schema';
import { signUpSchema } from '@/app/sign-up/container/schema/sign-up-schema';
import config from '@/config';
import { SignUpFormValue } from '@/types/auth.type';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { createSession, updateToken, getSession } from './session';

import { NextRequest } from 'next/server';
import { 
  InputSanitizer, 
  RateLimiter, 
  AuditLogger, 
  getClientIP
} from './security';

export async function signUp(value: SignUpFormValue, request?: NextRequest) {
  const { getConfigValue } = config;
  const { BASE_API_URL } = getConfigValue();
  
  // Sanitize inputs
  const sanitizedValue = {
    ...value,
    firstName: InputSanitizer.sanitizeString(value.firstName),
    middleName: value.middleName ? InputSanitizer.sanitizeString(value.middleName) : undefined,
    lastName: InputSanitizer.sanitizeString(value.lastName),
    email: InputSanitizer.sanitizeEmail(value.email),
  };

  // Validate email format
  if (!InputSanitizer.validateEmail(sanitizedValue.email)) {
    return {
      error: 'Invalid email format',
      status: 400,
    };
  }

  // Validate password strength
  const passwordValidation = InputSanitizer.validatePassword(value.password);
  if (!passwordValidation.valid) {
    return {
      error: passwordValidation.errors.join(', '),
      status: 400,
    };
  }

  const validationFields = signUpSchema.safeParse(sanitizedValue);

  if (!validationFields.success) {
    return {
      error: 'Validation failed',
      status: 400,
      details: validationFields.error,
    };
  }

  // Rate limiting
  if (request) {
    const clientIP = getClientIP(request);
    const rateLimitKey = `signup:${clientIP}`;
    
    if (RateLimiter.isRateLimited(rateLimitKey)) {
      AuditLogger.log({
        action: 'SIGNUP_RATE_LIMITED',
        resource: '/sign-up',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || 'unknown',
        success: false,
        details: { email: sanitizedValue.email }
      });

      return {
        error: 'Too many signup attempts. Please try again later.',
        status: 429,
      };
    }

    RateLimiter.recordAttempt(rateLimitKey);
  }

  try {
    const response = await axios.post(
      `${BASE_API_URL}/auth/register`,
      {
        firstName: sanitizedValue.firstName,
        middleName: sanitizedValue.middleName,
        lastName: sanitizedValue.lastName,
        email: sanitizedValue.email,
        password: value.password, // Don't sanitize password for API
        studentNumber: value.studentNumber,
        section: value.section,
      },
      {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success && response.data.statusCode === 201) {
      const { data } = response.data;
      
      // Create session with new structure
      await createSession({
        user: {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          firstName: data.user.firstName,
          middleName: data.user.middleName,
          lastName: data.user.lastName,
        },
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });

      // Log successful signup
      if (request) {
        AuditLogger.log({
          action: 'SIGNUP_SUCCESS',
          resource: '/sign-up',
          ip: getClientIP(request),
          userAgent: request.headers.get('user-agent') || 'unknown',
          success: true,
          details: { email: sanitizedValue.email }
        });
      }

      return {
        message: 'Registration successful',
        status: 201,
        redirect: '/dashboard',
        user: {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          firstName: data.user.firstName,
          middleName: data.user.middleName,
          lastName: data.user.lastName,
        },
      };
    }

    return {
      error: 'Registration failed',
      status: 400,
    };
  } catch (error) {
    console.error('Signup error:', error);
    
    // Log failed signup
    if (request) {
      AuditLogger.log({
        action: 'SIGNUP_FAILED',
        resource: '/sign-up',
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent') || 'unknown',
        success: false,
        details: { 
          email: sanitizedValue.email,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }

    return {
      error: 'Signup failed. Please try again.',
      status: 500,
    };
  }
}

export async function signIn(email: string, password: string, request?: NextRequest) {
  const { getConfigValue } = config;
  const { BASE_API_URL } = getConfigValue();
  
  // Sanitize email
  const sanitizedEmail = InputSanitizer.sanitizeEmail(email);
  
  // Validate email format
  if (!InputSanitizer.validateEmail(sanitizedEmail)) {
    return {
      message: 'Invalid email format',
      status: 400,
    };
  }

  const validateFields = signInSchema.safeParse({ email: sanitizedEmail, password });

  if (!validateFields.success) {
    return {
      message: 'Validation failed',
      status: 400,
      details: validateFields.error,
    };
  }

  // Rate limiting
  if (request) {
    const clientIP = getClientIP(request);
    const rateLimitKey = `signin:${clientIP}:${sanitizedEmail}`;
    
    if (RateLimiter.isRateLimited(rateLimitKey)) {
      AuditLogger.log({
        action: 'SIGNIN_RATE_LIMITED',
        resource: '/sign-in',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || 'unknown',
        success: false,
        details: { email: sanitizedEmail }
      });

      return {
        message: 'Too many login attempts. Please try again in 15 minutes.',
        status: 429,
      };
    }

    RateLimiter.recordAttempt(rateLimitKey);
  }

  try {
    const response = await axios.post(
      `${BASE_API_URL}/auth/login`,
      {
        email: sanitizedEmail,
        password,
      },
      {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 401) {
      // Log failed login attempt
      if (request) {
        AuditLogger.log({
          action: 'SIGNIN_FAILED',
          resource: '/sign-in',
          ip: getClientIP(request),
          userAgent: request.headers.get('user-agent') || 'unknown',
          success: false,
          details: { email: sanitizedEmail, reason: 'Invalid credentials' }
        });
      }

      return {
        message: 'Invalid Credentials!',
        status: 401,
      };
    }

    const res = response.data;
    
    console.log('Login response:', JSON.stringify(res, null, 2));
    
    if (res.success && (res.statusCode === 200 || res.statusCode === 201)) {
      const { data } = res;
      
      console.log('Creating session with user data:', {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        firstName: data.user.firstName,
      });
      
      // Create session with new structure
      try {
        await createSession({
          user: {
            id: data.user.id,
            email: data.user.email,
            role: data.user.role,
            firstName: data.user.firstName,
            middleName: data.user.middleName,
            lastName: data.user.lastName,
          },
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
        });
        
        console.log('Session created successfully');
      } catch (sessionError) {
        console.error('Failed to create session:', sessionError);
        return {
          message: 'Failed to create session',
          status: 500,
        };
      }

      // Log successful login
      if (request) {
        AuditLogger.log({
          action: 'SIGNIN_SUCCESS',
          resource: '/sign-in',
          ip: getClientIP(request),
          userAgent: request.headers.get('user-agent') || 'unknown',
          success: true,
          userId: data.user.id,
          details: { email: sanitizedEmail }
        });

        // Reset rate limiting on successful login
        const rateLimitKey = `signin:${getClientIP(request)}:${sanitizedEmail}`;
        RateLimiter.resetAttempts(rateLimitKey);
      }

      return {
        message: 'Login successful',
        status: 200,
        redirect: '/dashboard',
        user: {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          firstName: data.user.firstName,
          middleName: data.user.middleName,
          lastName: data.user.lastName,
        },
      };
    }

    return {
      message: 'Login failed',
      status: 400,
    };
  } catch (error) {
    console.error('Signin error:', error);
    
    // Log failed login attempt
    if (request) {
      AuditLogger.log({
        action: 'SIGNIN_FAILED',
        resource: '/sign-in',
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent') || 'unknown',
        success: false,
        details: { 
          email: sanitizedEmail,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }

    return {
      message: 'Login failed. Please try again.',
      status: 500,
    };
  }
}

export async function refreshToken(oldRefreshToken: string) {
  const { getConfigValue } = config;
  const { BASE_API_URL } = getConfigValue();

  try {
    const response = await axios.post(
      `${BASE_API_URL}/auth/refresh`,
      {
        refreshToken: oldRefreshToken,
      }
    );

    if (response.status === 401) {
      throw new Error('Invalid Refresh Token');
    }

    const { data } = response.data;
    const { accessToken, refreshToken: newRefreshToken } = data;

    // Update session with new tokens
    await updateToken({
      accessToken,
      refreshToken: newRefreshToken,
    });

    return accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw new Error('Failed to refresh token');
  }
}

export async function getCurrentUser() {
  const { getConfigValue } = config;
  const { BASE_API_URL } = getConfigValue();

  try {
    const session = await getSession();
    
    if (!session) {
      return null;
    }

    const response = await axios.get(
      `${BASE_API_URL}/auth/me`,
      {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
}
