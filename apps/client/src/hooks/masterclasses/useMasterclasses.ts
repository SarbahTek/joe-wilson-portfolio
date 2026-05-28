import { useQuery } from "@tanstack/react-query";
import { masterclassesApi } from "@/api/masterclasses.api";
import { queryKeys } from "@/lib/query-keys";
import { mapMasterclassToCohort } from "@/lib/mappers/masterclass.mapper";

export function useMasterclasses() {
  return useQuery({
    queryKey: queryKeys.masterclasses.all,
    queryFn: masterclassesApi.list,
    select: (items) => items.map((mc) => mapMasterclassToCohort(mc)),
  });
}

export function useMasterclass(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.masterclasses.detail(id ?? ""),
    queryFn: () => masterclassesApi.getById(id!),
    enabled: Boolean(id),
    select: (data) => {
      const sessions = data.sessions ?? [];
      return mapMasterclassToCohort(data, sessions, data.enrollment ?? null);
    },
  });
}
