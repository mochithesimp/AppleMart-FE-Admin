import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import "./OrdersTable.css";
import useOrderData from "./useOrderData";
import { useHandleCancelOrder, useHandleOrderConfirm, useHandleOrderSend, useHandleApproveRefund } from "./HandleOrder";
import { useEffect, useState } from "react";
import OrderDetailModal from "./components/OrderDetailModal";
import ShipperListModal from "./components/ShipperListModal";
import { getTotalShipper } from "../../apiServices/ShipperServices/shipperServices";

import { aOrder } from "../../interfaces";
import { getOrder } from "../../apiServices/OrderServices/OrderServices";

interface ShipperData {
  id: string;
  email: string;
  pendingOrdersCount: number;
}


const OrdersTable: React.FC = () => {
  const { orderData, searchTerm, setSearchTerm } = useOrderData();

  const { handleOrderConfirm } = useHandleOrderConfirm();
  const { handleCancelOrder } = useHandleCancelOrder();
  const { handleOrderSend } = useHandleOrderSend();
  const { handleApproveRefund } = useHandleApproveRefund();
  const [selectedOrder, setSelectedOrder] = useState<aOrder | null>(null);
  const [showShipperModal, setShowShipperModal] = useState(false);
  const [shippers, setShippers] = useState<ShipperData[]>([]);
  const [orderToAssign, setOrderToAssign] = useState<aOrder | null>(null);

  useEffect(() => {
    const loadShippers = async () => {
      try {
        const data = await getTotalShipper();
        console.log("data", data);

        setShippers(data);
      } catch (error) {
        console.error("Error fetching shippers:", error);
      }
    };
    loadShippers();
  }, []);

  const handleSelectShipper = async (shipperId: string) => {
    if (orderToAssign) {
      try {
        await handleOrderSend(orderToAssign.orderID, shipperId);
        setOrderToAssign(null);
        setShowShipperModal(false);
      } catch (error) {
        console.error("Error assigning shipper:", error);
      }
    }
  };

  const handleViewOrderDetails = async (orderId: number) => {
    console.log(`[handleViewOrderDetails] Bắt đầu lấy chi tiết đơn hàng cho orderId: ${orderId}`);
    try {
      console.log("[handleViewOrderDetails] Gọi API getOrder...");
      const orderDetails = await getOrder(orderId); // Gọi API để lấy chi tiết đơn hàng
      console.log("[handleViewOrderDetails] Kết quả từ getOrder:", orderDetails);
  
      if (orderDetails) {
        console.log("[handleViewOrderDetails] Dữ liệu đơn hàng hợp lệ:", orderDetails);
        setSelectedOrder(orderDetails); // Lưu dữ liệu đơn hàng vào state
        console.log("[handleViewOrderDetails] Đã lưu dữ liệu vào state selectedOrder:", orderDetails);
      } else {
        console.error("[handleViewOrderDetails] Không tìm thấy chi tiết đơn hàng cho ID:", orderId);
        setSelectedOrder(null); // Đặt lại nếu không có dữ liệu
      }
    } catch (error) {
      console.error("[handleViewOrderDetails] Lỗi khi lấy chi tiết đơn hàng:", error);
      setSelectedOrder(null); // Đặt lại nếu có lỗi
    } finally {
      console.log("[handleViewOrderDetails] Kết thúc quá trình lấy chi tiết đơn hàng");
    }
  };
  return (
    <motion.div
      className="orders-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="orders-header">
        <h2 className="orders-title">Order List</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search orders by status..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="search-icon" size={18} />
        </div>
      </div>

      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Payment Method</th>
              <th>Address</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orderData.map((order, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td>{order.orderID}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.address}</td>
                <td>${order.total.toFixed(2)}</td>
                <td className={`status ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </td>
                <td>{order.orderDate}</td>
                <td>
                  <div className="flex">
                    <button
                      className="action-button mr-5"
                      onClick={() => handleViewOrderDetails(order.orderID)}
                    >
                      <Eye size={18} />
                    </button>
                    {order.orderStatus === "Pending" && (
                      <>
                        <button
                          className="confirm-button cursor-pointer"
                          onClick={() => handleOrderConfirm(order.orderID)}
                        >
                          Confirm
                        </button>
                        <button
                          className="confirm-button cursor-pointer ml-5"
                          onClick={() => handleCancelOrder(order.orderID)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {order.orderStatus === "Processing" && (
                      <button
                        className="send-button cursor-pointer"
                        onClick={() => {
                          setOrderToAssign(order);
                          setShowShipperModal(true);
                        }}
                      >
                        Send
                      </button>
                    )}
                    {order.orderStatus === "RefundRequested" && (
                      <button
                        className="approve-refund-button cursor-pointer"
                        onClick={() => handleApproveRefund(order.orderID)}
                      >
                        Approve Refund
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
      {showShipperModal && (
        <ShipperListModal
          shippers={shippers}
          onSelectShipper={handleSelectShipper}
          onClose={() => setShowShipperModal(false)}
        />
      )}
    </motion.div>
  );
};

export default OrdersTable;
