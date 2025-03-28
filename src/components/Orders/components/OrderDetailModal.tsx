import React, { useEffect, useState } from "react";
import "./OrderDetailModal.css";
import { aOrder, OrderDetail, ProductItem, ProductImg } from "../../../interfaces/index";
import { getProductItemId } from "../../../apiServices/ProductServices/productItemServices";
import { getProductImgs } from "../../../apiServices/ProductServices/productImgSevices";

interface OrderDetailModalProps {
  order: aOrder | null;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  const [productItems, setProductItems] = useState<ProductItem[]>([]);

  console.log("[OrderDetailModal] Dữ liệu đơn hàng:", order);

  // Lấy danh sách sản phẩm và hình ảnh khi order thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      if (!order) return;

      const orderDetails = (order.orderDetails as any)?.$values || [];
      
      
      if (orderDetails.length === 0) return;

      const productItemIds = orderDetails.map(
        (orderDetail: OrderDetail) => orderDetail.productItemID
      );
    //   console.log('dataaaaa', productItemIds);
      try {
        // Gọi API để lấy thông tin sản phẩm
        const responses = await Promise.all(
          productItemIds.map((id: number) => getProductItemId(id))
        
        );console.log('aa', responses);
        const productImgsResult = await getProductImgs();

        const productImgs = productImgsResult.$values;

        // Nhóm ảnh theo productItemID
        const imagesByProductItemID = productImgs.reduce(
          (
            acc: { [x: string]: any[] },
            img: { productItemID: string | number }
          ) => {
            if (!acc[img.productItemID]) {
              acc[img.productItemID] = [];
            }
            acc[img.productItemID].push(img);
            return acc;
          },
          {} as Record<number, ProductImg[]>
        );

        // Gán danh sách ảnh vào productItem tương ứng
        const mergedData: ProductItem[] = responses.map((item) => ({
          ...item,
          productImgs: imagesByProductItemID[item.productItemID] || [],
          productName: item.name || "N/A", // Gán tên sản phẩm
        }));

        setProductItems(mergedData);
        console.log("merge", mergedData);
        
      } catch (error) {
        console.error("Failed to fetch product items:", error);
        setProductItems([]);
      }
    };

    fetchProducts();
  }, [order]);

  if (!order) {
    console.warn("[OrderDetailModal] Không có dữ liệu đơn hàng để hiển thị");
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

  // Ép kiểu orderDetails thành any để bỏ qua kiểm tra kiểu và truy cập $values
  const orderDetails = (order.orderDetails as any)?.$values || [];
  console.log("[OrderDetailModal] Danh sách orderDetails:", orderDetails);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Chi tiết đơn hàng</h2>

        <div className="customer-info">
          <p><strong>ID:</strong> {order.orderID}</p>
          <p><strong>Address:</strong> {order.address || "N/A"}</p>
          <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          <p><strong>Status:</strong> {order.orderStatus}</p>
          <p><strong>Pay:</strong> {order.paymentMethod}</p>
          <p><strong>Total:</strong> ${order.total}</p>
        </div>

        <div className="product-list">
          <h3>Product</h3>
          {orderDetails.length > 0 ? (
            <table className="order-table">
              <thead>
                <tr >
                  <th className="title">ProductItem ID</th>
                  <th className="title">Name</th>
                  <th className="title">Quantity</th>
                  <th className="title">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((product: OrderDetail, index: number) => {
                  const productItem = productItems.find(
                    
                    (p) => p.productItemID === product.productItemID
                  );
              
                  console.log("pItem",productItems);
                  
                  return (
                    <tr key={index}>
                      <td className="title">{product.productItemID}</td>
                      <td className="title">
                        <img
                          src={
                            productItem?.productImgs &&
                            productItem.productImgs.length > 0
                              ? productItem?.productImgs[0].imageUrl
                              : "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60"
                          }
                          alt="Product"
                          className="product-image"
                          style={{ width: "50px", height: "50px", marginRight: "10px" }}
                        />
                        {(productItem as any)?.productName || productItem?.name || "N/A"}
                        
                      </td>
                      <td className="title"> {product.quantity}</td>
                      <td className="title">${product.price.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;