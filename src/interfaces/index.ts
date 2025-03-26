export interface e {
  $id: string;
  $values: aProduct[];
}

export interface aProduct {
  productID: number;
  categoryID: number;
  name: string;
  description: string;
  isDeleted: boolean;
  displayIndex: boolean;
  categoryName?: string;
  image?: File;
}

export interface iCategory {
  categoryID: number;
  name: string;
  description: string;
  isDeleted: boolean;
  displayIndex: boolean;
}

export interface ProductImg {
  productImgID: number;
  productItemID: number;
  imageUrl: string;
  isDeleted: boolean;
}

export interface ProductItem {
  productItemID: number;
  productID: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  stock: number;
  isDeleted: boolean;
  displayIndex: boolean;
  productImgs: ProductImg[];
}

export interface iUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  role: string;
}

export interface aOrder {
  orderID: number;
  userID: string;
  shipperID: number;
  orderDate: string;
  address: string;
  paymentMethod: string;
  shippingMethodId: number;
  total: number;
  orderStatus: string;
  voucherID: number;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  orderDetailID: number;
  orderID: number;
  productItemID: number;
  quantity: number;
  price: number;
}

export interface ProductItemAttribute {
  productItemAttributeID: number;
  productItemID: number;
  attributeID: number;
  value: string;
  isDeleted: boolean;
}

export interface Attribute {
  attributeID: number;
  attributeName: number;
  dataType: number;
  categoryID: number;
}


// interface ProductItemResponse {
//   $id: string;
//   productItemID: number;
//   productID: number;
//   name: string;
//   description: string | null;
//   price: number;
//   productImgs?: {
//     $id: string;
//     $values: ProductImg[]; // Sử dụng interface ProductImg đã có
//   };
//   // ... các trường khác
// }
