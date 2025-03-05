import React, { useEffect, useState } from 'react';
import style from './BookEdit.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer'
import axios from 'axios';

const BookEdit = () => {
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loans, setLoans] = useState([]);
  const [returns, setReturns] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('accessToken')); 
  const SERVER = import.meta.env.VITE_SERVER_URL; // 서버 주소

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${SERVER}/books`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setBooks(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [SERVER, token]);

  return (
    <>
      <Header />
      <div className={style.container}>
        {/* 도서 목록 */}
        <div className={`${style.section} ${style.reservationSection}`}>
          <h2 className={style.title}>도서 목록</h2>
          <table className={style.table}>
            <thead>
              <tr>
                <th>도서 ID</th>
                <th>도서 제목</th>
                <th>저자</th>
                <th>출판 연도</th>
                <th>출판사</th>
                <th>상태</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>
                    {book.bookUrl && (
                      <img
                        src={book.bookUrl}
                        alt={`${book.title} cover`}
                        style={{ width: '50px', height: 'auto' }}
                      />
                    )}
                  </td>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishYear}</td>
                  <td>{book.publisher}</td>
                  <td>{book.status}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 대출 현황 */}
        <div className={`${style.section} ${style.loanSection}`}>
          <h2 className={style.title}>대출 현황</h2>
          <table className={style.table}>
            <thead>
              <tr>
                <th>도서 ID</th>
                <th>도서 제목</th>
                <th>예약 ID</th>
                <th>사용자 ID</th>
                <th>사용자 이름</th>
                <th>대출일</th>
                <th>반납예정일</th>
                <th>반납 처리</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.reservationId}>
                  <td>{loan.bookId}</td>
                  <td>{loan.bookTitle}</td>
                  <td>{loan.reservationId}</td>
                  <td>{loan.userId}</td>
                  <td>{loan.userName}</td>
                  <td>{new Date(loan.borrowDate).toLocaleString()}</td>
                  <td>{new Date(loan.returnDueDate).toLocaleString()}</td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 반납 현황 */}
        <div className={`${style.section} ${style.returnSection}`}>
          <h2 className={style.title}>반납 현황</h2>
          <table className={style.table}>
            <thead>
              <tr>
                <th>도서 ID</th>
                <th>도서 제목</th>
                <th>예약 ID</th>
                <th>사용자 ID</th>
                <th>사용자 이름</th>
                <th>대출일</th>
                <th>반납일</th>
                <th>상태 변경</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((returnItem) => (
                <tr key={returnItem.reservationId}>
                  <td>{returnItem.bookId}</td>
                  <td>{returnItem.bookTitle}</td>
                  <td>{returnItem.reservationId}</td>
                  <td>{returnItem.userId}</td>
                  <td>{returnItem.userName}</td>
                  <td>{new Date(returnItem.borrowDate).toLocaleString()}</td>
                  <td>{new Date(returnItem.returnDate).toLocaleString()}</td>
                  <td>
                    <select
                      value={returnItem.status}
                      className={returnItem.status === '반납' ? style.statusReturn : style.statusOverdue}
                    >
                      <option value="RETURNED">반납</option>
                      <option value="OVERDUE_RETURNED">연체</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookEdit;