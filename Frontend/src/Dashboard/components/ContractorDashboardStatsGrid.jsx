import { useEffect, useState } from "react";
import axios from "axios";
import { FaTruck } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { FaLandmark } from "react-icons/fa6";

export default function DashboardStatsGrid() {
  const [totalTrucks, setTotalTrucks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSTS, setTotalSTS] = useState(0);
  const [totalLandfills, setTotalLandfills] = useState(0);

  useEffect(() => {
    // Get the total number of trucks from the database
    axios
      .get("http://localhost:3000/vehicle")
      .then((response) => {
        setTotalTrucks(response.data.length);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    // Get the total number users from the database
    axios
      .get("http://localhost:3000/user/")
      .then((response) => {
        setTotalUsers(response.data.length);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    axios
      .get("http://localhost:3000/sts")
      .then((response) => {
        setTotalSTS(response.data.length);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    axios
      .get("http://localhost:3000/landfill")
      .then((response) => {
        setTotalLandfills(response.data.length);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-500">
          <FaTruck className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">Total Trucks</span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
              {totalTrucks}
            </strong>
            <span className="pl-2 text-sm text-green-500">+0</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-full">
          <FaUserCheck className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">
            Total Authenticated Users
          </span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
              {totalUsers}
            </strong>
            <span className="pl-2 text-sm text-green-500">+2</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full">
          <BsFillClipboardDataFill className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">
            Total STS Available
          </span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
              {totalSTS}
            </strong>
            <span className="pl-2 text-sm text-green-500">+1</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
          <FaLandmark className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">
            Total Landfills Available
          </span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
              {totalLandfills}
            </strong>
            <span className="pl-2 text-sm text-green-500">+1</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="flex items-center flex-1 p-4 bg-white border border-gray-200 rounded-sm">
      {children}
    </div>
  );
}
