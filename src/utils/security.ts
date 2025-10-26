import { NextRequest } from "next/server";

// Rate Limiting
export class RateLimiter {
  private static readonly store = new Map<
    string,
    { count: number; resetTime: number }
  >();
  private static readonly WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  private static readonly MAX_ATTEMPTS = 5;

  public static isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const record = this.store.get(identifier);

    if (!record) return false;

    // Reset if window has passed
    if (now > record.resetTime) {
      this.store.delete(identifier);
      return false;
    }

    return record.count >= this.MAX_ATTEMPTS;
  }

  public static recordAttempt(identifier: string): void {
    const now = Date.now();
    const record = this.store.get(identifier);

    if (!record) {
      this.store.set(identifier, { count: 1, resetTime: now + this.WINDOW_MS });
    } else {
      record.count++;
    }
  }

  public static resetAttempts(identifier: string): void {
    this.store.delete(identifier);
  }

  public static getRemainingAttempts(identifier: string): number {
    const record = this.store.get(identifier);
    if (!record) return this.MAX_ATTEMPTS;
    return Math.max(0, this.MAX_ATTEMPTS - record.count);
  }

  public static getResetTime(identifier: string): number | null {
    const record = this.store.get(identifier);
    return record ? record.resetTime : null;
  }
}

// Input Sanitization
export class InputSanitizer {
  public static sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, "") // Remove potential HTML tags
      .replace(/javascript:/gi, "") // Remove javascript: protocol
      .replace(/on\w+=/gi, "") // Remove event handlers
      .substring(0, 1000); // Limit length
  }

  public static sanitizeEmail(email: string): string {
    return email.toLowerCase().trim().substring(0, 254);
  }

  public static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  public static validatePassword(password: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (password.length > 128) {
      errors.push("Password must be less than 128 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    // Check for common passwords
    const commonPasswords = [
      "password",
      "123456",
      "123456789",
      "qwerty",
      "abc123",
      "password123",
      "admin",
      "letmein",
      "welcome",
      "monkey",
    ];

    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push("Password is too common");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// Security Headers
export function getSecurityHeaders(): Record<string, string> {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  };
}

// IP Address utilities
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(",")[0].trim();

  // Note: request.ip is not available in Edge Runtime
  return "unknown";
}

// Session Security
export class SessionSecurity {
  public static async generateSessionId(): Promise<string> {
    // Use Web Crypto API for Edge Runtime compatibility
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  }

  public static validateSessionId(sessionId: string): boolean {
    return /^[a-f0-9]{64}$/.test(sessionId);
  }

  public static async hashSessionId(sessionId: string): Promise<string> {
    // Use Web Crypto API for Edge Runtime compatibility
    const encoder = new TextEncoder();
    const data = encoder.encode(sessionId);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
}

// Audit Logging
export interface AuditLogEntry {
  timestamp: number;
  userId?: string;
  action: string;
  resource: string;
  ip: string;
  userAgent: string;
  success: boolean;
  details?: Record<string, any>;
}

export class AuditLogger {
  private static logs: AuditLogEntry[] = [];

  public static log(entry: Omit<AuditLogEntry, "timestamp">): void {
    const logEntry: AuditLogEntry = {
      ...entry,
      timestamp: Date.now(),
    };

    this.logs.push(logEntry);

    // In production, send to external logging service
  }

  public static getLogs(userId?: string, limit = 100): AuditLogEntry[] {
    let filteredLogs = this.logs;

    if (userId) {
      filteredLogs = this.logs.filter((log) => log.userId === userId);
    }

    return filteredLogs
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }
}
