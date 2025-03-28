import React, { useState } from "react";
import "./ShipperListModal.css";

interface Shipper {
  id: string;
  email: string;

  processingOrders: number;
}

interface ShipperListModalProps {
  shippers: Shipper[];
  onSelectShipper: (shipperId: string) => void;
  onClose: () => void;
}

const ShipperListModal: React.FC<ShipperListModalProps> = ({
  shippers,
  onSelectShipper,
  onClose,
}) => {

  const [selectedShipperId, setSelectedShipperId] = useState<string>("");

  const handleShipperChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const shipperId = event.target.value;
    setSelectedShipperId(shipperId);
    if (shipperId) {
      onSelectShipper(shipperId); // Gọi hàm onSelectShipper với shipperId được chọn
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select a Shipper</h2>
        <select
          className="shipper-select"
          value={selectedShipperId}
          onChange={handleShipperChange}
        >
          <option value="" disabled>
            Chọn một shipper
          </option>
          {shippers.map((shipper) => (
            <option
              key={shipper.id}
              value={shipper.id}
              disabled={shipper.processingOrders >= 3}
              style={{
                opacity: shipper.processingOrders >= 3 ? 0.6 : 1,
              }}
            >
              {shipper.email} (Đơn hàng: {shipper.processingOrders})
            </option>
          ))}
        </select>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShipperListModal;
