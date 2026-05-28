import { create } from "zustand";
import { tokenStorage } from "@/lib/token-storage";
import type { User } from "@/types/auth.types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isHydrated: false,

  setAuth: (user, accessToken, refreshToken) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    set({ user, isAuthenticated: true, isHydrated: true });
  },

  setUser: (user) => {
    set({
      user,
      isAuthenticated: Boolean(user && tokenStorage.getAccessToken()),
      isHydrated: true,
    });
  },

  clearAuth: () => {
    tokenStorage.clear();
    set({ user: null, isAuthenticated: false, isHydrated: true });
  },

  hydrate: () => {
    const hasToken = Boolean(tokenStorage.getAccessToken());
    set({
      isAuthenticated: hasToken,
      isHydrated: true,
    });
  },
}));
