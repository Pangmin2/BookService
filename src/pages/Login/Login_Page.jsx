import style from "./Login_Page.module.css";
import swal from "sweetalert";
import UserInput from "../../components/UserInput/UserInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useUserStore from "../../../store/useUserStore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const SERVER = import.meta.env.VITE_SERVER_URL;
const ACCESS_TOKEN = "accessToken";

const Login = () => {
  const [login_userInfo, setLogin_userInfo] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const setIsLogined = useUserStore((state) => state.setIsLogined);
  const setRole = useUserStore((state) => state.setRole);
  const setUserName = useUserStore((state) => state.setUserName);
  const setUserDepartment = useUserStore((state) => state.setUserDepartment);

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin_userInfo({
      ...login_userInfo,
      [name]: value,
    });
  };

  //로그인 요청 핸들러
  const login_Handler = async (e) => {
    e.preventDefault();
    if (login_userInfo.username && login_userInfo.password) {
      try {
        const response = await axios.post(
          `${SERVER}/login`,
          {
            username: login_userInfo.username,
            password: login_userInfo.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.data.success) {
          console.log(response.data.data.message);
          localStorage.setItem(ACCESS_TOKEN, response.data.data.accessToken);
          setIsLogined(true);
          setRole(response.data.data.role);
          setUserName(response.data.data.name);
          setUserDepartment(response.data.data.department);
          navigate("/"); // 로그인 후 이동할 페이지 설정
        }
      } catch (error) {
        swal({
          text: error.response.data.msg,
          button: "확인",
          icon: "error",
        });
      }
    } else {
      swal({
        title: "모든 필드를 입력해주세요.",
        button: "확인",
        icon: "warning",
      });
    }
  };

  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.contents}>
        <div className={style.container}>
          <div className={style.title}>
            <h1>로그인</h1>
          </div>
          <form onSubmit={login_Handler}>
            <div className={style.webMail}>
              <UserInput
                type="text"
                placeholder="웹메일"
                value={login_userInfo.username}
                name="username"
                onChange={onChange}
              />
            </div>
            <div className={style.passWord}>
              <UserInput
                type="password"
                placeholder="비밀번호"
                value={login_userInfo.password}
                name="password"
                onChange={onChange}
              />
            </div>
            <div className={style.findPasswd}>
              <Link to="/findform">비밀번호 찾기</Link>
            </div>
            <div>
              <button className={style.loginButton}>로그인</button>
            </div>
            <div className={style.horizontalLine}></div>
            <div>
              <button
                className={style.signupButton}
                type="button"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
