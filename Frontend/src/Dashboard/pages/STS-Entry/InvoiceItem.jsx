import React from 'react';

const InvoiceItem = ({
  id,
  selectedVehicle,
  vehicleData,
  onDeleteItem,
  onEdtiItem,
  vehicleOptions,
  setSelectedVehicle
}) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  const handleInputChange = (event) => {
    console.log(event); // Add this line for debugging
    const { name, value } = event.target;
    onEdtiItem({ name, value }); // Call onEditItem handler with updated data
    setSelectedVehicle(value); // Update selectedVehicle state
    
  };
  
  const selectedVehicleData = vehicleData.find(
    (vehicle) => vehicle.regnumber === selectedVehicle
  );

  return (
    <tr>
      <td>
        <select
          value={selectedVehicle}
          onChange={handleInputChange}
          name="selectedVehicle"
        >
          <option value="">Select Vehicle</option>
          {vehicleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>
      <td>{selectedVehicleData ? selectedVehicleData.type : ''}</td>
      <td>{selectedVehicleData ? selectedVehicleData.capacity : ''}</td>
      <td>{selectedVehicleData ? selectedVehicleData.loadedfuelcost : ''}</td>
      <td>{selectedVehicleData ? selectedVehicleData.unloadedfuelcost : ''}</td>
      <td className="flex items-center justify-center">
      </td>
    </tr>
  );
};

export default InvoiceItem;
