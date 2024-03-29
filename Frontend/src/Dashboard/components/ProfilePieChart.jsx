import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import React, { useEffect, useState } from "react";
import axios from "axios";

const data = [
  { name: "Male", value: 540 },
  { name: "Female", value: 620 },
  { name: "Other", value: 210 },
];

const RADIAN = Math.PI / 180;
const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

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

export default function BuyerProfilePieChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/")
      .then((response) => {
        const users = response.data;
        const rolesCount = users.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        const newData = Object.entries(rolesCount).map(([name, value]) => ({
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
      <strong className="font-medium text-gray-700">
        User Distribution by Role
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
