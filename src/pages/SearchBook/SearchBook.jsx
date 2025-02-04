import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import Book from "../../components/Book/Book";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchBook = () => {
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);

  useEffect(() => {
    // 목데이터를 사용하여 books 상태 업데이트
    const mockData = {
      success: true,
      code: null,
      data: [
        {
          id: 1,
          title: "Harry Potter and the Philosopher's Stone",
          author: "대주혁",
          publishYear: 1997,
          publisher: "Bloomsbury",
          status: "FULLY_RESERVED",
          bookUrl: null,
          borrowCount: 3,
        },
        {
          id: 2,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          publishYear: 1937,
          publisher: "Allen & Unwin",
          status: "AVAILABLE",
          bookUrl: null,
          borrowCount: 1,
        },
        {
          id: 3,
          title: "Pride and Prejudice",
          author: "Jane Austen",
          publishYear: 1813,
          publisher: "T. Egerton",
          status: "RESERVED",
          bookUrl: null,
          borrowCount: 2,
        },
        {
          id: 4,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          publishYear: 1960,
          publisher: "J.B. Lippincott & Co.",
          status: "FULLY_RESERVED",
          bookUrl: null,
          borrowCount: 1,
        },
        {
          id: 5,
          title: "1984",
          author: "George Orwell",
          publishYear: 1949,
          publisher: "Secker & Warburg",
          status: "AVAILABLE",
          bookUrl: null,
          borrowCount: 1,
        },
      ],
    };

    // 목데이터로 상태 설정
    setBooks(mockData.data);
  }, []);

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const response = await axios.get("localhost:8080/books");
  //       setBooks(response.data);
  //     } catch (error) {
  //       console.error("책 정보를 가져오는데 실패했습니다:", error);
  //       setBooks([]);
  //     }
  //   };
  //   fetchBooks();
  // }, []);

  useEffect(() => {
    // books가 업데이트될 때 filterBooks도 초기화
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
    <>
      <Header />
      <Hero onSearch={searchHandler} />
      <div>
        {filterBooks.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default SearchBook;
