import config from "@/config";

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
        console.error("Failed to get access token:", error);
        return null;
      } finally {
        this.tokenPromise = null;
      }
    })();

    return this.tokenPromise;
  }

  private async refreshAccessToken(): Promise<boolean> {
    // If a refresh is already in progress, wait for it
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
          // Clear the cached token so next request fetches the new one
          this.clearToken();
          return true;
        }
        return false;
      } catch (error) {
        console.error("Failed to refresh token:", error);
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
    // Use relative URLs for server-side routes, absolute for direct backend calls
    const url = endpoint.startsWith("/api/")
      ? endpoint
      : `${this.getBaseURL()}${endpoint}`;

    const defaultHeaders: Record<string, string> = {};

    // Check if body is FormData
    const isFormData = options.body instanceof FormData;

    // Only set Content-Type if NOT FormData (browser will set it with boundary)
    if (!isFormData) {
      const existingHeaders = options.headers as
        | Record<string, string>
        | undefined;
      if (!existingHeaders || !("Content-Type" in existingHeaders)) {
        defaultHeaders["Content-Type"] = "application/json";
      }
    }

    // Add Authorization header for backend API calls (not for Next.js API routes)
    if (!endpoint.startsWith("/api/")) {
      const token = await this.getAccessToken();
      if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    // Debug logging in development
    if (process.env.NODE_ENV === "development" && isFormData) {
      console.log("📤 Sending FormData request:", {
        url,
        method: options.method,
        hasAuthorization: !!defaultHeaders["Authorization"],
        headers: Object.keys(defaultHeaders),
      });
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: "include",
    });

    // Handle 401 Unauthorized - try to refresh token and retry once
    if (response.status === 401 && !isRetry && !endpoint.startsWith("/api/")) {
      console.log("🔄 Token expired, attempting to refresh...");

      const refreshed = await this.refreshAccessToken();

      if (refreshed) {
        console.log("✅ Token refreshed successfully, retrying request...");
        // Retry the request with the new token
        return this.request<T>(endpoint, options, true);
      } else {
        console.error("❌ Token refresh failed, redirecting to login...");
        // Clear token and redirect to login
        this.clearToken();
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
        throw new Error("Session expired. Please login again.");
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    // Return the response directly since the backend returns the data directly
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
