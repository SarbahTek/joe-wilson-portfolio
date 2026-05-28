import type { AxiosError } from "axios";
import type { ApiErrorBody } from "../types/api.types";

export class ApiError extends Error {
  status: number;
  code?: string;
  fieldErrors: Record<string, string[]>;

  constructor(
    message: string,
    status = 500,
    fieldErrors: Record<string, string[]> = {},
    code?: string,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
    this.code = code;
  }

  getFieldMessage(field: string): string | undefined {
    const messages = this.fieldErrors[field];
    return messages?.[0];
  }
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

export function parseApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  const axiosError = error as AxiosError<ApiErrorBody>;
  if (axiosError?.isAxiosError) {
    if (!axiosError.response) {
      return new ApiError("Network error. Check your connection and try again.", 0);
    }

    const { status, data } = axiosError.response;
    const message =
      data?.message ||
      formatErrorField(data?.error) ||
      (status === 401
        ? "Your session has expired. Please sign in again."
        : status === 403
          ? "You do not have permission to perform this action."
          : status === 404
            ? "The requested resource was not found."
            : status === 409
              ? "An account with this email already exists. Please sign in or use a different email."
              : status === 422
                ? "Please check your input and try again."
                : status === 429
                  ? "Too many attempts. Please wait a few minutes and try again."
                  : status === 500
                    ? "Something went wrong. This email may already be registered — try signing in instead."
                    : "Something went wrong. Please try again.");

    return new ApiError(message, status, normalizeFieldErrors(data));
  }

  return new ApiError(fallbackMessage(error), 500);
}

function formatErrorField(error: ApiErrorBody["error"]): string | undefined {
  if (!error) return undefined;
  if (typeof error === "string") return error;
  if (Array.isArray(error)) {
    const first = error[0];
    if (typeof first === "string") return first;
    if (first && typeof first === "object" && "message" in first) {
      return String(first.message);
    }
  }
  return undefined;
}

function normalizeFieldErrors(data: ApiErrorBody): Record<string, string[]> {
  if (data.errors) return data.errors;
  if (Array.isArray(data.error)) {
    return data.error.reduce<Record<string, string[]>>((acc, item) => {
      if (item && typeof item === "object" && "path" in item && "message" in item) {
        const path = Array.isArray(item.path) ? item.path.join(".") : String(item.path);
        const field = path.replace(/^body\./, "");
        acc[field] = [String(item.message)];
      }
      return acc;
    }, {});
  }
  return {};
}

function fallbackMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Something went wrong. Please try again.";
}
