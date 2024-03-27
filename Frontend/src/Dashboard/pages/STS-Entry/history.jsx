import { useState, useEffect } from "react";
import axios from "axios";

export default function STSHistory() {
  const [stsData, setStsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [managers, setManagers] = useState([]);
  const [wards, setWards] = useState([]);
  const [vehicles, setVehicles] = useState([]);
 // const[transfers, setTransfers] = useState([]);
  
 useEffect(() => {
  const fetchData = async () => {
    try {
      const [managerResponse, wardResponse, transferResponse, vehiclesResponse] = await Promise.all([
        axios.get("http://localhost:3000/user"),
        axios.get("http://localhost:3000/sts"),
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
    const mappedTransferData = stsData.map(transfer => {
      const correspondingWard = wards.find(ward => ward._id === transfer.wardno);
      return {
        ...transfer,
        correspondingWard: correspondingWard.wardno
      };
    });
    setStsData(mappedTransferData);
  }
}, [wards, stsData]);

// Render loading state, error, or table with sts data and STS managers...


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
                <th>Ward No</th>
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
                <td colSpan="7" className="text-center">
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
      <strong className="px-4 mx-auto text-2xl text-center text-gray-700">
      STS Transfer History
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
            <tr>
                <th>Ward No</th>
                <th>Manager Name</th>
                <th>Vehicle No</th>
                <th>Waste Volume</th> 
                <th>Arrival Time</th> 
                <th>Departure Time</th> 
                <th>Date</th> 
              </tr>
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
                    <td>Loading...</td> 
                    <td>{vehicle.regnumber}</td>
                    <td>{sts.wastevolume}</td> 
                    <td>{sts.arrivaltime}</td> 
                    <td>{sts.departuretime}</td> 
                    <td>{sts.currentdate}</td>
                  </tr>
                );
              }

              // Manager found, render the STS entry with manager details
              return (
                <tr key={sts._id}>
                    <td>{sts.correspondingWard}</td>
                    <td>{manager.name}</td> 
                    <td>{vehicle.regnumber}</td>
                    <td>{sts.wastevolume}</td> 
                    <td>{sts.arrivaltime}</td> 
                    <td>{sts.departuretime}</td> 
                    <td>{sts.currentdate}</td>
                  </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
