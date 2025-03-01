import axios from "axios";

const ACCESS_TOKEN = "accessToken";
const SERVER = import.meta.env.VITE_SERVER_URL;

// Refresh Token을 이용해 새로운 Access Token 발급
export const RefreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${SERVER}/refreshToken`,
      {},
      { withCredentials: true }
    );

    console.log("Refresh Token 응답:", response.data);

    if (response.data.success && response.data.data) {
      const newAccessToken = response.data.data;
      localStorage.setItem(ACCESS_TOKEN, newAccessToken);
      console.log("새로운 Access Token 발급 완료:", newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error("Refresh Token 요청 실패:", error.response?.data || error);

    if (
      error.response?.data.code === "A008" ||
      error.response?.data.code === "A009"
    ) {
      // alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
      // 로그인 페이지로 이동
      return null;
    }

    console.warn("알 수 없는 오류 발생:", error.response?.data?.msg);
    return null;
  }
};
