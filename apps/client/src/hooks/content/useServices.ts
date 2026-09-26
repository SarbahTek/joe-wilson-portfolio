import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/api/services.api";

export function useServices() {
  return useQuery({ queryKey: ["services"], queryFn: servicesApi.list });
}
