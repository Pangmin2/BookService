import axios from "axios";

const ACCESS_TOKEN = "accessToken";
const SERVER = import.meta.env.VITE_SERVER_URL;
const HTTPS = import.meta.env.VITE_HTTPS_URL;

//refresh token으로 access token 재발급 받기
export const RefreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${HTTPS}/refreshToken`,
      // {},
      { withCredentials: true }
    );
    const newAccessToken = response.data.data;

    if (response.data.success) {
      localStorage.setItem(ACCESS_TOKEN, response.data.data);
      console.log("새로운 Access Token 발급 완료");
      return newAccessToken;
    }
  } catch (error) {
    //Refresh Token이 만료된 경우 재로그인
    if (error.response?.data.code === "A008") {
      alert("세션이 만료되어 재로그인이 필요합니다.");
      console.error(error.response?.data.msg);
      return null;
    } else if (error.response?.data.code === "A009")
      alert("세션이 만료되어 재로그인이 필요합니다.");
    console.error(error.response?.data.msg);
    return null;
  }
};
