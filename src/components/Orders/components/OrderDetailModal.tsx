import React from "react";
import "./OrderDetailModal.css";
import { aOrder, OrderDetail } from "../../../interfaces/index"; 

interface OrderDetailModalProps {
  order: aOrder | null;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  console.log("Order data:", order);

  if (!order) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Order Details</h2>
          <button className="close-button" onClick={onClose}>✖</button>
          <p>Order data is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Order Details</h2>

        <div className="customer-info">
          <p><strong>Order ID:</strong> {order.orderID}</p>
          <p><strong>Address:</strong> {order.address || "N/A"}</p>
          <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          <p><strong>Status:</strong> {order.orderStatus}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Total:</strong> ${order.total}</p>
        </div>

        <div className="product-list">
          <h3>Products</h3>
          {order.orderDetails.length > 0 ? (
            <ul>
              {order.orderDetails.map((product: OrderDetail) => (
                <li key={product.orderDetailID}>
                  <strong>Product ID:</strong> {product.productItemID} - 
                  <strong> Quantity:</strong> {product.quantity} x 
                  <strong> ${product.price.toFixed(2)}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
