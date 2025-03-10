import React from 'react';
import style from './BookManage.module.css';

const ReturnStatus = ({ returns, updateReturnStatus, currentPage, totalPages, onPageChange }) => {
    // 페이지 버튼 생성 함수
    const renderPageButtons = () => {
        const buttons = [];

        // 이전 페이지 버튼
        buttons.push(
            <button
                key="prev"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={style.pageButton}
            >
                이전
            </button>
        );

        // 페이지 번호 버튼들
        for (let i = 0; i < totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`${style.pageButton} ${currentPage === i ? style.activePage : ''}`}
                >
                    {i + 1}
                </button>
            );
        }

        // 다음 페이지 버튼
        buttons.push(
            <button
                key="next"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className={style.pageButton}
            >
                다음
            </button>
        );

        return buttons;
    };

    return (
        <div className={`${style.section} ${style.returnSection}`}>
            <h2 className={style.title}>반납 현황</h2>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>도서 ID</th>
                        <th>도서 제목</th>
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
                            <td>{returnItem.userName}</td>
                            <td>{new Date(returnItem.borrowDate).toLocaleString()}</td>
                            <td>{new Date(returnItem.returnDate).toLocaleString()}</td>
                            <td>
                                <select
                                    value={returnItem.status}
                                    onChange={(e) => updateReturnStatus(returnItem.reservationId, e.target.value)}
                                    className={returnItem.status === 'RETURNED' ? style.statusReturn : style.statusOverdue}
                                >
                                    <option value="RETURNED">반납</option>
                                    <option value="OVERDUE_RETURNED">연체</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={style.pagination}>
                {renderPageButtons()}
            </div>
        </div>
    );
};

export default ReturnStatus; 