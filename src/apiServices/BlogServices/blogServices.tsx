import axios from "axios";
import * as request from "../../utils/request";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getBlogs = async () => {
  try {
    const res = await request.get(`/api/Blog`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlogs = async (blogId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await request.deleteData(`/api/Blog/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (blogId: number, formData: unknown) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_BASE_URL}/api/Blog/${blogId}`,
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

export const createBlogs = async (formData: unknown) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/api/Blog`,
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

export const search = async (queryParams: URLSearchParams) => {
  try {
    const token = localStorage.getItem("token");
    const res = await request.get("/api/Blog", {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
