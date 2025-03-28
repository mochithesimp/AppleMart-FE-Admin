import { useEffect, useState } from "react";
import { Save, OctagonX, ImagePlus } from "lucide-react";
import swal from "sweetalert";
import { ImageUpload } from "../../Firebase/ImageUpload";
import "../ProductTable.css";
import { createProductItem } from "../../../apiServices/ProductServices/productItemServices";
import { aProduct } from "../../../interfaces";
import { getProduct } from "../../../apiServices/ProductServices/productServices";
import { addProductImgs } from "../../../apiServices/ProductServices/productImgSevices";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getTotalAllProduct } from "../../../apiServices/AdminServices/adminServices";

interface AddProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
}
const MySwal = withReactContent(Swal);

const AddProductForm: React.FC<AddProductFormProps> = ({
  onClose,
  onSuccess,
}) => {
  const [products, setProducts] = useState<aProduct[]>([]);
  const [newProduct, setNewProduct] = useState<{
    productID?: number;
    name?: string;
    description?: string;
    quantity?: number;
    price?: number;
    imageUrls?: string;

    newImages?: File[]; // Lưu danh sách file ảnh cần upload
  }>({});

  const [newImages, setNewImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  // lấy các products-----------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const result = await getTotalAllProduct();
      console.log("result", result);
      
      if (result && result.$values) {
        setProducts(result.$values);
      } else {
        console.error("Data not found or invalid response structure");
      }
    };
    fetchData();
  }, []);

  // thay đổi file ảnh thành url ----------------------------------------------------------------
  const handleImageChange = (file: File, index: number) => {
    const updatedImages = [...newImages];
    const updatedPreviews = [...previewUrls];

    updatedImages[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);

    setNewImages(updatedImages);
    setPreviewUrls(updatedPreviews);
  };

  // handle search ---------------------------------------------------------------
  const handleSave = async () => {
    const errors: string[] = [];

    // Validate các trường bắt buộc
    if (!newProduct.productID) errors.push("Product ID is required.");
    if (!newProduct.name) errors.push("Name is required.");
    if (newProduct.name && newProduct.name.length > 255)
      errors.push("Name cannot exceed 255 characters.");
    if (newProduct.description && newProduct.description.length > 1000)
      errors.push("Description cannot exceed 1000 characters.");
    if (newProduct.quantity === undefined || newProduct.quantity === null)
      errors.push("Quantity is required.");
    if (newProduct.quantity !== undefined && newProduct.quantity < 0)
      errors.push("Quantity must be at least 0.");
    if (newProduct.price === undefined || newProduct.price === null)
      errors.push("Price is required.");
    if (newProduct.price !== undefined && newProduct.price < 0)
      errors.push("Price must be at least 0.");

    // Phải có ít nhất 1 ảnh được chọn
    const hasImage = newImages.some((img) => img !== null);
    if (!hasImage) errors.push("At least one image is required.");

    // Nếu có lỗi, hiện thông báo
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
      // tạo productItem nhưng chưa có ảnhảnh
      const response = await createProductItem(newProduct);

      if (!response || !response.data?.productItemID) {
        swal("Error", "Failed to create product item.", "error");
        return;
      }

      // lấy id
      const newProductItemID = response.data.productItemID;

      // up ảnh lên firebase storage
      const uploadedUrls = await Promise.all(
        newImages
          .filter((file): file is File => file !== null)
          .map((file) => ImageUpload(file, newProductItemID))
      );

      // thêm các ảnh vào productItem đã tạo
      await addProductImgs({
        imageUrl: uploadedUrls,
        productItemID: newProductItemID,
      });

      MySwal.fire({
        icon: "success",
        title: "Create successful!",
        text: "Product created with images!",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        onSuccess();
        onClose();
        window.location.reload();
      });
    } catch (error) {
      console.error("Error creating product with images:", error);
      MySwal.fire({
        title: "Error!",
        text: "Error creating productItem.",
        icon: "error",
      });
    }
  };

  return (
    <div className="add-product-form">
      <h3>Add New Product Item</h3>

      <select
        value={newProduct.productID ?? ""}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            productID: e.target.value ? Number(e.target.value) : undefined,
          })
        }
      >
        <option value="">-- Select Product --</option>
        {products.map((p) => (
          <option key={p.productID} value={p.productID}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Name"
        value={newProduct.name ?? ""}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description ?? ""}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newProduct.quantity ?? ""}
        onChange={(e) =>
          setNewProduct({ ...newProduct, quantity: Number(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price ?? ""}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: Number(e.target.value) })
        }
      />

      {/* Upload images */}
      <div className="image-upload-grid">
        {newImages.map((_, index) => (
          <label key={index} className="image-upload-box">
            {previewUrls[index] ? (
              <img
                src={previewUrls[index]!}
                alt={`Preview ${index + 1}`}
                className="preview-image"
              />
            ) : (
              <ImagePlus size={32} />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] &&
                handleImageChange(e.target.files[0], index)
              }
              hidden
            />
          </label>
        ))}
      </div>

      {/* Nút thêm ảnh */}
      <button
        className="add-image-btn"
        onClick={() => {
          setNewImages([...newImages, null]);
          setPreviewUrls([...previewUrls, null]);
        }}
      >
        + Add Image 
      </button>

      <div
        style={{ display: "flex", gap: "8px", justifyContent: "space-around" }}
      >
        <button className="create-btn" onClick={handleSave}>
          <Save size={18} /> Create
        </button>
        <button className="cancel-btn" onClick={onClose}>
          <OctagonX size={18} /> Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProductForm;
