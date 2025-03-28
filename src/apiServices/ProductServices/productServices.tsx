//* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
import axios from "axios";
import * as request from "../../utils/request";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getProductId = async (productId: number) => {
  try {
    const res = await request.get(`/api/Product/${productId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async () => {
  try {
    const res = await request.get("/api/Product");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProduct = async () => {
  try {
    const res = await request.get("/api/Product/showall");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTotalProduct = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await request.get(
      "/api/Admin/total-products",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      //console.log("check data add: ", res);
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (formData: unknown) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/api/Product`,
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

export const updateProduct = async (productId: number, formData: unknown) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_BASE_URL}/api/Product/${productId}`,
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

export const deleteProducts = async (productId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `${API_BASE_URL}/api/Product/${productId}`,
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

export const search = async (queryParams: URLSearchParams) => {
  try {
    const res = await request.get("/api/Product", { params: queryParams });
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
