import Hero from "../../components/Hero/Hero";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { requestWithAuth } from "../../utils/requestWithAuth";
import style from "./SearchBook.module.css";
import useUserStore from "../../../store/useUserStore";
import Book from "../../components/Book/Book";
import { useLogout } from "../../hooks/useLogout";

const SearchBook = () => {
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);

  const isLogined = useUserStore((state) => state.isLogined);
  const logout = useLogout();

  // API 요청 함수 (requestWithAuth 사용)
  const fetchBooks = async () => {
    try {
      const response = await requestWithAuth("GET", "/books", null, logout);

      if (response === null) {
        throw new Error();
      }
      // console.log("Response Data:", response.data);
      setBooks(response.data);
    } catch (error) {
      swal({
        title: "책 정보를 불러오는 데 실패했습니다.",
        button: "확인",
        icon: "error",
      });
      setBooks([]); // 오류 발생 시 빈 배열 설정
      logout();
    }
  };

  useEffect(() => {
    if (isLogined) {
      fetchBooks();
    }
  }, [isLogined]);

  useEffect(() => {
    setFilterBooks(books);
  }, [books]);

  const searchHandler = (searchTitle) => {
    if (!searchTitle.trim()) {
      setFilterBooks(books);
      return;
    }

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setFilterBooks(filtered);
  };

  return (
    <Layout
      hero={
        isLogined ? <Hero section="도서 검색" onSearch={searchHandler} /> : null
      }
      content={
        <div className={style.container}>
          {books.length === 0 ? (
            <div className={style.empty}>
              현재 대여 가능한 도서가 존재하지 않습니다.
            </div>
          ) : (
            <>
              <hr className={style.outline} />
              {filterBooks.map((book, index) => (
                <div key={book.id}>
                  <Book book={book} />
                  {index < filterBooks.length - 1 && (
                    <hr className={style.inline} />
                  )}
                </div>
              ))}
              <hr className={style.outline} />
            </>
          )}
        </div>
      }
    />
  );
};

export default SearchBook;
