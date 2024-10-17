export interface ErrorResponse {
  success: false
  error: string
}

export interface SuccessResponse<T extends object> {
  success: true
  data: T
}

export type APIResponse<T extends object> = ErrorResponse | SuccessResponse<T>;
