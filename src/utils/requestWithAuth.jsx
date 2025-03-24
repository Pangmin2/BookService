import axios from "axios";
import { RefreshAccessToken } from "./token";

const SERVER = import.meta.env.VITE_SERVER_URL;
const ACCESS_TOKEN = "accessToken";

export const requestWithAuth = async (
  method,
  endpoint,
  data = null,
  logout
) => {
  try {
    let accessToken = localStorage.getItem(ACCESS_TOKEN);

    const config = {
      method,
      url: `${SERVER}${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      // ...(method !== "GET" && { data: data ?? {} }), // GET 요청이면 data 제거, null이면 빈 객체로 변환
      data,
    };

    // 최초 API 요청
    const response = await axios(config);
    // console.log("API 요청 성공:", response.data);
    return response.data; // 정상적인 응답 반환
  } catch (error) {
    console.error("요청 에러 발생:", error);

    const ERROR = error.response.data;

    // 액세스 토큰이 위조되거나 유효하지 않은 경우 (A005)
    if (ERROR.code === "A005") {
      logout();
      return null;
    }

    // 액세스 토큰 만료(A007) 또는 액세스 토큰 존재X(C001) 시 새로운 토큰으로 재요청
    if (ERROR.code === "A007" || ERROR.cod === "C001") {
      console.log("액세스 토큰 만료됨. 리프레시 토큰을 사용하여 갱신 시도...");
      const newAccessToken = await RefreshAccessToken();

      if (newAccessToken === null) {
        logout();
        return null;
      }

      // 새로운 토큰을 저장 후 다시 요청
      console.log("새로운 토큰으로 API 재요청...");
      try {
        const retryConfig = {
          method,
          url: `${SERVER}${endpoint}`,
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            "Content-Type": "application/json",
          },
          data,
        };

        const retryResponse = await axios(retryConfig);
        console.log("재요청 성공:", retryResponse.data);
        return retryResponse.data;
      } catch (retryError) {
        console.error("재요청 실패:", retryError.response?.data || retryError);
        return null;
      }
    }

    // 기타 오류 처리
    console.error("알 수 없는 API 오류:", ERROR);
    throw error;
  }
};
