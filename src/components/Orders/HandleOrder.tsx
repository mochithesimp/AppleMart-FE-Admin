import { orderCancel, orderConfirm, orderSend } from "../../apiServices/OrderServices/OrderServices";
import { useNavigate, swal } from "../../import/import-another";

const useHandleCancelOrder = () => {
  const navigate = useNavigate();

  const handleCancelOrder = async (orderId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      swal({
        title: "This can not be undo!",
        text: "You are about to cancel the order!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmCancel) => {
        if (confirmCancel) {
          const response = await orderCancel(orderId);
          if (response) {
            swal("Success!", "Order was canceled!", "success").then(() => {
              navigate("/MyOrderPage");
            });
          } else {
            throw new Error("Failed to cancel order");
          }
        }
      });
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  return { handleCancelOrder };
};


const useHandleOrderConfirm = () => {

  const handleOrderConfirm = async (orderId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      swal({
        title: "This can not be undone!",
        text: "You are about to confirm the order!",
        icon: "info",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirm) => {
        if (confirm) {
          const response = await orderConfirm(orderId);
          if (response) {
            swal("Success!", "Order was confirmed!", "success").then(async () => {

              window.location.reload();
            });
          } else {
            throw new Error("Failed to confirm order");
          }
        }
      });
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return { handleOrderConfirm };
};


const useHandleOrderSend = () => {

  const handleOrderSend = async (orderId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      swal({
        title: "This can not be undone!",
        text: "You are about to Send order to Shipper!",
        icon: "info",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirm) => {
        if (confirm) {
          const response = await orderSend(orderId);
          if (response) {
            swal("Success!", "Order was sent!", "success").then(async () => {

              window.location.reload();
            });
          } else {
            throw new Error("Failed to send order");
          }
        }
      });
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };

  return { handleOrderSend };
};

export { useHandleCancelOrder, useHandleOrderConfirm, useHandleOrderSend };
