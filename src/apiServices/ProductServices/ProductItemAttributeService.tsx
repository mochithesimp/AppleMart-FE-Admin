import axios from "axios";
import * as request from "../../utils/request";

export const getProductIA = async () => {
    try {
      const res = await request.get("ProductItemAttribute");
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  export const createProductIA  = async (formData: unknown) => {
    try {
      const response = await axios.post(`https://localhost:7140/api/ProductItemAttribute`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateProductIA  = async (productIAId: number, formData: unknown) => {
    try {
      const response = await axios.put(`https://localhost:7140/api/ProductItemAttribute/${productIAId}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteProductIA  = async (productIAId: number) => {
    try {
      const res = await axios.delete(`https://localhost:7140/api/ProductItemAttribute/${productIAId}`);
      // console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const search = async (queryParams: URLSearchParams) => {
    try {
      const res = await request.get("ProductItemAttribute", { params: queryParams });
      // console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };