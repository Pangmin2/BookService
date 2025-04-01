import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import style from "./Findform.module.css";
import UserInput from "../../components/UserInput/UserInput";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER_URL;

const Findform = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });
  const navigate = useNavigate();

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
      if (result.success) {
        swal({
          title: "임시 비밀번호가 발급되었습니다.",
          text: "웹메일을 확인해주세요.",
          icon: "success",
          button: "확인",
        }).then(() => navigate("/login"));
        return;
      }
    } catch (error) {
      if (error.response.data.code === "A003") {
        swal({
          title: "존재하지 않는 사용자입니다.",
          text: "모든 정보를 올바르게 입력했는지 확인해주세요.",
          icon: "error",
          button: "확인",
        });
        return;
      }
      console.error("오류 발생:", error);
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
              placeholder="학번"
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
              회원가입
            </a>
            <div className={style.verticalLine}> </div>
            <a href="/login" className={style.link}>
              로그인
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Findform;
