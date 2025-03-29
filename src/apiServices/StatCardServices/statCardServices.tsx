import * as request from "../../utils/request";

export const getStatCardUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await request.get("/api//Admin/get-total-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStatCardRevenue = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await request.get("/api/Admin/get-total-revenue?", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log("check data add: ", res);
    return res.totalRevenue;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const getStatTopProduct = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await request.get("/api/Admin/total-products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStatCardCustomers = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await request.get("/api/Admin/get-top-costumers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
