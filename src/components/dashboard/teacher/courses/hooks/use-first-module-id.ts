import { useFetchModuleByCourse } from "@/hooks/query-hooks/module-query";
import { useMemo } from "react";

export function useFirstModuleId(courseId: string) {
  const { modulesData, isLoading, isError } = useFetchModuleByCourse(courseId);

  const firstModuleId = useMemo(() => {
    if (modulesData && modulesData.length > 0) {
      return modulesData[0].module_id;
    }
    return "";
  }, [modulesData]);

  return {
    moduleId: firstModuleId,
    isLoading,
    isError,
    hasModules: modulesData && modulesData.length > 0,
  };
}
