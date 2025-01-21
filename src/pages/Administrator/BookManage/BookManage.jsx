import React, { useEffect, useState } from 'react';
import styles from './BookManage.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer'

const BookManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loans, setLoans] = useState([]);
  const [returns, setReturns] = useState([]);

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
      <div className={styles.container}>
        {/* 예약 현황 */}
        <div className={`${styles.section} ${styles.reservationSection}`}>
          <h2 className={styles.title}>예약 현황</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>제목</th>
                <th>예약자</th>
                <th>예약일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={index}>
                  <td>{reservation.title}</td>
                  <td>{reservation.reserver}</td>
                  <td>{reservation.date}</td>
                  <td>
                    <button className={styles.approveButton}>승인</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {/* 대출 현황 */}
      <div className={`${styles.section} ${styles.loanSection}`}>
        <h2 className={styles.title}>대출 현황</h2>
        <table className={styles.table}>
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
                  <button className={styles.returnButton}>반납</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* 반납 현황 */}
        <div className={`${styles.section} ${styles.returnSection}`}>
          <h2 className={styles.title}>반납 현황</h2>
          <table className={styles.table}>
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
                      className={returnItem.status === '반납' ? styles.statusReturn : styles.statusOverdue}
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