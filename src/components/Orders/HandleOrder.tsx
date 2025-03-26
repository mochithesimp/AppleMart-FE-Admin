import { orderCancel, orderConfirm, orderSend } from "../../apiServices/OrderServices/OrderServices";
import { swal } from "../../import/import-another";
import * as signalR from "@microsoft/signalr";
import { useEffect, useRef } from "react";

const useNotificationConnection = () => {
  const notificationConnectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setupNotificationConnection(token);
    }

    return () => {
      if (notificationConnectionRef.current) {
        notificationConnectionRef.current.stop();
      }
    };
  }, []);

  const setupNotificationConnection = async (token: string) => {
    try {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7140/notificationHub", {
          accessTokenFactory: () => token,
          transport: signalR.HttpTransportType.WebSockets,
          skipNegotiation: true
        })
        .withAutomaticReconnect()
        .build();

      await connection.start();
      console.log("Connected to notification hub for admin order actions");
      notificationConnectionRef.current = connection;
    } catch (error) {
      console.error("Error connecting to notification hub:", error);
    }
  };

  const sendDirectNotification = async (userId: string, header: string, content: string) => {
    try {
      if (notificationConnectionRef.current && notificationConnectionRef.current.state === "Connected") {
        await notificationConnectionRef.current.invoke(
          "SendDirectNotification",
          userId,
          header,
          content
        );
        console.log("Direct notification sent successfully to user:", userId);
        return true;
      } else {
        console.warn("Cannot send notification - connection not established");
        return false;
      }
    } catch (error) {
      console.error("Error sending direct notification:", error);
      return false;
    }
  };

  return { notificationConnection: notificationConnectionRef.current, sendDirectNotification };
};

const useHandleCancelOrder = () => {
  const { sendDirectNotification } = useNotificationConnection();

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
          try {
            const response = await orderCancel(orderId);
            if (response && response.status >= 200 && response.status < 300) {

              if (response.data && response.data.userId) {
                const userId = response.data.userId;
                const notificationSent = await sendDirectNotification(
                  userId,
                  "Order Cancelled",
                  `Dear customer, your Order (#${orderId}) has been canceled by Moderators.`
                );

                if (notificationSent) {
                  console.log(`Real-time notification sent to user ${userId}`);
                } else {
                  console.warn(` Could not send real-time notification to user ${userId}`);
                }

                swal("Success!", "Order canceled! User has been notified.", "success").then(() => {
                  window.location.reload();
                });
              } else {
                swal("Success!", "Order was canceled!", "success").then(() => {
                  window.location.reload();
                });
              }
            } else {
              throw new Error(response?.data?.message || "Failed to cancel order");
            }
          } catch (error) {
            console.error("Error canceling order:", error);
            swal("Error", "Failed to cancel the order. Please try again.", "error");
          }
        }
      });
    } catch (error) {
      console.error("Error in handleCancelOrder:", error);
      swal("Error", "An unexpected error occurred. Please try again later.", "error");
    }
  };

  return { handleCancelOrder };
};

const useHandleOrderConfirm = () => {
  const { sendDirectNotification } = useNotificationConnection();

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
          try {
            const response = await orderConfirm(orderId);
            if (response && response.status >= 200 && response.status < 300) {
              if (response.data && response.data.userId) {
                const userId = response.data.userId;
                const notificationSent = await sendDirectNotification(
                  userId,
                  "Order Confirmed",
                  `Dear customer, your Order (#${orderId}) has been confirmed. A shipper will be assigned soon to deliver to you.`
                );

                if (notificationSent) {
                  console.log(` Real-time notification sent to user ${userId}`);
                } else {
                  console.warn(` Could not send real-time notification to user ${userId}`);
                }

                swal("Success!", "Order confirmed! User has been notified.", "success").then(() => {
                  window.location.reload();
                });
              } else {
                swal("Success!", "Order was confirmed!", "success").then(() => {
                  window.location.reload();
                });
              }
            } else {
              throw new Error(response?.data?.message || "Failed to confirm order");
            }
          } catch (error) {
            console.error("Error confirming order:", error);
            swal("Error", "Failed to confirm the order. Please try again.", "error");
          }
        }
      });
    } catch (error) {
      console.error("Error in handleOrderConfirm:", error);
      swal("Error", "An unexpected error occurred. Please try again later.", "error");
    }
  };

  return { handleOrderConfirm };
};

const useHandleOrderSend = () => {
  const { sendDirectNotification } = useNotificationConnection();

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
          try {
            const response = await orderSend(orderId);
            if (response && response.status >= 200 && response.status < 300) {
              if (response.data) {
                const userId = response.data.userId;
                const shipperName = response.data.shipperName || "our delivery team";
                const shipperPhone = response.data.shipperPhone || "N/A";

                const notificationSent = await sendDirectNotification(
                  userId,
                  "Order Shipped",
                  `Dear customer, your Order (#${orderId}) has been assigned to shipper ${shipperName} (Phone: ${shipperPhone}). Your package is on its way to you!`
                );

                if (notificationSent) {
                  console.log(`Real-time notification sent to user ${userId}`);
                } else {
                  console.warn(`Could not send real-time notification to user ${userId}`);
                }

                swal("Success!", `Order was sent to shipper ${shipperName}! User has been notified.`, "success").then(() => {
                  window.location.reload();
                });
              } else {
                swal("Success!", "Order was sent to shipper!", "success").then(() => {
                  window.location.reload();
                });
              }
            } else {
              throw new Error(response?.data?.message || "Failed to send order");
            }
          } catch (error) {
            console.error("Error sending order:", error);
            swal("Error", "Failed to send the order. Please try again.", "error");
          }
        }
      });
    } catch (error) {
      console.error("Error in handleOrderSend:", error);
      swal("Error", "An unexpected error occurred. Please try again later.", "error");
    }
  };

  return { handleOrderSend };
};

export { useHandleCancelOrder, useHandleOrderConfirm, useHandleOrderSend };
