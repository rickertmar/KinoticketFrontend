import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Initialize with an empty array
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Fetch user data
      axios
        .get(process.env.API_URL + "/users/all", {
          headers: { "Content-Type": "application/json" },
          validateStatus: function (status) {
            return status >= 200 && status < 305; // Accept status code in the range 200-304
          },
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you would like to delete this user?"
    );
    if (confirmDelete) {
      axios
        .delete(`${process.env.API_URL}/users/id/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
        .then((response) => {
          // If the deletion was successful, update the local state
          const updatedUsers = users.filter((user) => user.id !== userId);
          setUsers(updatedUsers);
          if (selectedUser && selectedUser.id === userId) {
            setSelectedUser(null);
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Failed to delete the user. Please try again.");
        });
    }
  };

  // Falls wir die möglichkeit haben wollen Ein Nutzer Worker Role zu geben.
  // Aktuell haben wir keine Worker page daher Worker gleichberechtigt wie User

  /*
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
  */

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
                    Email
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
                      selectedUser && selectedUser.id === user.id
                        ? "bg-primary-100"
                        : ""
                    }`}
                  >
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {user.id}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {user.firstName}, {user.lastName}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {user.email}
                    </td>

                    <td className="text-sm pr-6 whitespace-no-wrap text-white tracking-normal leading-4">
                      {user.role}
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
