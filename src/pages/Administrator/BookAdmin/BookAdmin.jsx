import React, { useState } from "react";
import style from "./BookAdmin.module.css";
import axios from "axios";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const BookAdmin = () => {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJreW91bmcxNjc4QG5hdmVyLmNvbSIsImlhdCI6MTczNzY5NDQ5OSwiZXhwIjoxNzM3Njk4MDk5LCJzdWIiOiJreW91bmcwMTYxQGt1bW9oLmFjLmtyIiwiaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXX0.yR8hQ6swQzzB_MRko-N0BMq-Jmodhf-AANQvMMpTHV4";
  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://43.200.3.98:80/book/admin', {
        title: form.title,
        author: form.author,
        publisher: form.publisher,
        publishYear: form.year,
        fileId: 4,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log("도서 등록 성공", response.data);
        setForm({ title: "", author: "", publisher: "", year: "" });
      } else {
        console.error("도서 등록 실패", response.data);
      }
    } catch (error) {
      console.error("도서 등록 중 오류 발생:", error);
      alert("도서 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Header />
      <div className={style.bookRegistrationContainer} style={{ marginTop: '50px' }}>
        <h1>도서 등록</h1>
        <hr />
        <form onSubmit={handleSubmit} className={style.bookRegistrationForm}>
          {[
            { label: "제목", name: "title", placeholder: "여기에 제목을 입력하세요" },
            { label: "저자", name: "author", placeholder: "저자를 입력하세요" },
            { label: "발행처", name: "publisher", placeholder: "발행처를 입력하세요" },
            { label: "발행년도", name: "year", placeholder: "발행년도를 입력하세요" },
          ].map(({ label, name, placeholder }, index) => (
            <div key={index} className={style.formGroup}>
              <label>{label}</label>
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
              />
            </div>
          ))}
          <hr />
          <div className={style.formActions}>
            <button
              type="button"
              onClick={() => setForm({ title: "", author: "", publisher: "", year: "" })}
              className={style.cancelButton}
            >
              취소
            </button>
            <button type="submit" className={style.submitButton}>
              완료
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BookAdmin;
