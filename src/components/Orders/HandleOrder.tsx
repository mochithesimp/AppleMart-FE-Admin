import { orderCancel, orderConfirm, orderSend } from "../../apiServices/OrderServices/OrderServices";
import { swal } from "../../import/import-another";
import * as signalR from "@microsoft/signalr";
import { useEffect, useRef } from "react";
import axios from "axios";

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
              // Notification is already sent by the backend through the API call
              swal("Success!", "Order canceled! User has been notified.", "success").then(() => {
                window.location.reload();
              });
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
  // We don't need the notification connection since backend handles notifications
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
              // Backend already sends the "Order Confirmed" notification
              if (response.data && response.data.userId) {
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

interface PayPalTransaction {
  id: number;
  status: string;
  amount: number;
  currency: string;
  paypalPaymentId: string;
  orderID: number;
}

const useHandleApproveRefund = () => {
  const { sendDirectNotification } = useNotificationConnection();

  const handleApproveRefund = async (orderId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        swal("Error", "You must be logged in to approve refunds.", "error");
        return;
      }

      const orderResponse = await axios.get(
        `https://localhost:7140/api/Order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!orderResponse.data) {
        throw new Error("Failed to fetch order details");
      }

      const order = orderResponse.data;
      console.log("Order data:", order);

      const result = await swal({
        title: "Approve Refund",
        text: `Are you sure you want to approve the refund for Order #${orderId}?`,
        icon: "warning",
        buttons: ["Cancel", "Approve"],
        dangerMode: true,
      });

      if (!result) return;

      if (order.paymentMethod === "By Cash") {
        console.log("Processing refund for cash payment...");

        try {
          const response = await axios.put(
            `https://localhost:7140/api/Order/${orderId}/status?NewStatus=Refunded`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          console.log("Cash refund API response:", response);

          if (response.status >= 200 && response.status < 300) {
            if (response.data && response.data.userId) {
              try {
                await sendDirectNotification(
                  response.data.userId,
                  "Refund Request Approved",
                  `Your refund request for Order #${orderId} has been approved. Please contact our support team to process your cash refund.`
                );

                if (order.shipperID) {
                  await sendDirectNotification(
                    order.shipperID,
                    "Refund Approved for Your Delivery",
                    `A refund request for Order #${orderId} that you delivered has been approved by a moderator.`
                  );
                }
              } catch (notifyError) {
                console.error("Error sending notifications:", notifyError);
              }
            }

            await swal("Success!", "Refund approved successfully!", "success");
            window.location.reload();
          } else {
            throw new Error(response?.data?.message || "Failed to update order status");
          }
        } catch (error: unknown) {
          console.error("API Error:", error);
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          swal("Error", `Failed to process refund: ${errorMessage}`, "error");
        }
      } else if (order.paymentMethod === "PayPal") {
        try {
          const transactionResponse = await axios.get<PayPalTransaction[]>(
            `https://localhost:7140/api/Paypal/order/${orderId}/transactions`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!transactionResponse.data || transactionResponse.data.length === 0) {
            throw new Error("No PayPal transaction found for this order");
          }

          const transaction = transactionResponse.data.find(
            (t: PayPalTransaction) => t.orderID === orderId && t.status === "COMPLETED"
          );

          if (!transaction) {
            throw new Error("No completed PayPal transaction found for this order");
          }

          await axios.post(
            `https://localhost:7140/api/Paypal/transaction/${transaction.id}/refund`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const updateModel = {
            NewStatus: "Refunded"
          };

          const statusResponse = await axios({
            method: 'put',
            url: `https://localhost:7140/api/Order/${orderId}/status`,
            params: updateModel,
            data: {},
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (statusResponse.status >= 200 && statusResponse.status < 300) {
            if (statusResponse.data && statusResponse.data.userId) {
              await sendDirectNotification(
                statusResponse.data.userId,
                "Refund Request Approved",
                `Your refund request for Order #${orderId} has been approved. The refund amount of $${order.total} has been processed and will be credited back to your PayPal account.`
              );
            }

            await swal("Success!", "PayPal refund processed successfully!", "success");
            window.location.reload();
          } else {
            throw new Error("Failed to update order status after PayPal refund");
          }
        } catch (error: unknown) {
          console.error("PayPal refund error:", error);
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          swal("Error", `PayPal refund failed: ${errorMessage}`, "error");
        }
      } else {
        swal("Error", `Unknown payment method: ${order.paymentMethod}`, "error");
      }
    } catch (error: unknown) {
      console.error("Error in handleApproveRefund:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      swal("Error", `An unexpected error occurred: ${errorMessage}`, "error");
    }
  };

  return { handleApproveRefund };
};

export { useHandleCancelOrder, useHandleOrderConfirm, useHandleOrderSend, useHandleApproveRefund };
