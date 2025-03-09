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