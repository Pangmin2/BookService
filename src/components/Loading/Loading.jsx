import style from "./Loading.module.css";
import { RiLoader2Line } from "react-icons/ri";

const Loading = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.icon}>
        <RiLoader2Line />
      </div>
      <span>페이지 로딩중</span>
    </div>
  );
};

export default Loading;
