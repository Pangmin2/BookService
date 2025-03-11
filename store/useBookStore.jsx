import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookStore = create(
  persist((set, get) => ({
    myReservedBooks: [], // 내가 예약한 책 ID 배열

    addReservation: (bookId) => {
      //배열에 예약하려는 책 ID가 있는지 확인
      if (!get().myReservedBooks.includes(bookId)) {
        set((state) => ({
          myReservedBooks: [...state.myReservedBooks, bookId],
        }));
      }
    },

    removeReservation: (bookId) => {
      set((state) => ({
        myReservedBooks: state.myReservedBooks.filter((id) => id !== bookId),
      }));
    },

    isReserved: (bookId) => get().myReservedBooks.includes(bookId),
  })),
  {
    name: "my_reserved_books", // localStorage 저장 키
  }
);

export default useBookStore;
