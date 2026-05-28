import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import { queryClient } from "@/lib/query-client";

export function useLogout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: () => authApi.logout().catch(() => undefined),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      navigate("/login");
    },
  });
}
