import { useState, useEffect } from "react";
import axios from "axios";
import { getRoleStatus } from "./roles";
import { BsTruckFrontFill } from "react-icons/bs";

export default function History() {
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleResponse = await axios.get(
          "http://localhost:3000/vehicle"
        );

        // Ensure that response data is an array
        if (Array.isArray(vehicleResponse.data)) {
          setVehicleData(vehicleResponse.data);
        } else {
          console.error("Received vehicle data is not an array.");
          setError("Received vehicle data is not an array.");
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

  // Render loading state for the first row
  if (loading) {
    return (
      <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
        <strong className="px-4 mx-auto text-2xl text-center text-gray-700">
          Vehicle History
        </strong>
        <div className="mt-3 border-gray-200 rounded-sm border-x">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Registration Number</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Fuel Cost (Loaded)</th>
                <th>Fuel Cost (Unloaded)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
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

  // Render table with vehicle data and STS managers
  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="flex gap-2 px-4 mx-auto text-2xl text-center text-violet-900">
      <BsTruckFrontFill size={25} /> Vehicle Entry History
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Registration Number</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Fuel Cost (Loaded)</th>
              <th>Fuel Cost (Unloaded)</th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.regnumber}</td>
                <td>{getRoleStatus(vehicle.type, "type")}</td>
                <td>{getRoleStatus(vehicle.capacity, "capacity")}</td>
                <td>{vehicle.loadedfuelcost}</td>
                <td>{vehicle.unloadedfuelcost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
