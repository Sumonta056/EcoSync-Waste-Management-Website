import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTruckFront } from "react-icons/fa6";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#7b42ff"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function VehicleTypePieChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/vehicle/")
      .then((response) => {
        const vehicles = response.data;
        const typeCount = vehicles.reduce((acc, vehicle) => {
          acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
          return acc;
        }, {});

        const newData = Object.entries(typeCount).map(([name, value]) => ({
          name,
          value,
        }));
        setData(newData);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className="w-[30rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="flex justify-center gap-2 font-medium text-gray-700">
      <FaTruckFront /> Transportation Vehicle Distribution
      </strong>
      <div className="flex-1 w-full mt-3 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
