import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import useUserStore from "../../../store/useUserStore";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const isLogined = useUserStore((state) => state.isLogined);
  const setIsLogined = useUserStore((state) => state.setIsLogined);

  const onLogout = () => {
    setIsLogined(false);
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
  };

  return (
    <header>
      <div className={style.HeaderContents}>
        <div className={style.bars} onMouseEnter={() => setIsMenuVisible(true)}>
          <FaBars />
        </div>
        {isMenuVisible && (
          <div
            className={style.sideMenu}
            onMouseLeave={() => setIsMenuVisible(false)}
            onMouseEnter={() => setIsMenuVisible(true)}
          >
            <div className={style.profileSection}>
              <div className={style.profileImage}>{/* 프로필 이미지 */}</div>
              <div className={style.profileInfo}>
                {/* 프로필 정보, 추후 수정해야함 */}
                <h3>관리자</h3>
                <p>컴퓨터공학과</p>
              </div>
            </div>
            <ul>
              <li>
                <a href="/">메인 홈</a>
              </li>
              <li>
                <a href="/book_admin">도서 등록</a>
              </li>
              <li>
                <a href="/book_manage">도서 관리</a>
              </li>
              <li>
                <a href="/member_manage">부원 관리</a>
              </li>
              <li>
                <a href="/my_book_page">도서 대여 현황</a>
              </li>
              <li>
                <a href="/my_info_page">마이페이지</a>
              </li>
            </ul>
          </div>
        )}
        <nav className={style.navigation}>
          <ul>
            <li>
              {isLogined ? (
                <span onClick={onLogout} style={{ cursor: "pointer" }}>
                  로그아웃
                </span>
              ) : (
                <Link to="/login">로그인</Link>
              )}
            </li>
            <li>
              <div></div>
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
