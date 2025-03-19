import style from "./BookDetails.module.css";

const BookDetails = ({
  book,
  requestReservation,
  requestCancel,
  canReserved,
}) => {
  const bookStatus = {
    AVAILABLE: "대여 가능",
    RESERVED: "예약중",
    FULLY_RESERVED: "예약 불가",
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h2>{book?.title}</h2>
        <hr />
        <div className={style.contents}>
          <div className={style.bookImage}>
            <img
              src={book?.bookUrl || "https://picsum.photos/200"}
              alt={book?.title}
            ></img>
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
        <div className={style.button}>
          <button
            disabled={canReserved}
            className={canReserved ? style.disableButton : style.button}
            onClick={requestCancel}
          >
            취소
          </button>
          <button
            disabled={book?.borrowCount >= 3 || !canReserved}
            className={
              book?.borrowCount >= 3 ? style.disableButton : style.button
            }
            onClick={requestReservation}
          >
            예약
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
