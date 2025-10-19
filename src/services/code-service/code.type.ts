export interface CodeExecutionRequest {
  code: string;
  language: string;
}

export interface CodeExecutionResponse {
  output?: string;
  error?: string;
  success: boolean;
  time?: string;
  memory?: number;
}
