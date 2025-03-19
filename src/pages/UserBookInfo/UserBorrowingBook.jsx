import style from "./UserBookStatus.module.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { requestWithAuth } from "../../utils/requestWithAuth";
import Loading from "../../components/Loading/Loading";
import Hero from "../../components/Hero/Hero";

const UserBorrowingBook = () => {
  const [borrowingBooks, setBorrowingBooks] = useState([]);

  useEffect(() => {
    requestBorrowingBooks();
  }, []);

  const requestBorrowingBooks = async () => {
    try {
      const response = await requestWithAuth("GET", "/myPage/loan");
      console.log(response.data);
      if (response === null) {
        throw new Error();
      }
      setBorrowingBooks(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  if (borrowingBooks === undefined) {
    return <Layout content={<Loading />} />;
  }

  return (
    <Layout
      hero={<Hero section="대출 현황" />}
      content={
        <div className={style.wrapper}>
          {borrowingBooks.length === 0 ? (
            <div className={style.empty}>
              현재 대출 중인 도서가 존재하지 않습니다.
            </div>
          ) : (
            <div className={style.contents}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>도서 ID</th>
                    <th>도서명</th>
                    <th>대출 일자</th>
                    <th>반납 예정일</th>
                    <th>연체일수</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowingBooks?.map((book) => (
                    <tr key={book.bookId}>
                      <td>{book.bookId}</td>
                      <td>{book.bookName}</td>
                      <td>
                        {new Date(book.reservationDate).toLocaleDateString()}
                      </td>
                      {/* <td>{new Date(book.returnDate).toLocaleDateString()}</td> */}
                      <td>{book.returnDate}</td>
                      <td>{book.overdueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      }
    />
  );
};

export default UserBorrowingBook;
