import React, { useState, useEffect } from 'react';
import UserManagement from './users';
import Movies from './movies';
import Tickets from './ticket';

const Dashboard = ({ isAuthenticated, role }) => {
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const [showAccessDeniedMessage, setShowAccessDeniedMessage] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const ticketSalesData = [
    { month: 'January', ticketsSold: 100, revenue: 5000 },
    { month: 'February', ticketsSold: 120, revenue: 6000 },
    { month: 'March', ticketsSold: 80, revenue: 4000 },
    // Add more data as needed
  ];

  useEffect(() => {
    if (!isAuthenticated || role !== 'ADMIN') {
      setShowAccessDeniedMessage(true);
    } else {
      setShowAccessDeniedMessage(false);
    }
  }, [isAuthenticated, role]);


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-primary-20 text-white w-64">
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4 text-accent-50">Cinema Admin</h1>
          <nav className="mt-6">
            <ul>
              <li className="mb-4">
                <a
                  href="#"
                  onClick={() => handleItemClick('dashboard')}
                  className={`flex items-center text-white ${
                    selectedItem === 'dashboard' ? 'opacity-100' : 'opacity-75'
                  } hover:opacity-100 transition duration-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  Dashboard
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  onClick={() => handleItemClick('movies')}
                  className={`flex items-center text-white ${
                    selectedItem === 'movies' ? 'opacity-100' : 'opacity-75'
                  } hover:opacity-100 transition duration-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Movies
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  onClick={() => handleItemClick('users')}
                  className={`flex items-center text-white ${
                    selectedItem === 'users' ? 'opacity-100' : 'opacity-75'
                  } hover:opacity-100 transition duration-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Users
                </a>
              </li>
              {/* Add more sidebar items as needed */}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-primary-50 overflow-y-auto">
        {showAccessDeniedMessage && (
          <div className="bg-red-500 text-white p-4 mb-4 rounded-md">
            Access Denied! You do not have permission to access this page.
          </div>
        )}
        {selectedItem === 'dashboard' && !showAccessDeniedMessage && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
            <p>Welcome to the admin dashboard page.</p>
            <div>
              <Tickets data={ticketSalesData} />
            </div>
          </div>
        )}
        {selectedItem === 'movies' && !showAccessDeniedMessage && (
          <div>
            {/* Your Movies component JSX */}
            <Movies setSelectedItem={setSelectedItem} />
          </div>
        )}
        {selectedItem === 'users' && !showAccessDeniedMessage && (
          <UserManagement />
        )}
        {/* Add more content components for other sidebar items */}
      </main>
    </div>
  );
};
export default Dashboard;
