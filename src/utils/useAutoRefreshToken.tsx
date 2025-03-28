import { useEffect } from "react";
import { refreshToken } from "../apiServices/AccountServices/refreshTokenServices";

const useAutoRefreshToken = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error("Auto refresh token failed:", error);
      }
    }, 2 * 60 * 1000); // Làm mới token mỗi 10 phút

    return () => clearInterval(interval);
  }, []);
};

export default useAutoRefreshToken;
