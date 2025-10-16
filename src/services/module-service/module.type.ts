export type GetModuleByCourseResponse = {
    success: string;
    statusCode: number;
    data: { module_id: string, module_title: string}[];
    timestamp: string;
}