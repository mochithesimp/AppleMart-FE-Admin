import axios from "axios";
import * as request from "../../utils/request";

export const getUser = async () => {
  try {
    const res = await request.get("User/GetAll");
    //console.log("check data add: ", res);
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
    const response = await axios.put(`https://localhost:7140/api/User/${userId}`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (userId: string) => {
  try {
    const res = await axios.delete(`https://localhost:7140/api/User/${userId}`);
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
