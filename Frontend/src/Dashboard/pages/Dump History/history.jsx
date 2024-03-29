import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTruck } from "react-icons/fa6";

export default function LandfillHistory() {
  const [landfillData, setLandfillData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [managers, setManagers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [dumps, setDumps] = useState([]);
  const [stsData, setStsData] = useState([]);
  const [siteData, setSiteData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          managerResponse,
          dumpResponse,
          vehicleResponse,
          stsResponse,
          siteResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3000/user"),
          axios.get("http://localhost:3000/dump"),
          axios.get("http://localhost:3000/vehicle"),
          axios.get("http://localhost:3000/sts"),
          axios.get("http://localhost:3000/landfill"),
        ]);

        if (Array.isArray(managerResponse.data)) {
          setManagers(managerResponse.data);
        } else {
          console.error("Received manager data is not an array.");
          setError("Received manager data is not an array.");
        }

        if (Array.isArray(dumpResponse.data)) {
          setDumps(dumpResponse.data);
        } else {
          console.error("Received dump data is not an array.");
          setError("Received dump data is not an array.");
        }

        if (Array.isArray(vehicleResponse.data)) {
          setVehicles(vehicleResponse.data);
        } else {
          console.error("Received vehicles data is not an array.");
          setError("Received vehicles data is not an array.");
        }

        if (Array.isArray(stsResponse.data)) {
          setStsData(stsResponse.data);
        } else {
          console.error("Received STS data is not an array.");
          setError("Received STS data is not an array.");
        }

        if (Array.isArray(siteResponse.data)) {
          setSiteData(siteResponse.data);
        } else {
          console.error("Received site data is not an array.");
          setError("Received site data is not an array.");
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
    if (dumps.length > 0 && stsData.length > 0 && siteData.length > 0) {
      const mappedLandfillData = dumps.map((dump) => {
        const correspondingSts = stsData.find((sts) => sts._id === dump.wardno);
        const correspondingSite = siteData.find(
          (site) => site._id === dump.siteno
        );
        return {
          ...dump,
          correspondingSts: correspondingSts ? correspondingSts.wardno : "N/A",
          correspondingSite: correspondingSite.siteno,
        };
      });
      setLandfillData(mappedLandfillData);
    }
  }, [dumps, stsData, siteData]);

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
                    <span className="px-2 py-1 text-purple-600 capitalize bg-purple-100 rounded-md text-md">
                      {landfill.correspondingSite}
                    </span>
                  </td>
                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-lime-100 text-lime-600 text-md">
                      {landfill.correspondingSts}
                    </span>
                  </td>
                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-cyan-100 text-cyan-600 text-md">
                      {manager ? manager.name : "Loading..."}
                    </span>
                  </td>
                  <td>{vehicle ? vehicle.regnumber : "Loading..."}</td>
                  <td>{landfill.wastevolume} TON</td>
                  <td>
                    <span className="px-2 py-1 capitalize rounded-md bg-rose-100 text-rose-600 text-md">
                      {landfill.arrivaltime}
                    </span>
                  </td>
                  <td>
                    <span className="px-2 py-1 text-orange-600 capitalize bg-orange-100 rounded-md text-md">
                      {landfill.departuretime}
                    </span>
                  </td>
                  <td>{landfill.currentdate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
