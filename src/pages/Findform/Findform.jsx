import React, { useState } from "react";
import axios from "axios";
import style from "./Findform.module.css";
import UserInput from "../../components/UserInput/UserInput";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const SERVER = import.meta.env.VITE_SERVER_URL;

const Findform = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 비밀번호 찾기 함수
  const findPassword = async () => {
    const url = `${SERVER}/login/password`;
    const data = {
      username: formData.email,
      name: formData.name,
      student_id: formData.id,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      console.log(result);
      if (result.success) {
        console.log(data);
        alert("비밀번호 찾기 성공: " + result.data);
      } else {
        alert("비밀번호 찾기 실패: " + result.code);
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("오류 발생: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    findPassword();
  };

  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.contents}>
        <div className={style.container}>
          <h1 className={style.title}>비밀번호 찾기</h1>
          <form className={style.form} onSubmit={handleSubmit}>
            <UserInput
              type="email"
              placeholder="이메일"
              name="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={50}
            />
            <UserInput
              type="text"
              placeholder="이름"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={20}
            />
            <UserInput
              type="text"
              placeholder="아이디"
              name="id"
              value={formData.id}
              onChange={handleChange}
              maxLength={20}
            />
            <button type="submit" className={style.submitButton}>
              비밀번호 찾기
            </button>
          </form>
          <div className={style.links}>
            <a href="/signup" className={style.link}>
              회원가입하기
            </a>
            <div className={style.verticalLine}> </div>
            <a href="/login" className={style.link}>
              로그인하기
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Findform;
