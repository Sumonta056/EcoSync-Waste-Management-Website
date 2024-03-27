import { useState, useEffect } from "react";
import axios from "axios";
import { FaTruck } from "react-icons/fa6";
export default function LandfillHistory() {
  const [landfillData, setLandfillData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [managers, setManagers] = useState([]);
  const [sites, setSites] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  // const[transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [managerResponse, siteResponse, dumpResponse, vehiclesResponse] =
          await Promise.all([
            axios.get("http://localhost:3000/user"),
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
        if (Array.isArray(siteResponse.data)) {
          setSites(siteResponse.data);
          console.log(siteResponse);
        } else {
          console.error("Received landfill data is not an array.");
          setError("Received landfill data is not an array.");
        }
        if (Array.isArray(dumpResponse.data)) {
          setLandfillData(dumpResponse.data);
          console.log(dumpResponse);
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

  // Update stsData when wards state changes
  useEffect(() => {
    if (sites.length > 0) {
      const mappedDumpData = landfillData.map((dump) => {
        const correspondingSite = sites.find(
          (site) => site._id === dump.siteno
        );
        return {
          ...dump,
          correspondingSite: correspondingSite.siteno,
        };
      });
      setLandfillData(mappedDumpData);
    }
  }, [sites, landfillData]);

  // Render loading state, error, or table with sts data and STS managers...

  // Render loading state for the first row
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
                <th>Landfill Site ID</th>
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
      <strong className="flex gap-2 px-4 mx-auto text-xl text-center text-sky-700">
        <FaTruck size={25} /> Truck Dumping History
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className="text-xs">Lanfill Site ID</th>
              <th className="text-xs">Manager Name</th>
              <th className="text-xs">Truck No</th>
              <th className="text-xs">Waste Volume</th>
              <th className="text-xs">Arrival Time</th>
              <th className="text-xs">Departure Time</th>
              <th className="text-xs">Date</th>
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
              if (!manager) {
                // Manager not found, render a placeholder or handle the situation accordingly
                return (
                  <tr key={landfill._id}>
                    <td className="text-xs">{landfill.correspondingSite}</td>
                    <td>Loading...</td>
                    <td>{vehicle.regnumber}</td>
                    <td>{landfill.wastevolume}</td>
                    <td>{landfill.arrivaltime}</td>
                    <td>{landfill.departuretime}</td>
                    <td>{landfill.currentdate}</td>
                  </tr>
                );
              }

              // Manager found, render the STS entry with manager details
              return (
                <tr key={landfill._id}>
                  <td className="text-xs">{landfill.correspondingSite}</td>
                  <td className="px-2 py-1 text-xs capitalize rounded-md text-md text-sky-600 bg-sky-100">{manager.name}</td>
                  <td className="text-xs ">{vehicle.regnumber}</td>
                  <td className="px-2 py-1 text-xs text-pink-600 capitalize bg-pink-100 rounded-md text-md">{landfill.wastevolume}</td>
                  <td className="text-xs">{landfill.arrivaltime}</td>
                  <td className="text-xs">{landfill.departuretime}</td>
                  <td className="text-xs">{landfill.currentdate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
