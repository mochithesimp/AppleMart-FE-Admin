import { useState } from "react";
import { Save, OctagonX } from "lucide-react";
import swal from "sweetalert";
import "../ProductTable.css";
import { createCategory} from "../../../apiServices/CategoryServices/categoryServices";


interface AddCategoryFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

const AddProductForm3: React.FC<AddCategoryFormProps> = ({
    onClose,
    onSuccess,
}) => {

    const [newCategory, setNewCatgory] = useState<{

        name?: string;
        description?: string;

    }>({});

 // handle save ---------------------------------------------------------------
    const handleSave = async () => {
        const errors: string[] = [];

        // Validate các trường bắt buộc

        if (!newCategory.name) errors.push("Name is required.");
        if (newCategory.name && newCategory.name.length > 255)
            errors.push("Name cannot exceed 255 characters.");
        if (newCategory.description && newCategory.description.length > 1000)
            errors.push("Description cannot exceed 1000 characters.");




        // Nếu có lỗi, hiện thông báo
        if (errors.length > 0) {
            swal("Validation Error", errors.join("\n"), "error");
            return;
        }

        try {
            // tạo product nhưng chưa có ảnhảnh
            const response = await createCategory(newCategory);

            if (!response) {
                swal("Error", "Failed to create Category.", "error");
                return;
            }
            swal("Success!", "Category created!", "success").then(() => {
                onSuccess();
                onClose();
            });
        } catch (error) {
            console.error("Error creating Category:", error);
            swal("Error", "Something went wrong!", "error");
        }
    };

    return (
        <div className="add-product-form">
            <h3>Add New Product</h3>
            <input
                type="text"
                placeholder="Name"
                value={newCategory.name ?? ""}
                onChange={(e) => setNewCatgory({ ...newCategory, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={newCategory.description ?? ""}
                onChange={(e) =>
                    setNewCatgory({ ...newCategory, description: e.target.value })
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

export default AddProductForm3;
