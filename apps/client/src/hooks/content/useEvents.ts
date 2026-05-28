import { useQuery } from "@tanstack/react-query";
import { eventsApi } from "@/api/events.api";
import { queryKeys } from "@/lib/query-keys";

export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events.all,
    queryFn: eventsApi.list,
  });
}
