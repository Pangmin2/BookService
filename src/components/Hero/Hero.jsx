import { useState } from "react";
import styles from "./Hero.module.css";

const Hero = ({ onSearch }) => {
  const [searchTitle, setSearchTitle] = useState("");

  const searchHandler = () => {
    onSearch(searchTitle);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.contents}>
        <h1>도서 검색</h1>
        <div className={styles.search}>
          <input
            placeholder="검색어를 입력하세요."
            value={searchTitle}
            onChange={(e) => {
              setSearchTitle(e.target.value);
            }}
          ></input>
          <button onClick={searchHandler}>검색</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
