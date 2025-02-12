import React, { useEffect, useState } from 'react';
import style from './BookManage.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer'
import axios from 'axios';

const BookManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loans, setLoans] = useState([]);
  const [returns, setReturns] = useState([]);
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJreW91bmcxNjc4QG5hdmVyLmNvbSIsImlhdCI6MTczNzY5NDQ5OSwiZXhwIjoxNzM3Njk4MDk5LCJzdWIiOiJreW91bmcwMTYxQGt1bW9oLmFjLmtyIiwiaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXX0.yR8hQ6swQzzB_MRko-N0BMq-Jmodhf-AANQvMMpTHV4";
  
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

  {/*
    const handleStatusChange = async (index, newStatus) => {
      try {
        const returnItem = returns[index];
        
        // 백엔드 API 호출
        const response = await axios.put('API_URL/returns/status', {
          returnId: returnItem.id, // 반납 기록의 고유 ID
          status: newStatus,
          // 필요한 추가 데이터
        }, {
          headers: {
            'Content-Type': 'application/json',
            // 필요한 경우 인증 토큰 추가
            // 'Authorization': `Bearer ${token}`
          }
        });

        if (response.status !== 200) {
          throw new Error('상태 변경에 실패했습니다.');
        }

        // API 호출이 성공하면 로컬 상태 업데이트
        const updatedReturns = returns.map((item, i) => {
          if (i === index) {
            return { ...item, status: newStatus };
          }
          return item;
        });
        setReturns(updatedReturns);

      } catch (error) {
        console.error('상태 변경 중 오류 발생:', error);
        alert('상태 변경에 실패했습니다. 다시 시도해주세요.');
      }
    };
     */}

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://43.200.3.98:80/book/admin/reservations?page=0&size=3&sort=reservationDate%2Casc', {
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
        console.log(token);
        console.error("예약 조회 중 오류 발생:", error);
      }
    };

    fetchReservations();
  }, );

  useEffect(() => {
    // 목데이터 설정
    const mockReservations = [
      { title: '책 제목 1', reserver: '사용자 A', date: '2023-10-01', status: '대기' },
      { title: '책 제목 2', reserver: '사용자 B', date: '2023-10-02', status: '대기' },
      { title: '책 제목 2', reserver: '사용자 B', date: '2023-10-02', status: '대기' },
      { title: '책 제목 2', reserver: '사용자 B', date: '2023-10-02', status: '대기' },
      { title: '책 제목 2', reserver: '사용자 B', date: '2023-10-02', status: '대기' },
      { title: '책 제목 2', reserver: '사용자 B', date: '2023-10-02', status: '대기' },
      { title: '책 제목 2', reserver: '사용자 B', date: '2023-10-02', status: '대기' },
    ];
    const mockLoans = [
      { title: '책 제목 3', name:'사용자 A', startdate: '2023-09-25', enddate: '2023-10-10' },
      { title: '책 제목 4', name:'사용자 A', startdate: '2023-09-26', enddate: '2023-10-11' },
    ];
    const mockReturns = [
      { title: '책 제목 5', name: '사용자 C',startdate: '2023-09-25', enddate: '2023-10-10', status: '반납' },
      { title: '책 제목 5', name: '사용자 C',startdate: '2023-09-25', enddate: '2023-10-10', status: '반납' },
      { title: '책 제목 5', name: '사용자 C',startdate: '2023-09-25', enddate: '2023-10-10', status: '반납' },
      { title: '책 제목 5', name: '사용자 C',startdate: '2023-09-25', enddate: '2023-10-10', status: '반납' },
      { title: '책 제목 6', name: '사용자 D',startdate: '2023-09-25', enddate: '2023-10-10', status: '연체' },
    ];

    setReservations(mockReservations);
    setLoans(mockLoans);
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
              <th>제목</th>
              <th>이름</th>
              <th>대출일</th>
              <th>반납예정일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={index}>
                <td>{loan.title}</td>
                <td>{loan.name}</td>
                <td>{loan.startdate}</td>
                <td>{loan.enddate}</td>
                <td>
                  <button className={style.returnButton}>반납</button>
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
                <th>제목</th>
                <th>반납자</th>
                <th>대출일</th>
                <th>반납일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((returnItem, index) => (
                <tr key={index}>
                  <td>{returnItem.title}</td>
                  <td>{returnItem.name}</td>
                  <td>{returnItem.startdate}</td>
                  <td>{returnItem.enddate}</td>
                  <td>
                    <select
                      value={returnItem.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className={returnItem.status === '반납' ? style.statusReturn : style.statusOverdue}
                    >
                      <option value="반납">반납</option>
                      <option value="연체">연체</option>
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