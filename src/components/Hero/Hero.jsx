import { useState } from "react";
import style from "./Hero.module.css";

const Hero = ({ section, onSearch }) => {
  const [searchTitle, setSearchTitle] = useState("");

  const searchHandler = () => {
    onSearch(searchTitle);
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSearch(searchTitle);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    setSearchTitle(value);
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
              onChange={onChange}
              onKeyDown={onKeydown}
            />
            <button onClick={searchHandler}>검색</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
