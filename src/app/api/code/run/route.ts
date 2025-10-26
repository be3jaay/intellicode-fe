import { type NextRequest, NextResponse } from "next/server";

interface RunRequest {
  code: string;
  language: string;
}

interface RunResponse {
  output?: string;
  error?: string;
  success: boolean;
  time?: string;
  memory?: number;
}

const LANGUAGE_IDS: Record<string, number> = {
  javascript: 63,
  python: 71,
  c: 50,
  cpp: 54,
  java: 62,
  typescript: 74,
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<RunResponse>> {
  try {
    const { code, language }: RunRequest = await request.json();

    // Log the received code submission
    if (!code || !language) {
      return NextResponse.json(
        { error: "Missing code or language", success: false },
        { status: 400 }
      );
    }

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}`, success: false },
        { status: 400 }
      );
    }

    const submitResponse = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: code,
          stdin: "",
        }),
      }
    );

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      console.error(
        "Judge0 submission error:",
        submitResponse.status,
        errorText
      );
      return NextResponse.json(
        { error: "Failed to submit code for execution", success: false },
        { status: 500 }
      );
    }

    const result = await submitResponse.json();

    if (result.status.id === 3) {
      // Accepted
      const output = result.stdout || "";
      return NextResponse.json({
        output: output.trim(),
        success: true,
        time: result.time,
        memory: result.memory,
      });
    } else if (result.status.id === 4) {
      // Wrong Answer
      const output = result.stdout || "";
      return NextResponse.json({
        output: output.trim(),
        success: true,
        time: result.time,
        memory: result.memory,
      });
    } else if (result.status.id === 5) {
      // Time Limit Exceeded
      return NextResponse.json({
        error: "Time Limit Exceeded",
        success: false,
      });
    } else if (result.status.id === 6) {
      // Compilation Error
      return NextResponse.json({
        error: result.compile_output || "Compilation Error",
        success: false,
      });
    } else if (
      result.status.id === 7 ||
      result.status.id === 8 ||
      result.status.id === 9 ||
      result.status.id === 10 ||
      result.status.id === 11 ||
      result.status.id === 12
    ) {
      // Runtime Error and other runtime issues
      return NextResponse.json({
        error: result.stderr || result.message || "Runtime Error",
        success: false,
      });
    } else {
      return NextResponse.json({
        error: `Execution failed: ${result.status.description}`,
        success: false,
      });
    }
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      {
        error: `Server error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
        success: false,
      },
      { status: 500 }
    );
  }
}
