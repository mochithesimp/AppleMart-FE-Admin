/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as request from "../../utils/request";


export const getOrderList = async (queryParams: URLSearchParams) => {
  try {
    const token = localStorage.getItem("token");

    const res = await request.get("Order/orders", {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getOrder = async (orderId: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await request.get(`Order/${parseInt(orderId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const search = async (queryParams: URLSearchParams) => {
  try {
    const res = await request.get("Order/orders", { params: queryParams });
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// export const orderConfirm = async (orderId: number, shipperId: string) => {
//   try {
//     const res = await axios.put(`https://localhost:7140/api/Order/${orderId}/status/${shipperId}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     //console.log("check data search: ", res);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const orderCancel = async (orderId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `https://localhost:7140/api/Order/${orderId}/status?NewStatus=Cancelled&isCancelledByCustomer=false`,
      {}, // Phải có body, dù là object rỗng
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error in orderCancel:", error);
    return null;
  }
};

export const orderConfirm = async (orderId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `https://localhost:7140/api/Order/${orderId}/status?NewStatus=Processing`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error in orderConfirm:", error);
    return null;
  }
};

export const orderSend = async (orderId: number, shipperId: string = "54448292-adeb-44a8-9a97-8d94987b23ac") => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      // `https://localhost:7140/api/Order/${orderId}/status?NewStatus=Shipped&ShipperId=${shipperId}`,
        `https://localhost:7140/api/Order/${orderId}/status?NewStatus=Shipped&ShipperId=${shipperId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error in orderSend:", error);
    return null;
  }
};

