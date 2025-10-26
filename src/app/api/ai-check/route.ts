import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

interface AICheckRequest {
  description: string;
  code: string;
  maxScore: number;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}

function buildPrompt(description: string, code: string): string {
  return `System Role: You are a deterministic AI code evaluator. Your goal is to be 100% consistent and objective.

Task: You must grade the code based on the three criteria in the scoring rubric below. Your evaluation must be based only on the provided description and code. You must follow the scoring rubric exactly as written.

Input 1: Exercise Description
${description || "No description provided"}

Input 2: Student Code Submission
\`\`\`
${code}
\`\`\`

--- SCORING RUBRIC (Internal Use Only) ---

You will evaluate the code on three weighted criteria:

1. **Correctness & Functionality (50%)** — Does the code solve the problem as described?
   - Full points: Code produces correct output for all test cases (or clearly would, if run)
   - Partial: Code has minor logical errors or edge-case bugs
   - Low: Code does not compile, crashes, or produces mostly incorrect output

2. **Code Quality & Style (30%)** — Is the code readable, well-structured, and maintainable?
   - Full points: Proper naming, indentation, comments where needed, good structure
   - Partial: Some readability issues (e.g., unclear variable names, missing comments)
   - Low: Very poor structure, hard to follow, or no organization

3. **Efficiency & Best Practices (20%)** — Does the code follow language best practices and avoid obvious inefficiencies?
   - Full points: Uses appropriate algorithms/data structures, no redundant logic
   - Partial: Works but uses suboptimal approach (e.g., nested loops where a map could work)
   - Low: Severely inefficient or uses bad practices (e.g., global state abuse, memory leaks)

--- SCORING SCALE ---
- 90-100: Excellent work, meets all or nearly all criteria with minor or no issues
- 75-89: Good work, meets most criteria with some room for improvement
- 60-74: Acceptable, but has notable gaps in correctness, quality, or efficiency
- 40-59: Needs significant improvement; major issues in one or more areas
- 0-39: Incomplete, non-functional, or does not address the problem

--- YOUR ANALYSIS OUTPUT FORMAT ---

Return your analysis in the following markdown structure:

**Code Quality Assessment:**

[2-3 sentence summary of overall quality and how well it addresses the exercise]

**Strengths:**
- [List specific positive aspects with examples from the code]

**Areas for Improvement:**
- [List specific issues with suggestions for improvement]

**Detailed Scoring:**

1. **Correctness & Functionality (50%):** [Score]/50
   - [Brief justification]

2. **Code Quality & Style (30%):** [Score]/30
   - [Brief justification]

3. **Efficiency & Best Practices (20%):** [Score]/20
   - [Brief justification]

**Final Score:** [Total]/100

---

Important output constraint:
- Return a single JSON object with this exact shape and no extra text:
{
  "finalScore": <0-100 integer>,
  "feedbackMarkdown": "<the entire 'YOUR ANALYSIS' section in the specified format, escaped for JSON>"
}

Do not include any text outside the JSON object. Do not wrap it in markdown code blocks.`;
}

function extractJSON(
  text: string
): { finalScore: number; feedbackMarkdown: string } | null {
  try {
    // Try direct parse first
    const parsed = JSON.parse(text);
    if (
      parsed.finalScore !== undefined &&
      parsed.feedbackMarkdown !== undefined
    ) {
      return parsed;
    }
  } catch {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (
          parsed.finalScore !== undefined &&
          parsed.feedbackMarkdown !== undefined
        ) {
          return parsed;
        }
      } catch {
        // Continue to regex fallback
      }
    }

    // Try to find JSON object in text
    const objectMatch = text.match(
      /\{[\s\S]*"finalScore"[\s\S]*"feedbackMarkdown"[\s\S]*\}/
    );
    if (objectMatch) {
      try {
        const parsed = JSON.parse(objectMatch[0]);
        if (
          parsed.finalScore !== undefined &&
          parsed.feedbackMarkdown !== undefined
        ) {
          return parsed;
        }
      } catch {
        // Continue to return null
      }
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        {
          error:
            "AI service is not configured. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    const body: AICheckRequest = await request.json();
    const { description, code, maxScore } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Invalid request: 'code' is required and must be a string" },
        { status: 400 }
      );
    }

    if (!maxScore || typeof maxScore !== "number" || maxScore <= 0) {
      return NextResponse.json(
        {
          error:
            "Invalid request: 'maxScore' is required and must be a positive number",
        },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(description || "", code);

    const geminiResponse = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error response:", {
        status: geminiResponse.status,
        statusText: geminiResponse.statusText,
        body: errorText,
      });
      return NextResponse.json(
        { error: "AI service request failed. Please try again later." },
        { status: 500 }
      );
    }

    const geminiData: GeminiResponse = await geminiResponse.json();

    if (geminiData.error) {
      console.error("Gemini API error:", geminiData.error.message);
      return NextResponse.json(
        { error: "AI analysis failed. Please try again." },
        { status: 500 }
      );
    }

    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      console.error("No response text from Gemini");
      return NextResponse.json(
        { error: "AI service returned an invalid response" },
        { status: 500 }
      );
    }

    const extracted = extractJSON(responseText);

    if (!extracted) {
      console.error(
        "Failed to extract JSON from Gemini response:",
        responseText
      );

      const retryPrompt = `${prompt}

CRITICAL: Your previous response was not valid JSON. You MUST return ONLY a JSON object with no additional text, markdown formatting, or code blocks. Return this exact structure:
{"finalScore": <number 0-100>, "feedbackMarkdown": "<your analysis as markdown string>"}`;

      const retryResponse = await fetch(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: retryPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              topK: 20,
              topP: 0.9,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (retryResponse.ok) {
        const retryData: GeminiResponse = await retryResponse.json();
        const retryText = retryData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (retryText) {
          const retryExtracted = extractJSON(retryText);
          if (retryExtracted) {
            const scaledScore = Math.round(
              (Math.max(0, Math.min(100, retryExtracted.finalScore)) *
                maxScore) /
                100
            );
            return NextResponse.json({
              finalScore: retryExtracted.finalScore,
              scaledScore,
              feedbackMarkdown: retryExtracted.feedbackMarkdown,
            });
          }
        }
      }

      return NextResponse.json(
        { error: "AI service returned an invalid format. Please try again." },
        { status: 500 }
      );
    }

    const scaledScore = Math.round(
      (Math.max(0, Math.min(100, extracted.finalScore)) * maxScore) / 100
    );

    return NextResponse.json({
      finalScore: extracted.finalScore,
      scaledScore,
      feedbackMarkdown: extracted.feedbackMarkdown,
    });
  } catch (error) {
    console.error("Unexpected error in /api/ai-check:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
