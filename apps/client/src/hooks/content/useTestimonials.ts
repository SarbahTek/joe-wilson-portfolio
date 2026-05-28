import { useQuery } from "@tanstack/react-query";
import { testimonialsApi } from "@/api/testimonials.api";
import { queryKeys } from "@/lib/query-keys";

export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials.all,
    queryFn: testimonialsApi.list,
  });
}
