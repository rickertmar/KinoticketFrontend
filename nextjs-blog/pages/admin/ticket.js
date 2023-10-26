import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ticketSalesData = [
  { month: "January", ticketsSold: 1000, revenue: 5000 },
  { month: "February", ticketsSold: 1200, revenue: 6000 },
  { month: "March", ticketsSold: 800, revenue: 4000 },
  { month: "April", ticketsSold: 1080, revenue: 4200 },
  { month: "May", ticketsSold: 2000, revenue: 7200 },
  // Add more data as needed
];

const Tickets = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="rounded-3xl mb-15 px-10 py-5 w-full max-w-2xl flex flex-1 flex-col bg-primary-20 justify-center items-center">
        <h1 className="flex ml-4 justify-center items-center text-2xl font-semibold text-accent-50 mb-4 bg-accent p-3 rounded w-full">
          Admin Dashboard
        </h1>

        {/* Ticket Sales Chart */}
        <div className="mb-6">
          <h2 className="flex justify-center items- center text-xl font-semibold mb-4 text-accent-50">
            Monthly Ticket Sales
          </h2>
          {isClient && (
            <BarChart
              width={600}
              height={300}
              data={ticketSalesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ticketsSold" name="Tickets Sold" fill="#8884d8" />
              <Bar dataKey="revenue" name="Revenue ($)" fill="#82ca9d" />
            </BarChart>
          )}
        </div>

        {/* Ticket Sales Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-accent-50">
            Ticket Sales Data
          </h2>
          <table className="min-w-full divide-y divide-gray-200 text-white">
            <thead>
              <tr className="w-full h-16 border-gray-300 border-b py-8">
                <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                  Month
                </th>
                <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                  Tickets Sold
                </th>
                <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                  Revenue ($)
                </th>
              </tr>
            </thead>

            <tbody>
              {ticketSalesData.map((item) => (
                <tr key={item.month}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.ticketsSold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    ${item.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
