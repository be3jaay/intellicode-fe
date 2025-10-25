// Patch (edit) module mutation hook
export function usePatchModule() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ({
      moduleId,
      data,
    }: {
      moduleId: string;
      data: Partial<{
        title: string;
        description: string;
        order_index: number;
        is_published: boolean;
      }>;
    }) => ModuleService.patchModule(moduleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
    onError: (error: ErrorResponse) => {
      console.error(error.message);
    },
  });
  return {
    patchModule: mutateAsync,
    isPatching: isPending,
    isError: isError,
  };
}
// Delete module mutation hook
export function useDeleteModule() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (moduleId: string) => ModuleService.deleteModule(moduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
    onError: (error: ErrorResponse) => {
      console.error(error.message);
    },
  });
  return {
    deleteModule: mutateAsync,
    isDeleting: isPending,
    isError: isError,
  };
}
import { ErrorResponse } from "@/services/course-service/course-type";
import { ModuleService } from "@/services/module-service/module-service";
import {
  GetModuleByCourseResponse,
  ModuleBulkCreationRequest,
  ModuleListQueryParams,
} from "@/services/module-service/module.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFetchModuleByCourse(courseId: string) {
  const { data, isLoading, isError } = useQuery({
    queryFn: async (): Promise<GetModuleByCourseResponse> =>
      await ModuleService.getModuleByCourse(courseId),
    queryKey: ["modules", courseId],
    enabled: !!courseId,
  });

  return {
    modulesData: data?.data,
    isLoading,
    isError,
  };
}

export function useBulkModuleCreation(courseId: string) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (data: ModuleBulkCreationRequest[]) =>
      ModuleService.moduleBulkCreation(courseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules", courseId] });
    },
    onError: (error: ErrorResponse) => {
      console.error(error.message);
    },
  });

  return {
    moduleBulkCreation: mutateAsync,
    isCreating: isPending,
    isError: isError,
  };
}

export function useGetModulesList(
  courseId: string,
  params: ModuleListQueryParams = {}
) {
  return useQuery({
    queryKey: ["modulesList", courseId, params],
    queryFn: () => ModuleService.getModulesList(courseId, params),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
