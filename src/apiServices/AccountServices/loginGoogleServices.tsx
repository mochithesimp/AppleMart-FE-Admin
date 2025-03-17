import { AxiosError } from "axios";
import request from "../../utils/request";

export const loginGoogle = async (idToken: string, email: string, name: string, phoneNumber: string) => {
  try {
    const res = await request.post("Account/GoogleLogin", {idToken, email, name, phoneNumber});
    // console.log("check data search: ", res);
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