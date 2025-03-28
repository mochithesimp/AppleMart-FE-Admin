import React, { useEffect } from "react";
import "./ShipperListModal.css";
import Swal from "sweetalert2";

interface Shipper {
  id: string;
  email: string;
  pendingOrdersCount: number;
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
  // Show the SweetAlert popup as soon as the component mounts
  useEffect(() => {
    // Filter out shippers with 3 or more pending orders
    const availableShippers = shippers.filter(shipper => shipper.pendingOrdersCount < 3);

    let globalSelectedShipperId = availableShippers.length > 0 ? availableShippers[0].id : "";

    // Show the SweetAlert popup
    Swal.fire({
      title: 'Select a Shipper',
      html: createShipperSelectionHtml(availableShippers, shippers),
      showCancelButton: true,
      confirmButtonText: 'Assign',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      width: 600,
      customClass: {
        popup: 'large-swal-popup',
        htmlContainer: 'large-swal-html',
        actions: 'large-swal-actions'
      },
      didOpen: (modalElement) => {
        setupRadioEventListeners(modalElement, availableShippers, shippers, (shipperId) => {
          globalSelectedShipperId = shipperId;
        });
      },
      preConfirm: () => {
        if (!globalSelectedShipperId && availableShippers.length > 0) {
          Swal.showValidationMessage('Please select a shipper');
          return false;
        } else if (availableShippers.length === 0) {
          Swal.showValidationMessage('No available shippers found');
          return false;
        }
        return true;
      }
    }).then((result) => {
      if (result.isConfirmed && globalSelectedShipperId) {
        onSelectShipper(globalSelectedShipperId);
      } else {
        onClose();
      }
    });
  }, [shippers, onSelectShipper, onClose]);

  // Create the HTML content for the shipper selection dialog
  const createShipperSelectionHtml = (availableShippers: Shipper[], allShippers: Shipper[]) => {
    // Generate radio buttons for available shippers
    const shipperRadios = availableShippers.map((shipper, index) => {
      return `
        <div class="shipper-radio-option">
          <input 
            type="radio" 
            name="shipper" 
            id="shipper-${shipper.id}" 
            value="${shipper.id}"
            ${index === 0 ? 'checked' : ''}
          />
          <label for="shipper-${shipper.id}">
            ${shipper.email} (Pending Orders: ${shipper.pendingOrdersCount})
          </label>
        </div>
      `;
    }).join('');

    // Generate list of unavailable shippers
    const unavailableShippers = allShippers
      .filter(shipper => shipper.pendingOrdersCount >= 3)
      .map(shipper => {
        return `
          <div class="shipper-option disabled">
            <span class="shipper-email">${shipper.email}</span>
            <span class="shipper-orders">(Pending Orders: ${shipper.pendingOrdersCount})</span>
          </div>
        `;
      }).join('');

    // Create the complete HTML content
    return `
      <div class="shipper-popup-container">
        ${availableShippers.length > 0 ? `
          <div class="shipper-options">
            ${shipperRadios}
          </div>
        ` : '<p class="no-shippers">No available shippers found.</p>'}
        
        ${unavailableShippers ? `
          <div class="unavailable-shippers">
            <p class="unavailable-header">Unavailable Shippers:</p>
            ${unavailableShippers}
          </div>
        ` : ''}
        
        <p class="shipper-instructions">Select a shipper from the list above. Shippers with 3 or more pending orders are disabled.</p>
        <div id="selected-shipper-info" class="selected-shipper-info">
          <p>You selected: <strong id="selected-shipper-name">
            ${availableShippers.length > 0 ?
        `${availableShippers[0].email} (Pending Orders: ${availableShippers[0].pendingOrdersCount})` :
        'No shipper selected'}
          </strong></p>
        </div>
      </div>
    `;
  };

  // Setup event listeners for the radio buttons
  const setupRadioEventListeners = (
    modalElement: HTMLElement,
    availableShippers: Shipper[],
    allShippers: Shipper[],
    onSelect: (shipperId: string) => void
  ) => {
    // Add event listeners to all radio buttons
    modalElement.querySelectorAll('input[name="shipper"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const selectedValue = (e.target as HTMLInputElement).value;
        onSelect(selectedValue);

        // Find the shipper details
        const shipper = allShippers.find(s => s.id === selectedValue);
        if (shipper) {
          const shipperNameEl = modalElement.querySelector('#selected-shipper-name') as HTMLElement;
          if (shipperNameEl) {
            shipperNameEl.textContent = `${shipper.email} (Pending Orders: ${shipper.pendingOrdersCount})`;
          }
        }
      });
    });

    // Trigger the change event for the first radio if it exists
    const firstRadio = modalElement.querySelector('input[name="shipper"]:checked') as HTMLInputElement;
    if (firstRadio) {
      firstRadio.dispatchEvent(new Event('change'));
    }
  };

  // This component doesn't render anything visible itself
  // The UI is handled by SweetAlert2
  return null;
};

export default ShipperListModal;
