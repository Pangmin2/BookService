import React from 'react';
import style from './BookManage.module.css';

const ReservationStatus = ({ reservations, acceptReservation }) => {
    return (
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
    );
};

export default ReservationStatus; 