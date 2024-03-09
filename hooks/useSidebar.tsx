import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isCollapsed: boolean;
  collapse: () => void;
  uncollapse: () => void;
  toggleCollapse: () => void;
}

const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      collapse: () => set({ isCollapsed: true }),
      uncollapse: () => set({ isCollapsed: false }),
      toggleCollapse: () =>
        set((state) => ({ isCollapsed: !state.isCollapsed })),
    }),
    {
      name: "bloggie-sidebar-collapse",
    }
  )
);

export default useSidebar;
