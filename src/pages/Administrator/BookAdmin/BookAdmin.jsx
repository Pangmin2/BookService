import React, { useState, useEffect } from "react";
import style from "./BookAdmin.module.css";
import axios from "axios";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER_URL; // 서버 주소
const token = localStorage.getItem("accessToken");

const BookAdmin = () => {
  const navigate = useNavigate();
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
      // 1. 파일 업로드 URL 요청
      const uploadResponse = await axios.post(
        `${SERVER}/files/bookImage/upload-url`,
        {
          fileName: form.selectedFile.name,
          contentType: form.selectedFile.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!uploadResponse.data.success) {
        throw new Error("이미지 업로드 URL 받기 실패");
      }

      const { url: uploadUrl, fileId } = uploadResponse.data.data;

      // 2. 파일을 해당 URL로 업로드
      await axios.put(uploadUrl, form.selectedFile, {
        headers: {
          'Content-Type': form.selectedFile.type,
        },
      });

      // 3. 도서 등록 API 호출 - year를 정수로 변환하여 전송
      const bookResponse = await axios.post(
        `${SERVER}/book/admin`,
        {
          title: form.title,
          author: form.author,
          publisher: form.publisher,
          publishYear: parseInt(form.year), // 문자열을 정수로 변환
          fileId: fileId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!bookResponse.data.success) {
        throw new Error("도서 등록 실패");
      }

      // 성공 시 처리
      await swal({
        title: "도서 등록 완료",
        text: "도서가 성공적으로 등록되었습니다.",
        icon: "success",
        button: "확인",
      });

      navigate('/'); // 홈으로 이동

    } catch (error) {
      console.error("도서 등록 중 오류 발생:", error);
      await swal({
        title: "도서 등록 실패",
        text: "도서 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
        icon: "error",
        button: "확인",
      });
    }
  };

  // 취소 버튼 핸들러 수정
  const handleCancel = async () => {
    const willCancel = await swal({
      title: "작성 취소",
      text: "작성 중인 내용이 모두 삭제됩니다. 계속하시겠습니까?",
      icon: "warning",
      buttons: ["취소", "확인"],
      dangerMode: true,
    });

    if (willCancel) {
      setForm({
        title: "",
        author: "",
        publisher: "",
        year: "",
        selectedFile: null
      });
    }
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.bookFormContainer}>
          <div className={style.formHeader}>
            <h2>도서 등록</h2>
          </div>
          <div className={style.formContent}>
            <form onSubmit={handleSubmit} className={style.bookRegistrationForm}>

              <div className={style.formGroup}>
                <label>제목</label>
                <div className={style.inputWrapper}>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="제목을 입력하세요"
                  />
                </div>
              </div>

              <div className={style.formGroup}>
                <label>저자</label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="저자가 2명이상인 경우 ,를 써주세요"
                />
              </div>

              <div className={style.formGroup}>
                <label>발행처</label>
                <input
                  type="text"
                  name="publisher"
                  value={form.publisher}
                  onChange={handleChange}
                  placeholder="발행처를 입력하세요"
                />
              </div>

              <div className={style.formGroup}>
                <label>출판년도</label>
                <input
                  type="text"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="출판년도를 입력하세요 (예: 2024)"
                  maxLength="4" // 4자리 연도만 입력 가능하도록 제한
                  pattern="\d{4}" // 숫자 4자리만 허용
                />
              </div>
              <div className={style.fileUploadSection}>
                <span>파일 선택</span>
                <div className={style.uploadBox}>
                  <input
                    type="file"
                    id="bookImage"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="bookImage" className={style.browseButton}>Browse</label>
                  <span className={style.fileName}>
                    {form.selectedFile ? form.selectedFile.name : "파일을 선택해주세요"}
                  </span>
                </div>
              </div>

              <div className={style.formActions}>
                <div className={style.buttonGroup}>
                  <button type="button" onClick={handleCancel} className={style.cancelButton}>
                    초기화
                  </button>
                  <button type="button" className={style.draftButton}>
                    등록된 도서 확인
                  </button>
                  <button type="submit" className={style.submitButton}>
                    등록
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAdmin;
