import Hero from "../../components/Hero/Hero";
import BookDetails from "../../components/BookDetails/BookDetails";
import Layout from "../../components/Layout/Layout";
import useUserStore from "../../../store/useUserStore";
import GuestBlock from "../../components/GuestBlock/GuestBlock";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestWithAuth } from "../../utils/requestWithAuth";
import swal from "sweetalert";
import { useLogout } from "../../hooks/useLogout";

const BookInfo = () => {
  const [book, setBook] = useState(null);
  const isLogined = useUserStore((state) => state.isLogined);
  const [canReserved, setCanReserved] = useState(true);
  const logout = useLogout();

  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await requestWithAuth(
          "GET",
          `/books/${id}`,
          null,
          logout
        );
        // console.log("도서 정보", response);

        if (!response || !response.success) {
          throw new Error();
        }

        const bookData = response.data; // ← book을 상태에 저장하기 전 변수에 담음
        setBook(bookData);

        // 동기적으로 예약 상태 설정
        if (
          bookData.reservationStatus === "RESERVED" ||
          bookData.reservationStatus === "BORROWING"
        ) {
          setCanReserved(false);
        } else {
          setCanReserved(true);
        }
      } catch (error) {
        swal({
          title: "도서 정보를 불러오는 데 실패했습니다.",
          button: "확인",
          icon: "error",
        });
        logout();
      }
    };

    if (id) fetchBookDetails();
  }, [id]);

  const updatedBookStatus = (borrowCount) => {
    if (borrowCount === 0) return "AVAILABLE"; // 대여 가능
    if (borrowCount >= 3) return "FULLY_RESERVED"; // 예약 불가
    return "RESERVED"; // 예약 중
  };

  const requestReservation = async () => {
    try {
      const response = await requestWithAuth(
        "POST",
        `/books/reservation/${book?.id}`,
        null,
        logout
      );

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

        setBook((prevBook) => {
          const updatedCount = prevBook.borrowCount + 1;
          return {
            ...prevBook,
            borrowCount: updatedCount,
            status: updatedBookStatus(updatedCount), //계산한 값을 전달
          };
        });

        setCanReserved(!canReserved);
        return true;
      }
    } catch (error) {
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
            text: "다시 로그인 해주세요.",
            icon: "error",
            button: "완료",
          });
          logout();
          return null;
      }
    }
  };

  const requestCancel = async () => {
    //책 id와 토큰 보내기
    try {
      const response = await requestWithAuth(
        "DELETE",
        `/books/reservation/${book?.id}`,
        null,
        logout
      );
      if (response.success) {
        swal({
          title: "예약이 취소되었습니다.",
          text: "필요할 때 언제든 다시 예약할 수 있습니다.",
          icon: "success",
          button: "완료",
        });

        setBook((prevBook) => {
          const updatedCount = prevBook.borrowCount - 1;
          return {
            ...prevBook,
            borrowCount: updatedCount,
            status: updatedBookStatus(updatedCount), //계산한 값을 전달
          };
        });

        setCanReserved(!canReserved);
        return true;
      }
    } catch (error) {
      // console.log("예약 취소 관련 에러", error);
      if (error.code === "B003") {
        //해당하는 예약이 존재하지 않는 경우
        swal({ title: error.msg, button: "확인", icon: "error" });
      } else {
        swal({
          title: "예약 취소에 실패하였습니다.",
          text: "관리자에게 문의해주세요.",
          button: "확인",
          icon: "error",
        });
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
              canReserved={canReserved}
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
