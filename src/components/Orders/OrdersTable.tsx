import { motion } from "framer-motion";
import { Search, Eye, Truck } from "lucide-react";
import "./OrdersTable.css";
import useOrderData from "./useOrderData";
import { useHandleCancelOrder, useHandleOrderConfirm, useHandleOrderSend, useHandleApproveRefund } from "./HandleOrder";
import { useEffect, useState } from "react";
import OrderDetailModal from "./components/OrderDetailModal";
import ShipperListModal from "./components/ShipperListModal";
import { getTotalShipper } from "../../apiServices/ShipperServices/shipperServices";

const OrdersTable: React.FC = () => {
  const { orderData, searchTerm, setSearchTerm } = useOrderData();

  const { handleOrderConfirm } = useHandleOrderConfirm();
  const { handleCancelOrder } = useHandleCancelOrder();
  const { handleOrderSend } = useHandleOrderSend();
  const { handleApproveRefund } = useHandleApproveRefund();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showShipperModal, setShowShipperModal] = useState(false);
  const [shippers, setShippers] = useState<any[]>([]);
  const [orderToAssign, setOrderToAssign] = useState<any>(null);

  useEffect(() => {
    const loadShippers = async () => {
      try {
        const data = await getTotalShipper();
        console.log("data",data );
        
        setShippers(data);
      } catch (error) {
        console.error("Error fetching shippers:", error);
      }
    };
    loadShippers();
  }, []);

  const handleSelectShipper = async (shipperId: string) => {
    console.log("Selected Shipper ID:", shipperId);
    if (orderToAssign) {
      try {
        await handleOrderSend(orderToAssign.orderID, shipperId);
        // orderToAssign.orderStatus = "Shipped";
        
        setOrderToAssign(null);
        setShowShipperModal(false);
        alert(`Shipper selected! ${shipperId}`);
        
      } catch (error) {
        console.error("Error assigning shipper:", error);
      }
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
                      onClick={() => setSelectedOrder(order)}
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
          shippers={shippers.filter(shipper => shipper.pendingOrdersCount < 3)}
          onSelectShipper={handleSelectShipper}
          onClose={() => setShowShipperModal(false)}
        />
      )}
    </motion.div>
  );
};

export default OrdersTable;
