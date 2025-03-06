import { motion } from "framer-motion";
import { Edit, Search, Trash2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import "./ProductTable.css";
import { aProduct, iCategory } from "../../interfaces";
import {
  deleteProducts,
  getProduct,
  updateProduct,
} from "../../apiServices/ProductServices/productServices";
import { getCategory } from "../../apiServices/CategoryServices/categoryServices";
import swal from "sweetalert";

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allProduct, setAllProduct] = useState<aProduct[]>([]);
  const [categories, setCategories] = useState<iCategory[]>([]);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<aProduct>>({});

  // Get all product
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProduct();
      if (result && result.$values) {
        setAllProduct(result.$values);
      } else {
        console.error("Data not found or invalid response structure");
      }
    };
    fetchData();
  }, []);

  // Get Category
  useEffect(() => {
    const fetchData = async () => {
      const result = await getCategory();
      if (result && result.$values) {
        setCategories(result.$values);
      } else {
        console.error("Data not found or invalid response structure");
      }
    };
    fetchData();
  }, []);

  // Map dữ liệu để thêm categoryName vào mỗi sản phẩm
  const mergedProducts = allProduct.map((product) => {
    const category = categories.find(
      (cat) => cat.categoryID === product.categoryID
    );
    return { ...product, categoryName: category ? category.name : "Unknown" };
  });

  // delete product
  const deleteProduct = async (productId: number) => {
    try {
      swal({
        title: "Are you sure you want to delete this product?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await deleteProducts(productId);

          if (response) {
            swal("Success!", "Product was deleted!", "success");
            setAllProduct(
              allProduct.filter((product) => product.productID !== productId)
            );
          } else {
            throw new Error("Failed to delete product");
          }
        }
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

// handle edit
const handleEditClick = (product: aProduct) => {
  setEditingProductId(product.productID);
  setEditedData({
    productID : product.productID,
    categoryID: product.categoryID,
    name: product.name,
    description: product.description,
    
  });
};

// handle save
const handleSave = async (productId: number) => {
  try {
    const response = await updateProduct(productId, editedData);
    if (response) {
      setAllProduct(allProduct.map(p => 
        p.productID === productId ? {...p, ...editedData} : p
      ));
      setEditingProductId(null);
      swal("Success!", "Product updated!", "success");
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
};


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allProduct.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    setAllProduct(filtered);
  };

  return (
    <motion.div
      className="products-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="products-header">
        <h2>Product List</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="search-icon" size={18} />
        </div>
      </div>
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>ProductID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mergedProducts.map((product) => (
              <motion.tr
                key={product.productID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td>{product.productID}</td>
                <td className="product-name">
                  {editingProductId === product.productID ? (
                    <input
                      value={editedData.name || ""}
                      onChange={(e) =>
                        setEditedData({ ...editedData, name: e.target.value })
                      }
                    />
                  ) : (
                    <>
                      <img
                        src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60"
                        alt="Product"
                        className="product-image"
                      />
                      {product.name}
                    </>
                  )}
                </td>
                <td>
                  {editingProductId === product.productID ? (
                    <select
                      value={editedData.categoryID || product.categoryID}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          categoryID: Number(e.target.value),
                        })
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat.categoryID} value={cat.categoryID}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    product.categoryName
                  )}
                </td>
                <td>
                  {editingProductId === product.productID ? (
                    <input
                      value={editedData.description || ""}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editingProductId === product.productID ? (
                    <button
                      className="save-btn"
                      onClick={() => handleSave(product.productID)}
                    >
                      <Save size={18} />
                    </button>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(product)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteProduct(product.productID)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
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

// return (
//   <motion.div className='products-container' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
//     <div className='products-header'>
//       <h2>Product List</h2>
//       <div className='search-box'>
//         <input type='text' placeholder='Search products...' onChange={handleSearch} value={searchTerm} />
//         <Search className='search-icon' size={18} />
//       </div>
//     </div>
//     <div className='table-wrapper'>
//       <table className='products-table'>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Sales</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map((product) => (
//             <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//               <td className='product-name'>
//                 <img src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60' alt='Product' className='product-image' />
//                 {product.name}
//               </td>
//               <td>{product.category}</td>
//               <td>${product.price.toFixed(2)}</td>
//               <td>{product.stock}</td>
//               <td>{product.sales}</td>
//               <td>
//                 <button className='edit-btn'><Edit size={18} /></button>
//                 <button className='delete-btn'><Trash2 size={18} /></button>
//               </td>
//             </motion.tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </motion.div>
// );
