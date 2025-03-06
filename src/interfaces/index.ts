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
}

export interface iCategory {
  categoryID: number;
  name: string;
  description: string;
  isDeleted: boolean;
  displayIndex: boolean;
}