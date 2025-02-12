import React, { useState } from "react";
import styles from "./Findform.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UserInput from "../../components/UserInput/UserInput";

const Findform = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>비밀번호 찾기</h2>
        <form className={styles.form}>
          <UserInput
            type="text"
            placeholder="아이디"
            name="id"
            value={formData.id}
            onChange={handleChange}
            maxLength={30}
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
            type="email"
            placeholder="이메일"
            name="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={50}
          />
          <button className={styles.submitButton}>비밀번호 찾기</button>
        </form>
        <div className={styles.links}>
          <a href="/signup" className={styles.link}>회원가입하기</a>
          <a href="/login" className={styles.link}>로그인하기</a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Findform;
