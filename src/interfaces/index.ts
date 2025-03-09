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
