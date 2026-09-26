import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { adminApi } from "@/api/admin.api";
import { tokenStorage } from "@joe-wilson/shared/lib/token-storage";

export default function ProtectedAdminRoute() {
  const location = useLocation();
  const token = tokenStorage.getAccessToken();
  const query = useQuery({ queryKey: ["admin", "me"], queryFn: adminApi.me, enabled: Boolean(token), retry: false });
  if (!token) return <Navigate to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`} replace />;
  if (query.isPending) return <div className="min-h-screen grid place-items-center">Loading admin…</div>;
  if (query.isError || query.data?.role !== "admin") { tokenStorage.clear(); return <Navigate to="/login" replace />; }
  return <Outlet />;
}
