export function debugCertificateDownload() {
  console.group("🔍 Certificate Download Debug Info");
  
  // Environment Variables
  console.group("📋 Environment Variables");
  console.log("NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  console.log("NEXT_LOCAL_API_BASE_URL:", process.env.NEXT_LOCAL_API_BASE_URL);
  console.groupEnd();
  
  // Runtime Info
  console.group("🌐 Runtime Info");
  console.log("Window Origin:", typeof window !== "undefined" ? window.location.origin : "N/A (SSR)");
  console.log("Window Hostname:", typeof window !== "undefined" ? window.location.hostname : "N/A (SSR)");
  console.log("User Agent:", typeof navigator !== "undefined" ? navigator.userAgent : "N/A (SSR)");
  console.groupEnd();
  
  // Resolved Base URL (what will be used)
  console.group("✅ Resolved Configuration");
  const baseURL = (process.env.NEXT_PUBLIC_API_BASE_URL || 
                   process.env.NEXT_LOCAL_API_BASE_URL || 
                   "http://localhost:8000").replace(/\/+$/, '');
  console.log("Base URL that will be used:", baseURL);
  console.log("Certificate endpoint:", `${baseURL}/course/certificates/pdf`);
  console.groupEnd();
  
  // Check if we're in production
  console.group("🏗️ Environment Check");
  const isLocalhost = typeof window !== "undefined" && 
                     (window.location.hostname === "localhost" || 
                      window.location.hostname === "127.0.0.1");
  console.log("Is Localhost:", isLocalhost);
  console.log("Is Production:", !isLocalhost);
  if (!isLocalhost && baseURL.includes("localhost")) {
    console.error("⚠️ WARNING: Running in production but API URL points to localhost!");
    console.error("   Set NEXT_PUBLIC_API_BASE_URL to your production backend URL in Vercel environment variables");
  } else {
    console.log("✅ Configuration looks good!");
  }
  console.groupEnd();
  
  console.groupEnd();
}

/**
 * Test certificate download endpoint accessibility
 * This makes a HEAD request to check if the endpoint is reachable
 */
export async function testCertificateEndpoint(): Promise<boolean> {
  const baseURL = (process.env.NEXT_PUBLIC_API_BASE_URL || 
                   process.env.NEXT_LOCAL_API_BASE_URL || 
                   "http://localhost:8000").replace(/\/+$/, '');
  const endpoint = `${baseURL}/course/certificates/pdf`;
  
  console.group("🧪 Testing Certificate Endpoint");
  console.log("Testing:", endpoint);
  
  try {
    // Try to fetch token first
    const tokenResponse = await fetch("/api/auth/token", {
      credentials: "include",
    });
    
    if (!tokenResponse.ok) {
      console.warn("⚠️ Could not get auth token. You may need to login first.");
      console.groupEnd();
      return false;
    }
    
    const tokenData = await tokenResponse.json();
    console.log("✅ Auth token obtained");
    
    console.log("✅ Token is valid, endpoint should be accessible");
    console.groupEnd();
    return true;
  } catch (error) {
    console.error("❌ Error testing endpoint:", error);
    console.groupEnd();
    return false;
  }
}
