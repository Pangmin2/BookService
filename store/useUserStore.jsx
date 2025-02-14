import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      isLogined: false,
      setIsLogined: (state) => set({ isLogined: state }),
    }),
    {
      name: "login_state",
    }
  )
);

export default useUserStore;
