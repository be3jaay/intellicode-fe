export type GetModuleByCourseResponse = {
    success: string;
    statusCode: number;
    data: { module_id: string, module_title: string}[];
    timestamp: string;
}

export type Module = {
    id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    lessons_count: number;
    activities_count: number;
}

export type ModuleListResponse = {
    success: boolean;
    statusCode: number;
    data: {
        modules: Module[];
        total: number;
        offset: number;
        limit: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
    timestamp: string;
}

export type ModuleListQueryParams = {
    offset?: number;
    limit?: number;
}

export type ModuleBulkCreationRequest = {
    title: string;
    description: string;
    order_index: number;
    is_published: boolean;
}