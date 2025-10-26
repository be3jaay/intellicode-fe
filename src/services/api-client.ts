import config from "@/config";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/", "/code-sandbox"];

class ApiClient {
  private accessToken: string | null = null;
  private tokenPromise: Promise<string | null> | null = null;
  private refreshPromise: Promise<boolean> | null = null;

  private async getAccessToken(): Promise<string | null> {
    // If we already have a token, return it
    if (this.accessToken) {
      return this.accessToken;
    }

    // If a token fetch is in progress, wait for it
    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    // Fetch the token
    this.tokenPromise = (async () => {
      try {
        const response = await fetch("/api/auth/token", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          this.accessToken = data.access_token;
          return this.accessToken;
        }
        return null;
      } catch (error) {
        // Only log error if not on a public route
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);
          if (!isPublicRoute) {
            console.error("Failed to get access token:", error);
          }
        }
        return null;
      } finally {
        this.tokenPromise = null;
      }
    })();

    return this.tokenPromise;
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          await response.json();
          this.clearToken();
          await this.getAccessToken();
          return true;
        }

        // Only log error if not on a public route
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);
          if (!isPublicRoute) {
            console.error(
              "❌ Token refresh failed with status:",
              response.status
            );
          }
        }
        return false;
      } catch (error) {
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);
          if (!isPublicRoute) {
            console.error("Failed to refresh token:", error);
          }
        }
        return false;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  public clearToken() {
    this.accessToken = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    isRetry: boolean = false
  ): Promise<T> {
    const url = endpoint.startsWith("/api/")
      ? endpoint
      : `${this.getBaseURL()}${endpoint}`;

    const defaultHeaders: Record<string, string> = {};

    const isFormData = options.body instanceof FormData;

    if (!isFormData) {
      const existingHeaders = options.headers as
        | Record<string, string>
        | undefined;
      if (!existingHeaders || !("Content-Type" in existingHeaders)) {
        defaultHeaders["Content-Type"] = "application/json";
      }
    }

    if (!endpoint.startsWith("/api/")) {
      const token = await this.getAccessToken();
      if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: "include",
    });

    if (response.status === 401 && !isRetry && !endpoint.startsWith("/api/")) {
      const refreshed = await this.refreshAccessToken();

      if (refreshed) {
        return this.request<T>(endpoint, options, true);
      } else {
        this.clearToken();

        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);

          if (!isPublicRoute) {
            console.error("Session expired, redirecting to login...");
            window.location.href = "/sign-in";
          }
        }

        // Throw error to stop execution (but only log if not on public route)
        const error = new Error("Session expired. Please login again.");
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);
          if (isPublicRoute) {
            // Silently fail on public routes
            throw error;
          }
        }
        throw error;
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  }

  private getBaseURL(): string {
    const configValue = config.getConfigValue();
    return configValue.BASE_API_URL || "http://localhost:8000";
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    const isFormData = data instanceof FormData;

    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    const isFormData = data instanceof FormData;

    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
