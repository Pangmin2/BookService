import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import useUserStore from "../../../store/useUserStore";
import swal from "sweetalert";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const isLogined = useUserStore((state) => state.isLogined);
  const setIsLogined = useUserStore((state) => state.setIsLogined);
  const role = useUserStore((state) => state.role);
  const name = useUserStore((state) => state.name);
  const department = useUserStore((state) => state.department);

  const [toggle, setToggle] = useState(false);

  const onLogout = () => {
    swal("로그아웃", "로그아웃 되었습니다.", "success").then(() => {
      setIsLogined(false);
      localStorage.removeItem("accessToken");
      setIsMenuVisible(false); // 로그아웃 하면 메뉴바 안열리도록
    });
  };

  const adminMenuItems = [
    { path: "/", label: "메인 홈" },
    { path: "/book_admin", label: "도서 등록" },
    { path: "/book_edit", label: "도서 수정" },
    { path: "/book_manage", label: "도서 관리" },
    { label: "도서 대여 현황", isExpandable: true },
    { path: "/mypage", label: "마이페이지" },
  ];

  const userMenuItems = [
    { path: "/", label: "메인 홈" },
    { label: "도서 대여 현황", isExpandable: true },
    { path: "/mypage", label: "마이페이지" },
  ];

  const menuItems =
    role === "ADMIN"
      ? adminMenuItems
      : role === "USER"
      ? userMenuItems
      : userMenuItems;

  // 도서 대여 현황 클릭 시 항목을 펼치기 위한 함수
  const confirmMyBookStatus = () => {
    setToggle(!toggle);
  };

  return (
    <header>
      <div className={style.HeaderContents}>
        <div
          className={style.bars}
          onMouseEnter={() => {
            if (isLogined) setIsMenuVisible(true);
          }}
        >
          <FaBars />
        </div>
        {isMenuVisible && isLogined && (
          <div
            className={style.sideMenu}
            onMouseLeave={() => setIsMenuVisible(false)}
            onMouseEnter={() => setIsMenuVisible(true)}
          >
            <div className={style.profileSection}>
              <div className={style.profileImage}>{/* 프로필 이미지 */}</div>
              <div className={style.profileInfo}>
                <h3>{name || "사용자"}</h3>
                <p>
                  {department || "학과정보 없음"} /{" "}
                  {role === "ADMIN" ? "관리자" : "사용자"}
                </p>
              </div>
            </div>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.isExpandable ? (
                    <>
                      <button onClick={confirmMyBookStatus}>
                        {item.label}
                      </button>
                      {toggle && (
                        <ul className={style.subMenu}>
                          <li>
                            <Link to="/reservedBook">예약 현황</Link>
                          </li>
                          <li>
                            <Link to="/borrowingBook">대출 현황</Link>
                          </li>
                          <li>
                            <Link to="/revertBook">반납 현황</Link>
                          </li>
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link to={item.path}>{item.label}</Link>
                  )}
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
