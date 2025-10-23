"use client";

import { useState, useEffect, useRef } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconAlertTriangle } from "@tabler/icons-react";
import { YourWorkCard } from "./your-work-card";
import { AssignmentService } from "@/services/assignment-service/assignment-service";
import type { Submission, SubmissionFile } from "@/types/assignment";

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
  // State
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingSubmissions, setFetchingSubmissions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [lastSubmission, setLastSubmission] = useState<Submission | null>(null);

  // Hidden file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch submissions on mount
  useEffect(() => {
    fetchSubmissions();
  }, [assignmentId]);

  const fetchSubmissions = async () => {
    try {
      setFetchingSubmissions(true);
      const response = await AssignmentService.getStudentSubmissions(assignmentId);
      
      if (response.success && response.data) {
        setSubmissions(response.data);
        setIsSubmitted(response.data.length > 0);
        
        if (response.data.length > 0) {
          // Get the most recent submission
          const latest = response.data[0];
          setLastSubmission(latest);
          
          // If submission has files, we can't set them as File objects
          // but we can show them in the UI differently
        }
      }
    } catch (err: any) {
      console.error('Error fetching submissions:', err);
      // Don't show error notification on initial fetch if it's just 404 (no submissions yet)
      if (!err.message?.includes('404')) {
        setError(err.message || 'Failed to fetch submissions');
      }
    } finally {
      setFetchingSubmissions(false);
    }
  };

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
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip',
      'application/x-zip-compressed',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'text/plain',
    ];

    const invalidFiles = newFiles.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      notifications.show({
        title: "Invalid File Type",
        message: `Some files have unsupported types: ${invalidFiles.map(f => f.name).join(', ')}`,
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
        autoClose: 4000,
      });
      
      // Filter out invalid files
      const validFiles = newFiles.filter(file => allowedTypes.includes(file.type));
      if (validFiles.length === 0) return;
      
      setUploadedFiles(prev => [...prev, ...validFiles]);
    } else {
      setUploadedFiles(prev => [...prev, ...newFiles]);
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
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
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
      const isFileUploadType = assignmentType === "file_upload" || uploadedFiles.length > 0;

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
        response = await AssignmentService.submitAssignmentJson(
          assignmentId,
          { answers: [] }
        );
      }

      if (response.success) {
        setIsSubmitted(true);
        setLastSubmission(response.data);
        setUploadedFiles([]); // Clear local files
        
        notifications.show({
          title: "Submitted Successfully! 🎉",
          message: "Your assignment has been submitted",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 4000,
        });

        // Refresh submissions to get latest data
        await fetchSubmissions();
        
        // Call success callback if provided
        onSubmissionSuccess?.();
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      
      let errorMessage = 'Failed to submit assignment';
      
      // Map common errors to friendly messages
      if (err.message?.includes('Already submitted') || err.message?.includes('already submitted')) {
        errorMessage = 'This assignment has already been submitted';
      } else if (err.message?.includes('No files provided')) {
        errorMessage = 'Please upload at least one file';
      } else if (err.message?.includes('404') || err.message?.includes('not found')) {
        errorMessage = 'Assignment not found or not published';
      } else if (err.message?.includes('Maximum 10 files')) {
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

  const handleUnmark = () => {
    // Show tooltip that unsubmit is not supported
    notifications.show({
      title: "Unsubmit Not Supported",
      message: "Once submitted, assignments cannot be unsubmitted. Please contact your instructor if you need to make changes.",
      color: "blue",
      autoClose: 4000,
    });
  };

  // Compute status
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
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png,.gif,.webp,.txt"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}
