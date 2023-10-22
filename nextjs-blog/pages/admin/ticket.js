import React from 'react';


const ticketSalesData = [
  { month: 'January', ticketsSold: 100, revenue: 5000 },
  { month: 'February', ticketsSold: 120, revenue: 6000 },
  { month: 'March', ticketsSold: 80, revenue: 4000 },
  // Add more data as needed
];
const Tickets = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4">Ticket Sales</h1>
      <div className="bg-white p-4 rounded-lg shadow-md w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Sold</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.month}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.ticketsSold}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tickets;
