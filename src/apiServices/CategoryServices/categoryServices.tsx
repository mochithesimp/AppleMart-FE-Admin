import axios from "axios";
import * as request from "../../utils/request";

export const getCategory = async () => {
  try {
    const res = await request.get("Category");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryId = async (categoryId: number) => {
  try {
    const res = await request.get(`Category/${categoryId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (categoryId: number, formData: unknown) => {
  try {
    const response = await axios.put(`https://localhost:7140/api/Category/${categoryId}`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCategory = async (categoryId: number) => {
  try {
    const res = await axios.delete(`https://localhost:7140/api/Category/${categoryId}`);
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const createCategory = async (formData: unknown) => {
  try {
    const response = await axios.post(`https://localhost:7140/api/Category`, formData);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const search = async (queryParams: URLSearchParams) => {
  try {
    const res = await request.get("Category", { params: queryParams });
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};