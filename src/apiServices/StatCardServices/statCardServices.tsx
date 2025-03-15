import * as request from "../../utils/request";

export const getStatCardUser = async () => {
  try {
    const res = await request.get("/Admin/get-total-user");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStatCardRevenue = async () => {
    try {
      const res = await request.get("/Admin/get-total-revenue?");
      //console.log("check data add: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const getStatCardTopSale = async () => {
    try {
      const res = await request.get("/Admin/get-top-selling-product-items");
      //console.log("check data add: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const getStatCardCustomers = async () => {
    try {
      const res = await request.get("/Admin/get-top-costumers");
      //console.log("check data add: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };


