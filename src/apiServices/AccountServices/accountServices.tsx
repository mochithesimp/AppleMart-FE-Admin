/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as request from "../../utils/request";

export const checkMail = async (email: string) => {
    try {
      const res = await request.post(
        `Account/checkMail?email=${encodeURIComponent(email)}`
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
        `Account/checkMailExist?email=${encodeURIComponent(email)}`
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
        `Account/resetPassword?email=${encodeURIComponent(email)}`
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
        `Account/changePassword?email=${email}&password=${newPassword}`
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
      const res = await axios.post('https://localhost:7140/api/Account/Register', registerValues);
      return res;
    } catch (error) {
      console.log(error);
    }
  };