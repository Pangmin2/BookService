import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      isLogined: false,
      role: null,
      setIsLogined: (state) => set({ isLogined: state }),
      setRole: (role) => set({ role }),
    }),
    {
      name: "login_state",
    }
  )
);

export default useUserStore;
