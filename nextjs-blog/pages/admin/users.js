import React, { useState } from 'react';
import Head from 'next/head';

const initialUsers = [
  { id: 1, name: 'John Doe', role: 'Worker', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', role: 'User', status: 'Active' },
  { id: 4, name: 'Bob Williams', role: 'Admin', status: 'Active' },
  { id: 5, name: 'Carol Brown', role: 'User', status: 'Inactive' },
  { id: 6, name: 'David Jones', role: 'Admin', status: 'Active' },
  { id: 7, name: 'Ella Davis', role: 'Worker', status: 'Active' },
  { id: 8, name: 'Frank Wilson', role: 'Admin', status: 'Inactive' },
  { id: 9, name: 'Grace Lee', role: 'User', status: 'Active' },
  { id: 10, name: 'Hank Miller', role: 'Admin', status: 'Active' },
  { id: 11, name: 'Ivy Thomas', role: 'User', status: 'Inactive' },
  { id: 12, name: 'Jack Anderson', role: 'Admin', status: 'Active' },
];


const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('Are you sure you would like to delete this user?');
    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
    }
  };
  
  const handleChangeRole = (userId, newRole) => {
    const confirmChangeRole = window.confirm('Are you sure you would like to assign Worker role to this user?');
    if (confirmChangeRole) {
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
    }
  };
  

  return (
    <div className="flex justify-center items-center">
      <Head>
        <title>User Management</title>
        <meta name="description" content="Manage users of the application." />
      </Head>
      <div className="mt-10 px-20 py-5">
        <div className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-accent-50">
            User Management
          </h2>
        </div>

        <div className="mt-10">
          <h2 className="flex justify-center items-center text-2xl font-semibold text-accent-50 mb-4">
            Existing Users
          </h2>
          {users.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-b py-8">
                  <th className="text-white font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    ID
                  </th>
                  <th className="text-white font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Name
                  </th>
                  <th className="text-white font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Role
                  </th>
                  <th className="text-white font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Status
                  </th>
                  <th className="text-white font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
              {users.map((user) => (
  <tr
    key={user.id}
    onClick={() => handleUserClick(user)}
    className={`cursor-pointer border-b border-gray-400 ${selectedUser === user ? 'bg-primary-100' : ''}`}
  >
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                      {user.id}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                      {user.name}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                      {user.role}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                      {user.status}
                    </td>
                    <td className="text-sm pr-6">

                    <button
  onClick={() => handleChangeRole(user.id, 'Worker')}
  className="px-3 py-2 bg-accent-30 text-white rounded-md"
>
  Worker
</button>

<button
  onClick={() => handleDeleteUser(user.id)}
  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mr-2"
>
  Delete
</button>

</td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-white">No users available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
