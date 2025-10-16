import { AssignmentService } from "@/services/assignment-service/assignment-service";
import { CreateQuizForm, AssignmentQueryParams } from "@/services/assignment-service/assignment-type";
import { ErrorResponse } from "@/services/course-service/course-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateAssignment() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: ({ value, moduleId }: { value: CreateQuizForm, moduleId: string }) => AssignmentService.createAssignment(value, moduleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignments'] });
        },
        onError: (error: ErrorResponse) => {
            console.error(error.message);
        },
    })

    return {
        createAssignment: mutateAsync,
        isCreating: isPending,
        isError: isError,
    }
}

export function useGetAssignments(moduleId: string, params: AssignmentQueryParams = {}) {
    return useQuery({
        queryKey: ['assignments', moduleId, params],
        queryFn: () => AssignmentService.getAssignments(moduleId, params),
        enabled: !!moduleId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}