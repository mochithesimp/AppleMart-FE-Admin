/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as request from "../../utils/request";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const checkMail = async (email: string) => {
    try {
      const res = await request.post(
        `/api/Account/checkMail?email=${encodeURIComponent(email)}`
      ,
      {
        headers: {
            'Content-Type': 'application/json',
        },
      }
    )
      //console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const checkMailExist = async (email: string) => {
    try {
      const res = await request.post(
        `/api/Account/checkMailExist?email=${encodeURIComponent(email)}`
      ,
      {
        headers: {
            'Content-Type': 'application/json',
        },
      }
    )
      //console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const resetPassword = async (email: string) => {
    try {
      const res = await request.post(
        `/api/Account/resetPassword?email=${encodeURIComponent(email)}`
      ,
      {
        headers: {
            'Content-Type': 'application/json',
        },
      }
    )
      //console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const changePassword = async (email: any, newPassword: string) => {
    try {
      const res = await request.post(
        `/api/Account/changePassword?email=${email}&password=${newPassword}`
      ,
      {
        headers: {
            'Content-Type': 'application/json',
        },
      }
    )
      //console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const register = async (registerValues: any) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/Account/Register`, registerValues);
      return res;
    } catch (error) {
      console.log(error);
    }
  };