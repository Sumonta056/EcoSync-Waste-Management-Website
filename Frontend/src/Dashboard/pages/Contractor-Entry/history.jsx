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
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [distance, setDistance] = useState("");
  // const[transfers, setTransfers] = useState([]);

  const [contractors, setContractors] = useState([]);
  const [transport, setTransport] = useState([]);
  const [contractor, setContractor] = useState([]);
  const [transportLoading, setTransportLoading] = useState(true);
  const [vehicleLoading, setVehicleLoading] = useState(true);
  const [contractorLoading, setContractorLoading] = useState(true);
  const [contractorError, setContractorError] = useState(null);
  const [vehicleError, setVehicleError] = useState(null);
  const [transportError, setTransportError] = useState(null);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const response = await axios.get("http://localhost:3000/transport");
        setTransport(response.data);
        console.log("Transport data:", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching transport data:", error);
        setTransportError("Error fetching transport data. Please try again later.");
      } finally {
        setTransportLoading(false);
        setLoading(false); // Update loading state here
      }
    };
    const fetchContractor = async () => {
      try {
        const response = await axios.get("http://localhost:3000/contractor");
        setContractor(response.data);
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
  
    fetchTransport();
    fetchContractor();
    fetchVehicles();
  }, []); 
  


  const handlePrintClick = (clickedTransport) => {
    const transportId = clickedTransport._id;
    const selectedTransport = transport.find((t) => t._id === transportId);
    if (selectedTransport) {
      const associatedVehicle = vehicles.find(vehicle => vehicle._id === selectedTransport.vehicleregno);
      const associatedVehicleNo = associatedVehicle ? associatedVehicle.regnumber : "Not found";
  
      const associatedContractor = contractor.find(contractor => contractor._id === selectedTransport.contractorid);
      const associatedCompanyName = associatedContractor.companyName ;

      const associatedWastePerDay = associatedContractor.wastePerDay ;
      const associatedWastePayment = associatedContractor.paymentPerTon ;
  
      setSelectedTransport({ ...selectedTransport, associatedVehicleNo, associatedCompanyName, associatedWastePerDay, associatedWastePayment });
      setIsModalOpen(true);
  
      console.log("company", associatedCompanyName); // Move console.log here
    } else {
      console.error(`Transport with ID ${transportId} not found.`);
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
      <FaHistory size={30} /> Contractor to STS Transport History
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
          {transport.map((transport) => (
            <tr key={transport._id}>
              <td>{transport.collectiondate}</td>
              <td>{transport.collectiontime}</td>
              <td>{transport.wasteamount}</td>
              <td>
                {/* Find the vehicle registration number from vehicles data */}
                {vehicles.find(vehicle => vehicle._id === transport.vehicleregno)?.regnumber || "Not found"}
              </td>
              <td>
                {/* Find the vehicle registration number from vehicles data */}
                {contractor.find(contractor => contractor._id === transport.contractorid)?.companyName || "Not found"}
              </td>
              <td>{transport.wastetype}</td>
              <td>{transport.wardno}</td>
              <td>
                    <button
                      className="flex gap-2 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 "
                      onClick={() => handlePrintClick(transport)}
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
    {isModalOpen && selectedTransport && (
       <InvoiceModal
       isOpen={isModalOpen}
       setIsOpen={setIsModalOpen}
       transportData={selectedTransport}
       associatedVehicleNo={selectedTransport?.associatedVehicleNo}
       associatedCompanyName={selectedTransport?.associatedCompanyName}
       associatedWastePayment={selectedTransport?.associatedWastePayment}
       associatedWastePerDay={selectedTransport?.associatedWastePerDay}
     />     
      )}

    </div>
  );
}
