
import { useEffect, useState, swal } from "../../import/import-another";
import { getOrderList } from "../../apiServices/OrderServices/OrderServices";
import { aOrder } from "../../interfaces";

const useOrderData = () => {
  const [orderData, setOrderData] = useState<aOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          await swal({
            title: "Oops!",
            text: "You haven't logged in yet! Redirecting to Login Page...",
            icon: "warning",
            buttons: {
              ok: {
                text: "OK",
                value: true,
                className: "swal-ok-button",
              },
            },
          });
          window.location.href = "/login";
          return;
        }
        const queryParams = new URLSearchParams();

        if (searchTerm) {
          queryParams.append("status", searchTerm);
        }
        const response = await getOrderList(queryParams);

        if (response.orders.$values) {
          setOrderData(response.orders.$values);
        } else {
          console.error(
            "Failed to retrieve order data:",
            response.orders.$values
          );
        }
      } catch (error) {
        console.error("Failed to retrieve order data:", error);
      }
    };

    fetchOrderData();
  }, [searchTerm]);

  return { orderData, searchTerm, setOrderData, setSearchTerm };
};

export default useOrderData;
