import { motion } from "framer-motion";
import { Edit, OctagonX, Save, Search, SquarePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import "../Products/ProductTable.css";
import { aProduct, bBlogs } from "../../interfaces";
import {
  deleteBlogs,
  getBlogs,
  update,
} from "../../apiServices/BlogServices/blogServices";
import { getProduct } from "../../apiServices/ProductServices/productServices";
import ImageBlogDropdownProps from "../Products/components/ImageBlogDropdownProps";
import { ImageBlogUpload } from "../Firebase/ImageBlogUpload";
import AddBlogForm from "../Products/components/AddBlogForm";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

interface BlogImages {
  $values: BlogImage[];
}

interface BlogImage {
  blogImageID: number;
  imageUrl: string;
  blogId: number;
}

interface UpdateBlog2 {
  title?: string;
  content?: string;
  author?: string;
  productId?: number;
  blogImages: { imageUrl: string }[];
}

const BlogsTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allBlogs, setAllBlogs] = useState<bBlogs[]>([]);
  const [products, setProducts] = useState<aProduct[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<{
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
  useEffect(() => {
    const fetchData = async () => {
      const result = await getBlogs();
      if (result && result.$values) {
        setAllBlogs(result.$values);
      } else {
        console.error("Data not found or invalid response structure");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProduct();
      if (result && result.items.$values) {
        setProducts(result.items.$values);
      } else {
        console.error("Data not found or invalid response structure");
      }
    };
    fetchData();
  }, []);
  //---------------------------------------------------------------------------

  const mergedBlogs = allBlogs.map((blog) => {
    const Product = products.find((p) => p.productID === blog.productId);
    return {
      ...blog,
      productName: Product ? Product.name : "Unknown",
    };
  });

  // delete blog------------------------------------------------------
  const deleteBlog = async (productItemId: number) => {
    try {
      const confirmDelete = await swal({
        title: "Are you sure you want to delete this blog?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      });

      if (confirmDelete) {
        const response = await deleteBlogs(productItemId);

        if (response) {
          swal("Success!", "Blog was deleted!", "success").then(() => {
            window.location.reload();
          });
        } else {
          throw new Error("Failed to delete blog");
        }
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // handle edit --------------------------------------------------
  const handleEditClick = (blog: bBlogs) => {
    setEditingBlogId(blog.blogID);
    setEditedData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      productId: blog.productId,
      updateBlog: true,
      blogImages: blog.blogImages
        ? { $values: [...blog.blogImages.$values] }
        : { $values: [] },
    });
  };

  // handle image------------------------------------------------------
  const handleImageChange = (file: File, index: number) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEditedData((prevData) => {
        const updatedImages = [...(prevData.blogImages?.$values || [])];
        if (updatedImages[index]) {
          updatedImages[index] = {
            ...updatedImages[index],
            imageUrl: reader.result as string,
          };
        }

        const newImages = [...(prevData.newImages || [])];
        newImages[index] = file; // Lưu ảnh mới vào newImages

        return {
          ...prevData,
          blogImages: { $values: updatedImages },
          newImages: newImages, // Cập nhật newImages
        };
      });
    };
  };

  // handle save---------------------------------------------------------------
  const handleSave = async (blogId: number) => {
    const errors: string[] = [];
    if (!editedData.title) errors.push("Title is required.");
    if (!editedData.content) errors.push("Content is required.");
    if (!editedData.author) errors.push("Author is required.");

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
      let updatedImages = [...(editedData.blogImages?.$values || [])];

      // Kiểm tra nếu có ảnh mới cần upload
      if (editedData.newImages && editedData.newImages.length > 0) {
        const uploadPromises = editedData.newImages.map((file) =>
          ImageBlogUpload(file, blogId)
        );
        const uploadedUrls = await Promise.all(uploadPromises);

        // Cập nhật lại danh sách ảnh dựa trên ID ảnh cũ
        updatedImages = updatedImages.map((img, index) => ({
          ...img,
          imageUrl: uploadedUrls[index] || img.imageUrl, // Giữ nguyên nếu không upload mới
        }));
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { newImages, ...updatedBlog } = {
        ...editedData,
        blogImages: { $values: updatedImages }, // Cập nhật danh sách ảnh mới
      };

      const updateBlog2: UpdateBlog2 = {
        title: updatedBlog.title,
        content: updatedBlog.title,
        author: updatedBlog.author,
        productId: updatedBlog.productId,
        blogImages:
          updatedBlog.blogImages?.$values.map((img) => ({
            imageUrl: img.imageUrl,
          })) || [],
      };

      const response = await update(blogId, updateBlog2);

      if (response) {
        setAllBlogs(
          allBlogs.map((b) =>
            b.blogID === blogId ? { ...b, ...updatedBlog } : b
          )
        );
        MySwal.fire({
          title: "Success!",
          text: "Blog updated!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      MySwal.fire({
        title: "Error!",
        text: "Failed to update blog.",
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
        <h2>Blog List</h2>

        <div style={{ display: "flex" }}>
          <button className="add-btn" onClick={() => setShowAddForm(true)}>
            <SquarePlus size={40} />
          </button>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="search-icon" size={18} />
          </div>
        </div>
      </div>
      {showAddForm && (
        <AddBlogForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => window.location.reload()}
          products={products}
        />
      )}
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>BlogID</th>
              <th>Image</th>
              <th>ProductName</th>
              <th>Title</th>
              <th>Content</th>
              <th>author</th>
              <th>uploadDate</th>
              <th>updateDate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mergedBlogs.map((blog, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td>{blog.blogID}</td>
                <td>
                  {editingBlogId === blog.blogID ? (
                    <ImageBlogDropdownProps
                      images={editedData?.blogImages?.$values || []}
                      onImageChange={(index, file) =>
                        handleImageChange(file, index)
                      }
                    />
                  ) : (
                    <img
                      src={blog.blogImages?.$values?.[0]?.imageUrl}
                      alt=""
                      className="product-image"
                    />
                  )}
                </td>
                <td>
                  {" "}
                  {editingBlogId === blog.blogID ? (
                    <select
                      value={editedData.productId || blog.productId}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          productId: Number(e.target.value),
                        })
                      }
                    >
                      {products.map((p) => (
                        <option key={p.productID} value={p.productID}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    blog.productName
                  )}
                </td>

                <td>
                  {editingBlogId === blog.blogID ? (
                    <input
                      value={editedData.title || ""}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          title: e.target.value,
                        })
                      }
                    />
                  ) : (
                    blog.title
                  )}
                </td>
                <td>
                  {editingBlogId === blog.blogID ? (
                    <input
                      value={editedData.content || ""}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          content: e.target.value || "",
                        })
                      }
                    />
                  ) : (
                    blog.content
                  )}
                </td>
                <td>
                  {editingBlogId === blog.blogID ? (
                    <input
                      value={editedData.author || ""}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          author: e.target.value || "",
                        })
                      }
                    />
                  ) : (
                    blog.author
                  )}
                </td>
                <td>{blog.uploadDate}</td>
                <td>{blog.updateDate}</td>
                <td>
                  {editingBlogId === blog.blogID ? (
                    <>
                      <button
                        className="save-btn"
                        onClick={() => handleSave(blog.blogID)}
                      >
                        <Save size={18} />
                      </button>
                      <button
                        className="exit-btn"
                        onClick={() => setEditingBlogId(null)}
                      >
                        <OctagonX size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(blog)}
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteBlog(blog.blogID)}
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

export default BlogsTable;
