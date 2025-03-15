import { useEffect, useState } from "react";
import { Save, OctagonX} from "lucide-react";
import swal from "sweetalert";
import "../ProductTable.css";
import { aProduct } from "../../../interfaces";
import { createProduct, getProduct } from "../../../apiServices/ProductServices/productServices";


interface AddProductFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

const AddProductForm2: React.FC<AddProductFormProps> = ({
    onClose,
    onSuccess,
}) => {
    const [products, setProducts] = useState<aProduct[]>([]);
    const [newProduct, setNewProduct] = useState<{
        categoryID?: number;
        name?: string;
        description?: string;

    }>({});



    // lấy các products----------------------------------------------------- 
    useEffect(() => {
        const fetchData = async () => {
            const result = await getProduct();
            if (result && result.$values) {
                setProducts(result.$values);
            } else {
                console.error("Data not found or invalid response structure");
            }
        };
        fetchData();
    }, []);



    // handle save ---------------------------------------------------------------
    const handleSave = async () => {
        const errors: string[] = [];

        // Validate các trường bắt buộc
        if (!newProduct.categoryID) errors.push("Category ID is required.");
        if (!newProduct.name) errors.push("Name is required.");
        if (newProduct.name && newProduct.name.length > 255)
            errors.push("Name cannot exceed 255 characters.");
        if (newProduct.description && newProduct.description.length > 1000)
            errors.push("Description cannot exceed 1000 characters.");




        // Nếu có lỗi, hiện thông báo
        if (errors.length > 0) {
            swal("Validation Error", errors.join("\n"), "error");
            return;
        }

        try {
            // tạo product nhưng chưa có ảnhảnh
            const response = await createProduct(newProduct);

            if (!response) {
                swal("Error", "Failed to create product.", "error");
                return;
            }
                swal("Success!", "Product created!", "success").then(() => {
                onSuccess();
                onClose();
            });
        } catch (error) {
            console.error("Error creating product:", error);
            swal("Error", "Something went wrong!", "error");
        }
    };

    return (
        <div className="add-product-form">
            <h3>Add New Product</h3>
            <select
                value={newProduct.categoryID ?? ""}
                onChange={(e) =>
                    setNewProduct({
                        ...newProduct,
                        categoryID: e.target.value ? Number(e.target.value) : undefined,
                    })
                }
            >
                <option value="">-- Select Category --</option>
                {products.map((p) => (
                    <option key={p.categoryID} value={p.categoryID}>
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

export default AddProductForm2;
