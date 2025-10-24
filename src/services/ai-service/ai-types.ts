export interface AIAnalysisResult {
  score: number;
  feedback: string;
  analyzedAt: string;
}

export type AIStatus = "idle" | "loading" | "ready" | "error";

export interface AIAnalysisRequest {
  submissionId: string;
  code: string;
  description?: string;
  language?: string;
  maxScore: number;
}

export interface AIAnalysisResponse {
  score: number;
  feedback: string;
}
