import React, { useState } from "react";
import styles from "./BookAdmin.module.css";

const BookAdmin = () => {
  const [form, setForm] = useState({
    title: "",
    image: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", form);
  };

  return (
    <div className={styles.bookRegistrationContainer}>
      <h1>도서 등록</h1>
      <hr />
      <form onSubmit={handleSubmit} className={styles.bookRegistrationForm}>
        {[
          { label: "제목", name: "title", placeholder: "여기에 제목을 입력하세요" },
          { label: "이미지 등록", name: "image", placeholder: "이미지 URL을 입력하세요" },
          { label: "저자", name: "author", placeholder: "저자를 입력하세요" },
          { label: "발행처", name: "publisher", placeholder: "발행처를 입력하세요" },
          { label: "발행년도", name: "year", placeholder: "발행년도를 입력하세요" },
        ].map(({ label, name, placeholder }, index) => (
          <div key={index} className={styles.formGroup}>
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
        <div className={styles.formActions}>
          <button
            type="button"
            onClick={() => setForm({ title: "", image: "", author: "", publisher: "", year: "" })}
            className={styles.cancelButton}
          >
            취소
          </button>
          <button type="submit" className={styles.submitButton}>
            완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAdmin;
