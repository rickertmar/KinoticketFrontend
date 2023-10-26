import React, { useState } from "react";
import Head from "next/head";

const initialUsers = [
  { id: 1, name: "John Doe", role: "Worker", status: "Active" },
  { id: 2, name: "Jane Smith", role: "User", status: "Inactive" },
  { id: 3, name: "Alice Johnson", role: "User", status: "Active" },
  { id: 4, name: "Bob Williams", role: "Admin", status: "Active" },
  { id: 5, name: "Carol Brown", role: "User", status: "Inactive" },
  { id: 6, name: "David Jones", role: "Admin", status: "Active" },
  { id: 7, name: "Ella Davis", role: "Worker", status: "Active" },
  { id: 8, name: "Frank Wilson", role: "Admin", status: "Inactive" },
  { id: 9, name: "Grace Lee", role: "User", status: "Active" },
  { id: 10, name: "Hank Miller", role: "Admin", status: "Active" },
  { id: 11, name: "Ivy Thomas", role: "User", status: "Inactive" },
  { id: 12, name: "Jack Anderson", role: "Admin", status: "Active" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you would like to delete this user?"
    );
    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
    }
  };

  // Falls wir die möglichkeit haben wollen Ein Nutzer Worker Role zu geben.
  // Aktuell haben wir keine Worker page daher Worker gleichberechtigt wie User
  const handleChangeRole = (userId, newRole) => {
    const confirmChangeRole = window.confirm(
      "Are you sure you would like to assign Worker role to this user?"
    );
    if (confirmChangeRole) {
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-">
      <div className="rounded-3xl mb-15 px-10 py-5 w-full max-w-2xl flex flex-1 flex-col bg-primary-20 justify-center items-center">
        <h2 className="flex ml-4 justify-center items-center text-2xl font-semibold text-accent-50 mb-4 bg-accent p-3 rounded w-full">
          Existing Users
        </h2>
        <div className="overflow-y-auto flex-1 w-full">
          {users.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-b py-8">
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    ID
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Name
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Status
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Role
                  </th>
                  <th className="text-white font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className={`h-24 border-gray-300 border-b ${
                      selectedUser === user ? "bg-primary-100" : ""
                    }`}
                  >
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {user.id}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {user.name}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {user.role}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {user.status}
                    </td>
                    <td className="text-sm pr-6">
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
