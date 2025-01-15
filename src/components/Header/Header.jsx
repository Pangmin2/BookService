import styles from "./Header.module.css";
import { FaBars } from "react-icons/fa";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.bars}>
          <FaBars />
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <a href="/">로그인</a>
            </li>
            <li>
              <div className="verticalLine"> </div>
            </li>
            <li>
              <a href="/">회원가입</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

// TODO: bars 수평 중앙에 위치하도록록
