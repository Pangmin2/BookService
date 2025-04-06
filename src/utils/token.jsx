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
    return response.data.success ?? false;
  } catch (error) {
    console.error("Refresh Token 요청 실패:", error.response?.data || error);
    return null;
  }
};
