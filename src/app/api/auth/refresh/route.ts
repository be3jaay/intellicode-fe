import { getSession, updateToken } from "@/utils/session";
import { NextResponse } from "next/server";
import config from "@/config";
import axios from "axios";

export async function POST() {
  try {
    const session = await getSession();

    if (!session || !session.refresh_token) {
      return NextResponse.json(
        { error: "No refresh token available" },
        { status: 401 }
      );
    }

    const { getConfigValue } = config;
    const { BASE_API_URL } = getConfigValue();

    console.log("🔄 Calling backend refresh endpoint...");

    // Call the backend refresh endpoint
    const response = await axios.post(`${BASE_API_URL}/auth/refresh`, {
      refreshToken: session.refresh_token,
    });

    console.log("📥 Backend refresh response:", {
      status: response.status,
      success: response.data?.success,
      hasData: !!response.data?.data,
    });

    if (
      (response.status === 200 || response.status === 201) &&
      response.data.success
    ) {
      const { data } = response.data;
      const { accessToken, refreshToken: newRefreshToken } = data;

      console.log("✅ Updating session with new tokens...", {
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!newRefreshToken,
        accessTokenLength: accessToken?.length,
      });

      // Update session with new tokens
      await updateToken({
        accessToken,
        refreshToken: newRefreshToken,
      });

      console.log("✅ Session updated successfully");

      return NextResponse.json({
        success: true,
        access_token: accessToken,
      });
    }

    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Token refresh error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: error.response.data?.message || "Token refresh failed" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
