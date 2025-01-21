import { Link } from "react-router-dom";
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
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <div className="verticalLine"> </div>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
