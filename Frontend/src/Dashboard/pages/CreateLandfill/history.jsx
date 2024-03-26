import { useState, useEffect } from "react";
import axios from "axios";
import { FaTruckField } from "react-icons/fa6";

export default function LandfillHistory() {
  const [landfillData, setLandfillData] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [landfillResponse, managersResponse] = await Promise.all([
          axios.get("http://localhost:3000/landfill"),
          axios.get("http://localhost:3000/user/landfill-manager"),
        ]);

        // Ensure that response data is an array
        if (Array.isArray(landfillResponse.data)) {
          setLandfillData(landfillResponse.data);
        } else {
          console.error("Received landfill data is not an array.");
          setError("Received landfill data is not an array.");
        }
        if (Array.isArray(managersResponse.data)) {
          setManagers(managersResponse.data);
        } else {
          console.error("Received managers data is not an array.");
          setError("Received managers data is not an array.");
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
        <strong className="flex gap-2 px-4 mx-auto text-2xl text-center text-cyan-700">
          <FaTruckField size={30} /> Available Landfill Sites
        </strong>
        <div className="mt-3 border-gray-200 rounded-sm border-x">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Manager Name</th>
                <th>Capacity (Tonnes)</th>
                <th>Operational Timespan</th>
                <th>GPS Coordinates</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">
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

  // Render table with landfill data and STS managers
  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="flex gap-2 px-4 mx-auto text-2xl text-center text-cyan-700">
        <FaTruckField size={30} /> Available Landfill Sites
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Manager Name</th>
              <th>Capacity (Tonnes)</th>
              <th>Operational Timespan</th>
              <th>GPS Coordinates</th>
            </tr>
          </thead>
          <tbody>
            {landfillData.map((landfill) => {
              const manager = managers.find(
                (manager) => manager._id === landfill.managerId
              );
              return (
                <tr key={landfill._id}>
                  <td>{manager.name}</td>
                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-cyan-100 text-cyan-600 text-md">
                      {landfill.capacity}
                    </span>
                  </td>
                  <td>{landfill.timespan}</td>
                  <td>
                  <span className="px-2 py-1 text-purple-600 capitalize bg-purple-100 rounded-md text-md">
                      {landfill.gpscoords}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
