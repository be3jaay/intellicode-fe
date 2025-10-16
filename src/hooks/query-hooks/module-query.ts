import { ModuleService } from "@/services/module-service/module-service";
import { GetModuleByCourseResponse } from "@/services/module-service/module.type";
import { useQuery } from "@tanstack/react-query";

export function useFetchModuleByCourse(courseId: string) {
    const { data, isLoading, isError } = useQuery({
        queryFn: async (): Promise<GetModuleByCourseResponse> => await ModuleService.getModuleByCourse(courseId),
        queryKey: ['modules', courseId],
        enabled: !!courseId,
    });

    return {
        modulesData: data?.data,
        isLoading,
        isError,
    }
}