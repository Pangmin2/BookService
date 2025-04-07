import React, { useEffect, useState } from "react";
import style from "./BookEdit.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import axios from "axios";
import swal from "sweetalert";

const BookEdit = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loans, setLoans] = useState([]);
  const [returns, setReturns] = useState([]);
  const SERVER = import.meta.env.VITE_SERVER_URL;
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${SERVER}/books`, {
          withCredentials: true
        });
        if (response.data.success) {
          setBooks(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [SERVER]);

  const handleDragStart = (e, book) => {
    e.dataTransfer.setData("book", JSON.stringify(book));
  };

  const handleEditDrop = (e) => {
    e.preventDefault();
    const book = JSON.parse(e.dataTransfer.getData("book"));
    setEditingBook(book);
  };

  const handleDeleteDrop = (e) => {
    e.preventDefault();
    const book = JSON.parse(e.dataTransfer.getData("book"));
    setDeletingBook(book);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleEditSubmit = async () => {
    try {
      const editData = {
        title: editingBook.title,
        author: editingBook.author,
        publisher: editingBook.publisher,
        publishYear: editingBook.publishYear,
      };

      const response = await axios.put(
        `${SERVER}/book/admin?bookId=${editingBook.id}`,
        editData,
        {
          withCredentials: true
        }
      );

      if (response.data.success) {
        setBooks(
          books.map((book) =>
            book.id === editingBook.id ? { ...book, ...editData } : book
          )
        );
        setEditingBook(null);
        swal("성공", "도서가 성공적으로 수정되었습니다.", "success");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      swal("오류", "도서 수정 중 오류가 발생했습니다.", "error");
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await axios.delete(
        `${SERVER}/book/admin?bookId=${deletingBook.id}`,
        {
          withCredentials: true
        }
      );

      if (response.data.success) {
        setBooks(books.filter((book) => book.id !== deletingBook.id));
        setDeletingBook(null);
        swal("성공", "도서가 성공적으로 삭제되었습니다.", "success");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      swal("오류", "도서 삭제 중 오류가 발생했습니다.", "error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    // 파일 선택 시 미리보기 생성
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      swal("오류", "업로드할 이미지를 선택해주세요.", "error");
      return;
    }

    try {
      // 이미지 파일 타입 체크
      if (!selectedFile.type.startsWith('image/')) {
        throw new Error('이미지 파일만 업로드 가능합니다.');
      }

      // 이미지 수정 URL 받아오기
      const urlResponse = await axios.post(
        `${SERVER}/files/bookImage/update-url?bookImageId=${editingBook.bookImageId}`,
        {
          fileName: editingBook.bookUrl.split('/').pop(),
          contentType: 'image/jpeg'
        },
        {
          withCredentials: true
        }
      );

      if (!urlResponse.data.success || !urlResponse.data.data.url) {
        throw new Error('업로드 URL을 받아오는데 실패했습니다.');
      }

      const uploadUrl = urlResponse.data.data.url;

      // 받아온 URL에 새로운 이미지 파일 업로드
      const uploadResponse = await axios.put(uploadUrl, selectedFile, {
        headers: {
          'Content-Type': selectedFile.type,
        },
      });

      if (uploadResponse.status !== 200) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      swal("성공", "도서 이미지가 성공적으로 업로드되었습니다.", "success");

      // 성공 후 books 상태 업데이트
      setBooks(books.map(book =>
        book.id === editingBook.id
          ? { ...book, bookUrl: previewImage }
          : book
      ));

      // 업로드 후 상태 초기화
      setSelectedFile(null);
      setPreviewImage(null);

    } catch (error) {
      console.error("Error uploading image:", error);
      swal("오류", `이미지 업로드 중 오류가 발생했습니다: 
        ${error.message}`, "error");
    }
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.section}>
          <h2 className={style.title}>도서 목록</h2>
          <table className={style.table}>
            <thead>
              <tr>
                <th>표지</th>
                <th>도서 ID</th>
                <th>도서 제목</th>
                <th>저자</th>
                <th>출판 연도</th>
                <th>출판사</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, book)}
                >
                  <td>
                    {book.bookUrl && (
                      <img
                        src={book.bookUrl}
                        alt={`${book.title} cover`}
                        style={{ width: "50px", height: "auto" }}
                      />
                    )}
                  </td>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishYear}</td>
                  <td>{book.publisher}</td>
                  <td>{book.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={style.rightContainer}>
          <div
            className={`${style.section} ${style.editSection}`}
            onDrop={handleEditDrop}
            onDragOver={handleDragOver}
          >
            <h2 className={style.title}>도서 수정</h2>
            {editingBook && (
              <div className={style.editForm}>
                <input
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                  placeholder="도서 제목"
                />
                <input
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                  placeholder="저자"
                />
                <input
                  value={editingBook.publishYear}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      publishYear: e.target.value,
                    })
                  }
                  placeholder="출판 연도"
                />
                <input
                  value={editingBook.publisher}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      publisher: e.target.value,
                    })
                  }
                  placeholder="출판사"
                />
                <button onClick={handleEditSubmit}>수정하기</button>
                <div></div>
                <div className={style.imageUpload}>
                  <div className={style.imageUploadRow}>
                    {(editingBook.bookUrl || previewImage) && (
                      <img
                        src={previewImage || editingBook.bookUrl}
                        alt="현재 도서 이미지"
                        style={{ width: "100px", height: "auto" }}
                      />
                    )}
                    <div className={style.buttonColumn}>
                      <label className={style.fileInputLabel}>
                        파일 선택
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className={style.fileInput}
                        />
                      </label>
                      <button className={style.uploadButton} onClick={handleImageUpload}>
                        이미지 수정하기
                      </button>
                      {selectedFile && (
                        <span style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                          선택된 파일: {selectedFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={`${style.section} ${style.deleteSection}`}
            onDrop={handleDeleteDrop}
            onDragOver={handleDragOver}
          >
            <h2 className={style.title}>도서 삭제</h2>
            {deletingBook && (
              <div className={style.deleteConfirm}>
                <p>{deletingBook.title} 도서를 삭제하시겠습니까?</p>
                <button onClick={handleDeleteSubmit}>삭제하기</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookEdit;