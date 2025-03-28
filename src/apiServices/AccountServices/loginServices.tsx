import { AxiosError } from "axios";
import request from "../../utils/request";

export const login = async (email: string, password: string) => {
  try {
    const res = await request.post("/api/Account/Login", { email, password });
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}