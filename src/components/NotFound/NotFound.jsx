import style from "./NotFound.module.css";
import { BiSolidMessageSquareError } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.icon}>
        <BiSolidMessageSquareError />
      </div>
      <span>존재하지 않는 페이지입니다.</span>
    </div>
  );
};

export default NotFound;
