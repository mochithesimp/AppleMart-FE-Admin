import { motion } from "framer-motion";
import { Edit, Search, Trash2, Save, OctagonX, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import "./ProductTable.css";
import { ProductImg, ProductItem } from "../../interfaces";
import swal from "sweetalert";
import { ImageUpload } from "../Firebase/ImageUpload";
import {
  deleteProductItems,
  search,
  updateProductItem,
} from "../../apiServices/ProductServices/productItemServices";
import { getProductImgs } from "../../apiServices/ProductServices/productImgSevices";
import ImageDropdown from "./ImageDropdown";
import AddProductForm from "./components/AddProductItemForm";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

const ProductItemsTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductItemId, setEditingProductItemId] = useState<
    number | null
  >(null);
  const [editedData, setEditedData] = useState<{
    productID?: number;
    name?: string;
    description?: string;
    quantity?: number;
    price?: number;
    updatedProductImgs?: { imageUrl: string; productImgID: number }[];

    newImages?: File[]; // Lưu danh sách file ảnh cần upload
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams();

      if (searchTerm) {
        queryParams.append("SearchTerm", searchTerm);
      }

      const productItemsResult = await search(queryParams);
      const productImgsResult = await getProductImgs();

      // Kiểm tra nếu dữ liệu hợp lệ
      if (productItemsResult?.items.$values && productImgsResult?.$values) {
        const productItems = productItemsResult.items.$values;
        const productImgs = productImgsResult.$values;

        // Nhóm ảnh theo productItemID
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imagesByProductItemID = productImgs.reduce(
          (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        const mergedData = productItems.map(
          (item: { productItemID: string | number }) => ({
            ...item,
            productImgs: imagesByProductItemID[item.productItemID] || [],
          })
        );

        setProductItems(mergedData);
      } else {
        console.error("Data not found or invalid response structure");
      }
    };

    fetchData();
  }, [searchTerm]);

  // delete productItem------------------------------------------------------
  const deleteProductItem = async (productItemId: number) => {
    try {
      const confirmDelete = await swal({
        title: "Are you sure you want to delete this productItem?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      });

      if (confirmDelete) {
        const response = await deleteProductItems(productItemId);

        if (response) {
          swal("Success!", "ProductItem was deleted!", "success").then(() => {
            window.location.reload();
          });
        } else {
          throw new Error("Failed to delete productItem");
        }
      }
    } catch (error) {
      console.error("Error deleting product item:", error);
    }
  };

  // handle edit --------------------------------------------------
  const handleEditClick = (product: ProductItem) => {
    setEditingProductItemId(product.productItemID);
    setEditedData({
      productID: product.productID,
      name: product.name,
      quantity: product.quantity,
      description: product.description,
      price: product.price,
      updatedProductImgs: product.productImgs.map((img) => ({
        imageUrl: img.imageUrl,
        productImgID: img.productImgID,
      })),
    });
  };

  // handle image------------------------------------------------------
  const handleImageChange = (file: File, index: number) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEditedData((prevData) => {
        const updatedImages = [...(prevData.updatedProductImgs || [])];
        if (updatedImages[index]) {
          updatedImages[index] = {
            ...updatedImages[index],
            imageUrl: reader.result as string,
          };
        }

        const newImages = [...(prevData.newImages || [])];
        newImages[index] = file;

        return {
          ...prevData,
          updatedProductImgs: updatedImages,
          newImages: newImages,
        };
      });
    };
  };

  // handle save---------------------------------------------------------------
  const handleSave = async (productItemId: number) => {
    const errors: string[] = [];

    if (!editedData.name) errors.push("Name is required.");
    if (editedData.name && editedData.name.length > 255)
      errors.push("Name cannot exceed 255 characters.");
    if (editedData.description && editedData.description.length > 1000)
      errors.push("Description cannot exceed 1000 characters.");
    if (editedData.quantity === undefined || editedData.quantity === null)
      errors.push("Quantity is required.");
    if (editedData.price === undefined || editedData.price === null)
      errors.push("Price is required.");

    if (errors.length > 0) {
      swal("Validation Error", errors.join("\n"), "error");
      return;
    }

    MySwal.fire({
      title: "Processing...",
      text: "Please wait a moment.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      let updatedImages = [...(editedData.updatedProductImgs || [])];

      // Kiểm tra nếu có ảnh mới cần upload
      if (editedData.newImages && editedData.newImages.length > 0) {
        const uploadPromises = editedData.newImages.map((file) =>
          ImageUpload(file, productItemId)
        );

        const uploadedUrls = await Promise.all(uploadPromises);

        // Cập nhật lại danh sách ảnh dựa trên ID ảnh cũ
        updatedImages = updatedImages.map((img, index) => ({
          ...img,
          imageUrl: uploadedUrls[index] || img.imageUrl, // Giữ nguyên nếu không upload mới
        }));
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { newImages, ...updatedProductItem } = {
        ...editedData,
        updatedProductImgs: updatedImages, // Cập nhật danh sách ảnh mới
      };

      const response = await updateProductItem(
        productItemId,
        updatedProductItem
      );

      // cái này cập nhật lại sản phẩm khi edit xong ngay lập tức
      if (response) {
        setProductItems(
          productItems.map((p) =>
            p.productItemID === productItemId
              ? { ...p, ...updatedProductItem }
              : p
          )
        );
        MySwal.fire({
          icon: "success",
          title: "Create successful!",
          text: "ProductItem updated!",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      
      }
    } catch (error) {
      console.error("Error updating productItem:", error);
      MySwal.fire({
        title: "Error!",
        text: "Error updating productItem.",
        icon: "error",
      });
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
        <h2>Product Item List</h2>

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
        <AddProductForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>ProductItemID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productItems.map((product) => (
              <motion.tr
                key={product.productItemID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td>{product.productItemID}</td>
                <td className="product-name">
                  {editingProductItemId === product.productItemID ? (
                    <>
                      <ImageDropdown
                        images={editedData.updatedProductImgs || []}
                        onImageChange={(index, file) =>
                          handleImageChange(file, index)
                        }
                      />
                      <input
                        value={editedData.name || ""}
                        onChange={(e) =>
                          setEditedData({ ...editedData, name: e.target.value })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={
                          product.productImgs.length > 0
                            ? product.productImgs[0].imageUrl
                            : "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60"
                        }
                        alt="Product"
                        className="product-image"
                      />
                      {product.name}
                    </>
                  )}
                </td>

                <td>
                  {editingProductItemId === product.productItemID ? (
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
                  {editingProductItemId === product.productItemID ? (
                    <input
                      value={editedData.quantity || 0}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          quantity: Number(e.target.value) || 0,
                        })
                      }
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>
                  {editingProductItemId === product.productItemID ? (
                    <input
                      value={editedData.price || 0}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          price: Number(e.target.value) || 0,
                        })
                      }
                    />
                  ) : (
                    <>${product.price}</>
                  )}
                </td>
                <td>
                  {editingProductItemId === product.productItemID ? (
                    <>
                      <button
                        className="save-btn"
                        onClick={() => handleSave(product.productItemID)}
                      >
                        <Save size={18} />
                      </button>
                      <button
                        className="exit-btn"
                        onClick={() => setEditingProductItemId(null)}
                      >
                        <OctagonX size={18} />
                      </button>
                    </>
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
                        onClick={() => deleteProductItem(product.productItemID)}
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

export default ProductItemsTable;
