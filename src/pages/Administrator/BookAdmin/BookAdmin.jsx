import React, { useState, useEffect } from "react";
import style from "./BookAdmin.module.css";
import axios from "axios";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const SERVER = import.meta.env.VITE_SERVER_URL; // 서버 주소
const HTTPS = import.meta.env.VITE_HTTPS_URL; // HTTPS 주소
const token = localStorage.getItem("accessToken");

const BookAdmin = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
    selectedFile: null, // 선택된 파일 상태 추가
  });
  const [imageForm, setImageForm] = useState({
    imageTitle: "", // 이미지 제목 상태 추가
    selectedFile: null, // 선택된 파일 상태 추가
  });
  const [fileId, setFileId] = useState(null); // fileId 상태 추가
  const [uploadUrl, setUploadUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setImageForm({
      ...imageForm,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      selectedFile: e.target.files[0], // 선택된 파일 저장
    });
  };

  // 이미지 업로드 URL 요청 함수
  const getUploadUrl = async (fileName) => {
    try {
      const response = await axios.post(`${SERVER}/files/bookImage/upload-url`, {
        fileName: fileName,
        contentType: 'image/jpeg',
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const { fileId } = response.data.data; // fileId 추출
        setFileId(fileId); // fileId 상태 업데이트
        return response.data.data.url; // S3 URL 반환
      } else {
        console.error("업로드 URL 요청 실패", response.data);
      }
    } catch (error) {
      console.error("업로드 URL 요청 중 오류 발생:", error);
    }
  };

  // 도서 등록 함수 추가
  const registerBook = async (bookData) => {
    if (!fileId) {
      console.error("fileId가 없습니다.");
      return;
    }

    try {
      const response = await axios.post(`${SERVER}/book/admin`, {
        ...bookData,
        fileId: fileId, // fileId 포함
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log("도서 등록 성공", response.data);
        // 도서 등록 후 필요한 작업 수행
      } else {
        console.error("도서 등록 실패", response.data);
      }
    } catch (error) {
      console.error("도서 등록 중 오류 발생:", error);
    }
  };

  // 목데이터 설정
  useEffect(() => {
    // 필요한 데이터 가져오기
  }, []);

  const handleRegister = async () => {
    const uploadUrl = await getUploadUrl("책이미지.jpg"); // 이미지 파일 이름
    // 파일 업로드 로직 추가 (예: axios.put(uploadUrl, file))
    await registerBook({ title: "책 제목", author: "저자", publisher: "출판사", publishYear: 2023 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 파일 업로드 URL 요청
      const uploadResponse = await axios.post(`${SERVER}/files/bookImage/upload-url`, {
        fileName: form.selectedFile.name, // 파일 이름 사용
        contentType: form.selectedFile.type, // 파일의 MIME 타입
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (uploadResponse.data.success) {
        setUploadUrl(uploadResponse.data.data.url); // 업로드 URL 저장
        setFileId(uploadResponse.data.data.fileId); // fileId 저장
        console.log("이미지 업로드 URL 받기 성공", uploadResponse.data);

        // 파일을 해당 URL로 업로드
        const fileUploadResponse = await axios.put(uploadResponse.data.data.url, form.selectedFile, {
          headers: {
            'Content-Type': form.selectedFile.type, // 파일의 MIME 타입
          },
        });

        if (fileUploadResponse.status === 200) {
          alert("파일이 성공적으로 업로드되었습니다.");

          // 도서 등록 API 호출
          await registerBook({
            title: form.title,
            author: form.author,
            publisher: form.publisher,
            publishYear: form.year,
          });
        } else {
          console.error("파일 업로드 실패", fileUploadResponse);
        }
      } else {
        console.error("이미지 업로드 URL 받기 실패", uploadResponse.data);
      }
    } catch (error) {
      console.error("도서 등록 중 오류 발생:", error);
      alert("도서 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        {/* 도서 등록 섹션 */}
        <div className={style.bookFormContainer}>
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
            <div className={style.formGroup}>
              <label>파일 선택</label>
              <input
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <hr />
            <div className={style.formActions}>
              <button type="button" onClick={() => setForm({ title: "", author: "", publisher: "", year: "", selectedFile: null })} className={style.cancelButton}>
                취소
              </button>
              <button type="submit" className={style.submitButton}>
                완료
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAdmin;
