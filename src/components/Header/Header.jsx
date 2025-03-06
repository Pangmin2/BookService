import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import useUserStore from "../../../store/useUserStore";
import swal from 'sweetalert';

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const isLogined = useUserStore((state) => state.isLogined);
  const setIsLogined = useUserStore((state) => state.setIsLogined);
  const role = useUserStore((state) => state.role);
  const setRole = useUserStore((state) => state.setRole);

  const onLogout = () => {
    setIsLogined(false);
    setRole(null);
    localStorage.removeItem("accessToken");
    swal("로그아웃", "로그아웃 되었습니다.", "success");
  };

  const adminMenuItems = [
    { path: "/", label: "메인 홈" },
    { path: "/book_admin", label: "도서 등록" },
    { path: "/book_manage", label: "도서 관리" },
    { path: "/member_manage", label: "부원 관리" },
    { path: "/my_book_page", label: "도서 대여 현황" },
    { path: "/my_info_page", label: "마이페이지" },
  ];

  const userMenuItems = [
    { path: "/", label: "메인 홈" },
    { path: "/my_book_page", label: "도서 대여 현황" },
    { path: "/my_info_page", label: "마이페이지" },
  ];

  const menuItems = role === "ADMIN" ? adminMenuItems : userMenuItems;

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
                <h3>{role === "ADMIN" ? "관리자" : "사용자"}</h3>
                <p>컴퓨터공학과</p>
              </div>
            </div>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
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