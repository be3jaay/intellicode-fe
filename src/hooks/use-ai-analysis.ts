import { useState, useEffect, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import {
  AICodeAnalysisService,
  AIAnalysisStorage,
  AIAnalysisResult,
  AIStatus,
} from "@/services/ai-service";

interface UseAIAnalysisProps {
  submissionId: string;
  code: string;
  language?: string;
  maxScore: number;
  onScoreChange?: (score: number) => void;
  onFeedbackChange?: (feedback: string) => void;
}

interface UseAIAnalysisReturn {
  aiStatus: AIStatus;
  aiResult: AIAnalysisResult | null;
  runAnalysis: () => Promise<void>;
  clearAnalysis: () => void;
  isAnalyzing: boolean;
  hasAnalysis: boolean;
}

export function useAIAnalysis({
  submissionId,
  code,
  language,
  maxScore,
  onScoreChange,
  onFeedbackChange,
}: UseAIAnalysisProps): UseAIAnalysisReturn {
  const [aiStatus, setAiStatus] = useState<AIStatus>("idle");
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);

  // Load saved analysis on mount or when submission changes
  useEffect(() => {
    const savedAnalysis = AIAnalysisStorage.load(submissionId);
    if (savedAnalysis) {
      setAiResult(savedAnalysis);
      setAiStatus("ready");
    } else {
      setAiResult(null);
      setAiStatus("idle");
    }
  }, [submissionId]);

  // Save analysis result when it changes
  useEffect(() => {
    if (aiResult && submissionId) {
      AIAnalysisStorage.save(submissionId, aiResult);
    }
  }, [aiResult, submissionId]);

  /**
   * Run AI analysis
   */
  const runAnalysis = useCallback(async () => {
    try {
      setAiStatus("loading");

      const result = await AICodeAnalysisService.analyze({
        submissionId,
        code,
        language,
        maxScore,
      });

      // Clamp score to valid range
      const clampedScore = AICodeAnalysisService.clampScore(
        result.score,
        0,
        maxScore
      );

      const finalResult: AIAnalysisResult = {
        ...result,
        score: clampedScore,
      };

      setAiResult(finalResult);
      setAiStatus("ready");

      // Notify parent components of changes
      if (onScoreChange) {
        onScoreChange(clampedScore);
      }
      if (onFeedbackChange) {
        onFeedbackChange(result.feedback);
      }

      notifications.show({
        title: "AI Analysis Complete",
        message: "Review the AI suggestions and adjust as needed",
        color: "green",
        autoClose: 3000,
      });
    } catch (error: any) {
      setAiStatus("idle");
      notifications.show({
        title: "Analysis Failed",
        message: error.message || "Failed to analyze submission",
        color: "red",
        autoClose: 3000,
      });
      throw error;
    }
  }, [submissionId, code, language, maxScore, onScoreChange, onFeedbackChange]);

  /**
   * Clear analysis result
   */
  const clearAnalysis = useCallback(() => {
    AIAnalysisStorage.clear(submissionId);
    setAiResult(null);
    setAiStatus("idle");
  }, [submissionId]);

  return {
    aiStatus,
    aiResult,
    runAnalysis,
    clearAnalysis,
    isAnalyzing: aiStatus === "loading",
    hasAnalysis: aiResult !== null && aiStatus === "ready",
  };
}
