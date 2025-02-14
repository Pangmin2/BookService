import { useLocation } from "react-router-dom";
import style from "./BookDetails.module.css";
import { useEffect, useState } from "react";
import { requestWithAuth } from "../../utils/requestWithAuth";

const BookDetails = () => {
  const location = useLocation();
  const id = location.state.id;
  const [canCancel, setCanCancel] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    console.log("마운트");
    console.log("전달된 id값", id);
  }, []);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log("요청하는 URL:", `/books/${id}`);
        const response = await requestWithAuth("GET", `/books/${id}`);
        console.log(response);
        if (response.success) {
          setBook(response.data);
        }
      } catch (error) {
        alert("도서 정보를 가져오는 데 실패했습니다.");
        console.error("도서 정보를 가져오는 데 실패했습니다.", error);
      }
    };

    if (id) fetchBookDetails();
  }, [id]);

  const bookStatus = {
    AVAILABLE: "대여 가능",
    RESERVED: "예약중",
    FULLY_RESERVED: "예약 불가",
  };

  const requestReservation = async () => {
    try {
      const response = await requestWithAuth(
        "POST",
        `/books/reservation/${book.id}`
      );
      console.log("응답: ", response);
      console.log(response.success);
      if (response.success) {
        alert("예약 신청 성공");
        setCanCancel(true);
        //TODO 예약 신청하면 재렌더링 돼서 인원바로 변경되도록
        console.log(response.data);
        return true;
      }
    } catch (error) {
      console.log("현재 에러:", error);
      switch (error.code) {
        case "B002":
          alert("현재 예약 가능한 인원이 모두 찼습니다.");
          console.error(error.msg);
          return null;
        case "B007":
          alert("이미 예약 신청중인 도서입니다.");
          console.error(error.msg);
          return null;
        default:
          alert("예약 신청 실패");
          console.error("알 수 없는 에러러러: ", error);
          return null;
      }
    }
  };

  const requestCancel = async () => {
    //책 id와 토큰 보내기
    try {
      const response = await requestWithAuth(
        "DELETE",
        `/books/reservation/${book.id}`
      );
      console.log("취소:", response);
      if (response.success) {
        alert("예약 취소 요청 성공");
        console.log(response.data);
        return true;
      }
    } catch (error) {
      console.log("예약 취소 관련 에러", error);
      if (error.code === "B003") {
        alert(error.msg);
        console.warn(error.msg);
      } else {
        alert("예약 취소 실패");
        console.warn(error);
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h2>{book?.title}</h2>
        <hr />
        <div className={style.contents}>
          <div className={style.bookImage}>
            <img
              src={book?.bookUrl || "https://picsum.photos/200"}
              alt={book?.title}
            ></img>
          </div>
          <div className={style.bookDetails}>
            <ul>
              <li>제목: {book?.title}</li>
              <li>저자: {book?.author}</li>
              <li>발행처: {book?.publisher}</li>
              <li>발행년: {book?.publishYear}</li>
              <li>상태: {bookStatus[book?.status]}</li>
              <li>예약: {book?.borrowCount}명</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className={style.button}>
          <button
            disabled={!canCancel}
            className={!canCancel ? style.disableButton : style.button}
            onClick={requestCancel}
          >
            취소
          </button>
          <button
            disabled={book?.borrowCount >= 3}
            className={
              book?.borrowCount >= 3 ? style.disableButton : style.button
            }
            onClick={requestReservation}
          >
            예약
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
