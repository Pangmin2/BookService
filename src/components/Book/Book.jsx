import styles from "./Book.module.css";
import Tag from "../Tag/Tag";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.bookImage}>
          <img
            src={book.bookUrl || "https://picsum.photos/200"}
            alt={book.title}
          ></img>
        </div>
        <div className={styles.bookIntro}>
          <Link to="/book_info" state={{ id: book.id }}>
            <h2>제목: {book.title}</h2>
          </Link>
          <p>저자 : {book.author}</p>
          <p>발행처 : {book.publisher}</p>
          <p>발행년 : {book.publishYear}</p>
          <Tag status={book.status} />
        </div>
      </div>
    </div>
  );
};

export default Book;
