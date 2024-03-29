import { useState, useEffect } from "react";
import axios from "axios";
import { FaHistory } from "react-icons/fa";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import { IoMdPrint } from "react-icons/io";

export default function STSHistory() {
  const [stsData, setStsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [managers, setManagers] = useState([]);
  const [wards, setWards] = useState([]);
  const [sites, setSites] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [distance, setDistance] = useState("");
  // const[transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          managerResponse,
          wardResponse,
          siteResponse,
          transferResponse,
          vehiclesResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3000/user"),
          axios.get("http://localhost:3000/sts"),
          axios.get("http://localhost:3000/landfill"),
          axios.get("http://localhost:3000/transfer"),
          axios.get("http://localhost:3000/vehicle"),
        ]);

        if (Array.isArray(managerResponse.data)) {
          setManagers(managerResponse.data);
        } else {
          console.error("Received manager data is not an array.");
          setError("Received manager data is not an array.");
        }
        if (Array.isArray(wardResponse.data)) {
          setWards(wardResponse.data);
          console.log(wardResponse);
        } else {
          console.error("Received sts data is not an array.");
          setError("Received sts data is not an array.");
        }
        if (Array.isArray(siteResponse.data)) {
          setSites(siteResponse.data);
          console.log(siteResponse);
        } else {
          console.error("Received landfill data is not an array.");
          setError("Received landfill data is not an array.");
        }
        if (Array.isArray(transferResponse.data)) {
          setStsData(transferResponse.data);
          console.log(transferResponse);
        } else {
          console.error("Received transfer data is not an array.");
          setError("Received transfer data is not an array.");
        }
        if (Array.isArray(vehiclesResponse.data)) {
          setVehicles(vehiclesResponse.data);
        } else {
          console.error("Received vehicles data is not an array.");
          setError("Received vehicles data is not an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update stsData when wards state changes
  useEffect(() => {
    if (wards.length > 0) {
      const mappedTransferData = stsData.map((transfer) => {
        const correspondingWard = wards.find(
          (ward) => ward._id === transfer.wardno
        );
        const correspondingSite = sites.find(
          (site) => site._id === transfer.siteno
        );
        return {
          ...transfer,
          correspondingWard: correspondingWard.wardno,
          correspondingSite: correspondingSite.siteno,
        };
      });
      setStsData(mappedTransferData);
    }
  }, [wards, sites]); // Add sites as a dependency

 // Function to fetch GPS coordinates of STS site based on ID
 const fetchSTSGPSCoordinates = (wardId) => {
  const correspondingWard = wards.find((ward) => ward._id === wardId);
  return correspondingWard.gpscoords;
};

// Function to fetch GPS coordinates of landfill site based on ID
const fetchLandfillGPSCoordinates = (siteId) => {
  const correspondingSite = sites.find((site) => site._id === siteId);
  return correspondingSite.gpscoords;
};

const calculateDistance = (stsCoords, landfillCoords) => {
  const [stsLat, stsLng] = stsCoords.split(",").map(parseFloat);
  const [landfillLat, landfillLng] = landfillCoords.split(",").map(parseFloat);

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(landfillLat - stsLat);
  const dLng = deg2rad(landfillLng - stsLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(stsLat)) *
      Math.cos(deg2rad(landfillLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance.toFixed(2); // Round to 2 decimal places
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};



const handlePrintClick = (transfer) => {
  setSelectedTransfer(transfer);
  setIsModalOpen(true);
  const stsCoordinates = fetchSTSGPSCoordinates(transfer.wardno);
    const landfillCoordinates = fetchLandfillGPSCoordinates(transfer.siteno);

    // Calculate distance between STS and landfill
    const calculatedDistance = calculateDistance(stsCoordinates, landfillCoordinates);
    setDistance(calculatedDistance);
};

  // Render loading state for the first row
  if (loading) {
    return (
      <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
        <strong className="px-4 mx-auto text-2xl text-center text-gray-700">
          STS Transfer History
        </strong>
        <div className="mt-3 border-gray-200 rounded-sm border-x">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>STS Ward No</th>
                <th>Landfill Site No</th>
                <th>Manager Name</th>
                <th>Vehicle No</th>
                <th>Waste Volume</th>
                <th>Arrival Time</th>
                <th>Departure Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Render error message if there's an error
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Render table with sts data and STS managers
  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="flex gap-2 px-4 mx-auto text-2xl text-center text-rose-900">
        <FaHistory size={30} /> STS Transfer History
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>STS Ward No</th>
              <th>Landfill Site No</th>
              <th>Manager Name</th>
              <th>Vehicle No</th>
              <th>Waste Volume</th>
              <th>Arrival Time</th>
              <th>Departure Time</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stsData.map((sts) => {
              const manager = managers.find(
                (manager) => manager._id === sts.stsmanagername
              );
              const vehicle = vehicles.find(
                (vehicle) => vehicle._id === sts.vehicleregno
              );
              if (!manager) {
                // Manager not found, render a placeholder or handle the situation accordingly
                return (
                  <tr key={sts._id}>
                    <td>{sts.correspondingWard}</td>
                    <td>{sts.correspondingSite}</td>
                    <td>Loading...</td>
                    <td>{vehicle.regnumber}</td>
                    <td>{sts.wastevolume}</td>
                    <td>{sts.arrivaltime}</td>
                    <td>{sts.departuretime}</td>
                    <td>{sts.currentdate}</td>
                    <td>
                      <button onClick={() => handlePrintClick(sts)}>
                        Action
                      </button>
                    </td>
                  </tr>
                );
              }

              // Manager found, render the STS entry with manager details
              return (
                <tr key={sts._id}>
                  <td>
                    <span className="px-2 py-1 text-orange-600 capitalize bg-orange-100 rounded-md text-md">
                      {sts.correspondingWard}
                    </span>
                  </td>
                  <td>
                    <span className="px-2 py-1 text-orange-600 capitalize bg-orange-100 rounded-md text-md">
                      {sts.correspondingSite}
                    </span>
                  </td>

                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-lime-100 text-lime-600 text-md">
                      {manager.name}
                    </span>
                  </td>

                  <td>
                    <span className="px-2 py-1 text-purple-600 capitalize bg-purple-100 rounded-md text-md">
                      {vehicle.regnumber}
                    </span>
                  </td>

                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-cyan-100 text-cyan-600 text-md">
                      {sts.wastevolume}
                    </span>
                  </td>
                  <td>{sts.arrivaltime}</td>
                  <td>{sts.departuretime}</td>
                  <td>{sts.currentdate}</td>
                  <td>
                    <button
                      className="flex gap-2 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 "
                      onClick={() => handlePrintClick(sts)}
                    ><IoMdPrint size={20}/>
                      Print
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedTransfer && (

  <InvoiceModal
    isOpen={isModalOpen}
    setIsOpen={setIsModalOpen}
    invoiceInfo={selectedTransfer}
    items={stsData.filter(transfer => transfer._id === selectedTransfer._id)}
    vehicleData={vehicles.filter(vehicle => vehicle._id === selectedTransfer.vehicleregno)}
    correspondingWard={selectedTransfer.correspondingWard} // Pass corresponding Ward number
    correspondingSite={selectedTransfer.correspondingSite}
    distance={distance}
    // Pass other necessary props to InvoiceModal
  />
)}

    </div>
  );
}
