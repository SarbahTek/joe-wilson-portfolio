import { useQuery } from "@tanstack/react-query";
import { enrollmentsApi } from "@/api/enrollments.api";
import { queryKeys } from "@/lib/query-keys";
import { mapMasterclassToCohort } from "@/lib/mappers/masterclass.mapper";

export function useMyEnrollments() {
  return useQuery({
    queryKey: queryKeys.enrollments.my,
    queryFn: enrollmentsApi.myEnrollments,
    select: (enrollments) =>
      enrollments
        .filter((e) => e.masterclass)
        .map((e) => mapMasterclassToCohort(e.masterclass!, [], e)),
  });
}
