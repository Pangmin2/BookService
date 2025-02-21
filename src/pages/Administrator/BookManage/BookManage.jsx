import React, { useEffect, useState, useCallback } from 'react';
import style from './BookManage.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer'
import axios from 'axios';

const BookManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loans, setLoans] = useState([]);
  const [returns, setReturns] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('accessToken')); 
  const SERVER = import.meta.env.VITE_SERVER_URL; // 서버 주소
  
  // 상태 변경 핸들러 추가 (반납/연체 상태 변경)
  const handleStatusChange = (index, newStatus) => {
    const updatedReturns = returns.map((item, i) => {
      if (i === index) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setReturns(updatedReturns);
  };
  
  // 예약 승인 함수 추가
  const acceptReservation = async (reservationId) => {
    try {
      const response = await axios.post(`${SERVER}/book/admin/${reservationId}/accept`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (response.data.success) {
        fetchReservations();
        fetchReturns();
      } else {
        console.error("예약 승인 실패", response.data);
      }
    } catch (error) {
      console.error("예약 승인 중 오류 발생:", error);
    }
  };

  // 반납 현황 조회 함수 추가
  const fetchReturns = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER}/book/admin/returns?page=0&size=3&sort=returnDate,desc`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setReturns(response.data.data.returns);
      } else {
        console.error("반납 조회 실패", response.data);
      }
    } catch (error) {
      console.log(token);
      console.error("반납 조회 중 오류 발생:", error);
    }
  }, [SERVER, token]);

  // 예약 목록을 가져오는 함수
  const fetchReservations = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER}/book/admin/reservations?page=0&size=3&sort=reservationDate%2Casc`, {
        headers: {
          'Authorization': `Bearer ${token}`, // 토큰을 헤더에 추가
        },
      });

      if (response.data.success) {
        setReservations(response.data.data.reservations);
      } else {
        console.error("예약 조회 실패", response.data);
      }
    } catch (error) {
      console.error("예약 조회 중 오류 발생:", error);
    }
  }, [SERVER, token]);

  // 대출 목록을 가져오는 함수
  const fetchLoans = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER}/book/admin/loans?page=0&size=3&sort=borrowDate,asc`, {
        headers: {
          'Authorization': `Bearer ${token}`, // 토큰을 헤더에 추가
        },
      });

      if (response.data.success) {
        setLoans(response.data.data.loans);
      } else {
        console.error("대여 조회 실패", response.data);
      }
    } catch (error) {
      console.error("대여 조회 중 오류 발생:", error);
    }
  }, [SERVER, token]);

  // 반납 처리 함수 추가
  const returnLoan = async (loanId) => {
    try {
      const response = await axios.post(`${SERVER}/book/admin/${loanId}/return`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        fetchLoans();
        fetchReturns();
      } else {
        console.error("반납 처리 실패", response.data);
      }
    } catch (error) {
      console.error("반납 처리 중 오류 발생:", error);
    }
  };

  // 반납 현황 조회 useEffect
  useEffect(() => {
    fetchReturns();
  }, [fetchReturns]);

  // 예약 목록을 가져오는 useEffect
  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // 대출 목록을 가져오는 useEffect
  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  // 상태 변경 함수 추가
  const updateReturnStatus = async (reservationId, newStatus) => {
    try {
      const response = await axios.post(`${SERVER}/book/admin/${reservationId}/return/correct?status=${newStatus}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`, // 토큰을 헤더에 추가
        },
      });

      if (response.data.success) {
        fetchReturns(); // 상태 변경 후 반납 목록 갱신
      } else {
        console.error("상태 변경 실패", response.data);
      }
    } catch (error) {
      console.error("상태 변경 중 오류 발생:", error);
    }
  };

  // 목데이터 설정
  useEffect(() => {
    const mockReservations = [
      { title: '책 제목 1', reserver: '사용자 A', date: '2023-10-01', status: '대기' },
      { title: '책 제목 2', reserver: '사용자 B', date: '2023-10-02', status: '대기' },
    ];
    const mockReturns = [
      { title: '책 제목 5', name: '사용자 C', startdate: '2023-09-25', enddate: '2023-10-10', status: '반납' },
      { title: '책 제목 6', name: '사용자 D', startdate: '2023-09-25', enddate: '2023-10-10', status: '연체' },
    ];

    setReservations(mockReservations);
    setReturns(mockReturns);
  }, []);

  return (
    <>
      <Header />
      <div className={style.container}>
        {/* 예약 현황 */}
        <div className={`${style.section} ${style.reservationSection}`}>
          <h2 className={style.title}>예약 현황</h2>
          <table className={style.table}>
            <thead>
              <tr>
                <th>도서 ID</th>
                <th>도서 제목</th>
                <th>예약 ID</th>
                <th>사용자 ID</th>
                <th>사용자 이름</th>
                <th>예약 날짜</th>
                <th>승인</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.reservationId}>
                  <td>{reservation.bookId}</td>
                  <td>{reservation.bookTitle}</td>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.userId}</td>
                  <td>{reservation.userName}</td>
                  <td>{new Date(reservation.reservationDate).toLocaleString()}</td>
                  <td>
                    <button className={style.button} onClick={() => acceptReservation(reservation.reservationId)}>승인</button>
                  </td>
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
                    <button className={style.button} onClick={() => returnLoan(loan.reservationId)}>반납</button>
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
                      onChange={(e) => updateReturnStatus(returnItem.reservationId, e.target.value)}
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

export default BookManagement;