import { getSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      user: session.user,
      authenticated: true,
    });
  } catch (error) {
    console.error("=== Error in /api/auth/me ===");
    console.error("Error details:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
