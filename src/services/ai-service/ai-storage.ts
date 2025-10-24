import { AIAnalysisResult } from "./ai-types";

/**
 * AI Analysis Storage Service
 * Handles persistence of AI analysis results in localStorage
 * Single Responsibility: Storage operations only
 */

const AI_STORAGE_PREFIX = "ai-analysis:";

export class AIAnalysisStorage {
  /**
   * Generate storage key for a submission
   */
  private static getStorageKey(submissionId: string): string {
    return `${AI_STORAGE_PREFIX}${submissionId}`;
  }

  /**
   * Load AI analysis result from localStorage
   */
  public static load(submissionId: string): AIAnalysisResult | null {
    try {
      const stored = localStorage.getItem(this.getStorageKey(submissionId));
      if (!stored) return null;
      return JSON.parse(stored) as AIAnalysisResult;
    } catch (error) {
      console.error("Failed to load AI analysis from storage:", error);
      return null;
    }
  }

  /**
   * Save AI analysis result to localStorage
   */
  public static save(
    submissionId: string,
    result: AIAnalysisResult
  ): boolean {
    try {
      localStorage.setItem(
        this.getStorageKey(submissionId),
        JSON.stringify(result)
      );
      return true;
    } catch (error) {
      console.error("Failed to save AI analysis to storage:", error);
      return false;
    }
  }

  /**
   * Clear AI analysis result from localStorage
   */
  public static clear(submissionId: string): boolean {
    try {
      localStorage.removeItem(this.getStorageKey(submissionId));
      return true;
    } catch (error) {
      console.error("Failed to clear AI analysis from storage:", error);
      return false;
    }
  }

  /**
   * Check if AI analysis exists for a submission
   */
  public static exists(submissionId: string): boolean {
    return localStorage.getItem(this.getStorageKey(submissionId)) !== null;
  }
}
