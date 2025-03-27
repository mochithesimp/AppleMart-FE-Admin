import axios from "axios";
import * as request from "../../utils/request";

export const getBlogs = async () => {
  try {
    const res = await request.get(`Blog`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlogs = async (blogId: number) => {
  try {
    const res = await request.deleteData(`Blog/${blogId}`);
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (blogId: number, formData: unknown) => {
  try {
    const response = await axios.put(`https://localhost:7140/api/Blog/${blogId}`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createBlogs = async (formData: unknown) => {
  try {
    const response = await axios.post(`https://localhost:7140/api/Blog`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};