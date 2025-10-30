import { apiClient } from "../api-client";

export interface DownloadCertificateParams {
  studentName: string;
  studentNumber: string;
  courseName: string;
  referenceCode: string;
  issuedAt: string;
}

class CertificateService {
  /**
   * Download certificate PDF from backend
   * This method handles blob response for file downloads
   */
  public static async downloadCertificatePDF(
    params: DownloadCertificateParams
  ): Promise<Blob> {
    try {
      // Get the base URL
      let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 
                    process.env.NEXT_LOCAL_API_BASE_URL || 
                    "http://localhost:8000";
      baseURL = baseURL.replace(/\/+$/, '');

      // Get auth token
      const tokenResponse = await fetch("/api/auth/token", {
        credentials: "include",
      });

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (tokenResponse.ok) {
        const tokenData = await tokenResponse.json();
        if (tokenData.access_token) {
          headers["Authorization"] = `Bearer ${tokenData.access_token}`;
        }
      }

      const response = await fetch(`${baseURL}/course/certificates/pdf`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(params),
      });

      if (response.status === 400) {
        let errorMsg = "Invalid request data.";
        try {
          const errorJson = await response.json();
          errorMsg = errorJson.message || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      if (response.status === 401) {
        // Try to refresh token
        const refreshResponse = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (refreshResponse.ok) {
          // Retry with new token
          const newTokenResponse = await fetch("/api/auth/token", {
            credentials: "include",
          });

          if (newTokenResponse.ok) {
            const newTokenData = await newTokenResponse.json();
            headers["Authorization"] = `Bearer ${newTokenData.access_token}`;

            const retryResponse = await fetch(`${baseURL}/course/certificates/pdf`, {
              method: "POST",
              headers,
              credentials: "include",
              body: JSON.stringify(params),
            });

            if (!retryResponse.ok) {
              throw new Error(`Failed to fetch certificate PDF. Status: ${retryResponse.status}`);
            }

            return await retryResponse.blob();
          }
        }

        // If refresh failed, redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch certificate PDF. Status: ${response.status}`);
      }

      return await response.blob();
    } catch (error: any) {
      console.error("Certificate download error:", error);
      throw error;
    }
  }

  /**
   * Trigger browser download for a blob
   */
  public static triggerBlobDownload(
    blob: Blob,
    filename: string = "certificate.pdf"
  ): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
  }

  /**
   * Download certificate PDF and trigger browser download
   */
  public static async downloadAndSaveCertificate(
    params: DownloadCertificateParams,
    filename?: string
  ): Promise<void> {
    const blob = await this.downloadCertificatePDF(params);
    
    const finalFilename = filename || "certificate.pdf";
    
    this.triggerBlobDownload(blob, finalFilename);
  }
}

export default CertificateService;
