import axios from "axios";
import { RefreshAccessToken } from "./token";

const SERVER = import.meta.env.VITE_SERVER_URL;
const HTTPS = import.meta.env.VITE_HTTPS_URL;

export const requestWithAuth = async (method, endpoint, data = null) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const config = {
      method,
      url: `${SERVER}${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data,
    };

    const response = await axios(config);
    console.log("API 요청 성공:", response.data);
    return response.data; //성공 응답 반환
  } catch (error) {
    console.error(error.response.data.code);
    console.error("API 요청 실패", error);

    const ERROR = error.response.data;
    switch (ERROR.code) {
      case "C001": //액세스 토큰이 존재하지 않는 경우
        alert("로그인이 필요합니다.");
        console.warn("AT가 존재하지 않음.");
        return null;
      case "A007": {
        //액세스 토큰이 만료된 경우
        console.log("access token 만료");
        const accessToken = await RefreshAccessToken();
        if (accessToken) {
          //새로운 Access Token으로 다시 요청
          const retryConfig = {
            method,
            url: `${HTTPS}${endpoint}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
            data,
          };

          try {
            const retryResponse = await axios(retryConfig);
            return retryResponse.data;
          } catch (retryError) {
            console.error("재요청 실패:", retryError);
            return null;
          }
        } else {
          alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
          console.warn("Refresh Token도 만료됨. 다시 로그인 필요.");
          return null;
        }
      }
      case "A005": //액세스 토큰이 위조되어 유효하지 않은 경우
        alert(
          "사용자의 액세스 정보가 올바르지 않습니다. 계정 보호를 위해 다시 로그인해 주세요."
        );
        console.log("AT가 유효하지 않음");
        return null;
      default:
        // alert("알 수 없는 에러");
        console.error("알 수 없는 에러:", ERROR);

        return ERROR;
    }
  }
};
