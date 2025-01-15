import styles from "./Book.module.css";
import Tag from "../Tag/Tag";

const Book = () => {
  return (
    <div className={styles.container}>
      <hr />
      <div className={styles.contents}>
        <div className={styles.bookImage}>
          <img src="https://picsum.photos/200"></img>
        </div>
        <div className={styles.bookIntro}>
          <h2>제목</h2>
          <p>저자 : 어쩌고 저쩌고</p>
          <p>발행처 : 어쩌고 저쩌고</p>
          <p>발행년 : 어쩌고 저쩌고</p>
          <Tag />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Book;
