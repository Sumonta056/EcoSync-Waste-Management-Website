import { useState, useEffect } from "react";
import axios from "axios";
import { SiSentry } from "react-icons/si";

export default function EmployeeHistory() {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employee");

        if (Array.isArray(response.data)) {
          setEmployeeData(response.data);
        } else {
          console.error("Received employee data is not an array.");
          setError("Received employee data is not an array.");
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
        <strong className="flex gap-2 px-4 mx-auto text-2xl text-center text-amber-700">
          <SiSentry /> Available Employee Services
        </strong>
        <div className="mt-3 border-gray-200 rounded-sm border-x">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Date of Birth</th>
                <th>Date of Hire</th>
                <th>Job Title</th>
                <th>Payment Per Hour</th>
                <th>Contact Number</th>
                <th>Collect Route</th>
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

  // Render table with employee data
  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="flex gap-2 px-4 mx-auto text-2xl text-center text-amber-700">
        <SiSentry /> Available Employee
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Date of Hire</th>
              <th>Job Title</th>
              <th>Payment Per Hour</th>
              <th>Contact Number</th>
              <th>Collect Route</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.fullName}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.dateOfHire}</td>
                <td>{employee.jobTitle}</td>
                <td>{employee.paymentPerHour}</td>
                <td>{employee.contactNo}</td>
                <td>{employee.collectRoute}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
