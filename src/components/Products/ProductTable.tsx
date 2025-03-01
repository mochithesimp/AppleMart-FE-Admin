import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import "./ProductTable.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
}

const PRODUCT_DATA: Product[] = [
  { id: 1, name: "IP16", category: "Điện thoại", price: 59.99, stock: 143, sales: 1200 },
  { id: 2, name: "MacBook", category: "Laptop", price: 39.99, stock: 89, sales: 800 },
  { id: 3, name: "Airpod", category: "Phụ kiện", price: 199.99, stock: 56, sales: 650 },
  { id: 4, name: "Apple Watch", category: "Smartwatch", price: 29.99, stock: 210, sales: 950 },
  { id: 5, name: "Ipad", category: "Tablet", price: 79.99, stock: 78, sales: 720 },
];

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCT_DATA);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = PRODUCT_DATA.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  return (
    <motion.div className='products-container' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className='products-header'>
        <h2>Product List</h2>
        <div className='search-box'>
          <input type='text' placeholder='Search products...' onChange={handleSearch} value={searchTerm} />
          <Search className='search-icon' size={18} />
        </div>
      </div>
      <div className='table-wrapper'>
        <table className='products-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <td className='product-name'>
                  <img src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60' alt='Product' className='product-image' />
                  {product.name}
                </td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.sales}</td>
                <td>
                  <button className='edit-btn'><Edit size={18} /></button>
                  <button className='delete-btn'><Trash2 size={18} /></button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsTable;
