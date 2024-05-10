import { useState, useEffect } from "react";
import axios from "axios";
import { FaHistory } from "react-icons/fa";
import InvoiceModal from "./InvoiceModal";
import { IoMdPrint } from "react-icons/io";

export default function ContractorHistory() {
  const [stsData, setStsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [managers, setManagers] = useState([]);
  const [wards, setWards] = useState([]);
  const [sites, setSites] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [distance, setDistance] = useState("");
  // const[transfers, setTransfers] = useState([]);

  const [contractors, setContractors] = useState([]);
  const [contractorLoading, setContractorLoading] = useState(true);
  const [vehicleLoading, setVehicleLoading] = useState(true);
  const [contractorError, setContractorError] = useState(null);
  const [vehicleError, setVehicleError] = useState(null);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/transport");
        setContractors(response.data);
        console.log("Contractor data:", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching contractor data:", error);
        setContractorError("Error fetching contractor data. Please try again later.");
      } finally {
        setContractorLoading(false);
        setLoading(false); // Update loading state here
      }
    };
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/vehicle");
        setVehicles(response.data);
        console.log("Vehicle data:", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        setVehicleError("Error fetching vehicle data. Please try again later.");
      } finally {
        setVehicleLoading(false);
        setLoading(false); // Update loading state here
      }
    };
  
    fetchContractors();
    fetchVehicles();
  }, []); 
  


  const handlePrintClick = (contractorId) => {
    console.log("Clicked contractorId:", contractorId);
    // Find the contractor with the given ID
    const selectedContractor = contractors.find((contractor) => contractor._id === contractorId);
    console.log("Selected contractor:", selectedContractor);
    if (selectedContractor) {
      setSelectedContractor(selectedContractor);
      setIsModalOpen(true);
    } else {
      console.error(`Contractor with ID ${contractorId} not found.`);
    }
  };
  
  

  // Render loading state for the first row
  if (loading) {
    return (
      <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
        <strong className="px-4 mx-auto text-2xl text-center text-gray-700">
          Contractor to STS Transport History
        </strong>
        <div className="mt-3 border-gray-200 rounded-sm border-x">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Waste Amount</th>
                <th>Vehicle No</th>
                <th>Company</th>
                <th>Waste Type</th>
                <th>Ward No</th>
                <th>Action</th>
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
    <strong className="flex gap-2 px-4 mx-auto text-2xl text-center text-rose-900">
      <FaHistory size={30} /> STS Transfer History
    </strong>
    <div className="mt-3 border-gray-200 rounded-sm border-x">
      <table className="w-full text-gray-700">
        <thead>
          <tr>
          <th>Date</th>
                <th>Time</th>
                <th>Waste Amount</th>
                <th>Vehicle No</th>
                <th>Company</th>
                <th>Waste Type</th>
                <th>Ward No</th>
                <th>Action</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {contractors.map((contractor) => (
            <tr key={contractor._id}>
              <td>{contractor.collectiondate}</td>
              <td>{contractor.collectiontime}</td>
              <td>{contractor.wasteamount}</td>
              <td>
                {/* Find the vehicle registration number from vehicles data */}
                {vehicles.find(vehicle => vehicle._id === contractor.vehicleregno)?.regnumber || "Not found"}
              </td>
              <td>{contractor.contractorid}</td>
              <td>{contractor.wastetype}</td>
              <td>{contractor.wardno}</td>
              <td>
                    <button
                      className="flex gap-2 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 "
                      onClick={() => handlePrintClick(contractor)}
                    ><IoMdPrint size={20}/>
                      Show
                    </button>
                  </td>
              {/* Render other contractor details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {isModalOpen && selectedContractor && (
        <InvoiceModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          contractorData={selectedContractor}
          // Pass other necessary props to InvoiceModal
        />
      )}

    </div>
  );
}
