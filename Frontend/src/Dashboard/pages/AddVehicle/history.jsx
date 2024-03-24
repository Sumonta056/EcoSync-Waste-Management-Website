import { format } from "date-fns";
import { getRoleStatus } from "./roles.jsx";

const vehicleData = [
  {
    id: "1",
    vehicle_number: "1",
    type: "Open Truck",
    capacity: "5 Ton",
    date: "2022-05-17T03:24:00",
    access: "Sumonta Saha",
  },
  {
    id: "2",
    vehicle_number: "2",
    type: "Dump Truck",
    capacity: "3 Ton",
    date: "2022-05-17T03:24:00",
    access: "Sumonta Saha",
  },
  {
    id: "3",
    vehicle_number: "3",
    type: "Compactor",
    capacity: "10 Ton",
    date: "2022-05-17T03:24:00",
    access: "Sumonta Saha",
  },
  {
    id: "4",
    vehicle_number: "4",
    type: "Container",
    capacity: "7 Ton",
    date: "2022-05-17T03:24:00",
    access: "Sumonta Saha",
  },
  {
    id: "5",
    vehicle_number: "5",
    type: "Carrier",
    capacity: "10 Ton",
    date: "2022-05-17T03:24:00",
    access: "Sumonta Saha",
  },
  {
    id: "1",
    vehicle_number: "1",
    type: "Open Truck",
    capacity: "5 Ton",
    date: "2022-05-17T03:24:00",
    access: "Sumonta Saha",
  },
  {
    id: "2",
    vehicle_number: "2",
    type: "Dump Truck",
    capacity: "3 Ton",
    date: "2022-05-17T03:24:00",
    access: "Sumonta Saha",
  },
  {
    id: "3",
    vehicle_number: "3",
    type: "Compactor",
    capacity: "10 Ton",
    date: "2022-05-17T03:24:00",
    access: "Sumonta Saha",
  },
  {
    id: "4",
    vehicle_number: "4",
    type: "Container",
    capacity: "7 Ton",
    date: "2022-05-17T03:24:00",
    access: "Sumonta Saha",
  },
  {
    id: "5",
    vehicle_number: "5",
    type: "Carrier",
    capacity: "10 Ton",
    date: "2022-05-17T03:24:00",
    access: "Sumonta Saha",
  },
];

export default function history() {
  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="px-4 mx-auto text-2xl text-center text-gray-700">Vehicle History</strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Vehicle Number</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Date</th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.vehicle_number}</td>
                <td>{getRoleStatus(`${vehicle.type}`)}</td>
                <td>{getRoleStatus(`${vehicle.capacity}`)}</td>
                <td>{format(new Date(vehicle.date), "dd MMM yyyy")}</td>
                <td>{vehicle.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
