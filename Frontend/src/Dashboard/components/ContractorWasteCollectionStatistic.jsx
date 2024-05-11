import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function TransactionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoints
    Promise.all([
      fetch("http://localhost:3000/transfer"),
      fetch("http://localhost:3000/dump"),
    ])
      .then(([response1, response2]) =>
        Promise.all([response1.json(), response2.json()])
      )
      .then(([transferData, dumpData]) => {
        // Aggregate the data from your API
        const aggregatedData = transferData.reduce((acc, curr) => {
          const existingDate = acc.find(
            (item) => item.date === curr.currentdate
          );
          if (existingDate) {
            existingDate.STS += Number(curr.wastevolume);
          } else {
            acc.push({
              date: curr.currentdate,
              STS: Number(curr.wastevolume),
              LANDFILL: 0,
            });
          }
          return acc;
        }, []);

        dumpData.forEach((dump) => {
          const existingDate = aggregatedData.find(
            (item) => item.date === dump.currentdate
          );
          if (existingDate) {
            existingDate.LANDFILL += Number(dump.wastevolume);
          } else {
            aggregatedData.push({
              date: dump.currentdate,
              STS: 0,
              LANDFILL: Number(dump.wastevolume),
            });
          }
        });
        // Sort the data by date in ascending order
        aggregatedData.sort((a, b) => new Date(a.date) - new Date(b.date));

        setData(aggregatedData);
        console.log(aggregatedData);
      });
  }, []);

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="flex justify-center gap-2 font-medium text-gray-700">
        <FaTrash /> Waste Collection Statistics
      </strong>
      <div className="flex-1 w-full mt-3 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="STS" fill="#f1773fdd" />
            <Bar dataKey="LANDFILL" fill="#0c99ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
