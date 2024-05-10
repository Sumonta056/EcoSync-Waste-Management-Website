import { useState, useEffect } from "react";
import axios from "axios";
import { FaTruckField } from "react-icons/fa6";

export default function ContractHistory() {
  const [contractData, setContractData] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractResponse, managersResponse] = await Promise.all([
          axios.get("http://localhost:3000/contract"),
          axios.get("http://localhost:3000/user/contract-manager"),
        ]);

        // Ensure that response data is an array
        if (Array.isArray(contractResponse.data)) {
          setContractData(contractResponse.data);
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
          <FaTruckField size={30} /> Available Contracts
        </strong>
        <div className="mt-3 border-gray-200 rounded-sm border-x">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Name of the Company</th>
                <th>Contact No</th>
                <th>Workforce Size</th>
                <th>Payment per ton</th>
                <th>Required waste per day</th>
                <th>Designated STS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="text-center">
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
        <FaTruckField size={30} /> Available Contracts
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
                <th>Name of the Company</th>
                <th>Contact No</th>
                <th>Workforce Size</th>
                <th>Payment per ton</th>
                <th>Required waste per day</th>
                <th>Designated STS</th>
            </tr>
          </thead>
          <tbody>
            {contractData.map((contract) => {
              const manager = managers.find(
                (manager) => manager._id === landfill.managerId
              );
              if (!manager) {
                // Manager not found, render a placeholder or handle the situation accordingly
                return (
                  <tr key={landfill._id}>
                    <td>{landfill.siteno}</td>
                    <td>Loading...</td> {/* Render a placeholder */}
                    <td>{landfill.capacity}</td>
                    <td>{landfill.gpscoords}</td>
                  </tr>
                );
              }
            })}

            {landfillData.map((landfill) => {
              const manager = managers.find(
                (manager) => manager._id === landfill.managerId
              );
              return (
                <tr key={landfill._id}>
                  <td>{landfill.siteno}</td>
                  <td>
                    <span className="px-2 py-1 text-purple-600 capitalize bg-purple-100 rounded-md text-md">
                      {manager.name}
                    </span>
                  </td>
                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-cyan-100 text-cyan-600 text-md">
                      {landfill.capacity}
                    </span>
                  </td>
                  <td>{landfill.timespan}</td>
                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-lime-100 text-lime-600 text-md">
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
