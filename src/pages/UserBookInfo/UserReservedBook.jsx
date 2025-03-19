import style from "./UserBookStatus.module.css";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import { requestWithAuth } from "../../utils/requestWithAuth";
import Loading from "../../components/Loading/Loading";
import Hero from "../../components/Hero/Hero";

const UserReservedBook = () => {
  const [reservedBooks, setReservedBooks] = useState([]);

  useEffect(() => {
    requestReservedBooks();
  }, []);

  const requestReservedBooks = async () => {
    try {
      const response = await requestWithAuth("GET", "/myPage/reservation");
      console.log(response.data);
      if (response === null) {
        throw new Error();
      }
      setReservedBooks(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  if (reservedBooks === undefined) {
    return <Layout content={<Loading />} />;
  }

  return (
    <Layout
      hero={<Hero section="예약 현황" />}
      content={
        <div className={style.wrapper}>
          {reservedBooks.length === 0 ? (
            <div className={style.empty}>
              현재 예약 중인 도서가 존재하지 않습니다.
            </div>
          ) : (
            <div className={style.contents}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>도서 ID</th>
                    <th>도서명</th>
                    <th>예약 일자</th>
                  </tr>
                </thead>
                <tbody>
                  {reservedBooks?.map((book) => (
                    <tr key={book.bookId}>
                      <td>{book.bookId}</td>
                      <td>{book.bookName}</td>
                      <td>
                        {new Date(book.reservationDate).toLocaleDateString()}
                      </td>
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

export default UserReservedBook;
