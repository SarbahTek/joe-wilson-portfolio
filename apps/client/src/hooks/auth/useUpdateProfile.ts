import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth.api";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { useAuthStore } from "@/stores/auth.store";
import type { UpdateMeInput } from "@/types/auth.types";

export function useUpdateProfile() {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (input: UpdateMeInput) => authApi.updateMe(input),
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(queryKeys.auth.me, user);
    },
  });
}
