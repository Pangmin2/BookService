import style from "./Login_Page.module.css";
import UserInput from "../../components/UserInput/UserInput";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  return (
    <>
      <Header />
      <div className={style.Content}>
        <div className={style.container}>
          <div className={style.title}>
            <h1>로그인</h1>
          </div>
          <div className={style.contents}>
            <form onSubmit={""}>
              <div className={style.webMail}>
                <UserInput
                  type="text"
                  placeholder="웹메일"
                  value={""}
                  name="mail"
                  onChange={""}
                />
              </div>
              <div className={style.passWord}>
                <UserInput
                  type="password"
                  placeholder="비밀번호"
                  value={""}
                  name="passwd"
                  onChange={""}
                />
              </div>
            </form>
            {/* NavLink로 링크 관리하기 */}
            <div className={style.findPasswd}>비밀번호 찾기</div>
            <div>
              <button className={style.loginButton} type="submit">
                로그인
              </button>
            </div>
            <hr />
            <div>
              <button className={style.signupButton} type="button" onClick={""}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
