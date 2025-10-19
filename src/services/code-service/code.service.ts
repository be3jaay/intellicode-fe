import { apiClient } from "../api-client";
import { CodeExecutionRequest, CodeExecutionResponse } from "./code.type";

export class CodeService {
  public static async executeCode(
    request: CodeExecutionRequest
  ): Promise<CodeExecutionResponse> {
    try {
      return await apiClient.post<CodeExecutionResponse>("/api/code/run", request);
    } catch (error) {
      console.error("Code execution error:", error);
      throw error;
    }
  }
}
