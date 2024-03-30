import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTruck } from "react-icons/fa6";
import InvoiceModal from "./InvoiceModal"
import { IoMdPrint } from "react-icons/io";

export default function LandfillHistory() {
  const [landfillData, setLandfillData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [managers, setManagers] = useState([]);
  const [wards, setWards] = useState([]);
  const [sites, setSites] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [distance, setDistance] = useState("");
  const [selectedDump, setSelectedDump] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          managerResponse,
          wardResponse,
          siteResponse,
          dumpResponse,
          vehiclesResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3000/user"),
          axios.get("http://localhost:3000/sts"),
          axios.get("http://localhost:3000/landfill"),
          axios.get("http://localhost:3000/dump"),
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

        if (Array.isArray(dumpResponse.data)) {
          setLandfillData(dumpResponse.data);
        } else {
          console.error("Received dump data is not an array.");
          setError("Received dump data is not an array.");
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

  useEffect(() => {
    if (wards.length > 0) {
      const mappedDumpData = landfillData.map((dump) => {
        const correspondingWard = wards.find(
          (ward) => ward._id === dump.wardno
        );
        const correspondingSite = sites.find(
          (site) => site._id === dump.siteno
        );
        return {
          ...dump,
          correspondingWard: correspondingWard.wardno,
          correspondingSite: correspondingSite.siteno,
        };
      });
      setLandfillData(mappedDumpData);
    }
  }, [wards, sites]); 

  //console.log("sts"+ dumps);
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



const handlePrintClick = (dump) => {
  setSelectedDump(dump);
  setIsModalOpen(true);
  const stsCoordinates = fetchSTSGPSCoordinates(dump.wardno);
    const landfillCoordinates = fetchLandfillGPSCoordinates(dump.siteno);

    // Calculate distance between STS and landfill
    const calculatedDistance = calculateDistance(stsCoordinates, landfillCoordinates);
    setDistance(calculatedDistance);
};
  if (loading) {
    return (
      <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
        <strong className="flex gap-2 px-4 mx-auto text-xl text-center text-sky-700">
          <FaTruck size={25} /> Truck Dumping History
        </strong>
        <div className="mt-3 border-gray-200 rounded-sm border-x">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Landfill Site No</th>
                <th>STS No</th>
                <th>Manager Name</th>
                <th>Truck No</th>
                <th>Waste Volume</th>
                <th>Arrival Time</th>
                <th>Departure Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="flex gap-2 px-4 mx-auto text-xl text-center text-sky-700">
        <FaTruck size={25} /> Truck Dumping History
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Landfill Site No</th>
              <th>STS No</th>
              <th>Manager Name</th>
              <th>Truck No</th>
              <th>Waste Volume</th> 
              <th>Arrival Time</th> 
              <th>Departure Time</th> 
              <th>Date</th> 
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {landfillData.map((landfill) => {
              const manager = managers.find(
                (manager) => manager._id === landfill.landfillmanagername
              );
              const vehicle = vehicles.find(
                (vehicle) => vehicle._id === landfill.vehicleregno
              );
              return (
                <tr key={landfill._id}>
                  <td>
                    <span className="px-2 py-1 text-orange-600 capitalize bg-orange-100 rounded-md text-md">
                      {landfill.correspondingSite}
                    </span>
                  </td>
                  <td>
                  <span className="px-2 py-1 text-orange-600 capitalize bg-orange-100 rounded-md text-md">
                      {landfill.correspondingWard}
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
                      {landfill.wastevolume} TON
                    </span>
                  </td>
                  <td>{landfill.arrivaltime}</td> 
                  <td>{landfill.departuretime}</td> 
                  <td>{landfill.currentdate}</td>
                  <td>
                    <button
                      className="flex gap-2 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 "
                      onClick={() => handlePrintClick(landfill)}
                    ><IoMdPrint size={20}/>
                      Show
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedDump && (

<InvoiceModal
  isOpen={isModalOpen}
  setIsOpen={setIsModalOpen}
  invoiceInfo={selectedDump}
  items={landfillData.filter(dump => dump._id === selectedDump._id)}
  vehicleData={vehicles.filter(vehicle => vehicle._id === selectedDump.vehicleregno)}
  correspondingWard={selectedDump.correspondingWard} // Pass corresponding Ward number
  correspondingSite={selectedDump.correspondingSite}
  distance={distance}
  // Pass other necessary props to InvoiceModal
/>
)}
    </div>
  );
}
