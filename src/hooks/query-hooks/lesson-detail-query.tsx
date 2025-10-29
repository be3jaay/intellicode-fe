import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    lessonService,
    LessonDetailResponse,
    UpdateLessonRequest,
    UpdateLessonResponse,
} from "@/services/lesson-service";
import { notifications } from "@mantine/notifications";
import { CheckCircle, XCircle } from "lucide-react";

export const useFetchLesson = (lessonId: string) => {
    return useQuery<LessonDetailResponse>({
        queryKey: ["lesson", lessonId],
        queryFn: () => lessonService.getLessonById(lessonId),
        enabled: !!lessonId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useUpdateLesson = () => {
    const queryClient = useQueryClient();

    return useMutation<
        UpdateLessonResponse,
        Error,
        { lessonId: string; data: UpdateLessonRequest }
    >({
        mutationFn: ({ lessonId, data }) =>
            lessonService.updateLesson(lessonId, data),
        onSuccess: (data, variables) => {
            // Invalidate and refetch lesson detail
            queryClient.invalidateQueries({ queryKey: ["lesson", variables.lessonId] });

            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["modules"] });
            queryClient.invalidateQueries({ queryKey: ["course"] });

            notifications.show({
                title: "Success",
                message: "Lesson updated successfully",
                color: "green",
                icon: <CheckCircle size={18} />,
                autoClose: 3000,
            });
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update lesson";

            notifications.show({
                title: "Error",
                message: errorMessage,
                color: "red",
                icon: <XCircle size={18} />,
                autoClose: 5000,
            });
        },
    });
};

