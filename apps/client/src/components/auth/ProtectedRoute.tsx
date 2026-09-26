import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { ApiError, getErrorMessage } from "@/lib/errors";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { isLoading, error, refetch, isFetching } = useCurrentUser({
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

  if (!isAuthenticated || (error instanceof ApiError && error.status === 401)) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-xl font-semibold">Unable to load your account</h1>
        <p role="alert">{getErrorMessage(error)}</p>
        <button className="rounded bg-[#1a7fa8] px-5 py-3 text-white disabled:opacity-50" disabled={isFetching} onClick={() => void refetch()}>
          {isFetching ? "Trying again..." : "Try again"}
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
