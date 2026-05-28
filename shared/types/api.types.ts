/** Standard API envelope shapes from OpenAPI SuccessResponse / ErrorResponse */

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SuccessResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
  message?: string;
}

export interface ApiValidationErrorItem {
  message?: string;
  path?: string | string[];
  code?: string;
  validation?: string;
}

export interface ApiErrorBody {
  success?: boolean;
  message?: string;
  error?: string | string[] | ApiValidationErrorItem[];
  errors?: Record<string, string[]>;
}

export interface ApiValidationError {
  field: string;
  message: string;
}
