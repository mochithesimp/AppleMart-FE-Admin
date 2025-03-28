import * as request from "../../utils/request";

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

export const getTotalAllProduct = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await request.get(
      "api/Product/showall",
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
export const getTotalRevenue = async () => {
  try {
    const res = await request.get("/api/Admin/get-total-revenue");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
