import { motion } from "framer-motion";
import { Edit, Search, Trash2, Save, OctagonX } from "lucide-react";
import { useEffect, useState } from "react";
import "./ProductTable.css";
import { ProductImg, ProductItem } from "../../interfaces";
import swal from "sweetalert";
import { ImageUpload } from "../Firebase/ImageUpload";
import {
  deleteProductItems,
  getProductItems,
  updateProductItem,
} from "../../apiServices/ProductServices/productItemServices";
import { getProductImgs } from "../../apiServices/ProductServices/productImgSevices";
import ImageDropdown from "./ImageDropdown";

const ProductItemsTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
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
      // Gọi API lấy danh sách productItems và productImgs
      const productItemsResult = await getProductItems();
      const productImgsResult = await getProductImgs();

      // Kiểm tra nếu dữ liệu hợp lệ
      if (productItemsResult?.$values && productImgsResult?.$values) {
        const productItems = productItemsResult.$values;
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
  }, []);

  // delete productItem
  const deleteProduct = async (productItemId: number) => {
    try {
      swal({
        title: "Are you sure you want to delete this productItem?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await deleteProductItems(productItemId);

          if (response) {
            swal("Success!", "ProductItem was deleted!", "success");
            setProductItems(
              productItems.filter(
                (product) => product.productItemID !== productItemId
              )
            );
          } else {
            throw new Error("Failed to delete productItem");
          }
        }
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // handle edit
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

  // handle image
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

  // handle save
  const handleSave = async (productItemId: number) => {
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
      // console.log("vvvvvvvvvvvvvvvvvvvvvvvvvv", editedData);
      const response = await updateProductItem(
        productItemId,
        updatedProductItem
      );
      if (response) {
        setProductItems(
          productItems.map((p) =>
            p.productItemID === productItemId
              ? { ...p, ...updatedProductItem }
              : p
          )
        );
        setEditingProductItemId(null);
        swal("Success!", "ProductItem updated!", "success");
      }
    } catch (error) {
      console.error("Error updating productItem:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = productItems.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    setProductItems(filtered);
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
                      value={editedData.description || 0}
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
                      value={editedData.price || ""}
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
                        onClick={() => handleSave(product.productID)}
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

export default ProductItemsTable;
