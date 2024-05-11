import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTruck } from "react-icons/fa6";

export default function ScheduleHistory() {
  const [homeCollectionData, setHomeCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/homecollection");
        if (Array.isArray(response.data)) {
          setHomeCollectionData(response.data);
        } else {
          console.error("Received home collection data is not an array.");
          setError("Received home collection data is not an array.");
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
                <th>Area</th>
                <th>Start Time</th>
                <th>Duration</th>
                <th>No of Laborers</th>
                <th>No of Vans</th>
                <th>Expected Weight</th>
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

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="flex gap-2 px-4 mx-auto text-xl text-center text-sky-700">
        <FaTruck size={25} /> Schedule History
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Area</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>No of Laborers</th>
              <th>No of Vans</th>
              <th>Expected Weight</th>
            </tr>
          </thead>
          <tbody>
            {homeCollectionData.map((home) => (
              <tr key={home._id}>
                <td>{home.area}</td>
                <td>{home.starttime}</td>
                <td>{home.duration}</td>
                <td>{home.nooflaborers}</td>
                <td>{home.noofvans}</td>
                <td>{home.expectedweight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
