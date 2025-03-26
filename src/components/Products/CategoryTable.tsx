import { motion } from "framer-motion";
import { Edit, Search, Trash2, Save, OctagonX, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import "./ProductTable.css";
import { iCategory } from "../../interfaces";
import swal from "sweetalert";
import {
  deleteCategory,
  search,
  updateCategory,
} from "../../apiServices/CategoryServices/categoryServices";
import AddProductForm3 from "./components/AddCategoryForm";

const CategoryTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [Categories, setCategories] = useState<iCategory[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [editedData, setEditedData] = useState<{
    name?: string;
    description?: string;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams();

      if (searchTerm) {
        queryParams.append("categoryName", searchTerm);
      }

      const result = await search(queryParams);
      if (result && result.$values) {
        setCategories(result.$values);
      } else {
        console.error("Data not found or invalid response structure");
      }
    };
    fetchData();
  }, [searchTerm]);

  // delete------------------------------------------------------
  const deleteCategoryItem = async (categoryId: number) => {
    try {
      const confirmDelete = await swal({
        title: "Are you sure you want to delete this Category?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      });

      if (confirmDelete) {
        const response = await deleteCategory(categoryId);

        if (response) {
          swal("Success!", "Category was deleted!", "success").then(() => {
            window.location.reload();
          });
        } else {
          throw new Error("Failed to delete Category");
        }
      }
    } catch (error) {
      console.error("Error deleting Category item:", error);
    }
  };

  // handle edit --------------------------------------------------
  const handleEditClick = (Category: iCategory) => {
    setEditingCategoryId(Category.categoryID);
    setEditedData({
      name: Category.name,
      description: Category.description,
    });
  };

  // handle save---------------------------------------------------------------
  const handleSave = async (CategoryID: number) => {
    const errors: string[] = [];

    if (!editedData.name) errors.push("Name is required.");
    if (editedData.name && editedData.name.length > 255)
      errors.push("Name cannot exceed 255 characters.");
    if (editedData.description && editedData.description.length > 1000)
      errors.push("Description cannot exceed 1000 characters.");

    if (errors.length > 0) {
      swal("Validation Error", errors.join("\n"), "error");
      return;
    }

    try {
      const response = await updateCategory(CategoryID, editedData);

      if (response) {
        swal("Success!", "Category updated!", "success").then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  };

  return (
    <motion.div
      className="products-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="products-header">
        <h2>Category List</h2>

        <div style={{ display: "flex" }}>
          <button className="add-btn" onClick={() => setShowAddForm(true)}>
            <SquarePlus size={40} />
          </button>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="search-icon" size={18} />
          </div>
        </div>
      </div>
      {showAddForm && (
        <AddProductForm3
          onClose={() => setShowAddForm(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>CategoryID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Categories.map((Category) => (
              <motion.tr
                key={Category.categoryID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td>{Category.categoryID}</td>
                <td className="product-name">
                  {editingCategoryId === Category.categoryID ? (
                    <>
                      <input
                        value={editedData.name || ""}
                        onChange={(e) =>
                          setEditedData({ ...editedData, name: e.target.value })
                        }
                      />
                    </>
                  ) : (
                    <>{Category.name}</>
                  )}
                </td>

                <td>
                  {editingCategoryId === Category.categoryID ? (
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
                    Category.description
                  )}
                </td>

                <td>
                  {editingCategoryId === Category.categoryID ? (
                    <>
                      <button
                        className="save-btn"
                        onClick={() => handleSave(Category.categoryID)}
                      >
                        <Save size={18} />
                      </button>
                      <button
                        className="exit-btn"
                        onClick={() => setEditingCategoryId(null)}
                      >
                        <OctagonX size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(Category)}
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteCategoryItem(Category.categoryID)}
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

export default CategoryTable;
