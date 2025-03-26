import { motion } from "framer-motion";
import { Edit, Search, Trash2, Save, SquarePlus, OctagonX } from "lucide-react";
import { useEffect, useState } from "react";
import "../ProductTable.css";

import swal from "sweetalert";
import {
  deleteProductIA,
  search,
  updateProductIA,
} from "../../../apiServices/ProductServices/ProductItemAttributeService";
import {
  Attribute,
  ProductItem,
  ProductItemAttribute,
} from "../../../interfaces";
import { getAttribute } from "../../../apiServices/AttributeServices/AttributeServices";
import { getProductItems } from "../../../apiServices/ProductServices/productItemServices";
import AddProductItemAttribute from "../components/AddProductItemAttribute";

const ProductItemAttributeTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allProductIA, setAllProductIA] = useState<ProductItemAttribute[]>([]);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [Attributies, setAttributies] = useState<Attribute[]>([]);
  const [editingProductIAId, setEditingProductIAId] = useState<number | null>(
    null
  );
  const [editedData, setEditedData] = useState<Partial<ProductItemAttribute>>(
    {}
  );
  const [showAddForm, setShowAddForm] = useState(false);

  // Get all product-------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams();

      if (searchTerm) {
        queryParams.append("SearchAttributeName", searchTerm);
      }

      const result = await search(queryParams);

      if (result && result.items.$values) {
        setAllProductIA(result.items.$values);
      } else {
        console.error("Data not found or invalid response structure");
      }
    };
    fetchData();
  }, [searchTerm]);

  // Get Attribute------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAttribute();
      if (result && result.$values) {
        setAttributies(result.$values);
      } else {
        console.error("Data not found or invalid response structure");
      }
    };
    fetchData();
  }, []);

  // Get ProductItem------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductItems();
      if (result && result.items.$values) {
        setProductItems(result.items.$values);
      } else {
        console.error("Data not found or invalid response structure");
      }
    };
    fetchData();
  }, []);

  // Map dữ liệu để thêm attributeName và productItemName vào mỗi sản phẩm
  const mergedProducts = allProductIA.map((product) => {
    const Attribute = Attributies.find(
      (a) => a.attributeID === product.attributeID
    );
    const ProductItem = productItems.find(
      (p) => p.productItemID === product.productItemID
    );
    return {
      ...product,
      attributeName: Attribute ? Attribute.attributeName : "Unknown",
      productItemName: ProductItem ? ProductItem.name : "Unknown",
    };
  });

  // delete product-----------------------------------------------------------
  const deleteProduct = async (productIA: number) => {
    try {
      swal({
        title: "Are you sure you want to delete this product item attribute?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await deleteProductIA(productIA);

          if (response) {
            swal("Success!", "Product Item Atribbute was deleted!", "success");
            setAllProductIA(
              allProductIA.filter(
                (product) => product.productItemAttributeID !== productIA
              )
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

  // handle edit -----------------------------------------------------------------
  const handleEditClick = (productIA: ProductItemAttribute) => {
    setEditingProductIAId(productIA.productItemAttributeID);
    setEditedData({
      value: productIA.value,
      productItemID: productIA.productItemID,
      attributeID: productIA.attributeID,
    });
  };

  // handle save----------------------------------------------------------------------
  const handleSave = async (productIA: number) => {
    try {
      const response = await updateProductIA(productIA, editedData);
      if (response) {
        setAllProductIA(
          allProductIA.map((p) =>
            p.productItemAttributeID === productIA ? { ...p, ...editedData } : p
          )
        );
        setEditingProductIAId(null);
        swal("Success!", "Product Item Attribute updated!", "success");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // handle search ---------------------------------------------------------------------------
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allProductIA.filter((product) =>
      product.value.toLowerCase().includes(term)
    );
    setAllProductIA(filtered);
  };

  return (
    <motion.div
      className="products-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="products-header">
        <h2>Product Item Attribute List</h2>
        <div style={{ display: "flex" }}>
          <button className="add-btn" onClick={() => setShowAddForm(true)}>
            <SquarePlus size={40} />
          </button>
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
      </div>
      {showAddForm && (
        <AddProductItemAttribute
          onClose={() => setShowAddForm(false)}
          onSuccess={() => window.location.reload()}
          productItems={productItems}
          Attributies={Attributies}
        />
      )}
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>productItemAttributeID</th>
              <th>productItem Name</th>
              <th>Attribute Name</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mergedProducts.map((productIA) => (
              <motion.tr
                key={productIA.productItemAttributeID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td>{productIA.productItemAttributeID}</td>
                <td>{productIA.productItemName}</td>
                <td>
                  {editingProductIAId === productIA.productItemAttributeID ? (
                    <select
                      value={editedData.attributeID || productIA.attributeID}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          attributeID: Number(e.target.value),
                        })
                      }
                    >
                      {Attributies.map((a) => (
                        <option key={a.attributeID} value={a.attributeID}>
                          {a.attributeName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    productIA.attributeName
                  )}
                </td>
                <td>
                  {editingProductIAId === productIA.productItemAttributeID ? (
                    <input
                      value={editedData.value || ""}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          value: e.target.value,
                        })
                      }
                    />
                  ) : (
                    productIA.value
                  )}
                </td>
                <td>
                  {editingProductIAId === productIA.productItemAttributeID ? (
                    <>
                      <button
                        className="save-btn"
                        onClick={() =>
                          handleSave(productIA.productItemAttributeID)
                        }
                      >
                        <Save size={18} />
                      </button>
                      <button
                        className="exit-btn"
                        onClick={() => setEditingProductIAId(null)}
                      >
                        <OctagonX size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(productIA)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteProduct(productIA.productItemAttributeID)
                        }
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

export default ProductItemAttributeTable;
