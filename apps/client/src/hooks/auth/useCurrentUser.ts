import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/auth.api";
import { queryKeys } from "@/lib/query-keys";
import { useAuthStore } from "@/stores/auth.store";
import { tokenStorage } from "@/lib/token-storage";

interface UseCurrentUserOptions {
  enabled?: boolean;
}

export function useCurrentUser(options: UseCurrentUserOptions = {}) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const enabled = options.enabled ?? Boolean(tokenStorage.getAccessToken());

  const query = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.me,
    enabled,
    retry: false,
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.isError) {
      clearAuth();
    }
  }, [query.isError, clearAuth]);

  return query;
}
