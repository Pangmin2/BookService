import Hero from "../../components/Hero/Hero";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { requestWithAuth } from "../../utils/requestWithAuth";
import style from "./SearchBook.module.css";
import useUserStore from "../../../store/useUserStore";
import Book from "../../components/Book/Book";
import { useNavigate } from "react-router-dom";

const SearchBook = () => {
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);

  const isLogined = useUserStore((state) => state.isLogined);
  const setIsLogined = useUserStore((state) => state.setIsLogined);

  // API 요청 함수 (requestWithAuth 사용)
  const fetchBooks = async () => {
    try {
      const response = await requestWithAuth("GET", "/books", null, null);

      console.log("API Response:", response); // 전체 응답 로그 출력

      if (response === null) {
        throw new Error();
      }
      // 응답 구조 확인
      console.log("Response Data:", response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("책 정보를 불러오는 데 실패했습니다:", error);
      setBooks([]); // 오류 발생 시 빈 배열 설정
      setIsLogined(false);
      // navigate("/login");
    }
  };

  useEffect(() => {
    console.log(isLogined);
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
        </div>
      }
    ></Layout>
  );
};

export default SearchBook;