import { CSSProperties } from "react";

export const styles = {
  pageContainer: {
    minHeight: "calc(100vh - 180px)",
  } as CSSProperties,

  backButton: {
    color: "#BDF052",
    "&:hover": {
      background: "rgba(189, 240, 82, 0.1)",
    },
  } as CSSProperties,

  paper: {
    background: "#1a1a1a",
    border: "1px solid #3a3a3a",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  } as CSSProperties,

  headerAvatar: {
    background: "linear-gradient(135deg, #BDF052 0%, #9AC441 100%)",
  } as CSSProperties,

  pointsBadge: {
    leftSection: { marginRight: 4 },
  } as CSSProperties,

  dueSoonAlert: {
    background: "rgba(245, 158, 11, 0.1)",
    border: "1px solid #f59e0b",
    borderRadius: 8,
  } as CSSProperties,

  overdueAlert: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid #ef4444",
    borderRadius: 8,
  } as CSSProperties,

  descriptionText: {
    whiteSpace: "pre-line" as const,
    lineHeight: 1.6,
  } as CSSProperties,

  stickyContainer: {
    position: "sticky" as const,
    top: 20,
  } as CSSProperties,

  uploadButton: {
    background: "linear-gradient(135deg, #BDF052 0%, #9AC441 100%)",
    color: "#0d1117",
    fontWeight: 600,
    fontSize: 14,
  } as CSSProperties,

  markAsDoneButton: {
    borderColor: "#4fd1c5",
    color: "#4fd1c5",
    background: "rgba(79, 209, 197, 0.1)",
  } as CSSProperties,

  successBox: {
    background: "rgba(34, 197, 94, 0.1)",
    border: "1px solid #22c55e",
    borderRadius: 8,
    textAlign: "center" as const,
  } as CSSProperties,

  successIconCircle: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "rgba(34, 197, 94, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  textareaInput: {
    background: "#222222",
    border: "1px solid #444444",
    color: "#E9EEEA",
    "&:focus": {
      borderColor: "#BDF052",
    },
    "&:disabled": {
      background: "#1a1a1a",
      opacity: 0.6,
    },
  } as CSSProperties,
};

export const colors = {
  primary: "#BDF052",
  primaryDark: "#9AC441",
  secondary: "#4fd1c5",
  accent: "#B3A1FF",
  background: "#0d1117",
  paper: "#1a1a1a",
  border: "#3a3a3a",
  borderLight: "#444444",
  text: "#E9EEEA",
  textDimmed: "#999999",
  textMuted: "#666666",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
};
