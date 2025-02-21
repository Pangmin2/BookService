import style from "./Login_Page.module.css";
import UserInput from "../../components/UserInput/UserInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import useUserStore from "../../../store/useUserStore";

const SERVER = import.meta.env.VITE_SERVER_URL;
const HTTPS = import.meta.env.VITE_HTTPS_URL;
const ACCESS_TOKEN = "accessToken";

const Login = () => {
  const [login_userInfo, setLogin_userInfo] = useState({
    username: "",
    password: "",
  });

  const [isValid, setIsValid] = useState({
    username: false,
    password: false,
  });

  const navigate = useNavigate();
  const setIsLogined = useUserStore((state) => state.setIsLogined);

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin_userInfo({
      ...login_userInfo,
      [name]: value,
    });

    if (name === "username") {
      setIsValid({ ...isValid, [name]: value.includes("@kumoh.ac.kr") });
    } else if (name === "password") {
      setIsValid({ ...isValid, [name]: value.length >= 10 });
    }
  };

  //로그인 요청 핸들러
  const login_Handler = async (e) => {
    e.preventDefault();
    console.log(`${HTTPS}/login`);
    const validInput = Object.values(isValid).every((value) => value === true);
    if (validInput) {
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
          console.log(response.data.data.msg);
          localStorage.setItem(ACCESS_TOKEN, response.data.data.accessToken);
          setIsLogined(true);
          navigate("/"); // 로그인 후 이동할 페이지 설정
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("모든 필드를 입력해주세요.");
      console.log(isValid);
    }
  };

  return (
    <>
      <Layout
        content={
          <div className={style.wrapper}>
            <div className={style.container}>
              <div className={style.title}>
                <h1>로그인</h1>
              </div>
              <div className={style.contents}>
                <form onSubmit={login_Handler}>
                  <div className={style.webMail}>
                    <UserInput
                      type="text"
                      placeholder="웹메일"
                      value={login_userInfo.username}
                      name="username"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className={style.passWord}>
                    <UserInput
                      type="password"
                      placeholder="비밀번호"
                      value={login_userInfo.password}
                      name="password"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div>
                    <button className={style.loginButton} type="submit">
                      로그인
                    </button>
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
                  <div className={style.findPasswd}>
                    <Link to="/findform">비밀번호 찾기</Link>
                    <div className={style.verticalLine}> </div>
                    <Link to="/change_password">비밀번호 변경</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Login;
