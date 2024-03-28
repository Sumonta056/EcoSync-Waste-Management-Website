import React, { useState, useEffect } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from './helpers/incrementString';
import axios from "axios";

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [distanceText, setDistanceText] = useState(''); 
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [wardNumbers, setWardNumbers] = useState([]);
  const [siteNumbers, setSiteNumbers] = useState([]);
  const [selectedWardNumber, setSelectedWardNumber] = useState("");
  const [selectedSiteNumber, setSelectedSiteNumber] = useState("");
  const [transferRouteData, setTransferRouteData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    // Fetch available STS ward numbers
    axios.get("http://localhost:3000/sts")
      .then((stsResponse) => {
        const wardNumbers = stsResponse.data.map((sts) => sts.wardno);
        setWardNumbers(wardNumbers);
      })
      .catch((error) => {
        console.error("Error fetching STS data:", error);
      });
  
    // Fetch available landfill site numbers
    axios.get("http://localhost:3000/landfill")
      .then((landfillResponse) => {
        const siteNumbers = landfillResponse.data.map((landfill) => landfill.siteno);
        setSiteNumbers(siteNumbers);
      })
      .catch((error) => {
        console.error("Error fetching landfill data:", error);
      });

    // Fetch transfer route data
    axios.get("http://localhost:3000/transfer")
      .then((transferResponse) => {
        setTransferRouteData(transferResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching transfer route data:", error);
      });

    // Fetch vehicle data
    axios.get("http://localhost:3000/vehicle")
      .then((vehicleResponse) => {
        setVehicleData(vehicleResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedWardNumber && selectedSiteNumber) {
        const matchingRoute = transferRouteData.find(route => route.sts === selectedWardNumber && route.landfill === selectedSiteNumber);
        if (matchingRoute) {
            const matchingVehicleRegNos = matchingRoute.vehicleregno;
            axios.get(`http://localhost:3000/vehicle/${matchingVehicleRegNos}`) 
                .then((vehicleResponse) => {
                    setVehicleData(vehicleResponse.data.map(vehicle => ({
                        regnumber: vehicle.regnumber,
                        type: vehicle.type,
                        capacity: vehicle.capacity,
                        loadedfuelcost: vehicle.loadedfuelcost,
                        unloadedfuelcost: vehicle.unloadedfuelcost
                    })));
                })
                .catch((error) => {
                    console.error("Error fetching vehicle data:", error);
                });
        }
    }
  }, [selectedWardNumber, selectedSiteNumber, transferRouteData]);

  const [items, setItems] = useState([
    {
      id: uid(6),
      selectedVehicle: '',
      qty: 1,
      price: '1.00',
    },
  ]);

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        selectedVehicle: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    // Select a default vehicle based on fetched data
    const defaultVehicle = vehicleData.length > 0 ? vehicleData[0].regnumber : '';
    
    setItems((prevItems) => [
      ...prevItems,
      {
        id: id,
        selectedVehicle: defaultVehicle, // Set the default vehicle
        capacity: '', // Add capacity property
        type: '', // Add type property
        loadedfuelcost: '', // Add loaded fuel cost property
        unloadedfuelcost: '', // Add unloaded fuel cost property
      },
    ]);
  };

  const edtiItemHandler = (id, name, value) => {
    const editedItem = {
      id: id, // Use the id passed as argument
      name: name,
      value: name === 'selectedVehicle' ? value : parseFloat(value), // Parse value for qty and price
    };
  
    const newItems = items.map((item) => {
      if (item.id === editedItem.id) {
        return { ...item, [editedItem.name]: editedItem.value };
      } else {
        return item;
      }
    });
  
    setItems(newItems);
  };

  const distance = parseFloat(distanceText) || 0; // Convert distance text to number

  const totalActionValue = items.reduce((prev, curr) => {
    const selectedVehicleData = vehicleData.find(
      (vehicle) => vehicle.regnumber === curr.selectedVehicle
    );
    if (selectedVehicleData) {
      const loadedCost = parseFloat(selectedVehicleData.loadedfuelcost);
      const unloadedCost = parseFloat(selectedVehicleData.unloadedfuelcost);
      const actionValue = unloadedCost + (3 / 5) * (loadedCost - unloadedCost);
      return prev + actionValue * curr.qty;
    }
    return prev;
  }, 0);

  const distanceNumeric = parseFloat(distanceText);
  const total = (distanceNumeric * totalActionValue).toFixed(2);
  
  const subtotal = items.reduce((prev, curr) => {
    if (curr.selectedVehicle.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">INVOICE</h1>
        <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
          <label
            htmlFor="selectedWardNumber"
            className="text-sm font-bold sm:text-base"
          >
            Select STS:
          </label>
          <select
            required
            className="flex-1"
            value={selectedWardNumber}
            onChange={(event) => setSelectedWardNumber(event.target.value)}
          >
            <option value="">Select STS Ward No</option>
            {wardNumbers.map((wardNumber) => (
              <option key={wardNumber} value={wardNumber}>
                {wardNumber}
              </option>
            ))}
          </select>
          <label
            htmlFor="selectedSiteNumber"
            className="col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Select Landfill:
          </label>
          <select
            required
            className="flex-1"
            value={selectedSiteNumber}
            onChange={(event) => setSelectedSiteNumber(event.target.value)}
          >
            <option value="">Select Landfill Site No</option>
            {siteNumbers.map((siteNumber) => (
              <option key={siteNumber} value={siteNumber}>
                {siteNumber}
              </option>
            ))}
          </select>
        </div>
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
            <th>Select Vehicle</th>
            <th>Type</th>
              <th>Capacity</th>
              <th className="text-center">Loaded Fuel Cost</th>
              <th className="text-center">Unloaded Fuel Cost</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item) => (
            <InvoiceItem
              key={item.id}
              id={item.id}
              selectedVehicle={item.selectedVehicle}
              vehicleData={vehicleData} // Pass vehicleData prop
              onEdtiItem={edtiItemHandler} // Corrected spelling of onEditItem
              vehicleOptions={vehicleData.map((vehicle) => vehicle.regnumber)}
              setSelectedVehicle={(selectedVehicle) => {
                // Update the selectedVehicle state when a selection is made
                const updatedItems = items.map((i) =>
                  i.id === item.id ? { ...i, selectedVehicle } : i
                );
                setItems(updatedItems);
              }}
              // Display action value
              action={(() => {
                const selectedVehicleData = vehicleData.find(
                  (vehicle) => vehicle.regnumber === item.selectedVehicle
                );
                if (selectedVehicleData) {
                  const loadedCost = parseFloat(selectedVehicleData.loadedfuelcost);
                  const unloadedCost = parseFloat(selectedVehicleData.unloadedfuelcost);
                  const actionValue = unloadedCost + (3 / 5) * (loadedCost - unloadedCost);
                  return actionValue.toFixed(2);
                }
                return '';
              })()}
            />
          ))}
          </tbody>
        </table>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Action Value:</span>
            <span>৳{totalActionValue.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Distance:</span>
            <span>
            {distanceText} KM
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">৳{total}</span>
          </div>
        </div>
      </div>
      <div className="basis-1/4 bg-transparent">
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review Invoice
          </button>
          <InvoiceModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          invoiceInfo={{
            invoiceNumber,
            subtotal,
            total,
            selectedWardNumber,
            selectedSiteNumber,
          }}
          items={items}
          vehicleData={vehicleData}
          distance={distance} // Pass the distance prop
          total={total} // Pass the total prop
          onAddNextInvoice={addNextInvoiceHandler}
        />

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="distance"
              >
                Distance:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="text"
                  name="distance"
                  id="distance"
                  placeholder="Enter distance"
                  value={distanceText}
                  onChange={(event) => setDistanceText(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  KM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
