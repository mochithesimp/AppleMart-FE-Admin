import { useState } from "react";
import { Save, OctagonX } from "lucide-react";
import swal from "sweetalert";
import "../ProductTable.css";
import { Attribute, ProductItem } from "../../../interfaces";
import { createProductIA } from "../../../apiServices/ProductServices/ProductItemAttributeService";


interface AddProductItemAttributeFormProps {
  onClose: () => void;
  onSuccess: () => void;
  productItems: ProductItem[];
  Attributies: Attribute[];
}

const AddProductItemAttribute: React.FC<AddProductItemAttributeFormProps> = ({
  onClose,
  onSuccess,
  productItems,
  Attributies,
}) => {


  const [newProductIA, setNewProductIA] = useState<{
    productItemID?: number;
    value?: string;
    attributeID?: number;
  }>({});

  const handleSave = async () => {
    const errors: string[] = [];

    // Validate các trường bắt buộc
    if (!newProductIA.productItemID) errors.push("ProductItem ID is required.");
    if (!newProductIA.attributeID) errors.push("AttributeID ID is required.");
    if (!newProductIA.value) errors.push("Value is required.");
    
    // Nếu có lỗi, hiện thông báo
    if (errors.length > 0) {
      swal("Validation Error", errors.join("\n"), "error");
      return;
    }

    try {

      const response = await createProductIA(newProductIA);

      if (!response) {
        swal("Error", "Failed to create productIA.", "error");
        return;
      }
      swal("Success!", "productIA created!", "success").then(() => {
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
      <h3>Add New Product Item Attribute</h3>
      <select
        value={newProductIA.productItemID ?? ""}
        onChange={(e) =>
            setNewProductIA({
            ...newProductIA,
            productItemID: e.target.value ? Number(e.target.value) : undefined,
          })
        }
      >
        <option value="">-- Select Product Item --</option>
        {productItems.map((p) => (
          <option key={p.productItemID} value={p.productItemID}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        value={newProductIA.attributeID ?? ""}
        onChange={(e) =>
            setNewProductIA({
            ...newProductIA,
            attributeID: e.target.value ? Number(e.target.value) : undefined,
          })
        }
      >
        <option value="">-- Select Attribute --</option>
        {Attributies.map((a) => (
          <option key={a.attributeID} value={a.attributeID}>
            {a.attributeName}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Value"
        value={newProductIA. value?? ""}
        onChange={(e) =>
            setNewProductIA({ ...newProductIA, value: e.target.value })
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

export default AddProductItemAttribute;
