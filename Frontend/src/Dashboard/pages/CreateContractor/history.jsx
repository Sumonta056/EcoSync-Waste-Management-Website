import { useState, useEffect } from "react";
import axios from "axios";
import { FaTruckField } from "react-icons/fa6";

export default function ContractorHistory() {
  const [contractData, setContractData] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractResponse, managersResponse] = await Promise.all([
          axios.get("http://localhost:3000/contractor"),
          axios.get("http://localhost:3000/user/sts-manager"),
        ]);

        if (Array.isArray(contractResponse.data)) {
          setContractData(contractResponse.data);
          console.log(contractResponse.data);
        } else {
          console.error("Received contractor data is not an array.");
          setError("Received contractor data is not an array.");
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
                <th>Company Name</th>
                <th>Contractor Manager</th>
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

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="flex gap-2 px-4 mx-auto text-2xl text-center text-cyan-700">
        <FaTruckField size={30} /> Available Contracts
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
               <th>Company Name</th>
                <th>Contractor Manager</th>
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
                (manager) => manager._id === contract.managerId
              );
              if (!manager) {
                return (
                  <tr key={contract._id}>
                    <td>{contract.companyName}</td>
                    <td>{contract.managername}</td>
                    <td>{contract.contactNo}</td>
                    <td>{contract.workForceSize}</td>
                    <td>{contract.paymentPerTon}</td>
                    <td>{contract.wastePerDay}</td>
                    <td>{contract.wardno}</td>
                  </tr>
                );
              }
              return (
                <tr key={contract._id}>
                  <td>{contract.companyName}</td>
                  <td>{contract.contactNo}</td>
                  <td>{contract.workForceSize}</td>
                  <td>{contract.paymentPerTon}</td>
                  <td>{contract.wastePerDay}</td>
                  <td>{contract.wardno}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
