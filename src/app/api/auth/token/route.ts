import { getSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("📍 Token endpoint called");
    const session = await getSession();

    console.log("📦 Session retrieved:", {
      hasSession: !!session,
      hasAccessToken: !!session?.access_token,
      accessTokenLength: session?.access_token?.length,
      accessTokenPreview: session?.access_token?.substring(0, 20) + "...",
    });

    if (!session || !session.access_token) {
      console.error("❌ No session or access token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("✅ Returning access token");
    return NextResponse.json({
      access_token: session.access_token,
    });
  } catch (error) {
    console.error("Error getting access token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
