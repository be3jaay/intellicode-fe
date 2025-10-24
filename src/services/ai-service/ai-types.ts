/**
 * AI Analysis Types
 * Type definitions for AI code analysis feature
 */

export interface AIAnalysisResult {
  score: number;
  feedback: string;
  analyzedAt: string;
}

export type AIStatus = "idle" | "loading" | "ready";

export interface AIAnalysisRequest {
  submissionId: string;
  code: string;
  language?: string;
  maxScore: number;
}

export interface AIAnalysisResponse {
  score: number;
  feedback: string;
}
