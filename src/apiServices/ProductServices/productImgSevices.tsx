import axios from "axios";
import request from "../../utils/request";


export const getProductImgs = async () => {
    try {
        const res = await request.get(`ProductImgs`);
        return res.data; // Trả về dữ liệu đúng
    } catch (error) {
        console.error("Error fetching productImgs:", error);
        return []; // Trả về mảng rỗng nếu lỗi
    }
  };

  export const addProductImgs = async (formData: unknown) => {
    try {
      const response = await axios.post(`https://localhost:7140/api/ProductImgs`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };