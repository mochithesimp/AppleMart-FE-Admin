import axios from "axios";
import request from "../../utils/request";

export const getProductItems = async () => {
  try {
    const res = await request.get(`ProductItem`);
    console.log("check data search: ", res);
    return res.data; // Trả về dữ liệu đúng
  } catch (error) {
    console.error("Error fetching product items:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
};

export const createProductItem = async (formData: unknown) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://localhost:7140/api/ProductItem`,
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
      `https://localhost:7140/api/ProductItem/${productId}`,
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
    const res = await axios.delete(
      `https://localhost:7140/api/ProductItem/${productItemId}`
    );
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const search = async (queryParams: URLSearchParams) => {
  try {
    const res = await request.get("ProductItem", { params: queryParams });
    // console.log("check data search: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
