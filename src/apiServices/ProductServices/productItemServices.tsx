import axios from "axios";
import request from "../../utils/request";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getProductItems = async () => {
  try {
    const res = await request.get(`/api/ProductItem`);
    console.log("check data search: ", res);
    return res.data; // Trả về dữ liệu đúng
  } catch (error) {
    console.error("Error fetching product items:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
};

export const getAllProductItem = async () => {
  try {
    const res = await request.get(`/api/ProductItem/showall`);
    console.log("check data search: ", res);
    return res.data;
  } catch (error) {
    console.error("Error fetching product items:", error);
    return []; 
  }
};

export const createProductItem = async (formData: unknown) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/api/ProductItem`,
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

export const updateProductItem = async (
  productId: number,
  formData: unknown
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_BASE_URL}/api/ProductItem/${productId}`,
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

export const deleteProductItems = async (productItemId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `${API_BASE_URL}/api/ProductItem/${productItemId}`,
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
    const res = await request.get("/api/ProductItem", { params: queryParams });
    // console.log("check data search: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductItemId = async (productItemId: number) => {
  try {
    const res = await request.get(`ProductItem/${productItemId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
