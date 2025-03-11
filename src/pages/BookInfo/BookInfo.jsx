import Hero from "../../components/Hero/Hero";
import BookDetails from "../../components/BookDetails/BookDetails";
import Layout from "../../components/Layout/Layout";
import useUserStore from "../../../store/useUserStore";
import GuestBlock from "../../components/GuestBlock/GuestBlock";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestWithAuth } from "../../utils/requestWithAuth";
import swal from "sweetalert";
import useBookStore from "../../../store/useBookStore";

const BookInfo = () => {
  const [book, setBook] = useState(null);
  const isLogined = useUserStore((state) => state.isLogined);
  const setIsLogined = useUserStore((state) => state.setIsLogined);

  const addReservation = useBookStore((state) => state.addReservation);
  const removeReservation = useBookStore((state) => state.removeReservation);
  const isReserved = useBookStore((state) => state.isReserved);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await requestWithAuth("GET", `/books/${id}`);
        // console.log(response);

        if (response === null) {
          throw new Error();
        }
        if (response.success) {
          setBook(response.data);
          if (
            book?.reservationStatus === "RESERVED" ||
            book?.reservationStatus === "BORROWING"
          ) {
            addReservation(response.data.id);
          }
        }
      } catch (error) {
        console.error("도서 정보를 가져오는 데 실패했습니다.", error);
        setIsLogined(false);
        navigate("/login");
      }
    };

    if (id) fetchBookDetails();
  }, [id]);

  const requestReservation = async () => {
    try {
      const response = await requestWithAuth(
        "POST",
        `/books/reservation/${book?.id}`
      );
      console.log("응답: ", response);

      if (response === null) {
        throw new Error();
      }
      if (response.success) {
        swal({
          title: "예약이 접수되었습니다.",
          text: "도서가 준비되면 연락드리겠습니다.",
          icon: "success",
          button: "완료",
        });

        setBook((prevBook) => ({
          ...prevBook,
          borrowCount: prevBook.borrowCount + 1, // 예약 인원 증가
        }));
        addReservation(book?.id);
        console.log(response.data);
        return true;
      }
    } catch (error) {
      console.log("현재 에러:", error.response.data);
      const ERROR = error.response.data;
      switch (ERROR.code) {
        case "B002":
          swal({
            title: "예약 불가",
            text: "현재 예약 가능한 인원이 모두 찼습니다.",
            icon: "error",
            button: "완료",
          });
          console.error(error.msg);
          return null;
        case "B007":
          swal({
            title: "예약 불가",
            text: "이미 예약 신청중인 도서입니다.",
            icon: "error",
            button: "완료",
          });
          console.error(error.msg);
          return null;
        default:
          swal({
            title: "예약 신청 실패",
            text: "다시 로그인 후 요청해주세요.",
            icon: "error",
            button: "완료",
          });
          setIsLogined(false);
          navigate("/login");
          console.error("토큰 만료로 요청 실패: ", error);
          return null;
      }
    }
  };

  const requestCancel = async () => {
    //책 id와 토큰 보내기
    try {
      const response = await requestWithAuth(
        "DELETE",
        `/books/reservation/${book?.id}`
      );
      console.log("취소:", response);
      if (response.success) {
        swal({
          title: "예약이 취소되었습니다.",
          text: "필요할 때 언제든 다시 예약할 수 있습니다.",
          icon: "success",
          button: "완료",
        });

        setBook((prevBook) => ({
          ...prevBook,
          borrowCount: prevBook.borrowCount - 1, // 예약 인원 감소
        }));
        removeReservation(book?.id);
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
    <Layout
      hero={isLogined ? <Hero section="도서 상세" /> : null}
      content={
        isLogined ? (
          book ? (
            <BookDetails
              book={book}
              requestReservation={requestReservation}
              requestCancel={requestCancel}
              canReserved={!isReserved(book?.id)}
            />
          ) : (
            <div>도서 정보를 불러오는 중...</div>
          )
        ) : (
          <GuestBlock />
        )
      }
    />
  );
};
export default BookInfo;
