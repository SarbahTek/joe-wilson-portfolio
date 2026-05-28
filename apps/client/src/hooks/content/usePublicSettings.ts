import { useQuery } from "@tanstack/react-query";
import { settingsApi } from "@/api/settings.api";
import { queryKeys } from "@/lib/query-keys";

export function usePublicSettings() {
  return useQuery({
    queryKey: queryKeys.settings.public,
    queryFn: settingsApi.getPublic,
    staleTime: 10 * 60_000,
  });
}
