import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

/** Hydrates auth from stored tokens and loads `/auth/me` when a token exists. */
export function AuthBootstrap() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useCurrentUser({ enabled: isHydrated && isAuthenticated });

  return null;
}
