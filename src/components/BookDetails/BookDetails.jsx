import style from "./BookDetails.module.css";
const BookDetails = () => {
  return (
    <div className={style.container}>
      <h2>HTTP 완벽 가이드</h2>
      <hr />
      <div className={style.contents}>
        <div className={style.bookImage}>
          <img src="https://picsum.photos/200"></img>
        </div>
        <div className={style.bookDetails}>
          <ul>
            <li>제목: 어쩌고저쩌고</li>
            <li>저자: 어쩌고저쩌고</li>
            <li>발행처: 어쩌고저쩌고</li>
            <li>발행년: 어쩌고저쩌고</li>
            <li>상태: 대여가능 or 예약중(2)</li>
            <li>예약: 2명</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className={style.button}>
        <button>예약</button>
      </div>
    </div>
  );
};

export default BookDetails;
