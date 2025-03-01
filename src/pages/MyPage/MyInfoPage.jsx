import style from "./MyInfoPage.module.css";
import Layout from "../../components/Layout/Layout";
import Hero from "../../components/Hero/Hero";
import UserInput from "../../components/UserInput/UserInput";

const MyPage = () => {
  return (
    <>
      <Layout
        hero={<Hero section="마이페이지" />}
        content={
          <div className={style.wrapper}>
            <h2>회원 정보</h2>
            <form>
              <div>사진</div>
              <div>
                <label>웹메일</label>
                <UserInput />
              </div>
              <div>
                <label>비밀번호</label>
                <UserInput />
              </div>
              <div>
                <label>이름</label>
                <UserInput />
              </div>
              <div>
                <label>학과</label>
                <UserInput />
              </div>
              <div>
                <label>학번</label>
                <UserInput />
              </div>
              <div>
                <label>학년</label>
                <UserInput />
              </div>
              <div>
                <label>전화번호</label>
                <UserInput />
              </div>
            </form>
          </div>
        }
      />
    </>
  );
};

export default MyPage;
