import { create } from "zustand";

interface DrawerState {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const useDrawerStore = create<DrawerState>((set) => ({
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));

export const useDrawer = () => {
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawerStore();
  return { isDrawerOpen, openDrawer, closeDrawer };
};