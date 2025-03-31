import style from './BookDetailsMobile.module.css';

const BookDetailsMobile = ({ book, requestReservation, requestCancel, canReserved }) => {
    const bookStatus = {
        AVAILABLE: "대여 가능",
        RESERVED: "예약중",
        FULLY_RESERVED: "예약 불가",
    };

    return (
        <div className={style.mobileContainer}>
            {/* 모바일에 최적화된 헤더 */}
            <div className={style.mobileHeader}>
                <h2>{book?.title}</h2>
            </div>
            <hr />

            <div className={style.contents}>
                <div className={style.bookImage}>
                    <img
                        src={book?.bookUrl || "https://picsum.photos/200"}
                        alt={book?.title}
                        className={style.mobileImage}
                    />
                </div>

                <div className={style.bookDetails}>
                    <ul>
                        <li>제목: {book?.title}</li>
                        <li>저자: {book?.author}</li>
                        <li>발행처: {book?.publisher}</li>
                        <li>발행년: {book?.publishYear}</li>
                        <li>상태: {bookStatus[book?.status]}</li>
                        <li>예약: {book?.borrowCount}명</li>
                    </ul>
                </div>
            </div>

            <hr />
            <div className={style.buttonGroup}>
                <button
                    disabled={canReserved}
                    className={canReserved ? style.disableButton : style.button}
                    onClick={requestCancel}
                >
                    취소
                </button>
                <button
                    disabled={book?.borrowCount >= 3 || !canReserved}
                    className={book?.borrowCount >= 3 ? style.disableButton : style.button}
                    onClick={requestReservation}
                >
                    예약
                </button>
            </div>
        </div>
    );
};

export default BookDetailsMobile; 