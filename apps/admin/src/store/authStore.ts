import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@shared";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  hasHydrated: boolean;
  setAuth: (user: AuthUser, accessToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      hasHydrated: false,
      setAuth: (user, accessToken) => set({ user, accessToken }),
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "dadalab-auth-storage",
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true });
      },
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
