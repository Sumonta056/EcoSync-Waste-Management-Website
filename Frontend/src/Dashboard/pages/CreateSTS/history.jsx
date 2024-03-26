import { useState, useEffect } from "react";
import axios from "axios";

export default function STSHistory() {
  const [stsData, setStsData] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stsResponse, managersResponse] = await Promise.all([
          axios.get("http://localhost:3000/sts"),
          axios.get("http://localhost:3000/user/sts-manager"),
        ]);

        if (Array.isArray(stsResponse.data)) {
          setStsData(stsResponse.data);
        } else {
          console.error("Received sts data is not an array.");
          setError("Received sts data is not an array.");
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
        <strong className="px-4 mx-auto text-2xl text-center text-gray-700">
          Available STS
        </strong>
        <div className="mt-3 border-gray-200 rounded-sm border-x">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Ward No</th>
                <th>Manager Name</th>
                <th>Capacity (Tonnes)</th>
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

  // Render table with sts data and STS managers
  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="px-4 mx-auto text-2xl text-center text-gray-700">
        Available STS
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Ward No</th>
              <th>Manager Name</th>
              <th>Capacity (Tonnes)</th>
              <th>GPS Coordinates</th>
            </tr>
          </thead>
          <tbody>
            {stsData.map((sts) => {
              const manager = managers.find(
                (manager) => manager._id === sts.managerId
              );
              if (!manager) {
                // Manager not found, render a placeholder or handle the situation accordingly
                return (
                  <tr key={sts._id}>
                    <td>{sts.wardno}</td>
                    <td>Loading...</td> {/* Render a placeholder */}
                    <td>{sts.capacity}</td>
                    <td>{sts.gpscoords}</td>
                  </tr>
                );
              }

              // Manager found, render the STS entry with manager details
              return (
                <tr key={sts._id}>
                  <td>{sts.wardno}</td>
                  <td>
                    <span className="px-2 py-1 text-purple-600 capitalize bg-purple-100 rounded-md text-md">
                      {manager.name}
                    </span>
                  </td>
                  <td>{sts.capacity}</td>

                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-lime-100 text-lime-600 text-md">
                      {sts.gpscoords}
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
