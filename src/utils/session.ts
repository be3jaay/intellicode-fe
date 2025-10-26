import "server-only";
import { SignJWT, jwtVerify } from "jose";
import config from "@/config";
import { SessionPayload } from "@/types/auth.type";
import { cookies } from "next/headers";

const { getConfigValue } = config;
const { SECRET_KEY } = getConfigValue();
const encodedKey = new TextEncoder().encode(SECRET_KEY);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session", error);
  }
}

export async function createSession(payload: SessionPayload) {
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);

    const cookieStore = await cookies();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax" as const,
      path: "/",
    };

    cookieStore.set("session", session, cookieOptions);
    // Verify the cookie was set
    const verifyCookie = cookieStore.get("session");

    if (!verifyCookie) {
      console.error("WARNING: Cookie was not found after setting!");
    }
  } catch (error) {
    console.error("=== createSession ERROR ===");
    console.error("Error details:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    throw error;
  }
}

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as SessionPayload;
  } catch (error) {
    console.error("Failed to verify session", error);
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateToken({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    console.error("❌ No session found in cookies");
    return null;
  }

  const { payload } = await jwtVerify<SessionPayload>(session, encodedKey);

  if (!payload) {
    console.error("❌ Session payload not found");
    throw new Error("Session not found!");
  }

  const newPayload: SessionPayload = {
    user: {
      ...payload.user,
    },
    access_token: accessToken,
    refresh_token: refreshToken,
  };

  await createSession(newPayload);
}
