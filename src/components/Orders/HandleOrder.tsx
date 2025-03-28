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
  const handleOrderSend = async (orderId: number, shipperId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      swal({
        title: "This can not be undone!",
        text: "You are about to send the order to the shipper!",
        icon: "info",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirm) => {
        if (confirm) {
          try {
            console.log("Sending order with orderId:", orderId, "and shipperId:", shipperId);
            const response = await orderSend(orderId, shipperId);
            console.log("Response from orderSend:", response);
            if (response && response.status >= 200 && response.status < 300) {
              console.log("Order sent successfully!");
              swal("Success!", "Order has been sent to the shipper!", "success").then(() => {
                
                window.location.reload();
                console.log(`Order ${orderId} assigned to shipper ${shipperId}`);
              });
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
// export { useHandleOrderSend };

interface PayPalTransaction {
  id?: number;
  transactionID?: number;
  status: string;
  amount: number;
  currency: string;
  paypalPaymentId: string;
  orderId: number;
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
          // Get transactions for this order
          const transactionResponse = await axios.get(
            `https://localhost:7140/api/Paypal/order/${orderId}/transactions`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Transaction response:", JSON.stringify(transactionResponse.data));

          // Process transactions to find the completed one
          let transactions = [];
          if (Array.isArray(transactionResponse.data) && transactionResponse.data.length > 0) {
            if (transactionResponse.data[0].$values) {
              transactions = transactionResponse.data[0].$values;
            } else {
              transactions = transactionResponse.data;
            }
          } else if (transactionResponse.data && transactionResponse.data.$values) {
            transactions = transactionResponse.data.$values;
          }

          console.log("Processed transactions:", transactions);

          // Find the COMPLETED transaction
          const transaction = transactions.find((t: PayPalTransaction) =>
            t && t.status && t.status.toUpperCase() === 'COMPLETED' && t.orderId === orderId
          );

          if (!transaction) {
            throw new Error("No completed PayPal transaction found for this order");
          }

          console.log("Found transaction to refund:", transaction);

          // Get the transaction ID for the API endpoint - handle both property naming conventions
          const transactionId = transaction.transactionID || transaction.id;
          if (!transactionId) {
            throw new Error("Transaction ID is missing");
          }

          // Process the refund - directly call the transaction refund endpoint
          console.log(`Processing refund for transaction ID: ${transactionId}`);

          const refundResponse = await axios.post(
            `https://localhost:7140/api/Paypal/transaction/${transactionId}/refund`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            }
          );

          console.log("Refund response:", refundResponse.data);

          // Get the refund amount for display
          let refundAmount = refundResponse.data?.amount || transaction.amount || order.total || 'the full payment';
          if (typeof refundAmount === 'number') {
            refundAmount = refundAmount.toFixed(2);
          }

          // Update order status to Refunded
          const statusResponse = await axios({
            method: 'put',
            url: `https://localhost:7140/api/Order/${orderId}/status`,
            params: { NewStatus: "Refunded" },
            data: {},
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (statusResponse.status < 200 || statusResponse.status >= 300) {
            throw new Error("Failed to update order status after PayPal refund");
          }

          // The backend already sends a notification when order status changes to Refunded,
          // so we don't need to send another notification from the frontend
          console.log("Order status updated to Refunded. Backend will handle customer notification.");

          // Show success message
          await swal("Success!", `PayPal refund of $${refundAmount} processed successfully!`, "success");
          window.location.reload();
        } catch (error) {
          console.error("PayPal refund error:", error);

          // Log detailed error information if available
          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as {
              response?: {
                status: number,
                headers: Record<string, string>,
                data: unknown
              }
            };
            if (axiosError.response) {
              console.log("=== REFUND ERROR DETAILS ===");
              console.log("Status:", axiosError.response.status);
              console.log("Headers:", JSON.stringify(axiosError.response.headers, null, 2));
              console.log("Error Data:", JSON.stringify(axiosError.response.data, null, 2));
              console.log("===========================");
            }
          }

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

