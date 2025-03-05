import React from 'react';
import style from './BookManage.module.css';

const ReturnStatus = ({ returns, updateReturnStatus }) => {
    return (
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
    );
};

export default ReturnStatus; 