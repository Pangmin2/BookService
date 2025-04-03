import { useState } from "react";
import style from "./Hero.module.css";

const Hero = ({ section, onSearch }) => {
  const [searchTitle, setSearchTitle] = useState("");

  const searchHandler = () => {
    onSearch(searchTitle);
  };

  return (
    <section>
      <div className={style.contents}>
        <h1>{section || "제목"}</h1>
        {onSearch && (
          <div className={style.search}>
            <input
              placeholder="검색어를 입력하세요."
              value={searchTitle}
              onChange={(e) => {
                setSearchTitle(e.target.value);
              }}
            />
            <button onClick={searchHandler}>검색</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
