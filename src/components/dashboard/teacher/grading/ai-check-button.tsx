import { Button, Tooltip } from "@mantine/core";
import { Sparkles, Check } from "lucide-react";
import { AIStatus } from "@/services/ai-service";

interface AICheckButtonProps {
  aiStatus: AIStatus;
  hasAnalysis: boolean;
  onClick: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function AICheckButton({
  aiStatus,
  hasAnalysis,
  onClick,
  size = "sm",
}: AICheckButtonProps) {
  const isReady = hasAnalysis && aiStatus === "ready";
  const isLoading = aiStatus === "loading";

  return (
    <Tooltip
      label={isReady ? "View AI analysis" : "Analyze code with AI"}
      position="bottom"
    >
      <Button
        size={size}
        leftSection={isReady ? <Check size={14} /> : <Sparkles size={14} />}
        onClick={onClick}
        loading={isLoading}
        style={
          isReady
            ? {
                background: "rgba(34, 197, 94, 0.2)",
                color: "#22c55e",
                border: "1px solid rgba(34, 197, 94, 0.3)",
              }
            : {
                background: "rgba(168, 85, 247, 0.2)",
                color: "#a855f7",
                border: "1px solid rgba(168, 85, 247, 0.3)",
              }
        }
      >
        {isReady ? "AI Checked" : "AI Check"}
      </Button>
    </Tooltip>
  );
}
