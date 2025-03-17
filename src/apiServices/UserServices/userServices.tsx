import axios from "axios";
import * as request from "../../utils/request";

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await request.get("User/GetAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async (userId: string) => {
  try {
    const res = await request.get(`User/${userId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (userId: string, formData: unknown) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://localhost:7140/api/User/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `https://localhost:7140/api/User/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
