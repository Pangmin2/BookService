import style from "./UserBookStatus.module.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { requestWithAuth } from "../../utils/requestWithAuth";
import Loading from "../../components/Loading/Loading";
import Hero from "../../components/Hero/Hero";
import { useLogout } from "../../hooks/useLogout";

const UserRevertBook = () => {
  const [revertBooks, setRevertBooks] = useState([]);
  const logout = useLogout();

  useEffect(() => {
    requestReservedBooks();
  }, []);

  const requestReservedBooks = async () => {
    try {
      const response = await requestWithAuth(
        "GET",
        "/myPage/return",
        null,
        logout
      );
      console.log(response.data);
      if (response === null) {
        throw new Error();
      }
      setRevertBooks(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  if (revertBooks === undefined) {
    return <Layout content={<Loading />} />;
  }

  return (
    <Layout
      hero={<Hero section="반납 현황" />}
      content={
        <div className={style.wrapper}>
          {revertBooks.length === 0 ? (
            <div className={style.empty}>
              현재 반납된 도서가 존재하지 않습니다.
            </div>
          ) : (
            <div className={style.contents}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>도서 ID</th>
                    <th>도서명</th>
                    <th>대출 일자</th>
                    <th>반납 일자</th>
                  </tr>
                </thead>
                <tbody>
                  {revertBooks?.map((book) => (
                    <tr key={book.bookId}>
                      <td>{book.bookId}</td>
                      <td>{book.bookName}</td>
                      <td>{new Date(book.loanDate).toLocaleDateString()}</td>
                      <td>{new Date(book.returnDate).toLocaleDateString()}</td>
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

export default UserRevertBook;
