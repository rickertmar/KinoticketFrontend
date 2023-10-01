import React, { useState } from 'react';
import UserManagement from './users';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('dashboard'); 

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-primary-20 text-white w-64">
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Cinema Admin</h1>
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
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto"> {/* Add overflow-y-auto to main content */}
        {selectedItem === 'dashboard' && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
            <p>Welcome to the admin dashboard page.</p>
          </div>
        )}
        {selectedItem === 'movies' && (
          // Insert your Movies component here
          <div>
            {/* Your Movies component JSX */}
          </div>
        )}
        {selectedItem === 'users' && (
          // Render the UserManagement component here
          <UserManagement />
        )}
        {/* Add more content components for other sidebar items */}
      </main>
    </div>
  );
};
export default Dashboard;
