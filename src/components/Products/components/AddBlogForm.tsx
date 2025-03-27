import { useState } from "react";
import { Save, OctagonX, ImagePlus } from "lucide-react";
import swal from "sweetalert";
import "../ProductTable.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  createBlogs,
  update,
} from "../../../apiServices/BlogServices/blogServices";
import { aProduct } from "../../../interfaces";
import { ImageBlogUpload } from "../../Firebase/ImageBlogUpload";

interface AddBlogForm {
  onClose: () => void;
  onSuccess: () => void;
  products: aProduct[];
}

interface BlogImages {
  $values: BlogImage[];
}

interface BlogImage {
  blogImageID: number;
  imageUrl: string;
  blogId: number;
}

interface CreateBlog2 {
  title?: string;
  content?: string;
  author?: string;
  productId?: number;
  blogImages?: { imageUrl: string }[];
}

const MySwal = withReactContent(Swal);

const AddBlogForm: React.FC<AddBlogForm> = ({
  onClose,
  onSuccess,
  products,
}) => {
  const [newBlog, setNewBlog] = useState<{
    title?: string;
    content?: string;
    author?: string;
    productId?: number;
    blogImages?: BlogImages;
    updateBlog?: boolean;
    newImages?: File[];
  }>({
    blogImages: { $values: [] },
  });

  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  // thay đổi file ảnh thành url ----------------------------------------------------------------
  const handleImageChange = (file: File, index: number) => {
    const updatedImages = [...(newBlog.newImages || [])];
    const updatedPreviews = [...previewUrls];

    updatedImages[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);

    setNewBlog({ ...newBlog, newImages: updatedImages });
    setPreviewUrls(updatedPreviews);
  };

  // handle search ---------------------------------------------------------------
  const handleSave = async () => {
    const errors: string[] = [];

    // Validate các trường bắt buộc
    if (!newBlog.title) errors.push("Title is required.");
    if (!newBlog.content) errors.push("Content is required.");
    if (!newBlog.author) errors.push("Author is required.");

    // Phải có ít nhất 1 ảnh được chọn
    const hasImage = (newBlog.newImages ?? []).some((img) => img !== null);
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
      const createBlog2: CreateBlog2 = {
        title: newBlog.title,
        content: newBlog.content,
        author: newBlog.author,
        productId: newBlog.productId,
        blogImages: [],
      };

      // tạo productItem nhưng chưa có ảnhảnh
      const response = await createBlogs(createBlog2);

      if (!response || !response.data?.blogID) {
        MySwal.fire({
          title: "Error",
          text: "Failed to create blog!",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      // lấy id
      const newBlogID = response.data.blogID;

      // up ảnh lên firebase storage
      const uploadedUrls = await Promise.all(
        (newBlog.newImages ?? [])
          .filter((file): file is File => file !== null)
          .map((file) => ImageBlogUpload(file, newBlogID))
      );

      createBlog2.blogImages = uploadedUrls.map((url) => ({ imageUrl: url }));

      const res = await update(newBlogID, createBlog2);

      if (res) {
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
      }
    } catch (error) {
      console.error("Error creating product with images:", error);
      MySwal.fire({
        title: "Error",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="add-product-form">
      <h3>Add New Blog</h3>

      <select
        value={newBlog.productId ?? ""}
        onChange={(e) =>
          setNewBlog({
            ...newBlog,
            productId: e.target.value ? Number(e.target.value) : undefined,
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
        placeholder="Title"
        value={newBlog.title ?? ""}
        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Content"
        value={newBlog.content ?? ""}
        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author"
        value={newBlog.author ?? ""}
        onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
      />
      {/* Upload images */}
      <div className="image-upload-grid">
        {(newBlog.newImages || []).map((_, index) => (
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

        {/* Thêm nút để thêm ô tải ảnh mới */}
        <button
          type="button"
          onClick={() =>
            setNewBlog({
              ...newBlog,
              newImages: [...(newBlog.newImages || []), new File([], "")], // Thêm ảnh trống
            })
          }
        >
          Add Image
        </button>
      </div>

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

export default AddBlogForm;
