export const formatDate = (date: Date | null): string => {
  if (!date || typeof window === "undefined") return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getAssignmentStatus = (
  isSubmitted: boolean,
  isMarkedAsDone: boolean,
  alreadySubmitted: boolean | undefined,
  dueDate: Date | null
): { label: string; color: "green" | "red" | "yellow" | "blue" } => {
  if (isSubmitted || isMarkedAsDone || alreadySubmitted) {
    return { label: "Submitted", color: "green" };
  }
  if (!dueDate) return { label: "Assigned", color: "blue" };

  const now = new Date();
  if (dueDate.getTime() < now.getTime()) {
    return { label: "Overdue", color: "red" };
  }

  const diffHours = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (diffHours <= 24) {
    return { label: "Due Soon", color: "yellow" };
  }

  return { label: "Assigned", color: "blue" };
};

export const getInstructorName = (instructor?: {
  first_name?: string;
  last_name?: string;
}): string => {
  if (!instructor) return "Instructor";
  return `${instructor.first_name || ""} ${instructor.last_name || ""}`.trim() || "Instructor";
};
