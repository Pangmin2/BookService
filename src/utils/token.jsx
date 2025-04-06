import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER_URL;

// Refresh Token을 이용해 새로운 Access Token 발급
export const RefreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${SERVER}/refreshToken`,
      {},
      { withCredentials: true }
    );
    console.error("Refresh Token 요청 성공", response);
    if (response.data.success === true) {
      return true;
    }
  } catch (error) {
    console.error("Refresh Token 요청 실패:", error.response?.data || error);
    return null;
  }
};
