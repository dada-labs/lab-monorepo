import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LnbState {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}

export const useLnbStore = create<LnbState>()(
  persist(
    (set) => ({
      isSidebarExpanded: true,
      toggleSidebar: () =>
        set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
    }),
    {
      name: "dadalab-lnb-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
