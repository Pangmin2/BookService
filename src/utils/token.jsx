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

    // console.log("Refresh Token 응답:", response.data);

    if (response.data.success && response.data.data) {
      const newAccessToken = response.data.data;
      localStorage.setItem(ACCESS_TOKEN, newAccessToken);
      // console.log("새로운 Access Token 발급 완료:", newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    // console.error("Refresh Token 요청 실패:", error.response?.data || error);
    const ERROR_CODE = error.response?.data.code;
    switch (ERROR_CODE) {
      // case "A008": //고의로 쿠키에서 RT를 삭제한 경우
      //   break;
      case "A009": //RT가 유효하지 않은 경우
      case "A010": //RT가 만료된 경우
        break;
      default:
        // console.log(error.response?.data?.msg);
        break;
    }
    return null;
  }
};
