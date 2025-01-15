import React, { useEffect, useState } from 'react';
import styles from './BookManage.module.css';

const BookManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loans, setLoans] = useState([]);
  const [returns, setReturns] = useState([]);

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
      { title: '책 제목 3', date: '2023-09-25' },
      { title: '책 제목 4', date: '2023-09-26' },
    ];
    const mockReturns = [
      { title: '책 제목 5', returner: '사용자 C', status: '반납' },
      { title: '책 제목 5', returner: '사용자 C', status: '반납' },
      { title: '책 제목 5', returner: '사용자 C', status: '반납' },
      { title: '책 제목 5', returner: '사용자 C', status: '반납' },
      { title: '책 제목 6', returner: '사용자 D', status: '연체' },
    ];

    setReservations(mockReservations);
    setLoans(mockLoans);
    setReturns(mockReturns);
  }, []);

  return (
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
        <div className={styles.cardContainer}>
          {loans.map((loan, index) => (
            <div className={styles.card} key={index}>
              <p>{loan.title}</p>
              <p>{loan.date}</p>
              <div className={styles.buttonGroup}>
                <button className={styles.returnButton}>반납</button>
                <button className={styles.extendButton}>연체</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 반납 현황 */}
      <div className={`${styles.section} ${styles.returnSection}`}>
        <h2 className={styles.title}>반납 현황</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>제목</th>
              <th>반납자</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((returnItem, index) => (
              <tr key={index}>
                <td>{returnItem.title}</td>
                <td>{returnItem.returner}</td>
                <td className={returnItem.status === '반납' ? styles.statusReturn : styles.statusOverdue}>
                  {returnItem.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;