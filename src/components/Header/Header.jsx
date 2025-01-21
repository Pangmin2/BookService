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
                <h3>홍길동</h3>
                <p>컴퓨터공학과</p>
              </div>
            </div>
            <ul>
              <li><a href="/mypage">마이페이지</a></li>
              <li><a href="/posts">게시글 작성</a></li>
              <li><a href="/notice">공지사항</a></li>
              <li><a href="/activities">활동</a></li>
              <li><a href="/resources">자료 공유</a></li>
              <li><a href="/board">자유 게시판</a></li>
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
