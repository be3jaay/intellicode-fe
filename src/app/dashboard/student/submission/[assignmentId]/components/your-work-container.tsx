"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconAlertTriangle,
  IconCircleCheck,
  IconX,
} from "@tabler/icons-react";
import { YourWorkCard } from "./your-work-card";
import { AssignmentService } from "@/services/assignment-service/assignment-service";
import type { Submission } from "@/types/assignment";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useUndoSubmission } from "@/hooks/query-hooks/assignment-query";
import { useAuth } from "@/providers/auth-context";

interface YourWorkContainerProps {
  assignmentId: string;
  assignmentType?: "quiz_form" | "code_sandbox" | "file_upload";
  onSubmissionSuccess?: () => void;
}

export function YourWorkContainer({
  assignmentId,
  assignmentType,
  onSubmissionSuccess,
}: YourWorkContainerProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const { user } = useAuth();
  const { undoSubmission, isUndoing } = useUndoSubmission();

  // State
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setFetchingSubmissions] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [, setSubmissions] = useState<Submission[]>([]);
  const [, setLastSubmission] = useState<Submission | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSubmissions = useCallback(async () => {
    try {
      setFetchingSubmissions(true);
      const response = await AssignmentService.getStudentSubmissions(
        assignmentId
      );

      if (response.success && response.data) {
        setSubmissions(response.data);
        setIsSubmitted(response.data.length > 0);

        if (response.data.length > 0) {
          const latest = response.data[0];
          setLastSubmission(latest);
        }
      }
    } catch (err: any) {
      console.error("Error fetching submissions:", err);
      if (!err.message?.includes("404")) {
        setError(err.message || "Failed to fetch submissions");
      }
    } finally {
      setFetchingSubmissions(false);
    }
  }, [assignmentId]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    const totalFiles = uploadedFiles.length + newFiles.length;

    // Enforce max 10 files
    if (totalFiles > 10) {
      notifications.show({
        title: "Too Many Files",
        message: `You can only upload up to 10 files. You're trying to add ${totalFiles} files.`,
        color: "red",
        icon: <IconAlertTriangle size={18} />,
        autoClose: 4000,
      });
      return;
    }

    // Validate file types (common document types)
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/zip",
      "application/x-zip-compressed",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "text/plain",
    ];

    const invalidFiles = newFiles.filter(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      notifications.show({
        title: "Invalid File Type",
        message: `Some files have unsupported types: ${invalidFiles
          .map((f) => f.name)
          .join(", ")}`,
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
        autoClose: 4000,
      });

      // Filter out invalid files
      const validFiles = newFiles.filter((file) =>
        allowedTypes.includes(file.type)
      );
      if (validFiles.length === 0) return;

      setUploadedFiles((prev) => [...prev, ...validFiles]);
    } else {
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }

    notifications.show({
      title: "Files Added! 📎",
      message: `${newFiles.length} file(s) added to your submission`,
      color: "green",
      icon: <IconCheck size={18} />,
      autoClose: 3000,
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    notifications.show({
      title: "File Removed",
      message: "File removed from your submission",
      color: "orange",
      autoClose: 2000,
    });
  };

  const handleMarkAsDone = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      // Determine which submission method to use
      const isFileUploadType =
        assignmentType === "file_upload" || uploadedFiles.length > 0;

      if (isFileUploadType && uploadedFiles.length === 0) {
        notifications.show({
          title: "No Files Uploaded",
          message: "Please upload at least one file before submitting",
          color: "red",
          icon: <IconAlertTriangle size={18} />,
        });
        return;
      }

      let response;

      if (isFileUploadType) {
        // Submit with files
        response = await AssignmentService.submitAssignmentWithFiles(
          assignmentId,
          uploadedFiles
        );
      } else {
        // Submit with JSON (quiz/code - empty answers for now)
        response = await AssignmentService.submitAssignmentJson(assignmentId, {
          answers: [],
        });
      }

      if (response.success) {
        setIsSubmitted(true);
        setLastSubmission(response.data);
        setUploadedFiles([]);

        notifications.show({
          title: "Submitted Successfully! 🎉",
          message: "Your assignment has been submitted",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 4000,
        });

        await fetchSubmissions();

        if (courseId) {
          queryClient.invalidateQueries({
            queryKey: ["student-course", courseId],
          });
        }
        queryClient.invalidateQueries({
          queryKey: ["assignment", assignmentId],
        });

        onSubmissionSuccess?.();
      }
    } catch (err: any) {
      console.error("Submission error:", err);

      let errorMessage = "Failed to submit assignment";

      if (
        err.message?.includes("Already submitted") ||
        err.message?.includes("already submitted")
      ) {
        errorMessage = "This assignment has already been submitted";
      } else if (err.message?.includes("No files provided")) {
        errorMessage = "Please upload at least one file";
      } else if (
        err.message?.includes("404") ||
        err.message?.includes("not found")
      ) {
        errorMessage = "Assignment not found or not published";
      } else if (err.message?.includes("Maximum 10 files")) {
        errorMessage = err.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);

      notifications.show({
        title: "Submission Failed",
        message: errorMessage,
        color: "red",
        icon: <IconAlertTriangle size={18} />,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnmark = async () => {
    if (!user?.id) {
      notifications.show({
        title: "Error",
        message: "Unable to identify user. Please refresh and try again.",
        color: "red",
        icon: <IconX size={18} />,
        autoClose: 4000,
      });
      return;
    }

    try {
      const response = await undoSubmission({
        assignmentId,
        studentId: user.id,
      });

      if (response.success) {
        setIsSubmitted(false);
        setUploadedFiles([]);
        setLastSubmission(null);

        notifications.show({
          title: "Submission Undone! ✓",
          message:
            response.message ||
            "Your submission has been successfully removed. You can now resubmit the assignment.",
          color: "green",
          icon: <IconCircleCheck size={18} />,
          autoClose: 5000,
        });

        await fetchSubmissions();

        if (courseId) {
          queryClient.invalidateQueries({
            queryKey: ["student-course", courseId],
          });
        }
        queryClient.invalidateQueries({
          queryKey: ["assignment", assignmentId],
        });

        onSubmissionSuccess?.();
      }
    } catch (err: any) {
      console.error("Undo submission error:", err);

      let errorMessage = "Failed to undo submission";

      if (err.message?.includes("not found")) {
        errorMessage = "Submission not found or already removed";
      } else if (err.message?.includes("Cannot undo")) {
        errorMessage = err.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      notifications.show({
        title: "Undo Failed",
        message: errorMessage,
        color: "red",
        icon: <IconX size={18} />,
        autoClose: 5000,
      });
    }
  };

  // Compute
  const status = isSubmitted
    ? { label: "Submitted", color: "green" as const }
    : { label: "Not Submitted", color: "red" as const };

  return (
    <>
      <YourWorkCard
        status={status}
        isSubmitted={isSubmitted}
        uploadedFiles={uploadedFiles}
        onUploadClick={handleUploadClick}
        onMarkAsDone={handleMarkAsDone}
        onUnmark={handleUnmark}
        onRemoveFile={handleRemoveFile}
        loading={loading}
        undoLoading={isUndoing}
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png,.gif,.webp,.txt"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
}
