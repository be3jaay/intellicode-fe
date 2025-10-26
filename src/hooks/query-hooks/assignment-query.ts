// Delete assignment mutation hook
export function useDeleteAssignment() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (assignmentId: string) =>
      AssignmentService.deleteAssignment(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (error: ErrorResponse) => {
      console.error(error.message);
    },
  });
  return {
    deleteAssignment: mutateAsync,
    isDeleting: isPending,
    isError: isError,
  };
}

// Patch assignment mutation hook
export function usePatchAssignment() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ({
      assignmentId,
      data,
    }: {
      assignmentId: string;
      data: Partial<{
        title: string;
        description: string;
        difficulty: string;
        is_published: boolean;
        points: number;
        dueDate: string;
      }>;
    }) => AssignmentService.patchAssignment(assignmentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (error: ErrorResponse) => {
      console.error(error.message);
    },
  });
  return {
    patchAssignment: mutateAsync,
    isPatching: isPending,
    isError: isError,
  };
}
import { AssignmentService } from "@/services/assignment-service/assignment-service";
import {
  CreateQuizForm,
  AssignmentQueryParams,
  SubmitAssignmentData,
  AssignmentScoresResponse,
  SubmissionsForGradingResponse,
  GradeSubmissionData,
} from "@/services/assignment-service/assignment-type";
import { ErrorResponse } from "@/services/course-service/course-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateAssignment() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ({
      value,
      moduleId,
      file,
    }: {
      value: CreateQuizForm;
      moduleId: string;
      file?: File;
    }) => AssignmentService.createAssignment(value, moduleId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (error: ErrorResponse) => {
      console.error(error.message);
    },
  });

  return {
    createAssignment: mutateAsync,
    isCreating: isPending,
    isError: isError,
  };
}

export function useGetAssignments(
  moduleId: string,
  params: AssignmentQueryParams = {}
) {
  return useQuery({
    queryKey: ["assignments", moduleId, params],
    queryFn: () => AssignmentService.getAssignments(moduleId, params),
    enabled: !!moduleId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFetchAssignment(assignmentId: string) {
  return useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: () => AssignmentService.getAssignment(assignmentId),
    enabled: !!assignmentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSubmitAssignment() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ({
      assignmentId,
      data,
    }: {
      assignmentId: string;
      data: SubmitAssignmentData;
    }) => AssignmentService.submitAssignment(assignmentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (error: ErrorResponse) => {
      console.error(error.message);
    },
  });
  return {
    submitAssignment: mutateAsync,
    isSubmitting: isPending,
    isError: isError,
  };
}

export function useGetAssignmentScores(assignmentId: string) {
  return useQuery<AssignmentScoresResponse>({
    queryKey: ["assignment-scores", assignmentId],
    queryFn: () => AssignmentService.getAssignmentScores(assignmentId),
    enabled: !!assignmentId,
    staleTime: 60 * 1000,
  });
}

export function useGetSubmissionsForGrading(assignmentId: string) {
  return useQuery<SubmissionsForGradingResponse>({
    queryKey: ["submissions-for-grading", assignmentId],
    queryFn: () => AssignmentService.getSubmissionsForGrading(assignmentId),
    enabled: !!assignmentId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useGradeSubmission() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (data: GradeSubmissionData) =>
      AssignmentService.gradeSubmission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions-for-grading"] });
      queryClient.invalidateQueries({ queryKey: ["assignment-scores"] });
    },
    onError: (error: ErrorResponse) => {
      console.error(error.message);
    },
  });
  return {
    gradeSubmission: mutateAsync,
    isGrading: isPending,
    isError: isError,
  };
}

export function useUndoSubmission() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ({
      assignmentId,
      studentId,
    }: {
      assignmentId: string;
      studentId: string;
    }) => AssignmentService.undoSubmission(assignmentId, studentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({
        queryKey: ["assignment", variables.assignmentId],
      });
    },
    onError: (error: ErrorResponse) => {
      console.error(error.message);
    },
  });
  return {
    undoSubmission: mutateAsync,
    isUndoing: isPending,
    isError: isError,
  };
}
