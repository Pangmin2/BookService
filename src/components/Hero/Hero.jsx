import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.contents}>
        <h1>도서 검색</h1>
        <div className={styles.search}>
          <input placeholder="검색어를 입력하세요."></input>
          <button>검색</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
