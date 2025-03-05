import React from 'react';
import style from './BookManage.module.css';

const LoanStatus = ({ loans, returnLoan }) => {
    return (
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
    );
};

export default LoanStatus; 