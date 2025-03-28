// import axios from "axios";
import * as request from "../../utils/request";

export const getTotalShipper = async () => {
  try {
    // console.log(`Calling API to send order ${orderId} to shipper ${shipperId}`);
    const token = localStorage.getItem("token");
    const res = await request.get(
      "Shipper/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    //   console.log("API Response:", res);
    );
    console.log("Shippers API Response:", res); // Kiểm tra response
    return res?.$values || [];
  } catch (error) {
    console.log("Error fetching shippers:", error);
    return [];
  }
};