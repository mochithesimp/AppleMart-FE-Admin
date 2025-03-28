import axios from "axios";
import request from "../../utils/request";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getProductImgs = async () => {
  try {
    const res = await request.get(`/api/ProductImgs`);
    return res.data; // Trả về dữ liệu đúng
  } catch (error) {
    console.error("Error fetching productImgs:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
};

export const addProductImgs = async (formData: unknown) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/api/ProductImgs`,
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
