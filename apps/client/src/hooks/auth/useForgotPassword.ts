import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth.api";
import type { ForgotPasswordInput } from "@/types/auth.types";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (input: ForgotPasswordInput) => authApi.forgotPassword(input),
  });
}
