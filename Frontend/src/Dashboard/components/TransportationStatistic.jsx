import { useState, useEffect } from "react";
import axios from "axios";
import { FaHistory } from "react-icons/fa";

import { IoMdPrint } from "react-icons/io";

export default function STSHistory() {
  const [stsData, setStsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [managers, setManagers] = useState([]);
  const [wards, setWards] = useState([]);
  const [sites, setSites] = useState([]);
  const [vehicles, setVehicles] = useState([]);
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

  // Render loading state for the first row
  if (loading) {
    return (
      <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
        <strong className="flex justify-center gap-2 font-medium text-gray-700">
          <FaHistory /> Waste Collection Statistics
        </strong>
        <div className="mt-3 border-gray-200 rounded-sm border-x">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                {/* <th>STS Ward No</th>
                <th>Landfill Site No</th> */}
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
      <strong className="flex gap-2 p-2 font-medium text-gray-900">
        <FaHistory size={20} />  Transportation Activities & Fuel Cost Statistics
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              {/* <th>STS Ward No</th>
              <th>Landfill Site No</th> */}
              {/* <th>Manager Name</th> */}
              <th>Vehicle No</th>
              <th>Waste Volume</th>
              <th>Arrival Time</th>
              <th>Departure Time</th>
              <th>Date</th>
              <th>Cost</th>
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
                    {/* <td>{sts.correspondingWard}</td>
                    <td>{sts.correspondingSite}</td> */}
                    <td>Loading...</td>
                    <td>{vehicle.regnumber}</td>
                    <td>{sts.wastevolume}</td>
                    <td>{sts.arrivaltime}</td>
                    <td>{sts.departuretime}</td>
                    <td>{sts.currentdate}</td>
                    <td>Cost</td>
                  </tr>
                );
              }

              // Manager found, render the STS entry with manager details
              return (
                <tr key={sts._id}>
                  {/* <td>
                    <span className="px-2 py-1 text-orange-600 capitalize bg-orange-100 rounded-md text-md">
                      {sts.correspondingWard}
                    </span>
                  </td>
                  <td>
                    <span className="px-2 py-1 text-orange-600 capitalize bg-orange-100 rounded-md text-md">
                      {sts.correspondingSite}
                    </span>
                  </td> */}

                  {/* <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-lime-100 text-lime-600 text-md">
                      {manager.name}
                    </span>
                  </td> */}

                  <td>
                    <span className="px-2 py-1 text-purple-600 capitalize bg-purple-100 rounded-md text-md">
                      {vehicle.regnumber}
                    </span>
                  </td>

                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-cyan-100 text-cyan-600 text-md">
                      {sts.wastevolume} TON
                    </span>
                  </td>
                  <td>{sts.arrivaltime}</td>
                  <td>{sts.departuretime}</td>
                  <td>{sts.currentdate}</td>
                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-rose-100 text-rose-600 text-md">
                      {Math.round(sts.distance * sts.perkmcost)} BDT
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
