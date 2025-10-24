import {
  AIAnalysisRequest,
  AIAnalysisResponse,
  AIAnalysisResult,
} from "./ai-types";

export class AICodeAnalysisService {
  public static async analyze(
    request: AIAnalysisRequest
  ): Promise<AIAnalysisResult> {
    try {
      const response = await fetch("/api/ai-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: request.description || "",
          code: request.code,
          maxScore: request.maxScore,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `AI analysis failed with status ${response.status}`);
      }

      const data = await response.json();

      return {
        score: data.scaledScore || 0,
        feedback: data.feedbackMarkdown || "No feedback available",
        analyzedAt: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error("AI analysis error:", error);
      throw new Error(error.message || "Failed to analyze code. Please try again.");
    }
  }

  public static clampScore(score: number, min: number, max: number): number {
    return Math.min(Math.max(score, min), max);
  }
}
