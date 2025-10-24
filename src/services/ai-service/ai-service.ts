import {
  AIAnalysisRequest,
  AIAnalysisResponse,
  AIAnalysisResult,
} from "./ai-types";

/**
 * AI Code Analysis Service
 * Handles AI analysis of code submissions
 * Single Responsibility: AI analysis business logic
 */

export class AICodeAnalysisService {
  /**
   * Analyze code submission with AI
   * TODO: Replace mock implementation with actual API call
   * Expected API endpoint: POST /api/ai/analyze-submission
   * Expected payload: { submission_id: string, code: string, language: string, max_score: number }
   * Expected response: { score: number, feedback: string }
   */
  public static async analyze(
    request: AIAnalysisRequest
  ): Promise<AIAnalysisResult> {
    // TODO: Replace with actual API call
    // Example:
    // const response = await fetch('/api/ai/analyze-submission', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     submission_id: request.submissionId,
    //     code: request.code,
    //     language: request.language,
    //     max_score: request.maxScore
    //   })
    // });
    // if (!response.ok) throw new Error('AI analysis failed');
    // const data = await response.json();
    // return {
    //   score: data.score,
    //   feedback: data.feedback,
    //   analyzedAt: new Date().toISOString()
    // };

    const result = await this.analyzeMock(request);

    return {
      score: result.score,
      feedback: result.feedback,
      analyzedAt: new Date().toISOString(),
    };
  }

  /**
   * Mock AI analysis implementation
   * Simulates backend analysis with deterministic heuristics
   * This method should be removed when real API is integrated
   */
  private static async analyzeMock(
    request: AIAnalysisRequest
  ): Promise<AIAnalysisResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { code, maxScore } = request;

    // Handle empty code
    if (!code.trim()) {
      return {
        score: 0,
        feedback:
          "No code was submitted. Please ensure the student has provided a solution.",
      };
    }

    // Analyze code characteristics
    const codeLength = code.trim().length;
    const hasComments = /\/\/|\/\*|\#/.test(code);
    const hasFunctions = /function|def|const.*=>|=>/.test(code);
    const hasLoops = /for|while|map|filter|reduce/.test(code);
    const hasConditionals = /if|switch|case|\?/.test(code);

    // Calculate score based on heuristics
    const score = this.calculateScore({
      codeLength,
      hasComments,
      hasFunctions,
      hasLoops,
      hasConditionals,
      maxScore,
    });

    // Generate feedback
    const feedback = this.generateFeedback({
      codeLength,
      hasComments,
      hasFunctions,
      hasLoops,
      hasConditionals,
      score,
      maxScore,
    });

    return { score, feedback };
  }

  /**
   * Calculate score based on code characteristics
   */
  private static calculateScore(params: {
    codeLength: number;
    hasComments: boolean;
    hasFunctions: boolean;
    hasLoops: boolean;
    hasConditionals: boolean;
    maxScore: number;
  }): number {
    const { codeLength, hasComments, hasFunctions, hasLoops, hasConditionals, maxScore } = params;

    let baseScore = Math.min(maxScore * 0.6, maxScore);

    if (codeLength > 50) baseScore += maxScore * 0.1;
    if (hasComments) baseScore += maxScore * 0.05;
    if (hasFunctions) baseScore += maxScore * 0.1;
    if (hasLoops) baseScore += maxScore * 0.075;
    if (hasConditionals) baseScore += maxScore * 0.075;

    return Math.min(Math.max(Math.round(baseScore), 0), maxScore);
  }

  /**
   * Generate feedback based on code analysis
   */
  private static generateFeedback(params: {
    codeLength: number;
    hasComments: boolean;
    hasFunctions: boolean;
    hasLoops: boolean;
    hasConditionals: boolean;
    score: number;
    maxScore: number;
  }): string {
    const { codeLength, hasComments, hasFunctions, hasLoops, hasConditionals, score, maxScore } = params;

    const feedbackParts: string[] = [];

    // Quality assessment
    const qualityLevel =
      score >= maxScore * 0.8
        ? "excellent"
        : score >= maxScore * 0.6
        ? "good"
        : "basic";

    feedbackParts.push(
      `**Code Quality Assessment:**\n\nThe submission demonstrates ${qualityLevel} understanding of the assignment requirements.`
    );

    // Positive feedback
    if (hasFunctions) {
      feedbackParts.push(
        "\n✓ Good use of functions/methods for code organization."
      );
    }

    if (hasComments) {
      feedbackParts.push("\n✓ Code includes helpful comments for clarity.");
    }

    if (hasLoops && hasConditionals) {
      feedbackParts.push(
        "\n✓ Proper use of control structures (loops and conditionals)."
      );
    }

    // Areas for improvement
    if (codeLength < 50) {
      feedbackParts.push(
        "\n⚠ The solution appears quite brief. Consider whether all requirements are addressed."
      );
    }

    if (!hasComments) {
      feedbackParts.push(
        "\n⚠ Adding comments would improve code readability and maintainability."
      );
    }

    // Summary
    feedbackParts.push(
      `\n\n**Suggested Score:** ${score}/${maxScore}\n\n*Note: This is an AI-generated assessment. Please review the code manually and adjust the score and feedback as needed.*`
    );

    return feedbackParts.join("");
  }

  /**
   * Clamp score to valid range
   */
  public static clampScore(score: number, min: number, max: number): number {
    return Math.min(Math.max(score, min), max);
  }
}
