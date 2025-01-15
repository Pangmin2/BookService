import styles from "./BookDetails.module.css";
const BookDetails = () => {
  return (
    <div className={styles.container}>
      <h2>HTTP 완벽 가이드</h2>
      <hr />
      <div className={styles.contents}>
        <div className={styles.bookImage}>
          <img src="https://picsum.photos/200"></img>
        </div>
        <div className={styles.bookDetails}>
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
      <div className={styles.button}>
        <button>대기</button>
        <button>예약</button>
      </div>
    </div>
  );
};

export default BookDetails;
