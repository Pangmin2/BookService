import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import useUserStore from "../../store/useUserStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const setIsLogined = useUserStore((state) => state.setIsLogined);

  return () => {
    setIsLogined(false);
    localStorage.removeItem("login_state");

    swal({
      title: "세션이 만료되었습니다.",
      text: "다시 로그인해 주세요.",
      icon: "error",
      button: "확인",
    }).then(() => {
      navigate("/login");
    });
  };
};
