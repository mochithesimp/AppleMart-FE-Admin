import React from "react";
import "./OrderDetailModal.css";
import { aOrder, OrderDetail } from "../../../interfaces/index"; 

interface OrderDetailModalProps {
  order: aOrder | null;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  console.log("Dữ liệu đơn hàng:", order);

  if (!order) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Chi tiết đơn hàng</h2>
          <button className="close-button" onClick={onClose}>✖</button>
          <p>Dữ liệu đơn hàng không có sẵn.</p>
        </div>
      </div>
    );
  }

  const orderDetails = (order.orderDetails as any)?.$values || [];
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Order Detail</h2>

        <div className="customer-info">
          <p><strong>ID :</strong> {order.orderID}</p>
          <p><strong>Address:</strong> {order.address || "N/A"}</p>
          <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          <p><strong>Status:</strong> {order.orderStatus}</p>
          <p><strong>Pay:</strong> {order.paymentMethod}</p>
          <p><strong>Total:</strong> ${order.total}</p>
        </div>

        <div className="product-list">
          <h3>Product</h3>
          {orderDetails.length > 0 ? (
            <ul>
              {orderDetails.map((product: OrderDetail) => (
                <li key={product.orderDetailID}>
                  <strong>ID:</strong> {product.productItemID} - 
                  <strong> Quantity:</strong> {product.quantity} x 
                  <strong> ${product.price.toFixed(2)}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;