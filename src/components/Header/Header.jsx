import styles from "./Header.module.css";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div 
          className={styles.bars}
          onMouseEnter={() => setIsMenuVisible(true)}
        >
          <FaBars />
        </div>
        {isMenuVisible && (
          <div 
            className={styles.sideMenu}
            onMouseLeave={() => setIsMenuVisible(false)}
            onMouseEnter={() => setIsMenuVisible(true)}
          >
            <div className={styles.profileSection}>
              <div className={styles.profileImage}>
                {/* 프로필 이미지 */}
              </div>
              <div className={styles.profileInfo}>
                {/* 프로필 정보, 추후 수정해야함 */}
                <h3>관리자</h3>
                <p>컴퓨터공학과</p>
              </div>
            </div>
            <ul>
              <li><a href="/bookassign">도서 등록</a></li>
              <li><a href="/membermanage">부원 관리</a></li>
            </ul>
          </div>
        )}
        <nav className={styles.navigation}>
          <ul>
            <li><a href="/">로그인</a></li>
            <li><div className="verticalLine"> </div></li>
            <li><a href="/">회원가입</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

// TODO: bars 수평 중앙에 위치하도록록
