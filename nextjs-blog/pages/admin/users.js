import React, { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'User', status: 'Inactive' },
  // Add more users as needed
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      // Filter out the selected user to delete it
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      // Update the users list
      setUsers(updatedUsers);
      // Deselect the deleted user
      setSelectedUser(null);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* ... (sidebar code remains the same) */}

      <main className="flex-1 p-4 bg-primary-50 overflow-y-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold mb-4">User Management</h1>
          <div className="p-4 rounded-lg shadow-md w-full overflow-x-auto">
            <table className="min-w-full divide-y bg-primary-30">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className={`cursor-pointer ${selectedUser === user ? 'bg-primary-100' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-4 bg-primary-50 w-full mt-4">
          {selectedUser && (
            <div className="mb-4 text-white">
              <h2 className="text-xl font-semibold mb-2">Selected User</h2>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-500 hover-bg-red-600 text-white rounded-md"
              >
                Delete User
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
