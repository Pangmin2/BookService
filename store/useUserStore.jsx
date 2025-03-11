import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      isLogined: false,
      role: null,
      name: null,
      department: null,
      setIsLogined: (state) => set({ isLogined: state }),
      setRole: (role) => set({ role }),
      setUserInfo: (name, department) => set({ name, department }),
    }),
    {
      name: "login_state",
    }
  )
);

export default useUserStore;
