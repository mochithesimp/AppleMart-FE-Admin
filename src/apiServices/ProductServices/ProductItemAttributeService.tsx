import axios from "axios";
import * as request from "../../utils/request";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getProductIA = async () => {
  try {
    const res = await request.get("/api/ProductItemAttribute");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createProductIA = async (formData: unknown) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/api/ProductItemAttribute`,
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

export const updateProductIA = async (
  productIAId: number,
  formData: unknown
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_BASE_URL}/api/ProductItemAttribute/${productIAId}`,
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

export const deleteProductIA = async (productIAId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `${API_BASE_URL}/api/ProductItemAttribute/${productIAId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const search = async (queryParams: URLSearchParams) => {
  try {
    const res = await request.get("/api/ProductItemAttribute", {
      params: queryParams,
    });
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
