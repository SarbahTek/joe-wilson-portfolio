import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import type { LoginInput } from "@/types/auth.types";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
  });
}
