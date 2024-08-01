export type ApiResponse<T> = { data: T; status: number; statusText: string };

export interface ApiError {
  title: string;
  type: string;
  status: number;
  traceId: string;
}
