import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sessionsApi } from "@/api/sessions.api";
import { queryKeys } from "@/lib/query-keys";
import { mapSessionToUi } from "@/lib/mappers/masterclass.mapper";
import type { UpdateProgressInput } from "@/types/masterclass.types";

export function useSession(sessionId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.sessions.detail(sessionId ?? ""),
    queryFn: () => sessionsApi.getById(sessionId!),
    enabled: Boolean(sessionId),
  });
}

export function useUpdateSessionProgress(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProgressInput) => sessionsApi.updateProgress(sessionId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.detail(sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.my });
    },
  });
}

export function useSessionUi(sessionId: string | undefined, index = 0) {
  const query = useSession(sessionId);
  return {
    ...query,
    uiSession: query.data ? mapSessionToUi(query.data, index) : undefined,
    playbackUrl: query.data?.playbackUrl ?? query.data?.videoUrl ?? null,
    progress: query.data?.progress,
  };
}
