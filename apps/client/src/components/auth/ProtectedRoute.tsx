import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { isLoading, isError } = useCurrentUser({
    enabled: isHydrated && isAuthenticated,
  });

  if (!isHydrated || (isAuthenticated && isLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <i className="ri-loader-4-line animate-spin text-3xl text-[#077DA7]" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || isError) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
  }

  return <>{children}</>;
}
