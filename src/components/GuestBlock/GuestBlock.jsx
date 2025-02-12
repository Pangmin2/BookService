import { SlLock } from "react-icons/sl";
import style from "./GuestBlock.module.css";

const GuestBlock = () => {
  return (
    <div className={style.container}>
      <div className={style.lock}>
        <SlLock />
      </div>
      <p className={style.msg}>회원만 접근 가능합니다.</p>
    </div>
  );
};

export default GuestBlock;
